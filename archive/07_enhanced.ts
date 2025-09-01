type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date; //Date型はJavaScriptの組み込みオブジェクト
}

//交差型（Intersection Types）を使って、AdminとEmployeeの両方のプロパティを持つ新しい型を作成
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; //number

//関数オーバーロード
function add(a: number, b: number): number; //number型の引数を2つ受け取り、number型を返す
function add(a: string, b: string): string; //string型の引数を2つ受け取り、string型を返す
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
    //型ガード
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Hello, ', 'TypeScript!'); //関数オーバーロードにより、resultはstring型と推論される
result.split(' ');

const fetchedUserData = {
    id: 'u1',
    name: 'user1',
    job: {
        title: 'Developer',
        description: 'TypeScript',
    }
}

//undefinedになる可能性がある場合のアクセス方法
console.log(fetchedUserData?.job?.title); //オプショナルチェイニング

// NULL合体演算子
const userInput = undefined;
const storedData = userInput ?? 'DEFAULT'; //userInputがnullまたはundefinedの場合に' DEFAULT'を代入
console.log(storedData);

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(emp.name);
    console.log("Privileges: " + (emp as Admin).privileges); //型アサーション
    if ('startDate' in emp) {
        console.log("Start Date: " + emp.startDate);
    }
}

printEmployeeInformation(e1);

class Car {
    drive() {
        console.log("Driving a car...");
    }
}

class Truck {
    drive() {
        console.log("Driving a truck...");
    }

    loadCargo(amount: number) {
        console.log("Loading cargo..." + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) { //instanceofガード
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

//Discriminated Unions（識別可能なUNION型）
interface Bird {
    type: 'bird'; //識別子
    flyingSpeed: number;
}
interface Horse {
    type: 'horse'; //識別子
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log("移動速度: " + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });
moveAnimal({ type: 'horse', runningSpeed: 20 });

//型キャスト
// HTMLInputElementであることをTypeScriptに伝える
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!; //非nullアサーション演算子
const userInputElement = document.getElementById('user-input')! as HTMLInputElement; //型アサーション

userInputElement.value = "こんにちは！"; //非nullアサーション演算子

//インデックス型
interface ErrorContainer {
    [prop: string]: string; //プロパティ名がstring型で、値がstring型のプロパティを持つことを示す
}

const errorBag: ErrorContainer = {
    email: '正しいメールアドレスではありません。',
    username: 'ユーザ名には記号を含めることはできません。',
};

console.log(errorBag);