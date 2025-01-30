## Installation

```bash
npm install packrs --save-dev
yarn add -D packrs
```

## Overview

packrs is a Rust-based build tool that streamlines development for React projects. It leverages rsbuild to optimize and simplify the build process.

## Features

- **Efficient Builds**: Powered by rsbuild for fast performance.
- **React Support**: Built-in support for React SPAs.
- **Customizable**: Tailor builds with plugins and scripts.
- **Node.js API**: Exclusively supports Node.js API usage.

## Usage

#### Development Mode

```typescript
const { run } = require('packrs');

run({
  index: './src/index',
  dist: './dist',
});
```

This will continuously watch for changes and rebuild the project automatically.

#### Production mode

```typescript
const { build } = require('packrs');

build({
  index: './src/index',
  dist: './dist',
});
```

#### a more realistic config

```js
const { run } = require('packrs');

run({
  banner: 'build',
  index: ['eventsource-polyfill', './src/index'],
  dist: './dist',
  port: 9001,
  proxy: [
    {
      context: ['/api'],
      target: 'https://google.qa.xxx-test.com/',
      changeOrigin: true,
    },
  ],
  rsConfig: {
    html: {
      template: './index.html',
      favicon: './src/assets/icons/favicon.ico',
    },
    resolve: {
      aliasStrategy: 'prefer-tsconfig', // alias defined in tsconfig's paths
    },
  },
});
```

This command will execute the build process using rsbuild and output the files to the designated directory.

## Why only support Node.js API?

To offer a flexible and customizable API, packrs supports only the Node.js API. This allows full use of rsbuild's capabilities, enabling custom build processes and plugins. A CLI would restrict customization and require assumptions about project structure, reducing API flexibility.

## Type definitons

```typescript
type Params = {
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
```

for details configuration please refer to [rsbuild online documentation](https://rsbuild.dev/config/index)
