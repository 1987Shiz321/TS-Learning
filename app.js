function added(n1, n2) {
    return n1 + n2;
}
//void型の関数の例
function printResult2(num) {
    console.log('Result: ' + num);
}
var combineValues;
combineValues = added;
console.log(combineValues(8, 8)); // Output: Sum: 16
printResult2(added(5, 12)); // Output: Result: 17
