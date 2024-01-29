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

use clap::Parser;
use ethers_main::types::Log;
use eyre::Result;
use lightdotso_interpreter::{config::InterpreterArgs, types::InterpretationRequest};
use lightdotso_simulator::types::SimulationRequest;

// https://etherscan.io/tx/0xee623726751e879ca379d3680a7658e307a6cbc3aa99be7f2706470eebdd969d

#[tokio::test(flavor = "multi_thread")]
async fn test_integration_erc20_transfer() -> Result<()> {
    let request = SimulationRequest {
        chain_id: 1,
        // kaki.eth
        from: "0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed".parse()?,
        // ENS token address
        to: "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72".parse()?,
        data: Some("0xa9059cbb0000000000000000000000006f8a90995fdce00da1f7dd731d812f6a6d18d1ff000000000000000000000000000000000000000000000001a055690d9db80000".parse()?),
        value: None,
        gas_limit: u64::MAX,
        // Tx was on 13704035
        block_number: Some(13704034),
    };

    // Parse the command line arguments
    let args = InterpreterArgs::parse_from([""]);

    // Run the interpreter
    let res = args.run(vec![request]).await?;

    assert!(res.success);

    insta::assert_debug_snapshot!(res);

    Ok(())
}

// https://polygonscan.com/tx/0xc8e327667f062843195f77db4374afdb29f8ed2fce0e88c315f2c4110f59ed44#eventlog
#[tokio::test(flavor = "multi_thread")]
async fn test_integration_erc20_transfer_query_overflow_bug() -> Result<()> {
    // Initialize the tracing subscriber.
    lightdotso_tracing::tracing_subscriber::fmt().init();

    // Construct the request
    let request = InterpretationRequest  {
        chain_id: 137,
        from: "0x2978231D983D32C5EA3e97021e6A7D636EF42beF".parse()?,
        to: Some("0xe1C66210fB97C76cDAEE38950F5E9c181e9dA628".parse()?),
        call_data: Some("0x6df0e4a8000000000000000000000000000000000000000000000000000000000312181100000000000000000000000000000000000000000000000000000000000000600000000000000000000000005ff137d4b0fdcd49dca30c7cf57e578a026d278900000000000000000000000000000000000000000000000000000000000004841fad948c00000000000000000000000000000000000000000000000000000000000000400000000000000000000000002978231d983d32c5ea3e97021e6a7d636ef42bef00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000fbd80fe5ce1ece895845fd131bd621e2b6a1345f000000000000000000000000000000000000000000000000000000000000000b00000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000180000000000000000000000000000000000000000000000000000000000044e1c000000000000000000000000000000000000000000000000000000000001c4b4000000000000000000000000000000000000000000000000000000000001c4b400000000000000000000000000000000000000000000000000000000d320b3b350000000000000000000000000000000000000000000000000000000b323dbb3100000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000360000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e4b61d27f6000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000e8a0e8466df96ec769a02adaa969abe67c70ec6800000000000000000000000000000000000000000000000000000000000493e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000095000000000003193facb32d1c120719892b7ae9770000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006588bdcd590b7625fbeeef1867e88939f27585eb38f2c8aa3c407c776b87433bc7cf91d94b7215028f3cf6351206b58acc0e00d7bcdb8b63d18db541298b5c0e1830de521b0000000000000000000000000000000000000000000000000000000000000000000000000000000000006101000100000000000104ca4889de26ace945786f5c5df485d0cdcdbb4ca19318987147eace08dcedbf047ed2eeffccf20a4f86f635b867e2b9634d33513f3b5b539952fd950bc022111b0201017f4c8bd0acc303599a1ae92414b055514ffb6f810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000".parse()?),
        traces: vec![],
        logs: vec![
            Log {
                address: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789".parse()?,
                topics: vec![
                    "0xbb47ee3e183a558b1a2ff0874b079f3fc5478b7454eacf2bfc5af2ff5878f972".parse()?
                ],
                ..Default::default()
            },
            Log {
                address: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789".parse()?,
                topics: vec![
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef".parse()?,
                    "0x000000000000000000000000fbd80fe5ce1ece895845fd131bd621e2b6a1345f".parse()?,
                    "0x000000000000000000000000e8a0e8466df96ec769a02adaa969abe67c70ec68".parse()?
                ],
                data: "0x00000000000000000000000000000000000000000000000000000000000493e0".parse()?,
                ..Default::default()
            }
        ],
        value: None,
        gas_limit: u64::MAX,
        // Tx was on 13704035
        block_number: Some(51517461)
    };

    // Parse the command line arguments
    let args = InterpreterArgs::parse_from([""]);

    // Run the interpreter
    let res = args.run_interpretation(request).await?;

    assert!(res.success);

    insta::assert_debug_snapshot!(res);

    Ok(())
}
