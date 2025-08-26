// クラスの頭文字は大文字で始めるのが慣例
class Department {
    name: string;
    // privateはクラスの中でしかアクセスできない
    private employees: string[] = [];

    constructor(n: string) {
        this.name = n;
    }

    // メソッドちゃん
    // thisはDepartmentクラスから呼び出されないといけない
    // このようにすると、クラスの外から呼び出されたときにエラーになる
    describe(this: Department) {
        //クラスの中からプロパティにアクセスするにはthisを使う
        console.log('Department: ' + this.name);        
    }

    // 社員を追加するメソッド
    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    // 社員情報を表示するメソッド
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
// インスタンス化
// newクラス名()でインスタンス化できる
// インスタンス化したオブジェクトを変数に格納する
const accounting = new Department('saino');

accounting.addEmployee('mkwiimatsumoto');
accounting.addEmployee('kazuki23650214');



accounting.describe();
accounting.printEmployeeInformation();

// const accountingCopy = {
//     name: 'mkwiimatsumoto',
//     describe: accounting.describe
// };

// accountingCopy.describe(); //undefinedになる

// ウマ娘の名前と二つ名を格納するクラス
class Umamusume {
    private name: string;
    private subtitle: string;
    constructor(name: string, sub: string) {
        this.name = name;
        this.subtitle = sub;
    }    
}

const uma = new Umamusume('ラヴズオンリーユー', '9927 Wishes');
console.log(uma);