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

import {
  type GetUserOperationResponse,
  getUserOperation as getClientUserOperation,
} from "@lightdotso/client";
import type { UserOperationGetParams } from "@lightdotso/params";
import { cache } from "react";
import "server-only";

// -----------------------------------------------------------------------------
// Pre
// -----------------------------------------------------------------------------

export const preloadGetUserOperation = (params: UserOperationGetParams) => {
  void getUserOperation(params);
};

// -----------------------------------------------------------------------------
// Service
// -----------------------------------------------------------------------------

export const getUserOperation = async (
  params: UserOperationGetParams,
): GetUserOperationResponse => {
  return await getClientUserOperation(
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    { params: { query: { user_operation_hash: params.hash! } } },
    "admin",
  );
};

// -----------------------------------------------------------------------------
// Cache
// -----------------------------------------------------------------------------

export const getCachedUserOperation = cache(getUserOperation);
