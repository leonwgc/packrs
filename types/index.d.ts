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
    index: string | string[] | (RsbuildEntryDescription & {
        html?: boolean;
    });
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
export declare function run({ less, sass, index, dist, port, reactRuntime, proxy, banner, rsConfig, }: Params): Promise<void>;
/**
 * @description Executes the build process for the project.
 * @param {boolean} [less=true] - Whether to support LESS in the project.
 * @param {boolean} [sass=true] - Whether to support Sass in the project.
 * @param {string} [index=''] - Path to the entry file.
 * @param {string} [dist='./dist'] - Path to the output directory.
 * @param {string} [reactRuntime='automatic'] - JSX runtime to use.
 * @param {RsbuildConfig} [rsConfig={}] - Additional configuration for rspack.
 */
export declare function build({ less, sass, index, dist, reactRuntime, rsConfig, }: Params): Promise<void>;
export {};
