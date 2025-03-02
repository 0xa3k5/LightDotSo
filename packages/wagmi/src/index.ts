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

export { hashFn } from "@wagmi/core/query";
export { ConnectKitButton, ConnectKitProvider, useModal } from "connectkit";
export type { State } from "wagmi";
export {
  WagmiProvider,
  useBalance,
  useBytecode,
  useDisconnect,
  useEnsAddress,
  useEnsName,
  cookieStorage,
  cookieToInitialState,
  createStorage,
  serialize,
  useSignMessage,
  useStorageAt,
  useAccount,
  useChainId,
  useConnectors,
  useEstimateGas,
  useEstimateFeesPerGas,
  useEstimateMaxPriorityFeePerGas,
  useReadContract,
  useReadContracts,
  useSendTransaction,
  useSwitchChain,
  useConnectorClient,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

export { publicClient } from "./client";
export { projectId, wagmiConfig } from "./config";
export {
  lightWalletAbi,
  lightWalletFactoryAbi,
  useReadEntryPointGetNonce,
  useReadLightWalletImageHash,
  useReadLightPaymaster,
  useReadLightPaymasterEntryPoint,
  useReadLightPaymasterGetDeposit,
  useReadLightPaymasterGetHash,
  useReadLightPaymasterOwner,
  useReadLightPaymasterParsePaymasterAndData,
  useReadLightPaymasterSenderNonce,
  useReadLightPaymasterVerifyingSigner,
  useReadLightVerifyingPaymaster,
  useReadLightVerifyingPaymasterEntryPoint,
  useReadLightVerifyingPaymasterGetDeposit,
  useReadLightVerifyingPaymasterGetHash,
  useReadLightVerifyingPaymasterOwner,
  useReadLightVerifyingPaymasterParsePaymasterAndData,
  useReadLightVerifyingPaymasterSenderNonce,
  useReadLightVerifyingPaymasterVerifyingSigner,
} from "./generated";
