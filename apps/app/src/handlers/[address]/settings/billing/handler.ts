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

import { handler as addressHandler } from "@/handlers/[address]/handler";
import { getCachedWalletBilling } from "@lightdotso/services";
import { validateAddress } from "@lightdotso/validators";
import { Result } from "neverthrow";
import { notFound } from "next/navigation";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

export const handler = async (params: { address: string }) => {
  // ---------------------------------------------------------------------------
  // Validators
  // ---------------------------------------------------------------------------

  if (!validateAddress(params.address)) {
    return notFound();
  }

  // ---------------------------------------------------------------------------
  // Fetch
  // ---------------------------------------------------------------------------

  const { wallet, config, walletSettings } = await addressHandler(params);

  const walletBillingPromise = getCachedWalletBilling({
    address: params.address as Address,
  });

  // eslint-disable-next-line unicorn/no-single-promise-in-promise-methods
  const [walletBilling] = await Promise.all([walletBillingPromise]);

  // ---------------------------------------------------------------------------
  // Parse
  // ---------------------------------------------------------------------------

  const res = Result.combineWithAllErrors([walletBilling]);

  return res.match(
    ([walletBilling]) => {
      return {
        wallet: wallet,
        config: config,
        walletSettings: walletSettings,
        walletBilling: walletBilling,
      };
    },
    () => {
      return {
        wallet: wallet,
        config: config,
        walletSettings: walletSettings,
        walletBilling: {
          id: "",
        },
      };
    },
  );
};
