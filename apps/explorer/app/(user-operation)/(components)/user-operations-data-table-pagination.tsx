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

"use client";

import { useTables } from "@lightdotso/stores";
import { DataTablePagination } from "@lightdotso/templates";
import { type FC, useEffect } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const UserOperationsDataTablePagination: FC = () => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { userOperationTable } = useTables();

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!useTables.persist.hasHydrated()) {
      useTables.persist.rehydrate();
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!(userOperationTable && useTables.persist.hasHydrated())) {
    return null;
  }

  return <DataTablePagination table={userOperationTable} />;
};
