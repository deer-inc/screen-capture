# サイトキャプチャー

指定したURLのスクリーンショットを作成します。再帰的にクローリングするので子ページも自動的にキャプチャします。

## インストール

```
npm i
```

## 使い方

1. ルートに`site.ts`を作成（[_site.ts](https://github.com/deer-inc/screen-capture/blob/main/src/_sites.ts)を複製）
2. `npm start`
3. `screens`ディレクトリに画像が生成

### 除外するURL

`site.ts` の`ignorePaths`にURLの一部を記載することで、該当するURLの画面は3画面のみ取得します。

たとえばブログ系の記事を除外したい場合以下のようにします。

```
ignorePaths: ['https://xxx/blog/'],
```