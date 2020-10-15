require('dotenv').config();
const path = require('path');

function moduleDir(m) {
  return path.dirname(require.resolve(`${m}/package.json`));
}

const isProd = process.env.NODE_ENV === 'production';

// if not use CDN, change to your cos access domain
const STATIC_URL = 'https://static.v2ex.yuga.chat';

module.exports = {
  env: {
    STATIC_URL: isProd
      ? STATIC_URL
      : `http://localhost:${parseInt(process.env.PORT, 10) || 8000}`,
  },
  assetPrefix: isProd ? STATIC_URL : '',
  webpack: (config, { dev }) => {
    config.resolve.extensions = [
      '.web.js',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
    ];

    config.module.rules.push(
      {
        test: /\.(svg)$/i,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
        include: [moduleDir('antd-mobile'), __dirname],
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [moduleDir('antd-mobile'), __dirname],
      },
    );

    return config;
  },
};
