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

import { useSettings } from "@lightdotso/stores";
import { hashFn } from "@lightdotso/wagmi";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
// import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import dynamic from "next/dynamic";
import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
// import superjson from "superjson";

// -----------------------------------------------------------------------------
// Dynamic
// -----------------------------------------------------------------------------

const ReactQueryDevtoolsProduction = dynamic(() =>
  // @ts-ignore
  import("@tanstack/react-query-devtools/production").then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ReactQueryProviderProps = {
  children: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [queryClient, setQueryClient] = useState<QueryClient | null>(null);

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { isQueryDevToolsOpen, setIsQueryDevToolsOpen } = useSettings();

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // Only set once on initial render
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
      setIsQueryDevToolsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: Number.POSITIVE_INFINITY,
          queryKeyHashFn: hashFn,
        },
        dehydrate: {
          shouldDehydrateQuery: (query) =>
            defaultShouldDehydrateQuery(query) ||
            query.state.status === "pending",
        },
      },
    });

    const persister = createSyncStoragePersister({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient: client,
      persister: persister,
    });

    setQueryClient(client);
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // Ensure that rendering is blocked until useEffect initializes `queryClient`
  if (!queryClient) {
    return null;
  }

  // From: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#streaming-with-server-components
  // Opt-in for non-blocking way to prefetch data, rather than a complex waterfall strategy w/ streaming
  // Ideally, `useQuery` should be coupled with `useSuspenseQuery` to allow for prefetch `use`, but okay for now
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryStreamedHydration transformer={superjson}>
        {children}
      </ReactQueryStreamedHydration> */}
      {isQueryDevToolsOpen && (
        <div className="hidden lg:block">
          <ReactQueryDevtoolsProduction />
        </div>
      )}
    </QueryClientProvider>
  );
};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export { ReactQueryProvider };
