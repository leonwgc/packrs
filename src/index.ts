import type { RsbuildConfig, RsbuildEntryDescription } from '@rsbuild/core';
import { createRsbuild } from '@rsbuild/core';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import path from 'path';

/**
 * Gets the absolute path of the project directory.
 *
 * @param dir - The relative directory path. Default is './'.
 * @returns The absolute path of the project directory.
 */
const getProjectPath = (dir = './'): string => {
  return path.join(process.cwd(), dir);
};

type Params = {
  // Indicates if the build is in development mode.
  dev?: boolean;

  // Indicates if Less should be used.
  less: boolean;

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
   * The port for the dev server., default:1000
   */
  port?: number;
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
 * @param dev - Indicates if the build is in development mode.
 * @param less - Indicates if Less should be used.
 * @param sass - Indicates if Sass should be used.
 * @param index - The entry file for the project.
 * @param dist - The output directory for the build.
 * @param port - The port for the dev server.
 * @param banner - The banner text for the project.
 * @param reactRuntime - The JSX runtime to use.
 * @param rsConfig - Additional rsbuild configuration.
 * @returns The rsbuild configuration object.
 */
const getBuildConfig = ({
  dev = true,
  less = true,
  sass = true,
  index,
  dist = './dist',
  port,
  banner = 'project',
  reactRuntime = 'automatic',
  rsConfig,
}: Params): RsbuildConfig => ({
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
    rspack: (config, { env }) => {
      if (dev) {
        config.devtool = 'cheap-module-source-map';
        config.stats = 'errors-only';
      } else {
        config.devtool = false;
      }
      return config;
    },
  },
  // Options for local development.
  dev: dev
    ? {
        progressBar: {
          id: banner,
        },
        hmr: true,
        cliShortcuts: false,
        ...(rsConfig.dev || {}),
      }
    : undefined,
  server: {
    strictPort: true,
    port,
  },
  ...rsConfig,
});

/**
 * @description start a rspack development server
 * @param {boolean} [dev] - Whether to start the development server
 * @param {boolean} [less] - Whether to support less
 * @param {boolean} [sass] - Whether to support sass
 * @param {string} [index] - path to entry file
 * @param {string} [dist] - path to output directory
 * @param {number} [port] - port to use for the development server
 * @param {string} [banner] - name to use for the development server
 * @param {RsbuildConfig} [rsConfig] - additional configuration for rspack
 */
export async function run({
  less = true,
  sass = true,
  index = '',
  dist = './dist',
  port = 1000,
  reactRuntime,
  banner = 'project',
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
      banner,
      rsConfig,
    }),
  });

  rsbuildInstance.startDevServer();
}

/**
 * @description Executes the build process for the project.
 * @param {boolean} [less] - Whether to include Less support.
 * @param {boolean} [sass] - Whether to include Sass support.
 * @param {string} [index] - Path to the entry file.
 * @param {string} [dist] - Path to the output directory.
 * @param {string} [reactRuntime] - JSX runtime to use.
 * @param {string} [banner] - Banner text for the project.
 * @param {RsbuildConfig} [rsConfig] - Additional rsbuild configuration.
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
