//アロー関数の練習
// const add = (a: number, b: number) => a + b;

// const printOutput: (output: string | number ) => void = output => console.log(output);


// printOutput(add(5, 12));

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
    firstname: 'Max',
    age: 30
};

//オブジェクトのコピー
const copiedPerson = {
    ...person
};
console.log(copiedPerson);

//可変長引数の練習
//...numbersは配列として受け取る
const add = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

//分割代入の練習
const [hobby1, hobby2] = hobbies;

console.log(hobby1, hobby2);

const {firstname: userName, age} = person;

console.log(userName, age, person);