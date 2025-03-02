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

import { DataTableToolbar } from "@/app/(wallet)/[address]/activity/(components)/data-table/data-table-toolbar";
import { useAuth, useTables } from "@lightdotso/stores";
import { type FC, useEffect } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const ActivityDataTableToolbar: FC = () => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { sessionId } = useAuth();
  const { activityTable } = useTables();

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!useTables.persist.hasHydrated()) {
      useTables.persist.rehydrate();
    }
  }, [sessionId]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!(sessionId && activityTable && useTables.persist.hasHydrated())) {
    return null;
  }

  return <DataTableToolbar table={activityTable} />;
};
