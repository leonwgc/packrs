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
   * The default is `true`.
   */
  dev?: boolean;

  /**
   * Indicates if Less should be used.
   * The default is `true`.
   */
  less: boolean;

  /**
   * Indicates if Sass should be used.
   * The default is `true`.
   */
  sass: boolean;

  /**
   * The entry file for the project. relative path to project e.g. ./src/index.tsx
   */
  index: string | string[] | (RsbuildEntryDescription & { html?: boolean });

  /**
   * The output directory for the project. relative path to project e.g. ./dist
   */
  dist: string;

  /**
   * The port for the dev server., default: 3000
   */
  port?: number;

  /**
   * The proxy setting for the dev server.
   */
  proxy?: ProxyConfig;

  /**
   * The banner text for the project.
   */
  banner?: string;

  /**
   * jsx runtime,  React version before 16.14.0，pls set runtime 'classic'
   * default:automatic
   */
  reactRuntime?: 'automatic' | 'classic';

  /**
   * Rsbuild configuration
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
  dev = true,
  less = true,
  sass = true,
  index,
  dist = './dist',
  port,
  banner = '',
  reactRuntime = 'automatic',
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
        bundlerChain: (chain, { env }) => {
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
 * @description Starts a rspack development server with given configurations.
 * @param {boolean} [less=true] - Whether to support LESS in the project.
 * @param {boolean} [sass=true] - Whether to support Sass in the project.
 * @param {string} [index=''] - Path to the entry file.
 * @param {string} [dist='./dist'] - Path to the output directory.
 * @param {number} [port=3000] - Port to use for the development server.
 * @param {ProxyConfig} [proxy] - Proxy configuration for the development server.
 * @param {string} [banner='web'] - Name to use for the development server.
 * @param {RsbuildConfig} [rsConfig={}] - Additional configuration for rspack.
 */
export async function run({
  less = true,
  sass = true,
  index = '',
  dist = './dist',
  port = 3000,
  reactRuntime,
  proxy,
  banner = '',
  rsConfig = {},
}: Params) {
  const rsbuildInstance = await createRsbuild({
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
      rsConfig,
    }),
  });

  rsbuildInstance.startDevServer();
}

/**
 * @description Executes the build process for the project.
 * @param {boolean} [less=true] - Whether to support LESS in the project.
 * @param {boolean} [sass=true] - Whether to support Sass in the project.
 * @param {string} [index=''] - Path to the entry file.
 * @param {string} [dist='./dist'] - Path to the output directory.
 * @param {string} [reactRuntime='automatic'] - JSX runtime to use.
 * @param {RsbuildConfig} [rsConfig={}] - Additional configuration for rspack.
 */
export async function build({
  less = true,
  sass = true,
  index = '',
  dist = './dist',
  reactRuntime,
  rsConfig = {},
}: Params) {
  const rsbuildInstance = await createRsbuild({
    rsbuildConfig: getBuildConfig({
      dev: false,
      less,
      sass,
      index,
      dist,
      reactRuntime,
      banner: 'build',
      rsConfig,
    }),
  });

  rsbuildInstance.build();
}
