<div align="center">
  <h1>⚡ packrs</h1>
  <p><strong>基于 Rust 的高性能 React 构建工具</strong></p>
  <p>
    <a href="./README.en.md">English</a> |
    <a href="./README.md">中文</a>
  </p>
  <p>
    <img src="https://img.shields.io/npm/v/packrs?style=flat-square&color=00a8f0" alt="npm version" />
    <img src="https://img.shields.io/npm/dm/packrs?style=flat-square&color=00a8f0" alt="downloads" />
    <img src="https://img.shields.io/npm/l/packrs?style=flat-square&color=00a8f0" alt="license" />
  </p>
</div>

---

## ✨ 特性

<table>
  <tr>
    <td width="50%">
      <h3>⚡️ 极速构建</h3>
      <p>基于 <a href="https://rsbuild.dev">Rsbuild</a> 和 Rust 构建，编译速度提升 10 倍以上</p>
    </td>
    <td width="50%">
      <h3>🎯 开箱即用</h3>
      <p>零配置启动 React 项目，内置 Less/Sass 支持</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔧 高度可定制</h3>
      <p>完整的 Rsbuild 配置能力，支持自定义插件和构建流程</p>
    </td>
    <td width="50%">
      <h3>📦 轻量设计</h3>
      <p>仅提供 Node.js API，灵活集成到任何构建流程</p>
    </td>
  </tr>
</table>

## 📦 安装

```bash
# npm
npm install packrs --save-dev

# yarn
yarn add -D packrs

# pnpm
pnpm add -D packrs
```

## 🚀 快速开始

### 开发模式

```typescript
const { run } = require('packrs');

run({
  index: './src/index',
  dist: './dist',
});
```

启动开发服务器，支持热更新和快速刷新。

### 生产构建

```typescript
const { build } = require('packrs');

build({
  index: './src/index',
  dist: './dist',
});
```

构建优化后的生产版本。

## 🔧 配置示例

### 完整配置

```typescript
const { run } = require('packrs');

run({
  // 入口文件
  index: ['eventsource-polyfill', './src/index'],

  // 输出目录
  dist: './dist',

  // 开发服务器端口
  port: 9001,

  // 开发服务器代理
  proxy: [
    {
      context: ['/api'],
      target: 'https://api.example.com',
      changeOrigin: true,
    },
  ],

  // 构建横幅
  banner: 'My App v1.0.0',

  // Rsbuild 配置
  rsConfig: {
    html: {
      template: './index.html',
      favicon: './src/assets/favicon.ico',
    },
    resolve: {
      aliasStrategy: 'prefer-tsconfig',
    },
  },
});
```

### 多入口配置

```typescript
const { build } = require('packrs');

build({
  index: {
    main: './src/index',
    admin: './src/admin',
  },
  dist: './dist',
});
```

### 自定义 React 运行时

```typescript
const { run } = require('packrs');

run({
  index: './src/index',
  // React 16.14.0 之前的版本使用 classic
  reactRuntime: 'classic',
});
```

## 📚 API 参考

### `run(params)` / `build(params)`

#### 参数配置

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `index` | `string \| string[] \| RsbuildEntryDescription` | `'./src/index'` | 入口文件路径 |
| `dist` | `string` | `'./dist'` | 输出目录 |
| `port` | `number` | `3000` | 开发服务器端口 |
| `less` | `boolean` | `true` | 是否启用 Less 支持 |
| `sass` | `boolean` | `true` | 是否启用 Sass 支持 |
| `proxy` | `ProxyConfig` | - | 开发服务器代理配置 |
| `banner` | `string` | - | 构建横幅文本 |
| `reactRuntime` | `'automatic' \| 'classic'` | `'automatic'` | JSX 运行时模式 |
| `rsConfig` | `RsbuildConfig` | - | Rsbuild 完整配置 |

### TypeScript 类型定义

```typescript
type Params = {
  /** 是否使用 Less（默认: true） */
  less?: boolean;

  /** 是否使用 Sass（默认: true） */
  sass?: boolean;

  /** 项目入口文件（默认: './src/index'） */
  index?: string | string[] | (RsbuildEntryDescription & { html?: boolean });

  /** 输出目录（默认: './dist'） */
  dist?: string;

  /** 开发服务器端口（默认: 3000） */
  port?: number;

  /** 开发服务器代理设置 */
  proxy?: ProxyConfig;

  /** 构建横幅文本 */
  banner?: string;

  /** JSX 运行时模式（默认: 'automatic'） */
  reactRuntime?: 'automatic' | 'classic';

  /** Rsbuild 配置 */
  rsConfig?: RsbuildConfig;
};
```

## 💡 设计理念

### 为什么只提供 Node.js API？

packrs 专注于提供**灵活且强大**的 Node.js API，而不是传统的 CLI 工具。这种设计带来以下优势：

- **🎯 最大灵活性** - 完全控制构建流程，无需受限于预设配置
- **🔌 无缝集成** - 轻松集成到现有的构建脚本和工作流
- **🚀 充分利用** - 发挥 Rsbuild 的全部能力，支持自定义插件和配置
- **📦 轻量简洁** - 避免 CLI 层的复杂性，保持核心功能简单高效

如果需要 CLI，可以在项目的 `package.json` 中轻松创建自定义脚本：

```json
{
  "scripts": {
    "dev": "node scripts/dev.js",
    "build": "node scripts/build.js"
  }
}
```

## 📖 更多资源

- [Rsbuild 官方文档](https://rsbuild.dev)
- [Rsbuild 配置参考](https://rsbuild.dev/config)
- [Rspack 官方网站](https://rspack.dev)

## 📄 开源协议

[MIT](./LICENSE) © leonwgc

---

<div align="center">
  <sub>由 ⚡ <a href="https://rsbuild.dev">Rsbuild</a> 强力驱动</sub>
</div>
