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

import type { NftValuationData } from "@lightdotso/data";
import {
  nftWalletValuationsSchema,
  simplehashMainnetChainSchema,
} from "@lightdotso/schemas";
import { type Result, ResultAsync } from "neverthrow";
import type { ClientType } from "../client";
import { getSimplehashClient } from "../client";
import { zodFetch } from "../zod";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type GetNftValuationResponse = Promise<
  Result<
    NftValuationData,
    Error | { BadRequest: string } | { NotFound: string } | undefined
  >
>;

// -----------------------------------------------------------------------------
// GET
// -----------------------------------------------------------------------------

export const getNftValuation = async (
  address: string,
  clientType?: ClientType,
): Promise<GetNftValuationResponse> => {
  const chains = simplehashMainnetChainSchema.options.join(",");

  const headers: HeadersInit = {
    "content-type": "application/json",
  };

  if (clientType === "admin") {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    headers["X-API-KEY"] = process.env.SIMPLEHASH_API_KEY!;
  }

  return ResultAsync.fromPromise(
    zodFetch(
      `${getSimplehashClient()}/v0/nfts/owners/value?chains=${chains}&wallet_addresses=${address}`,
      nftWalletValuationsSchema,
      "GET",
      headers,
    ),
    (err) => {
      if (err instanceof Error) {
        return err;
      }
    },
  );
};
