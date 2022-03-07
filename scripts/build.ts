import { build, BuildOptions } from "esbuild";
import packageJson from "../package.json";

class BuildScript {
  constructor() {
    const options = this.optionsByEnv[this.getEnv()];
    this.build(options);
  }

  getEnv = (): "development" | "production" =>
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development"
      ? process.env.NODE_ENV
      : "development";

  optionsByEnv: { development: BuildOptions; production: BuildOptions } = {
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

  build = (options: BuildOptions): void => {
    build({
      entryPoints: [packageJson.main],
      bundle: true,
      minify: false,
      platform: "node",
      external: ["./node_modules/*"],
      target: "node10",
      ...options,
    })
      .then((buildResult) => {
        const { warnings, errors } = buildResult;
        console.log({ warnings, errors });
      })
      .catch(() => process.exit(1));
  };
}

new BuildScript();
