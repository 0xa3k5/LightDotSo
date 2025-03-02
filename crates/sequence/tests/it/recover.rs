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

use ethers::utils::hex;
use eyre::Result;
use lightdotso_sequence::{
    recover::recover_signature,
    types::{ECDSASignatureLeaf, ECDSASignatureType, SignatureLeaf},
    utils::{from_hex_string, parse_hex_to_bytes32},
};

// Testnet tx from: https://sepolia.etherscan.io/tx/0x87efb66c2b17af424b7fd2584d268eb1c301b9337eaad3137be5c4c7bbd574bf

pub const FIRST_SIG: &str = "0x0001000000010001783610798879fb9af654e2a99929e00e82c3a0f4288c08bc30266b64dc3e23285d634f6658fdeeb5ba9193b5e935a42a1d9bdf5007144707c9082e6eda5d8fbd1b01";
pub const FIRST_USER_OP_HASH: &str =
    "0x1a8d7c5989225f7ef86fd7844c64b74e04d361734664fa6d2bf307414327875a";
pub const FIRST_WALLET: &str = "0x10dbbe70128929723c1b982e53c51653232e4ff2";
pub const FIRST_IMAGE_HASH: &str =
    "0xb7f285c774a1c925209bebaab24662b22e7cf32e2f7a412bfcb1bf52294b9ed6";

#[tokio::test(flavor = "multi_thread")]
async fn test_integration_module_first() -> Result<()> {
    let sig = from_hex_string(FIRST_SIG)?.into();
    let user_op_hash = parse_hex_to_bytes32(FIRST_USER_OP_HASH)?;
    let wallet = FIRST_WALLET.parse()?;
    let image_hash = parse_hex_to_bytes32(FIRST_IMAGE_HASH)?;

    let config = recover_signature(wallet, 11155111, user_op_hash, sig).await?;
    println!("{:?}", config);

    assert_eq!(config.checkpoint, 1);
    assert_eq!(config.threshold, 1);
    assert_eq!(config.weight, 1);
    assert_eq!(config.clone().tree.signer.unwrap().leaf, SignatureLeaf::ECDSASignature(ECDSASignatureLeaf{
      address: "0x6CA6d1e2D5347Bfab1d91e883F1915560e09129D".parse()?,
      signature_type: ECDSASignatureType::ECDSASignatureTypeEIP712,
      signature: hex::decode("0x783610798879fb9af654e2a99929e00e82c3a0f4288c08bc30266b64dc3e23285d634f6658fdeeb5ba9193b5e935a42a1d9bdf5007144707c9082e6eda5d8fbd1b").unwrap().try_into().unwrap()
    }));
    assert_eq!(config.image_hash_of_wallet_config()?, image_hash);

    Ok(())
}
