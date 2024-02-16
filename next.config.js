/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true
});

// 导入next-transpile-modules，如果您的项目中还没有这个库，请先安装它
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')([]);

module.exports = withPWA(
  withTM({
    reactStrictMode: true,
    webpack(config, options) {
      // 使用@svgr/webpack处理SVG文件
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      });

      return config;
    },
    experimental: {
      optimizePackageImports: []
      // serverComponentsExternalPackages: ['@prisma/client'] // prisma support
    },
    rewrites: () => {
      return [
        {
          source: '/api/:slug*',
          destination: `${process.env.BACKEND_URL}/api/:slug*`
        }
      ];
    }
  })
);
