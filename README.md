## 프로젝트 세팅

### `npm i`

### `shift + command + x` 눌러서 `eslint extension` 설치 (optional)

## 클라이언트 실행

### `npm run start`

### (Optional) caver 호환성 문제

```js
module.exports = {
    ...
    resolve: {
        fallback: {
            fs: false,
            net: false,
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            ...
        },
    },

    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      ...
    ],
}
```
