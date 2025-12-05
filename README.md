# packrs

[English](./README.en.md) | [中文](./README.md)

## 安装

```bash
npm install packrs --save-dev
yarn add -D packrs
```

## 概述

packrs 是一个基于 Rust 的构建工具，旨在简化 React 项目的开发流程。它利用 rsbuild 来优化和简化构建过程。

## 特性

- **高效构建**: 由 rsbuild 驱动，性能快速
- **React 支持**: 内置支持 React 单页应用
- **可定制**: 通过插件和脚本定制构建流程
- **Node.js API**: 专注于 Node.js API 使用

## 使用方法

#### 开发模式

```typescript
const { run } = require('packrs');

run({
  index: './src/index',
  dist: './dist',
});
```

这将持续监听文件变化并自动重新构建项目。

#### 生产模式

```typescript
const { build } = require('packrs');

build({
  index: './src/index',
  dist: './dist',
});
```

#### 更真实的配置示例

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
      aliasStrategy: 'prefer-tsconfig', // 使用 tsconfig 中 paths 定义的别名
    },
  },
});
```

此命令将使用 rsbuild 执行构建过程，并将文件输出到指定目录。

## 为什么只支持 Node.js API？

为了提供灵活且可定制的 API，packrs 仅支持 Node.js API。这允许充分利用 rsbuild 的能力，支持自定义构建过程和插件。CLI 方式会限制定制性，并需要对项目结构做出假设，从而降低 API 的灵活性。

## 类型定义

```typescript
type Params = {
    /**
     * 是否使用 Less
     * 默认为 `true`
     */
    less?: boolean;
    /**
     * 是否使用 Sass
     * 默认为 `true`
     */
    sass?: boolean;
    /**
     * 项目入口文件，相对于项目的路径
     * 默认为 `./src/index`
     */
    index?: string | string[] | (RsbuildEntryDescription & {
        html?: boolean;
    });
    /**
     * 项目输出目录
     * 默认为 `./dist`
     */
    dist?: string;
    /**
     * 开发服务器端口
     * 默认为 3000
     */
    port?: number;
    /**
     * 开发服务器代理设置
     */
    proxy?: ProxyConfig;
    /**
     * Banner 文本
     */
    banner?: string;
    /**
     * jsx 运行时，React 16.14.0 之前的版本请设置为 'classic'
     * 默认为 automatic
     */
    reactRuntime?: 'automatic' | 'classic';
    /**
     * Rsbuild 配置，请参考 https://rsbuild.dev/config/
     */
    rsConfig?: RsbuildConfig;
};
```

更多详细配置请参考 [rsbuild 在线文档](https://rsbuild.dev/config/index)
