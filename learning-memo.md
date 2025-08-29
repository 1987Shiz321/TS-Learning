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

# 20250829
## 69. staticメソッド&プロパティ

- 参考にしたサイト\
https://qiita.com/suema0331/items/d28b0e0fdfa1ba8572bb

### 概要
- static プロパティ/メソッドを使うと、`new`でクラスのインスタンスを作らずとも、クラスのプロパティ、メソッドを使うことができる
  - クラスに **utilityメソッド(複数箇所で使う便利ツール) を用意して、外部で使う場合**などに便利
- staticプロパティは、インスタンスからアクセスできないので、コンストラクタやstatic以外のメソッドからはアクセスできない
  - 例えば Mathクラスのメソッドも、Mathクラスをnewしなくても使える。そんな感じ
```typescript
// staticメソッドの例
Math.pow();
```

### staticプロパティの作成
- staticプロパティには、`this.(プロパティ)`のようにはアクセスできない。
  - thisは、クラスを基に作られたインスタンスを指すから！
- 代わりにクラス名を指定することで、staticプロパティにアクセスが可能！

```typescript
 class Department {
  static fiscalYear = 2021; //staticプロパティ
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    //console.log(this.fiscalYear); //NG
    console.log(Department.fiscalYear); //OK
  }
}
```

### staticメソッドの作成
- メソッド名に`static`をつけることで、`new`しなくても外部で利用が可能
```typescript
 class Department {
  static fiscalYear = 2021; //staticプロパティ
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    console.log(Department.fiscalYear);
  }

  static createEmployee(name: string) { //staticメソッド
    return { name: name };
  }
}


const employee1 = Department.createEmployee('NEKO'); //newしなくても使える
console.log(employee1, Department.fiscalYear);

```

![a](./img/00_static.png)

## TypeScript の abstract メソッド/クラス
- 参考にしたサイト
https://qiita.com/suema0331/items/374c0757aa00b37d98bd

### TypeScript の abstractメソッド
- 親クラスのメソッドをサブクラスでオーバーライドするように強制したい場合、abstractメソッド使います
- abstractメソッドでは、具体的なメソッドの処理を書かず、戻り値のみを設定します
```typescript
  abstract describe(this: Department): void; //{};を削除、戻り値を設定
```

### ポイント
- abstractメソッドは、abstractクラスからしか使用できません
- abstract クラスは、インスタンス化ができません(`abstract`がついているクラスは、継承されることが前提のクラスということです)
- サブクラスで、必ず親クラスのabstractメソッドを実装します(親クラスでは実装がされていないため)

```typescript
//親クラス

abstract class Department {
  static fiscalYear = 2021;
  protected employees: string[] = [];

  static createEmployee(name: string) {
    return { name: name };
  }

  constructor(protected readonly id: string, public name: string) {
    console.log(Department.fiscalYear);
  }

  abstract describe(this: Department): void;

}
```

```typescript
//サブクラス1

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }

  //親クラスのabstractメソッドをサブクラスで実装する必要がある
  describe() { 
    console.log('IT部署 - ID: ' + this.id);
  }
}

//サブクラス2

class AccountingDepartment extends Department {
  private lastReport: string;

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  //親クラスのabstractメソッドをサブクラスで実装する必要がある
  describe() {
    console.log('会計部署 - ID: ' + this.id);
  }
}
```