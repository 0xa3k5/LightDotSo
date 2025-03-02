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

import type { LifiQuotePageData } from "@lightdotso/data";
import { type Result, ResultAsync, err, ok } from "neverthrow";
import type { ClientType } from "../client";
import { getLifiClient } from "../client";
import type { paths } from "../types/lifi/v1";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type GetLifiQuoteParams = paths["/quote"]["get"]["parameters"];

export type GetLifiQuoteResponse = Promise<
  Result<LifiQuotePageData, Error | unknown | undefined>
>;

// -----------------------------------------------------------------------------
// GET
// -----------------------------------------------------------------------------

export const getLifiQuote = async (
  {
    params,
  }: {
    params: GetLifiQuoteParams;
  },
  clientType?: ClientType,
): GetLifiQuoteResponse => {
  const client = getLifiClient(clientType);

  // @ts-expect-error
  return ResultAsync.fromPromise(
    client.GET("/quote", {
      params: params,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};
