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

# 250825
## 49. letとconst

|              | const    | let    | var       |
| -------------- | -------- | -------- | --------- |
| 再宣言         | x        | x        | o         |
| 最代入         | x        | o        | o         |
| スコープ       | ブロック | ブロック | 関数      |
| ホイスティング | エラー   | エラー   | undefined |

### ざっくりした結論
参考にしたサイト\
[https://qiita.com/cheez921/items/7b57835cb76e70dd0fc4](https://qiita.com/cheez921/items/7b57835cb76e70dd0fc4)

-  ほぼ全部constで定義できる
    - オブジェクトや配列の値の変更は再代入にはならないため。
-  プリミティブ型を再代入したい場合はlet
-  varはもう使わない

### スコープの理解

実行中のコードから参照できる範囲をスコープといいます。\
`const/let`はブロックスコープ({}で囲われた部分 - if文やfor文など)が適用されますが、`var`はブロックスコープが適用されません。\
※ 関数スコープ(関数宣言の{})は、`var/const/let`すべてに適用されます。

```typescript
//var
{
  var a = 0;
}
// ブロックスコープが適用されないため、ブロック外でも値の参照が可能
console.log(a); // 0

//let
{
  // ブロックスコープにより、再宣言にならない。
  let a = 1;
  console.log(a); // 1
}
// letはブロックスコープであり参照できないため、varで宣言した値が参照される。
console.log(a); // 0

// const
{
  const b = 2;
  console.log(b); //2
}
// constはブロックスコープであり参照できない。
// また、bはブロック内ではじめて宣言されたため、ブロック外から読みこもうとすると
// 一度も宣言されていないものとして捉え、undefinedとなる。
console.log(b) // b is not defined 
```

### ホイスティング(変数の巻き上げ)
変数宣言が常に関数の先頭で行われたことにされる挙動を **ホイスティング(変数の巻き上げ)** といいいます。
```typescript
// var
{
  console.log(a); // undefined
  var a = 0; 
  console.log(a); // 0
}

// let / const
{
  //初期化前のbにアクセスできるわけがないよ、とエラーを出す
  console.log(b); // Cannot access 'b' before initialization 
  const b = 0; 
  //初期化後はアクセスできるので、0が表示される。
  console.log(b); // 0
}
```