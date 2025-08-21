# TypeScript勉強メモ

自分のためのメモです。わかりにくくても改良はしないと思います。\
予めご理解ください。

# 環境構築
TypeScriptのコンパイラがすでにインストールされているものとする。

以下のコマンドでフォルダ初期化
```
npm init
```
作業ディレクトリにだけ追加モジュールインストール
```
npm install --save-dev lite-server
```
`package.json`の`script`を以下のようにする
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server"
  },
```
以下のコマンドでローカルサーバ起動(２回目以降はこれだけやればOK)
```
npm start
```
localhost:3000で確認できる。


# 250821

## 14. 型の指定&型推論
関数のところでは`number`とか`stirng`とか指定しているけど、変数の宣言時には指定していないのはなぜ？

A. 型推論というシステムがあるから。\
TypeScriptでは、変数を初期化する際に代入される値をみて、その変数がどの型であるかを推論してくれている。\
宣言だけしているときは`number`や`string`は書いておいたほうがいい。初期化をしているときにこれらを書いても間違いではないけど、冗長なので不要。\

マジで雰囲気でつかむなら、**以下の問題を因数分解せよ。**
```math
x^2 - 9 = 0
```
という問題に直面したとき、因数分解の公式使っても解の公式を使っても間違いではないけど、前者と比較して後者は遠回り(冗長)だよね。

## 16. ネストしたObject型

もちろんネストしたObjectの型も定義できます。

次のようなJavaScript のオブジェクトを考えます。
```typescript
const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!'
  }
}
```
このようなObjectの型は次のようになります。
```typescript
{
  id: string;
  price: number;
  tags: string[],
  details: {
    title: string;
    description: string;
  }
}
```