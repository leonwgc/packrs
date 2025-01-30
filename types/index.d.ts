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
    index?: string | string[] | (RsbuildEntryDescription & {
        html?: boolean;
    });
    /**
     * The output directory for the project.
     * The default is `./dist`.
     */
    dist?: string;
    /**
     * The port for the dev server., default: 3000
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
     * default:automatic
     */
    reactRuntime?: 'automatic' | 'classic';
    /**
     * Rsbuild configuration. please refer to https://rsbuild.dev/config/
     */
    rsConfig?: RsbuildConfig;
};
/**
 * Executes the dev process for the project.
 * @param {Params} [config={}] - Configuration parameters for the dev process.
 */
export declare function run(config: Params): Promise<void>;
/**
 * Executes the build process for the project.
 * @param {Params} [config={}] - Configuration parameters for the build process.
 */
export declare function build(config: Params): Promise<void>;
export {};
