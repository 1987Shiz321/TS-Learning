function added(n1: number, n2: number) {
    return n1 + n2;
}

//void型の関数の例
function printResult2(num: number): void {
    console.log('Result: ' + num);
}

function addAndHandle(
    n1: number, 
    n2: number, 
    cb: (num: number) => void
) {
    const result = n1 + n2;
    cb(result);
}

addAndHandle(10, 20, (result) => {
    console.log(result);
});

let combineValues: (a: number, b: number) => number;
combineValues = added;


console.log(combineValues(8, 8)); // Output: Sum: 16
printResult2(added(5, 12)); // Output: Result: 17