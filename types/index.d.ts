import type { RsbuildConfig, RsbuildEntryDescription, ProxyConfig } from '@rsbuild/core';
type Params = {
    dev?: boolean;
    less: boolean;
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
 * @description start a rspack development server
 * @param {boolean} [dev] - Whether to start the development server
 * @param {boolean} [less] - Whether to support less
 * @param {boolean} [sass] - Whether to support sass
 * @param {string} [index] - path to entry file
 * @param {string} [dist] - path to output directory
 * @param {number} [port] - port to use for the development server
 * @param {ProxyConfig} [proxy] - proxy for the development server
 * @param {string} [banner] - name to use for the development server
 * @param {RsbuildConfig} [rsConfig] - additional configuration for rspack
 */
export declare function run({ less, sass, index, dist, port, reactRuntime, proxy, banner, rsConfig, }: Params): Promise<void>;
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
export declare function build({ less, sass, index, dist, reactRuntime, rsConfig, }: Params): Promise<void>;
export {};
