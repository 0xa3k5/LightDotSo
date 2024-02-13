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

import { transfersParser } from "@lightdotso/nuqs";
import { getNfts, getTokens } from "@lightdotso/services";
import type { Address } from "viem";
import { handler as addressHandler } from "@/handlers/paths/[address]/handler";
import { validateAddress } from "@/handlers/validators/address";

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

export const handler = async (
  params: { address: string },
  searchParams: {
    transfers?: string;
  },
) => {
  // ---------------------------------------------------------------------------
  // Validators
  // ---------------------------------------------------------------------------

  validateAddress(params.address);

  // ---------------------------------------------------------------------------
  // Parsers
  // ---------------------------------------------------------------------------

  const transfers = transfersParser.parseServerSide(searchParams.transfers);

  // ---------------------------------------------------------------------------
  // Fetch
  // ---------------------------------------------------------------------------

  const { wallet, config, walletSettings } = await addressHandler(params);

  const nftsPromise = getNfts({
    address: params.address as Address,
    limit: Number.MAX_SAFE_INTEGER,
    is_testnet: walletSettings.is_enabled_testnet,
    cursor: null,
  });

  const tokensPromise = getTokens({
    address: params.address as Address,
    offset: 0,
    limit: Number.MAX_SAFE_INTEGER,
    is_testnet: walletSettings.is_enabled_testnet,
    group: false,
    chain_ids: null,
  });

  const [nftsRes, tokensRes] = await Promise.all([nftsPromise, tokensPromise]);

  // ---------------------------------------------------------------------------
  // Parse
  // ---------------------------------------------------------------------------

  return {
    transfers: transfers,
    wallet: wallet,
    config: config,
    walletSettings: walletSettings,
    tokens: tokensRes.unwrapOr([]),
    nfts: nftsRes.unwrapOr([]),
  };
};
