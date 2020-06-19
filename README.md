<p align="center">
  <a href="http://project.rockshang.cn/rockui/?path=/story/welcome-page--welcome">
    <img width="400" src="https://img-blog.csdnimg.cn/202005272236562.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70">
  </a>
</p>

<h1 align="center">RockUI</h1>

English | [Português](./README-pt_BR.md) | [简体中文](./README-zh_CN.md)

## ✨ Features

- 🌈 Enterprise-class UI designed for web applications.
- 📦 A set of high-quality React components out of the box.
- 🛡 Written in TypeScript with predictable static types.
- ⚙️ Whole package of design resources and development tools.
- 🌍 Internationalization support for dozens of languages.
- 🎨 Powerful theme customization in every detail.

## 📦 Install

```bash
npm install rockui
```

```bash
yarn add rockui
```

## 🔨 Usage

```jsx
import { Button, Icon } from "rockui";

const App = () => (
  <>
    <Button
      size={ButtonSize.Small}
      autoFocus
      onClick={e => {
        e.preventDefault();
      }}
      className="btn"
    >
      hello
    </Button>
    <Icon icon="coffee" theme="warning" size="2x" />
  </>
);
```

And import style manually:

```jsx
import "rockui/dist/rockui.css";
```

### TypeScript

`rockui` is written in TypeScript with complete definitions

<!-- ## 🌍 Internationalization

Dozens of languages supported in `rockui`, see [i18n](https://ant.design/docs/react/i18n). -->

## 🔗 Links

- [Home page](http://project.rockshang.cn/rockui/)
- [Components](https://s2265681.github.io/rockui/storybook-static/)
- [Icon Doc](https://fontawesome.com/icons?d=gallery&c=vehicles)

## ⌨️ Development

Use Gitpod, a free online dev environment for GitHub.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design)

Or clone locally:

```bash
$ git clone https://github.com/s2265681/code/tree/master/React_Hook_UI/rockui
$ cd rockui
$ npm install
$ npm start
$ 修改注释 src/index.tsx 打包组件发布 >>> 页面展示
```

Open your browser and visit http://127.0.0.1:8001 , see more at [Development](https://s2265681.github.io/rockui/storybook-static/).

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


## ❤️ Sponsors and Backers

