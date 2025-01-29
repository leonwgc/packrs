var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var index_exports = {};
__export(index_exports, {
  build: () => build,
  run: () => run
});
module.exports = __toCommonJS(index_exports);
var import_core = require("@rsbuild/core");
var import_plugin_less = require("@rsbuild/plugin-less");
var import_plugin_react = require("@rsbuild/plugin-react");
var import_plugin_sass = require("@rsbuild/plugin-sass");
var getBuildConfig = ({
  dev = true,
  less = true,
  sass = true,
  index,
  dist = "./dist",
  port,
  banner = "",
  reactRuntime = "automatic",
  proxy,
  rsConfig
}) => (0, import_core.mergeRsbuildConfig)(
  {
    mode: dev ? "development" : "production",
    source: {
      entry: {
        index
      }
    },
    output: {
      cleanDistPath: true,
      distPath: {
        root: dist
      }
    },
    plugins: [
      (0, import_plugin_react.pluginReact)({
        swcReactOptions: {
          development: dev,
          refresh: dev,
          runtime: reactRuntime
        }
      }),
      sass ? (0, import_plugin_sass.pluginSass)() : void 0,
      less ? (0, import_plugin_less.pluginLess)({
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }) : void 0
    ].filter(Boolean),
    tools: {
      // tools.bundlerChain will be executed earlier than tools.rspack, so it will be overridden by tools.rspack.
      bundlerChain: (chain, { env }) => {
        chain.stats("errors-only");
      },
      rspack: {
        devtool: dev ? "cheap-module-source-map" : false
      }
    },
    dev: {
      progressBar: banner ? {
        id: banner
      } : false,
      hmr: true,
      client: {
        protocol: "ws",
        host: "127.0.0.1",
        port: "<port>"
      },
      cliShortcuts: false
    },
    server: {
      strictPort: true,
      port,
      proxy
    }
  },
  rsConfig
);
function run(_0) {
  return __async(this, arguments, function* ({
    less = true,
    sass = true,
    index = "",
    dist = "./dist",
    port = 3e3,
    reactRuntime,
    proxy,
    banner = "",
    rsConfig = {}
  }) {
    const rsbuildInstance = yield (0, import_core.createRsbuild)({
      rsbuildConfig: getBuildConfig({
        dev: true,
        less,
        sass,
        index,
        dist,
        port,
        reactRuntime,
        proxy,
        banner,
        rsConfig
      })
    });
    rsbuildInstance.startDevServer();
  });
}
function build(_0) {
  return __async(this, arguments, function* ({
    less = true,
    sass = true,
    index = "",
    dist = "./dist",
    reactRuntime,
    rsConfig = {}
  }) {
    const rsbuildInstance = yield (0, import_core.createRsbuild)({
      rsbuildConfig: getBuildConfig({
        dev: false,
        less,
        sass,
        index,
        dist,
        reactRuntime,
        banner: "build",
        rsConfig
      })
    });
    rsbuildInstance.build();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  build,
  run
});
