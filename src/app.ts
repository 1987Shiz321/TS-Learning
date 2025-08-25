//アロー関数の練習
const add = (a: number, b: number) => a + b;

const printOutput: (output: string | number ) => void = output => console.log(output);


printOutput(add(5, 12));

const button = document.querySelector('button')!;

if (button) {
    button.addEventListener('click', event => console.log(event));
}

//スプレッド演算子の練習
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

// constで定義した配列はpushで要素を追加できる
activeHobbies.push(...hobbies);

//オブジェクトの定義
const person = {
    name: 'Max',
    age: 30
};

//オブジェクトのコピー
const copiedPerson = {
    ...person
};
console.log(copiedPerson);