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

import OriginalPage from "@/app/(wallet)/[address]/overview/nfts/page";
import { DEMO_WALLET_ADDRESS } from "@/const";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface PageProps {
  searchParams: {
    pagination?: string;
  };
}

// -----------------------------------------------------------------------------
// Original Page
// -----------------------------------------------------------------------------

export default async function Page({ searchParams }: PageProps) {
  return OriginalPage({
    params: { address: DEMO_WALLET_ADDRESS },
    searchParams: searchParams,
  });
}
