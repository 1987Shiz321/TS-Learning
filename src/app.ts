interface AddFn {
    // 匿名関数の型を定義することができる
    // 例えば、以下のようにAddFnインタフェースを定義することができる
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

console.log(add(1, 2));

// インタフェースにはプロパティの型を定義することができる
// 例えば、以下のようにGreetableインタフェースを定義することができる
interface Named {
    readonly name?: string;
    outputName?: string; // ?をつけるとオプショナルになる
}

interface Greetable extends Named {
    greet(phrase: string): void;

    VersionMessage(phrase: string): void;
}

// imprementキーワードを使って、クラスにインタフェースを実装できる
// 例えば、以下のようにPersonクラスにGreetableインタフェースを実装できる
class Person implements Greetable {
    name?: string;
    //outputname = 'hoge';
    age = 30;
    constructor(n: string) {
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(this.name + phrase);
        } else {
            console.log("こんにちは！");
        }

    }

    VersionMessage(phrase: string) {
        console.log("わたしはしゅさいしゃです。あなたはわたしと\nプレイしている同じバージョンではありません " + phrase);
    }
}

let user1: Greetable;

user1 = new Person('Player');

user1.greet("、あいしてる！");

user1.VersionMessage(user1.name? user1.name : "no name");

console.log(user1);