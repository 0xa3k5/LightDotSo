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

"use client";

import { InvokeButton } from "@lightdotso/elements";
import {
  useMutationQueueUserOperation,
  useMutationUserOperationSend,
  useQueryUserOperation,
} from "@lightdotso/query";
import type { FC } from "react";
import type { Address, Hex } from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface OpInvokeButtonProps {
  address: Address;
  userOperationHash: Hex;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const OpInvokeButton: FC<OpInvokeButtonProps> = ({
  address,
  userOperationHash,
}) => {
  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { queueUserOperation, isLoadingQueueUserOperation } =
    useMutationQueueUserOperation({
      address: userOperationHash,
    });

  const { userOperation } = useQueryUserOperation({
    hash: userOperationHash,
  });

  const { userOperationSend } = useMutationUserOperationSend({
    address,
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <InvokeButton
      isLoading={isLoadingQueueUserOperation}
      onClick={() => {
        queueUserOperation({ hash: userOperationHash });

        if (userOperation) {
          userOperationSend(userOperation);
        }
      }}
    />
  );
};
