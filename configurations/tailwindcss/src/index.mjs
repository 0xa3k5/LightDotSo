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

import headlessPlugin from "@headlessui/tailwindcss";
import aspectRatioPlugin from "@tailwindcss/aspect-ratio";
import formsPlugin from "@tailwindcss/forms";
import typographyPlugin from "@tailwindcss/typography";
import animatePlugin from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    "../../apps/ai/app/**/*.{ts,tsx}",
    "../../apps/ai/src/components/**/*.{ts,tsx}",
    "../../apps/app/app/**/*.{ts,tsx}",
    "../../apps/app/src/components/**/*.{ts,tsx}",
    "../../apps/blog/app/**/*.{ts,tsx}",
    "../../apps/blog/content/**/*.mdx",
    "../../apps/blog/src/components/**/*.{ts,tsx}",
    "../../apps/changelog/app/**/*.{ts,tsx}",
    "../../apps/changelog/content/**/*.mdx",
    "../../apps/changelog/src/components/**/*.{ts,tsx}",
    "../../apps/desktop/src/**/*.{ts,tsx}",
    "../../apps/docs/src/**/*.{ts,tsx}",
    "../../apps/explorer/app/**/*.{ts,tsx}",
    "../../apps/explorer/src/components/**/*.{ts,tsx}",
    "../../apps/extension/src/**/*.{ts,tsx}",
    "../../apps/home/app/**/*.{ts,tsx}",
    "../../apps/home/src/components/**/*.{ts,tsx}",
    "../../apps/proposals/app/**/*.{ts,tsx}",
    "../../apps/proposals/content/**/*.mdx",
    "../../apps/proposals/src/components/**/*.{ts,tsx}",
    "../../apps/storybook/.storybook/**/*.{ts,tsx}",
    "../../packages/dialogs/src/**/*.{ts,tsx}",
    "../../packages/elements/src/**/*.{ts,tsx}",
    "../../packages/flow/src/**/*.{ts,tsx}",
    "../../packages/modals/src/**/*.{ts,tsx}",
    "../../packages/states/src/**/*.{ts,tsx}",
    "../../packages/svg/src/**/*.{ts,tsx}",
    "../../packages/tables/src/**/*.{ts,tsx}",
    "../../packages/templates/src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // variables
        background: {
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
          body: "hsl(var(--background-body) / <alpha-value>)",
          overlay: "hsl(var(--background-overlay) / <alpha-value>)",
          strong: "hsl(var(--background-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-weakest) / <alpha-value>)",
        },
        "background-destructive": {
          DEFAULT: "hsl(var(--background-destructive) / <alpha-value>)",
          strong: "hsl(var(--background-destructive-strong) / <alpha-value>)",
          stronger:
            "hsl(var(--background-destructive-stronger) / <alpha-value>)",
          strongest:
            "hsl(var(--background-destructive-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-destructive-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-destructive-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-destructive-weakest) / <alpha-value>)",
        },
        "background-error": {
          DEFAULT: "hsl(var(--background-error) / <alpha-value>)",
          strong: "hsl(var(--background-error-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-error-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-error-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-error-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-error-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-error-weakest) / <alpha-value>)",
        },
        "background-indigo": {
          DEFAULT: "hsl(var(--background-indigo) / <alpha-value>)",
          strong: "hsl(var(--background-indigo-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-indigo-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-indigo-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-indigo-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-indigo-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-indigo-weakest) / <alpha-value>)",
        },
        "background-info": {
          DEFAULT: "hsl(var(--background-info) / <alpha-value>)",
          strong: "hsl(var(--background-info-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-info-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-info-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-info-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-info-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-info-weakest) / <alpha-value>)",
        },
        "background-body-inverse": {
          DEFAULT: "hsl(var(--background-body-inverse) / <alpha-value>)",
          strong: "hsl(var(--background-body-inverse-strong) / <alpha-value>)",
          stronger:
            "hsl(var(--background-body-inverse-stronger) / <alpha-value>)",
          strongest:
            "hsl(var(--background-body-inverse-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-body-inverse-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-body-inverse-weaker) / <alpha-value>)",
          weakest:
            "hsl(var(--background-body-inverse-weakest) / <alpha-value>)",
        },
        "background-inverse": {
          DEFAULT: "hsl(var(--background-inverse) / <alpha-value>)",
          strong: "hsl(var(--background-inverse-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-inverse-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-inverse-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-inverse-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-inverse-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-inverse-weakest) / <alpha-value>)",
        },
        "background-neutral": {
          DEFAULT: "hsl(var(--background-neutral) / <alpha-value>)",
          strong: "hsl(var(--background-neutral-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-neutral-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-neutral-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-neutral-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-neutral-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-neutral-weakest) / <alpha-value>)",
        },
        "background-pink": {
          DEFAULT: "hsl(var(--background-pink) / <alpha-value>)",
          strong: "hsl(var(--background-pink-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-pink-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-pink-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-pink-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-pink-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-pink-weakest) / <alpha-value>)",
        },
        "background-primary": {
          DEFAULT: "hsl(var(--background-primary) / <alpha-value>)",
          strong: "hsl(var(--background-primary-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-primary-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-primary-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-primary-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-primary-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-primary-weakest) / <alpha-value>)",
        },
        "background-purple": {
          DEFAULT: "hsl(var(--background-purple) / <alpha-value>)",
          strong: "hsl(var(--background-purple-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-purple-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-purple-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-purple-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-purple-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-purple-weakest) / <alpha-value>)",
        },
        "background-success": {
          DEFAULT: "hsl(var(--background-success) / <alpha-value>)",
          strong: "hsl(var(--background-success-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-success-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-success-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-success-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-success-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-success-weakest) / <alpha-value>)",
        },
        "background-warning": {
          DEFAULT: "hsl(var(--background-warning) / <alpha-value>)",
          strong: "hsl(var(--background-warning-strong) / <alpha-value>)",
          stronger: "hsl(var(--background-warning-stronger) / <alpha-value>)",
          strongest: "hsl(var(--background-warning-strongest) / <alpha-value>)",
          weak: "hsl(var(--background-warning-weak) / <alpha-value>)",
          weaker: "hsl(var(--background-warning-weaker) / <alpha-value>)",
          weakest: "hsl(var(--background-warning-weakest) / <alpha-value>)",
        },
        border: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
          strong: "hsl(var(--border-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-weakest) / <alpha-value>)",
        },
        "border-destructive": {
          DEFAULT: "hsl(var(--border-destructive) / <alpha-value>)",
          strong: "hsl(var(--border-destructive-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-destructive-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-destructive-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-destructive-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-destructive-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-destructive-weakest) / <alpha-value>)",
        },
        "border-error": {
          DEFAULT: "hsl(var(--border-error) / <alpha-value>)",
          strong: "hsl(var(--border-error-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-error-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-error-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-error-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-error-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-error-weakest) / <alpha-value>)",
        },
        "border-indigo": {
          DEFAULT: "hsl(var(--border-indigo) / <alpha-value>)",
          strong: "hsl(var(--border-indigo-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-indigo-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-indigo-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-indigo-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-indigo-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-indigo-weakest) / <alpha-value>)",
        },
        "border-info": {
          DEFAULT: "hsl(var(--border-info) / <alpha-value>)",
          strong: "hsl(var(--border-info-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-info-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-info-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-info-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-info-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-info-weakest) / <alpha-value>)",
        },
        "border-inverse": {
          DEFAULT: "hsl(var(--border-inverse) / <alpha-value>)",
          strong: "hsl(var(--border-inverse-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-inverse-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-inverse-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-inverse-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-inverse-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-inverse-weakest) / <alpha-value>)",
        },
        "border-neutral": {
          DEFAULT: "hsl(var(--border-neutral) / <alpha-value>)",
          strong: "hsl(var(--border-neutral-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-neutral-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-neutral-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-neutral-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-neutral-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-neutral-weakest) / <alpha-value>)",
        },
        "border-pink": {
          DEFAULT: "hsl(var(--border-pink) / <alpha-value>)",
          strong: "hsl(var(--border-pink-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-pink-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-pink-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-pink-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-pink-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-pink-weakest) / <alpha-value>)",
        },
        "border-primary": {
          DEFAULT: "hsl(var(--border-primary) / <alpha-value>)",
          strong: "hsl(var(--border-primary-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-primary-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-primary-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-primary-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-primary-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-primary-weakest) / <alpha-value>)",
        },
        "border-purple": {
          DEFAULT: "hsl(var(--border-purple) / <alpha-value>)",
          strong: "hsl(var(--border-purple-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-purple-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-purple-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-purple-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-purple-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-purple-weakest) / <alpha-value>)",
        },
        "border-success": {
          DEFAULT: "hsl(var(--border-success) / <alpha-value>)",
          strong: "hsl(var(--border-success-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-success-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-success-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-success-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-success-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-success-weakest) / <alpha-value>)",
        },
        "border-warning": {
          DEFAULT: "hsl(var(--border-warning) / <alpha-value>)",
          strong: "hsl(var(--border-warning-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-warning-stronger) / <alpha-value>)",
          strongest: "hsl(var(--border-warning-strongest) / <alpha-value>)",
          weak: "hsl(var(--border-warning-weak) / <alpha-value>)",
          weaker: "hsl(var(--border-warning-weaker) / <alpha-value>)",
          weakest: "hsl(var(--border-warning-weakest) / <alpha-value>)",
        },
        "data-visualization": {
          DEFAULT: "hsl(var(--data-visualization-1) / <alpha-value>)",
          2: "hsl(var(--data-visualization-2) / <alpha-value>)",
          3: "hsl(var(--data-visualization-3) / <alpha-value>)",
          4: "hsl(var(--data-visualization-4) / <alpha-value>)",
          5: "hsl(var(--data-visualization-5) / <alpha-value>)",
          6: "hsl(var(--data-visualization-6) / <alpha-value>)",
          7: "hsl(var(--data-visualization-7) / <alpha-value>)",
          8: "hsl(var(--data-visualization-8) / <alpha-value>)",
          9: "hsl(var(--data-visualization-9) / <alpha-value>)",
          10: "hsl(var(--data-visualization-10) / <alpha-value>)",
        },
        text: {
          DEFAULT: "hsl(var(--text) / <alpha-value>)",
          strong: "hsl(var(--text-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-weakest) / <alpha-value>)",
        },
        "text-destructive": {
          DEFAULT: "hsl(var(--text-destructive) / <alpha-value>)",
          strong: "hsl(var(--text-destructive-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-destructive-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-destructive-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-destructive-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-destructive-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-destructive-weakest) / <alpha-value>)",
        },
        "text-error": {
          DEFAULT: "hsl(var(--text-error) / <alpha-value>)",
          strong: "hsl(var(--text-error-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-error-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-error-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-error-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-error-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-error-weakest) / <alpha-value>)",
        },
        "text-icon": {
          DEFAULT: "hsl(var(--text-icon) / <alpha-value>)",
          error: "hsl(var(--text-icon-error) / <alpha-value>)",
          info: "hsl(var(--text-icon-info) / <alpha-value>)",
          inverse: "hsl(var(--text-icon-inverse) / <alpha-value>)",
          success: "hsl(var(--text-icon-success) / <alpha-value>)",
          warning: "hsl(var(--text-icon-warning) / <alpha-value>)",
          weak: "hsl(var(--text-icon-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-icon-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-icon-weakest) / <alpha-value>)",
        },
        "text-indigo": {
          DEFAULT: "hsl(var(--text-indigo) / <alpha-value>)",
          strong: "hsl(var(--text-indigo-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-indigo-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-indigo-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-indigo-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-indigo-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-indigo-weakest) / <alpha-value>)",
        },
        "text-info": {
          DEFAULT: "hsl(var(--text-info) / <alpha-value>)",
          strong: "hsl(var(--text-info-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-info-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-info-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-info-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-info-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-info-weakest) / <alpha-value>)",
        },
        "text-inverse": {
          DEFAULT: "hsl(var(--text-inverse) / <alpha-value>)",
          strong: "hsl(var(--text-inverse-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-inverse-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-inverse-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-inverse-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-inverse-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-inverse-weakest) / <alpha-value>)",
        },
        "text-link": {
          DEFAULT: "hsl(var(--text-link) / <alpha-value>)",
          strong: "hsl(var(--text-link-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-link-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-link-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-link-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-link-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-link-weakest) / <alpha-value>)",
        },
        "text-link-destructive": {
          DEFAULT: "hsl(var(--text-link-destructive) / <alpha-value>)",
          strong: "hsl(var(--text-link-destructive-strong) / <alpha-value>)",
          stronger:
            "hsl(var(--text-link-destructive-stronger) / <alpha-value>)",
          strongest:
            "hsl(var(--text-link-destructive-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-link-destructive-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-link-destructive-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-link-destructive-weakest) / <alpha-value>)",
        },
        "text-pink": {
          DEFAULT: "hsl(var(--text-pink) / <alpha-value>)",
          strong: "hsl(var(--text-pink-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-pink-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-pink-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-pink-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-pink-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-pink-weakest) / <alpha-value>)",
        },
        "text-primary": {
          DEFAULT: "hsl(var(--text-primary) / <alpha-value>)",
          strong: "hsl(var(--text-primary-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-primary-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-primary-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-primary-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-primary-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-primary-weakest) / <alpha-value>)",
        },
        "text-purple": {
          DEFAULT: "hsl(var(--text-purple) / <alpha-value>)",
          strong: "hsl(var(--text-purple-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-purple-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-purple-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-purple-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-purple-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-purple-weakest) / <alpha-value>)",
        },
        "text-success": {
          DEFAULT: "hsl(var(--text-success) / <alpha-value>)",
          strong: "hsl(var(--text-success-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-success-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-success-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-success-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-success-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-success-weakest) / <alpha-value>)",
        },
        "text-warning": {
          DEFAULT: "hsl(var(--text-warning) / <alpha-value>)",
          strong: "hsl(var(--text-warning-strong) / <alpha-value>)",
          stronger: "hsl(var(--text-warning-stronger) / <alpha-value>)",
          strongest: "hsl(var(--text-warning-strongest) / <alpha-value>)",
          weak: "hsl(var(--text-warning-weak) / <alpha-value>)",
          weaker: "hsl(var(--text-warning-weaker) / <alpha-value>)",
          weakest: "hsl(var(--text-warning-weakest) / <alpha-value>)",
        },
        // light mode
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229", // custom
            muted: "#172554", // blue-950
            subtle: "#1e40af", // blue-800
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#60a5fa", // blue-400
            inverted: "#030712", // gray-950
          },
          background: {
            muted: "#131A2B", // custom
            subtle: "#1f2937", // gray-800
            // DEFAULT: "#111827", // gray-900
            DEFAULT: "black",
            emphasis: "#d1d5db", // gray-300
          },
          border: {
            DEFAULT: "#1f2937", // gray-800
          },
          ring: {
            DEFAULT: "#1f2937", // gray-800
          },
          content: {
            subtle: "#4b5563", // gray-600
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#e5e7eb", // gray-200
            strong: "#f9fafb", // gray-50
            inverted: "#000000", // black
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      fontSize: {
        "2xs": ".6875rem",
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      maxWidth: {
        container: "80rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
        display: "var(--font-mona-sans)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 4.8s linear infinite",
        grid: "grid 15s linear infinite",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      opacity: {
        2.5: "0.025",
        7.5: "0.075",
        15: "0.15",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    headlessPlugin,
    animatePlugin,
    aspectRatioPlugin,
    formsPlugin,
    typographyPlugin,
  ],
};
