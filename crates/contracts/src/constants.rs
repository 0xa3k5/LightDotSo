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

#![allow(clippy::unwrap_used)]

use ethers::types::Address;
use lazy_static::lazy_static;

// The paymaster addresses
lazy_static! {
    #[derive(Debug)]
    pub static ref LIGHT_PAYMASTER_ADDRESSES: [Address; 3] = [
      // v1 (Fallback)
      "0x000000000018d32DF916ff115A25fbeFC70bAf8b".parse().unwrap(),
      // v2
      "0x000000000003193FAcb32D1C120719892B7AE977".parse().unwrap(),
      // v3
      "0x000000000054230BA02ADD2d96fA4362A8606F97".parse().unwrap(),
    ];
}

// The factory addresses
lazy_static! {
    pub static ref LIGHT_WALLET_FACTORY_ADDRESSES: [Address; 5] = [
      // Local
      "0x262aD6Becda7CE4B047a3130491978A8f35F9aeC".parse().unwrap(),
      // v0.0.0
      "0x63CBfA247a2c1043892c7cEB4C21d1d8BC71Ffab".parse().unwrap(),
      // v0.0.1
      "0x426Ff63A09eFa1E7ccb3517E046956346e311881".parse().unwrap(),
      // v0.1.0
      "0x0000000000756D3E6464f5efe7e413a0Af1C7474".parse().unwrap(),
      // v0.2.0
      "0x00000000001269b052C004FFB71B47AB22C898B0".parse().unwrap(),
    ];
}

// The factory addresses
lazy_static! {
    #[derive(Debug)]
    pub static ref LIGHT_WALLET_FACTORY_V010_ADDRESS: Address =
      // v0.1.0
      "0x0000000000756D3E6464f5efe7e413a0Af1C7474".parse().unwrap();
}

// The factory addresses
lazy_static! {
    #[derive(Debug)]
    pub static ref LIGHT_WALLET_FACTORY_ADDRESS: Address =
      // v0.2.0
      "0x00000000001269b052C004FFB71B47AB22C898B0".parse().unwrap();
}

// The factory implementation addresses
lazy_static! {
    #[derive(Debug)]
    pub static ref LIGHT_WALLET_FACTORY_IMPLEMENTATION_V010_ADDRESS: Address =
      // v0.1.0
      "0x8fb3cfdf2082c2be7d3205d361067748ea1abf63".parse().unwrap();
}

// The factory implementation addresses
lazy_static! {
    #[derive(Debug)]
    pub static ref LIGHT_WALLET_FACTORY_IMPLEMENTATION_ADDRESS: Address =
      // v0.2.0
      "0x040d53c5dde1762f7cac48d5467e88236d4873d7".parse().unwrap();
}

// The example wallet addresses
lazy_static! {
    #[derive(Debug)]
    pub static ref LIGHT_WALLET_EXAMPLE_ADDRESS: Address =
      // v0.1.0
      "0x10DbbE70128929723c1b982e53c51653232e4Ff2".parse().unwrap();
}

// The entrypoint addresses
lazy_static! {
    #[derive(Debug)]
    pub static ref ENTRYPOINT_V060_ADDRESS: Address =
      // v0.6.0
      "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789".parse().unwrap();
}

// The alchemy v0.6.0 gas manager address
// From: https://docs.alchemy.com/reference/gas-manager-deployment-addresses
lazy_static! {
    #[derive(Debug)]
    pub static ref ALCHEMY_V060_GAS_MANAGER_ADDRESS: Address =
      "0x4Fd9098af9ddcB41DA48A1d78F91F1398965addc".parse().unwrap();
}

#[cfg(test)]
mod tests {
    use ethers::utils::to_checksum;

    use super::*;

    #[test]
    fn test_light_paymaster_address() {
        assert_eq!(
            format!("{:?}", LIGHT_PAYMASTER_ADDRESSES[0]),
            "0x000000000018d32df916ff115a25fbefc70baf8b".to_string(),
            "The expected and actual paymaster addresses should match"
        );
    }

    #[test]
    fn test_address_to_string() {
        assert_eq!(
            to_checksum(&ENTRYPOINT_V060_ADDRESS, None),
            "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789".to_string(),
        );
    }
}
