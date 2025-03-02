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

// Copyright 2023-2024 Vercel, Inc.
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

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const placeholderEvents = [
  {
    date: "2022-10-01",
    headline: "NVIDIA releases new AI-powered graphics card",
    description:
      "NVIDIA unveils the latest graphics card infused with AI capabilities, revolutionizing gaming and rendering experiences.",
  },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const EventsSkeleton = () => {
  return (
    <div className="-mt-2 flex w-full flex-col gap-2 py-4">
      {placeholderEvents.map((event) => (
        <div
          key={event.date}
          className="flex shrink-0 flex-col gap-1 rounded-lg bg-zinc-800 p-4"
        >
          <div className="w-fit rounded-md bg-zinc-700 text-sm text-transparent">
            {event.date}
          </div>
          <div className="w-fit rounded-md bg-zinc-700 text-transparent">
            {event.headline}
          </div>
          <div className="w-auto rounded-md bg-zinc-700 text-transparent">
            {event.description.slice(0, 70)}...
          </div>
        </div>
      ))}
    </div>
  );
};
