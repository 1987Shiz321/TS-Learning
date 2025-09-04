function Logger(logString: string) {
    console.log('Loggerファクトリー');
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('Templateファクトリー');
    return function<T extends {new(...args: any[]): {name: string}}>(OriginalConstructor: T) {
        return class extends OriginalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('テンプレートを表示中...');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    };
}

@Logger('ログ出力中 - Person')
@WithTemplate('<h1>Personオブジェクト</h1>', 'app')
class Person {
    name = 'Max';

    constructor() {
        console.log('Personオブジェクトを作成中...');
    }
}

const pers = new Person();

console.log(pers);

// デコレーター

function Log(target: any, propertyName: string | Symbol) {
    console.log("プロパティデコレータ");
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accesor デコレータ");
    console.log(target);
    console.log(name);
    console.log(descriptor);

}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
    console.log("Method デコレータ");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log("Parameter デコレータ");
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('価格は0より大きい値を設定してください');
        }           

    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('Book', 200);
const p2 = new Product('TextBook', 400);

console.log(p1, p2);