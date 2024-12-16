# CollegeAi

简要介绍：CollegeAi 是一个创新的生涯规划辅助平台，旨在通过 GPT 技术整合网络信息，提供个性化生涯规划指导，帮助用户明确职业方向和专业认知。
亮点有：

- 采用 Next.js 框架优化 SEO 和提升开发效率，并接入 Antd 组件库进行快速开发
- 使用 Node.js 的 Nest.js 框架和 MySQL 数据库搭建稳定且可扩展的后端服务，确保了项目的稳定性和扩展性。
- 整合 AI 服务，采用阿里云 Serverless 云函数开发 AI 搜索功能，加速开发调试并方便部署。
- 对关键功能AI聊天调优，自主开发 gpt-search 联网搜索功能，使用 puppeteer 无头浏览器构建准确且高效的 AI 搜索中间件。
- 对 AI 大模型进行 prompt 优化，使用高级 fine-tuning 及 function-calling 等微调减少 token 使用并优化响应效果。

项目分为[前端部分](https://github.com/Collage-Ai/CollegeAi-fe)，[后端部分](https://github.com/Collage-Ai/CollegeAi-be)，[gpt 网络检索云函数](https://github.com/abandon888/gptSearchWebFn)这三个仓库。本项目为前端仓库。

# 项目整体说明

本项目为前端部分。
项目启动：

```
pnpm run dev
```

# 环境变量

需在目录下新建.env 文件，配置如下环境变量

```sh
NEXT_PUBLIC_BACKEND_URL = "后端url"
NEXT_PUBLIC_API_URL = "代理的url"
NEXT_PUBLIC_API_KEY = "api key"
NEXT_PUBLIC_WEB_CHAT_URL = "云函数地址"
```

# Nextjs Starter

> This is a starter for nextjs with turbopack. Consider both project and Nodejs + Prisma backend. You can use the pure nextjs front-end, or you can write the front-end and back-end together to make a small full-stack boy.

**English** | [中文](./README.zh-CN.md)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Beta Documentation](https://beta.nextjs.org) - learn about Next.js features and app dir.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Some features

- **app dir**: The project uses the latest app dir of nextjs13, you can read [Next.js Beta Document](https://beta.nextjs.org) about the app dir feature
- **i18n**: This project supports internationalization, the root directory i18n is a multilingual file, and the middleware middleware determines which language to jump to

## 文件目录一览

```txt
├── LICENSE
├── README.md
├── README_zh-CN.md
├── app                                      app dir
│   └── [lang]                               language type
│   │   ├── [id]                             /:id route
│   │   │   ├── loading.tsx                  loading page
│   │   │   └── page.tsx                     page
│   │   ├── layout.tsx                       global layout
│   │   └── page.tsx                         main home
│   └── api                                  api folder, fold route for api
│       ├── be/[..slug]/route.ts             proxy forwarding backend interface
│       └── hello/route.ts                  get api
├── commitlint.config.js                     commitlint
├── components                               components folder
│   ├── button
│   │   └── index.tsx
│   ├── layout                               layout file
│   │   ├── index.tsx
│   │   ├── link.tsx
│   │   └── state.ts
│   ├── navbar                               navbar
│   │   └── index.tsx
│   ├── skeleton
│   │   └── skeletonCard.tsx
│   ├── theme                                config file
│   │   ├── defaultHeadTag.tsx
│   │   ├── flexible.tsx
│   │   └── metadata.ts
│   ├── toast
│   │   └── toast.tsx
│   └── typography
│       └── index.tsx
├── i18n                                     i18n folder
│   ├── config.ts                            language config
│   ├── getDictionary.ts                     Dictionary configuration
│   └── locales                              dictionary package file
│       ├── en.json
│       └── zh-CN.json
├── middleware.ts                            Middleware, recognition language jump
├── next-env.d.ts
├── next.config.js                           nextjs config
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js                        postcss config
├── prisma                                   prisma folder
│   ├── index.ts                             prisma exposure method
│   └── schema.prisma                        prisma schema file
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── services                                 request api function main directory请求api函数主要目录
│   ├── client                               client request data
│   │   └── login.ts
│   └── server                               server request data
├── styles                                   global css file
│   ├── index.css
│   ├── reset.css
│   └── tailwind.css
├── tailwind.config.js                       tailwind config
├── tsconfig.json
├── types                                    ts type
│   ├── api.d.ts
│   ├── components
│   │   └── theme.d.ts
│   ├── global.d.ts
│   └── index.d.ts
├── utils                                    utils
│   ├── cookie.ts                            cookie utils
│   ├── helpers.ts                           utils functions
│   ├── request.ts                           http request
│   └── web3.ts                              functions
└── views                                    app dir client component
```
