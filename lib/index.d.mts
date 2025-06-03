import * as _rspack_core from '@rspack/core';
import { RsbuildEntryDescription, ProxyConfig, RsbuildConfig } from '@rsbuild/core';

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
 * Executes the dev process for the project.
 * @param {Params} [config={}] - Configuration parameters for the dev process.
 */
declare function run(config: Params): Promise<void>;
/**
 * Executes the build process for the project.
 * @param {Params} [config={}] - Configuration parameters for the build process.
 */
declare function build(config: Params): Promise<{
    close: () => Promise<void>;
    stats?: _rspack_core.Stats | _rspack_core.MultiStats;
}>;

export { build, run };
