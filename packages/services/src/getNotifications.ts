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

import { getNotifications as getClientNotifications } from "@lightdotso/client";
import type { WalletListParams } from "@lightdotso/params";
import "server-only";

// -----------------------------------------------------------------------------
// Pre
// -----------------------------------------------------------------------------

export const preloadGetNotifications = (params: WalletListParams) => {
  void getNotifications(params);
};

// -----------------------------------------------------------------------------
// Service
// -----------------------------------------------------------------------------

export const getNotifications = async (params: WalletListParams) => {
  return getClientNotifications(
    {
      params: {
        query: {
          address: params.address,
          limit: params.limit,
          offset: params.offset,
          user_id: params.user_id,
        },
      },
    },
    "admin",
  );
};
