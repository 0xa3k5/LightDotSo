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

import "@lightdotso/styles/keystatic.css";
import { createReader } from "@keystatic/core/reader";
import { NextImage } from "@lightdotso/elements";
import {
  BannerSection,
  BaseLayerWrapper,
  BasicPageWrapper,
  HStackFull,
  minimalHeightWrapper,
} from "@lightdotso/ui";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import keystaticConfig from "~/keystatic.config";

// -----------------------------------------------------------------------------
// Reader
// -----------------------------------------------------------------------------

const reader = createReader(process.cwd(), keystaticConfig);

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  // ---------------------------------------------------------------------------
  // Reader
  // ---------------------------------------------------------------------------

  const changelog = await reader.collections.posts.read(params.slug.join("/"));
  if (!changelog) {
    return notFound();
  }

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    title: changelog.title,
    openGraph: {
      images: changelog.ogp.src,
    },
  };
}

// -----------------------------------------------------------------------------
// Generate
// -----------------------------------------------------------------------------

export async function generateStaticParams() {
  const changelogs = await reader.collections.posts.all();

  return changelogs.map((changelog) => ({
    slug: changelog.slug.split("/"),
  }));
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: { params: { slug: string[] } }) {
  // ---------------------------------------------------------------------------
  // Reader
  // ---------------------------------------------------------------------------

  const changelog = await reader.collections.posts.read(params.slug.join("/"), {
    resolveLinkedFiles: true,
  });
  if (!changelog) {
    return notFound();
  }

  // ---------------------------------------------------------------------------
  // MDX
  // ---------------------------------------------------------------------------

  const { code } = await bundleMDX({
    source: changelog.content,
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <BannerSection
      size="xs"
      title={`Changelog #${changelog.issue} - ${changelog.title}`}
    >
      <HStackFull>
        <BaseLayerWrapper size="xs">
          <BasicPageWrapper className={minimalHeightWrapper}>
            <div className="keystatic">
              {getMDXComponent(code)({
                components: { Image: NextImage },
              })}
            </div>
          </BasicPageWrapper>
        </BaseLayerWrapper>
      </HStackFull>
    </BannerSection>
  );
}
