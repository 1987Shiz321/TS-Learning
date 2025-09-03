function merge<T extends {}, U>(objA: T, objB: U){
  return Object.assign(objA, objB);
}

console.log(merge({ name: 'Max' }, { age: 30 }));
// console.log(merge({ name: 'Max' }, 30)); // ランタイムエラー
const mergedObj = merge({ name: 'Max' }, { age: 30 });
console.log(mergedObj.age); // OK

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = '値がありません。';
    if (element.length > 1) {
        descriptionText = `値は ${element.length} 個です。`;
    }
    return [element, descriptionText];
}

console.log(countAndDescribe('かわいいだけじゃだめですか？'));
console.log(countAndDescribe(['スポーツ', '読書']));

console.log(countAndDescribe([]));

// keyofは、オブジェクトのプロパティ名の集合を表す
// Tはオブジェクト型、Uはそのプロパティ名の集合
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}
console.log(extractAndConvert({ name: 'Max', age: 30 }, 'name'));

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        // 配列にitemが存在しない場合は何もしない
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // 何も見つからなかった場合は-1が返る
    }

    getItems() {
        // データのコピーを返す
        return [...this.data];
    }
}

//文字列のみを格納するインスタンス
const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

//数値のみを格納するインスタンス
const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems());

// オブジェクトは参照型なので、同じ内容でも別のオブジェクトとして扱われる
// const objStorage = new DataStorage<object>();
// const maxObj = { name: 'Max' };
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: 'Manu' });
// // 参照が異なるので削除されない
// objStorage.removeItem({ name: 'Max' });
// console.log(objStorage.getItems());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    // Partialは、指定した型のすべてのプロパティをオプショナルにする
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu'); // エラー
// names.pop(); // エラー
console.log(names);

