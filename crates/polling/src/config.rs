// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

#![allow(clippy::unwrap_used)]

use crate::polling::Polling;
use clap::Parser;
use eyre::Result;
use lightdotso_graphql::constants::{
    CHAIN_SLEEP_SECONDS, SATSUMA_BASE_URL, SATSUMA_LIVE_IDS, THE_GRAPH_HOSTED_SERVICE_URLS,
};
use lightdotso_tracing::tracing::{error, info};
use std::collections::HashMap;

#[derive(Debug, Clone, Parser, Default)]
pub struct PollingArgs {
    /// The flag of whether polling is live.
    #[arg(long, short, default_value_t = true)]
    #[clap(long, env = "POLLING_LIVE")]
    pub live: bool,
    /// The polling mode to connect to.
    #[arg(long, short, default_value_t = String::from(""))]
    #[clap(long, env = "POLLING_MODE")]
    pub mode: String,
    /// The infura API key
    #[clap(long, env = "SATSUMA_API_KEY")]
    pub satsuma_api_key: Option<String>,
    /// The flag of whether polling is live.
    #[arg(long, short, default_value_t = false)]
    #[clap(long, env = "SATSUMA_ENABLED")]
    pub satsuma_enabled: bool,
}

impl PollingArgs {
    pub async fn create(&self) -> Result<Polling> {
        // Create a mapping of sleep seconds for each chain id
        let sleep_seconds_mapping = create_sleep_seconds_mapping();

        // Create a mapping for chain id to polling URLs.
        let chain_mapping =
            create_chain_mapping(self.satsuma_api_key.clone(), self.satsuma_enabled);

        Polling::new(&PollingArgs::default(), sleep_seconds_mapping, chain_mapping, true).await
    }

    #[tokio::main]
    pub async fn run(&self) -> Result<()> {
        // Add info
        info!("PollingArgs run, starting...");

        // Print the config
        info!("Config: {:?}", self);

        // Create a mapping for chain id to polling URLs.
        let chain_mapping =
            create_chain_mapping(self.satsuma_api_key.clone(), self.satsuma_enabled);

        // Create a vector to store the handles to the spawned tasks.
        let mut handles = Vec::new();

        // Spawn a task for each chain id.
        for (chain_id, chain_map) in chain_mapping.clone().into_iter() {
            for (service, _url) in chain_map.into_iter() {
                if self.live || self.mode == "all" {
                    let live_handle = tokio::spawn(run_polling(
                        self.clone(),
                        chain_id,
                        service.clone(),
                        true,
                        chain_mapping.clone(),
                    ));
                    handles.push(live_handle);
                }

                if !self.live || self.mode == "all" {
                    let past_handle = tokio::spawn(run_polling(
                        self.clone(),
                        chain_id,
                        service.clone(),
                        false,
                        chain_mapping.clone(),
                    ));
                    handles.push(past_handle);
                }
            }
        }

        // Wait for all tasks to finish.
        for handle in handles {
            if let Err(e) = handle.await {
                error!("A task panicked: {:?}", e);
            }
        }

        Ok(())
    }
}

// Run the polling for a specific chain id.
pub async fn run_polling(
    args: PollingArgs,
    chain_id: u64,
    service_provider: String,
    live: bool,
    chain_mapping: HashMap<u64, HashMap<String, String>>,
) -> Result<()> {
    // Create a mapping of sleep seconds for each chain id
    let sleep_seconds_mapping = create_sleep_seconds_mapping();

    match live {
        true => {
            let polling =
                Polling::new(&args, sleep_seconds_mapping.clone(), chain_mapping.clone(), live)
                    .await?;
            polling.run(chain_id, service_provider.clone()).await;
        }
        false => {
            loop {
                let polling =
                    Polling::new(&args, sleep_seconds_mapping.clone(), chain_mapping.clone(), live)
                        .await?;
                polling.run(chain_id, service_provider.clone()).await;

                // Sleep for 1 hour
                tokio::time::sleep(tokio::time::Duration::from_secs(60 * 60)).await;
            }
        }
    }

    Ok(())
}

/// Create a mapping of sleep seconds for each chain id.
pub fn create_sleep_seconds_mapping() -> HashMap<u64, u64> {
    let mut sleep_seconds_mapping = HashMap::new();

    for (chain_id, seconds) in CHAIN_SLEEP_SECONDS.clone().into_iter() {
        sleep_seconds_mapping.insert(chain_id, seconds);
    }

    // Insert a default value for the sleep seconds

    sleep_seconds_mapping
}

/// Create a mapping for chain id to polling URLs.
pub fn create_chain_mapping(
    satsuma_api_key: Option<String>,
    satsuma_enabled: bool,
) -> HashMap<u64, HashMap<String, String>> {
    let mut chain_id_to_urls = std::collections::HashMap::new();

    for (chain_id, url) in THE_GRAPH_HOSTED_SERVICE_URLS.clone().into_iter() {
        let mut child_map = HashMap::new();
        child_map.insert("graph".to_string(), url);
        chain_id_to_urls.insert(chain_id, child_map);
    }

    if satsuma_api_key.is_some() && satsuma_enabled {
        for (chain_id, id) in SATSUMA_LIVE_IDS.clone().into_iter() {
            let url =
                format!("{}/{}/{}", SATSUMA_BASE_URL.clone(), satsuma_api_key.clone().unwrap(), id);
            let child_map = chain_id_to_urls.entry(chain_id).or_insert_with(HashMap::new);
            child_map.insert("satsuma".to_string(), url);
        }
    }

    chain_id_to_urls
}
