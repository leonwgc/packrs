<div align="center">
  <h1>⚡ packrs</h1>
  <p><strong>High-Performance React Build Tool Powered by Rust</strong></p>
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

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>⚡️ Lightning Fast</h3>
      <p>Built on <a href="https://rsbuild.dev">Rsbuild</a> and Rust, offering 10x+ faster compilation</p>
    </td>
    <td width="50%">
      <h3>🎯 Zero Config</h3>
      <p>Start React projects instantly with built-in Less/Sass support</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔧 Highly Customizable</h3>
      <p>Full Rsbuild configuration capabilities with custom plugins and build processes</p>
    </td>
    <td width="50%">
      <h3>📦 Lightweight</h3>
      <p>Node.js API only, flexible integration into any build workflow</p>
    </td>
  </tr>
</table>

## 📦 Installation

```bash
# npm
npm install packrs --save-dev

# yarn
yarn add -D packrs

# pnpm
pnpm add -D packrs
```

## 🚀 Quick Start

### Development Mode

```typescript
const { run } = require('packrs');

run({
  index: './src/index',
  dist: './dist',
});
```

Start development server with hot reload and fast refresh.

### Production Build

```typescript
const { build } = require('packrs');

build({
  index: './src/index',
  dist: './dist',
});
```

Build optimized production bundle.

## 🔧 Configuration Examples

### Full Configuration

```typescript
const { run } = require('packrs');

run({
  // Entry file
  index: ['eventsource-polyfill', './src/index'],

  // Output directory
  dist: './dist',

  // Dev server port
  port: 9001,

  // Dev server proxy
  proxy: [
    {
      context: ['/api'],
      target: 'https://api.example.com',
      changeOrigin: true,
    },
  ],

  // Build banner
  banner: 'My App v1.0.0',

  // Rsbuild configuration
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

### Multiple Entries

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

### Custom React Runtime

```typescript
const { run } = require('packrs');

run({
  index: './src/index',
  // Use 'classic' for React versions before 16.14.0
  reactRuntime: 'classic',
});
```

## 📚 API Reference

### `run(params)` / `build(params)`

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `index` | `string \| string[] \| RsbuildEntryDescription` | `'./src/index'` | Entry file path |
| `dist` | `string` | `'./dist'` | Output directory |
| `port` | `number` | `3000` | Dev server port |
| `less` | `boolean` | `true` | Enable Less support |
| `sass` | `boolean` | `true` | Enable Sass support |
| `proxy` | `ProxyConfig` | - | Dev server proxy configuration |
| `banner` | `string` | - | Build banner text |
| `reactRuntime` | `'automatic' \| 'classic'` | `'automatic'` | JSX runtime mode |
| `rsConfig` | `RsbuildConfig` | - | Full Rsbuild configuration |

### TypeScript Type Definitions

```typescript
type Params = {
  /** Enable Less support (default: true) */
  less?: boolean;

  /** Enable Sass support (default: true) */
  sass?: boolean;

  /** Project entry file (default: './src/index') */
  index?: string | string[] | (RsbuildEntryDescription & { html?: boolean });

  /** Output directory (default: './dist') */
  dist?: string;

  /** Dev server port (default: 3000) */
  port?: number;

  /** Dev server proxy configuration */
  proxy?: ProxyConfig;

  /** Build banner text */
  banner?: string;

  /** JSX runtime mode (default: 'automatic') */
  reactRuntime?: 'automatic' | 'classic';

  /** Rsbuild configuration */
  rsConfig?: RsbuildConfig;
};
```

## 💡 Design Philosophy

### Why Node.js API Only?

packrs focuses on providing a **flexible and powerful** Node.js API instead of a traditional CLI tool. This design offers several advantages:

- **🎯 Maximum Flexibility** - Full control over the build process without preset constraints
- **🔌 Seamless Integration** - Easy integration into existing build scripts and workflows
- **🚀 Full Power** - Leverage Rsbuild's complete capabilities with custom plugins and configurations
- **📦 Lightweight** - Avoid CLI complexity, keeping the core functionality simple and efficient

If you need a CLI, you can easily create custom scripts in your project's `package.json`:

```json
{
  "scripts": {
    "dev": "node scripts/dev.js",
    "build": "node scripts/build.js"
  }
}
```

## 📖 Resources

- [Rsbuild Official Documentation](https://rsbuild.dev)
- [Rsbuild Configuration Reference](https://rsbuild.dev/config)
- [Rspack Official Website](https://rspack.dev)

## 📄 License

[MIT](./LICENSE) © leonwgc

---

<div align="center">
  <sub>Powered by ⚡ <a href="https://rsbuild.dev">Rsbuild</a></sub>
</div>
