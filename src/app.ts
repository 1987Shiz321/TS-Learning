//アロー関数の練習
const add = (a: number, b: number) => a + b;

const printOutput: (output: string | number ) => void = output => console.log(output);


printOutput(add(5, 12));

const button = document.querySelector('button')!;

if (button) {
    button.addEventListener('click', event => console.log(event));
}