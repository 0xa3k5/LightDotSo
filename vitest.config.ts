import { vitePluginEvmts } from "@evmts/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), vitePluginEvmts()],

  // coverage: {
  //   provider: "custom",
  //   customProviderModule: "vitest-solidity-coverage",
  // },
});
