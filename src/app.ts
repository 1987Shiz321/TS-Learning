// クラスの頭文字は大文字で始めるのが慣例
class Department {
    static fiscalYear = 2024;
    // privateはクラスの中でしかアクセスできないし、継承したクラスからもアクセスできない
    // protectedはクラスの中と継承したクラスからアクセスできる
    protected employees: string[] = [];

    // staticはクラスのインスタンスを作成しなくてもアクセスできる
    static createEmployee(name: string) {
        return { name: name };
    }

    constructor(private readonly id: string, public name: string) {
        // thisはクラスの中で使う
        // this.name = n;
    }

    // メソッドちゃん
    // thisはDepartmentクラスから呼び出されないといけない
    // このようにすると、クラスの外から呼び出されたときにエラーになる
    describe(this: Department) {
        //クラスの中からプロパティにアクセスするにはthisを使う
        console.log(`Department (${this.id}): ${this.name}`);      
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

//継承についての学習
class ITDepartment extends Department {
    constructor(id: string, private admins: string[]) {
        super(id, 'IT'); //親クラスのコンストラクタを呼び出す.ITDepartmentクラスのnameプロパティは'IT'に固定している
        //adminsプロパティはITDepartmentクラスでのみ使用されるので、superで呼び出す必要はない
        this.admins = admins;
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;

    get mostRecentReport() {
        // lastReportが存在する場合はそれを返し、存在しない場合はエラーを投げる
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }

    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting'); //親クラスのコンストラクタを呼び出す.
        this.lastReport = reports[0] ?? ''; //reports配列の最初の要素をlastReportに設定する.配列が空の場合は空文字を設定する
    }
    
    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    // 親クラスのメソッドをオーバーライドする
    addEmployee(employee: string): void {
        // 例えば、特定の名前の社員を追加できないようにする
        if (employee === 'mkwiimatsumoto') {
            return;
        }
        this.employees.push(employee);
    }
}

// staticメソッドの呼び出し
// クラス名.メソッド名()で呼び出せる
const employee1 = Department.createEmployee('Shigeru Miyamoto');
console.log(employee1, Department.fiscalYear);

// インスタンス化
// newクラス名()でインスタンス化できる
// インスタンス化したオブジェクトを変数に格納する
const accounting = new Department('d1','saino');

accounting.addEmployee('mkwiimatsumoto');
accounting.addEmployee('kazuki23650214');

accounting.describe();
accounting.printEmployeeInformation();

const it01 = new ITDepartment('d2', ['mkwiimatsumoto']);
console.log(it01);

const accounting2 = new AccountingDepartment('d3', []);
accounting2.mostRecentReport = 'Year End Report'; //mostRecentReportのセッターを呼び出す
accounting2.addReport('Something went wrong...');
accounting2.printReports();
// mostRecentReportのゲッターを呼び出す.()は不要.
console.log(accounting2.mostRecentReport);

accounting2.addEmployee('hikakin');
accounting2.addEmployee('seikin');
accounting2.addEmployee('mkwiimatsumoto'); //追加されない
accounting2.printEmployeeInformation();

// const accountingCopy = {
//     name: 'mkwiimatsumoto',
//     describe: accounting.describe
// };

// accountingCopy.describe(); //undefinedになる



// 練習.ウマ娘の名前と二つ名を格納するクラス
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