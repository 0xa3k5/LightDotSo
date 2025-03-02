// Copyright 2023-2024 LightDotSo.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use super::types::NotificationSettings;
use crate::{
    error::RouteError, result::AppJsonResult,
    routes::notification_settings::error::NotificationSettingsError, state::AppState,
};
use autometrics::autometrics;
use axum::{
    extract::{Query, State},
    Json,
};
use lightdotso_prisma::notification_settings;
use serde::Deserialize;
use utoipa::IntoParams;

// -----------------------------------------------------------------------------
// Query
// -----------------------------------------------------------------------------

#[derive(Debug, Deserialize, Default, IntoParams)]
#[serde(rename_all = "snake_case")]
#[into_params(parameter_in = Query)]
pub struct GetQuery {
    /// The id of the notification settings.
    pub id: String,
}

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

/// Get a notification settings
#[utoipa::path(
        get,
        path = "/notification_settings/get",
        params(
            GetQuery
        ),
        responses(
            (status = 200, description = "Notification settings returned successfully", body = NotificationSettings),
            (status = 404, description = "Notification settings not found", body = NotificationSettingsError),
        )
    )]
#[autometrics]
pub(crate) async fn v1_notification_settings_get_handler(
    get_query: Query<GetQuery>,
    State(state): State<AppState>,
) -> AppJsonResult<NotificationSettings> {
    // -------------------------------------------------------------------------
    // Parse
    // -------------------------------------------------------------------------

    // Get the get query.
    let Query(query) = get_query;

    // -------------------------------------------------------------------------
    // DB
    // -------------------------------------------------------------------------

    // Get the interpretation action from the database.
    let notification_settings = state
        .client
        .notification_settings()
        .find_unique(notification_settings::id::equals(query.id))
        .exec()
        .await?;

    // If the paymaster is not found, return a 404.
    let notification_settings =
        notification_settings.ok_or(RouteError::NotificationSettingsError(
            NotificationSettingsError::NotFound("Notification settings not found".to_string()),
        ))?;

    // -------------------------------------------------------------------------
    // Return
    // -------------------------------------------------------------------------

    // Change the notification settings to the format that the API expects.
    let notification_settings: NotificationSettings = notification_settings.into();

    Ok(Json::from(notification_settings))
}
