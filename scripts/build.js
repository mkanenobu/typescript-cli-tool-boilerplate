const build = require("esbuild").build;

const availableEnvValues = ["development", "production", "test"];
const env = availableEnvValues.includes(process.env.NODE_ENV)
  ? process.env.NODE_ENV
  : "development";

/**
 * @type {{development: import("esbuild").BuildOptions, production: import("esbuild").BuildOptions}}
 */
const paramsByEnv = {
  development: {
    watch: {
      onRebuild: (error, result) => {
        console.log("Rebuild: ", { error, result });
      },
    },
    sourcemap: true,
    outfile: "./dist/dev-index.js",
  },
  production: {
    outfile: "./dist/index.js",
  },
};

build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify: false,
  platform: "node",
  external: ["./node_modules/*"],
  target: "node10",
  ...paramsByEnv[env],
})
  .then((buildResult) => {
    const { warnings, errors } = buildResult;
    console.log({ warnings, errors });
  })
  .catch(() => process.exit(1));
