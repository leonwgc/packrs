## Overview

packrs is a powerful build tool that leverages Rust-based rsbuild as its core to provide a seamless development experience for React projects. It is designed to optimize and simplify the build process, ensuring high performance and ease of use.

## Features

- **Rust-based Core**: Utilizes rsbuild for efficient and fast builds.
- **React Integration**: Out-of-the-box support for React SPA projects.
- **Flexible Configuration**: Easily customize builds with plugins and scripts.
- **Node.js API Only**: packrs only supports Node.js API usage.

##  Why only support Node.js API?

 * Because i want to provide a flexible and customizable API for developers.
 * With the Node.js API, you can use the full power of rsbuild in your project,
 * including the ability to customize the build process and create custom plugins.
 * If i were to support the command line interface, i would have to limit the customization options and make assumptions about the project structure, which would limit the flexibility of the API.



To install packrs, run the following command:

```bash
npm install packrs --save-dev
```

## Usage

### Development Mode

```typescript
const { run } = require('packrs');
const path = require('path');

run({
  banner: 'react-playground',
  index: './src/index',
  dist: './dist/dist',
  port: 9100,
  rsConfig: {
    html: {
      title: 'react-playground',
      meta: {
        description: 'description',
      },
      template: './index.html',
    },
    resolve: {
      aliasStrategy: 'prefer-alias',
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
```

This will continuously watch for changes and rebuild the project automatically.

### Building mode

```typescript
const { build } = require('packrs');
const path = require('path');

build({
  banner: 'react-playground',
  index: './src/index',
  dist: './dist/dist',
  rsConfig: {
    html: {
      title: 'react-playground',
      meta: {
        description: 'description',
      },
      template: './index.html',
    },
    resolve: {
      aliasStrategy: 'prefer-alias',
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
```

This command will execute the build process using rsbuild and output the files to the designated directory.

### Type definitons for run and build api

```typescript
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
  index:
    | string
    | string[]
    | (RsbuildEntryDescription & {
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
```
