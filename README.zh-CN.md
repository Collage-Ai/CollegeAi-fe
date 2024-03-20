# CollegeAi 前端部分

CollegeAi 是一个接入 GPT 模型的学生职业规划平台，通过 Ai 智能分析，与 Ai 进行行业对话的方式，帮助学生更好的了解自己，找到适合自己的职业方向。

**中文** | [English](./README.md)

## 开始

项目使用的是 pnpm 作为包管理工具，如果没有安装 pnpm,请先安装 pnpm

```bash
npm install -g pnpm
```

开发运行命令

```bash
pnpm run dev
```

用浏览器打开 [http://localhost:3000](http://localhost:3000),可以看到前端页面。
项目需配置一些环境变量，具体请参考[.env.example](./.env.example),主要是后端服务以及 GPT 接口的相关配置。

## 技术栈

项目使用基于 React 的 Nextjs 框架，使用 prisma 作为数据库操作工具，使用 tailwindcss 作为 css 框架，使用 pnpm 作为包管理工具。

## 一些特性

- **app dir**: 项目使用的是 nextjs13 最新的 app dir，关于 app dir 特性可以阅读[Next.js Beta 文档](https://beta.nextjs.org)
- **i18n**: 此项目支持国际化，根目录 i18n 为多语言文件，middleware 中间件判断跳转哪个语言

## 文件目录一览

```txt
├── LICENSE
├── README.md
├── README_zh-CN.md
├── app                                      app dir目录
│   └── [lang]                               语言类型
│   │   ├── [id]                             /:id路由
│   │   │   ├── loading.tsx                  loading页面
│   │   │   └── page.tsx                     page页面
│   │   ├── layout.tsx                       全局layout
│   │   └── page.tsx                          首页
│   └── api                                  api文件夹, 文件路径即路由的方式的API形式
│       ├── be/[..slug]/route.ts             代理后端路由
│       └── hello/route.ts                   bff层
├── commitlint.config.js                     commitlint
├── components                               组件文件夹
│   ├── button
│   │   └── index.tsx
│   ├── layout                               layout文件
│   │   ├── index.tsx
│   │   ├── link.tsx
│   │   └── state.ts
│   ├── navbar                               导航
│   │   └── index.tsx
│   ├── skeleton
│   │   └── skeletonCard.tsx
│   ├── theme                                一些通用配置
│   │   ├── defaultHeadTag.tsx
│   │   ├── flexible.tsx
│   │   └── metadata.ts
│   ├── toast
│   │   └── toast.tsx
│   └── typography
│       └── index.tsx
├── i18n                                     i18n文件夹
│   ├── config.ts                            语言配置
│   ├── getDictionary.ts                     词典配置
│   └── locales                              词典包文件
│       ├── en.json
│       └── zh-CN.json
├── middleware.ts                            中间件，识别语言跳转
├── next-env.d.ts
├── next.config.js                           nextjs配置
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js                        postcss配置
├── prisma                                   prisma文件夹
│   ├── index.ts                             prisma暴露方法
│   └── schema.prisma                        prisma schema文件
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── services                                 请求api函数主要目录
│   ├── client                               客户端请求数据
│   │   └── login.ts
│   └── server                               服务器端请求数据
├── styles                                   全局css文件
│   ├── index.css
│   ├── reset.css
│   └── tailwind.css
├── tailwind.config.js                       tailwind配置文件
├── tsconfig.json
├── types                                    ts类型
│   ├── api.d.ts
│   ├── components
│   │   └── theme.d.ts
│   ├── global.d.ts
│   └── index.d.ts
├── utils                                    工具类函数文件夹
│   ├── cookie.ts                            cookie操作
│   ├── helpers.ts                           工具函数
│   ├── request.ts                           http请求
│   └── web3.ts                              web3函数
└── views                                    app dir分离出来的client业务层
```
