// クラスの頭文字は大文字で始めるのが慣例
abstract class Department {
    static fiscalYear = 2024;
    // privateはクラスの中でしかアクセスできないし、継承したクラスからもアクセスできない
    // protectedはクラスの中と継承したクラスからアクセスできる
    protected employees: string[] = [];

    // staticはクラスのインスタンスを作成しなくてもアクセスできる
    static createEmployee(name: string) {
        return { name: name };
    }

    constructor(protected readonly id: string, public name: string) {
        // thisはクラスの中で使う
        // this.name = n;
    }

    // 継承したクラスで必ず実装しなければならないメソッドを定義できる
    abstract describe(this: Department): void;

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
        super(id, 'IT');
        this.admins = admins;
    }

    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment; //クラスの中からのみアクセス可能

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

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting'); //親クラスのコンストラクタを呼び出す.
        this.lastReport = reports[0] ?? ''; //reports配列の最初の要素をlastReportに設定する.配列が空の場合は空文字を設定する
    }

    static getInstance() {
        // すでにインスタンスが存在する場合はそれを返す
        if(AccountingDepartment.instance) {
            return this.instance;
        }
        // インスタンスが存在しない場合は新たに作成して返す
        // インスタンスを作成するのは1回だけ
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
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

    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }
}

// staticメソッドの呼び出し
// クラス名.メソッド名()で呼び出せる
const employee1 = Department.createEmployee('Shigeru Miyamoto');
console.log(employee1, Department.fiscalYear);

// インスタンス化
// newクラス名()でインスタンス化できる
// インスタンス化したオブジェクトを変数に格納する

const it01 = new ITDepartment('d2', ['mkwiimatsumoto']);
console.log(it01);

// シングルトンパターンの呼び出し
// コンストラクタがprivateなので、newでインスタンス化できない
// AccountingDepartmentクラスのgetInstanceメソッドを使ってインスタンスを取得する
const accounting = AccountingDepartment.getInstance();
accounting.mostRecentReport = 'Year End Report'; //mostRecentReportのセッターを呼び出す
accounting.addReport('Something went wrong...');
accounting.printReports();
// mostRecentReportのゲッターを呼び出す.()は不要.
console.log(accounting.mostRecentReport);

accounting.addEmployee('hikakin');
accounting.addEmployee('seikin');
accounting.addEmployee('mkwiimatsumoto'); //追加されない
accounting.printEmployeeInformation();

console.log(accounting);    