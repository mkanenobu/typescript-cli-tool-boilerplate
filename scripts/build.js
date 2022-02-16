const build = require("esbuild").build;

const env = process.env.NODE_ENV || "development";

/**
 * @type {{development: import("esbuild").BuildOptions, production: import("esbuild").BuildOptions}}
 */
const paramsByEnv = {
  development: {
    minify: false,
    watch: {
      onRebuild: (error, result) => {
        console.log("Rebuild: ");
        console.log({ error, result });
      },
    },
    outfile: "./dist/dev-index.js",
  },
  production: {
    minify: true,
    outfile: "./dist/index.js",
  },
};

build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  target: "es2020",
  ...paramsByEnv[env],
})
  .then((buildResult) => {
    const { warnings, errors } = buildResult;
    console.log({ warnings, errors });
  })
  .catch(() => process.exit(1));
