// インタフェースにはプロパティの型を定義することができる
// 例えば、以下のようにGreetableインタフェースを定義することができる
interface Greetable {
    name: string;

    greet(phrase: string): void;

    VersionMessage(phrase: string): void;
}

// imprementキーワードを使って、クラスにインタフェースを実装できる
// 例えば、以下のようにPersonクラスにGreetableインタフェースを実装できる
class Person implements Greetable {
    name: string;
    age = 30;
    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string) {
        console.log(this.name + phrase);
    }

    VersionMessage(phrase: string) {
        console.log("わたしはしゅさいしゃです。あなたはわたしと\nプレイしている同じバージョンではありません " + phrase);
    }
}

let user1: Greetable;

user1 = new Person('4TB MeBean');

user1.greet("、あいしてる！");

user1.VersionMessage(user1.name);

console.log(user1);