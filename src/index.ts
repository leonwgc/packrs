/**
 * The entry point for the packrs module.
 *
 * This module provides a set of functions for building and running a React
 * application using the rsbuild bundler.
 *
 * The module exports two functions: `build` and `run`. The `build` function
 * takes a set of configuration options and returns a promise that resolves when
 * the build is complete. The `run` function takes a set of configuration
 * options and returns a promise that resolves when the development server is
 * started.
 *
 * The available configuration options are documented below.
 */
import type { ProxyConfig, RsbuildConfig, RsbuildEntryDescription } from '@rsbuild/core';
import { createRsbuild, mergeRsbuildConfig } from '@rsbuild/core';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

/**
 * Parameters for the `build` and `run` functions.
 */
type Params = {
  /**
   * Indicates if the build is in development mode.
   */
  dev?: boolean;

  /**
   * Indicates if Less should be used.
   * The default is `true`.
   */
  less?: boolean;

  /**
   * Indicates if Sass should be used.
   * The default is `true`.
   */
  sass?: boolean;

  /**
   * The entry file for the project. relative path to project.
   * The default is `./src/index`.
   */
  index?: string | string[] | (RsbuildEntryDescription & { html?: boolean });

  /**
   * The output directory for the project.
   * The default is `./dist`.
   */
  dist?: string;

  /**
   * The port for the dev server.
   * The default is 3000
   */
  port?: number;

  /**
   * The proxy setting for the dev server.
   */
  proxy?: ProxyConfig;

  /**
   * The banner text.
   */
  banner?: string;

  /**
   * jsx runtime,  React version before 16.14.0，pls set runtime 'classic'
   * The default is automatic
   */
  reactRuntime?: 'automatic' | 'classic';

  /**
   * Rsbuild configuration. please refer to https://rsbuild.dev/config/
   */
  rsConfig?: RsbuildConfig;
};

/**
 * Generates the build configuration for the project.
 *
 * @param {Params} options - The configuration options for the build.
 * @returns {RsbuildConfig} The rsbuild configuration object.
 */
const getBuildConfig = ({
  dev,
  less,
  sass,
  index,
  dist,
  port,
  banner,
  reactRuntime,
  proxy,
  rsConfig,
}: Params): RsbuildConfig =>
  mergeRsbuildConfig(
    {
      mode: dev ? 'development' : 'production',
      source: {
        entry: {
          index,
        },
      },
      output: {
        cleanDistPath: true,
        distPath: {
          root: dist,
        },
      },
      plugins: [
        pluginReact({
          swcReactOptions: {
            development: dev,
            refresh: dev,
            runtime: reactRuntime,
          },
        }),
        sass ? pluginSass() : undefined,
        less
          ? pluginLess({
              lessLoaderOptions: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            })
          : undefined,
      ].filter(Boolean),
      tools: {
        // tools.bundlerChain will be executed earlier than tools.rspack, so it will be overridden by tools.rspack.
        bundlerChain: (chain) => {
          chain.stats('errors-only');
        },
        rspack: {
          devtool: dev ? 'cheap-module-source-map' : false,
        },
      },
      dev: {
        progressBar: banner
          ? {
              id: banner,
            }
          : false,
        hmr: true,
        client: {
          protocol: 'ws',
          host: '127.0.0.1',
          port: '<port>',
        },
        cliShortcuts: false,
      },
      server: {
        strictPort: true,
        port,
        proxy,
      },
    },
    rsConfig
  );

/**
 * Default parameters for the `build` and `run` functions.
 */
const defaultParams: Params = {
  less: true,
  sass: true,
  index: './src/index',
  dist: './dist',
  reactRuntime: 'automatic',
  rsConfig: {},
};

/**
 * Executes the dev process for the project.
 * @param {Params} [config={}] - Configuration parameters for the dev process.
 */
export async function run(config: Params) {
  const rsbuildInstance = await createRsbuild({
    rsbuildConfig: getBuildConfig({
      ...defaultParams,
      ...config,
      dev: true,
    }),
  });

  rsbuildInstance.startDevServer();
}

/**
 * Executes the build process for the project.
 * @param {Params} [config={}] - Configuration parameters for the build process.
 */
export async function build(config: Params) {
  const rsbuildInstance = await createRsbuild({
    rsbuildConfig: getBuildConfig({
      ...defaultParams,
      ...config,
      dev: false,
    }),
  });

  rsbuildInstance.build();
}
