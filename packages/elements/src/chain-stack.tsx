// Copyright 2023-2024 Light, Inc.
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

"use client";

import { ChainLogo } from "@lightdotso/svg";
import type { FC } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface ChainStackProps {
  chainIds: number[];
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const ChainStack: FC<ChainStackProps> = ({ chainIds }) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex -space-x-1.5 overflow-hidden">
      {chainIds &&
        chainIds
          .slice(0, 5)
          .map(chainId => (
            <ChainLogo
              key={chainId}
              chainId={chainId}
              className="size-6 rounded-lg bg-border"
            />
          ))}
    </div>
  );
};
