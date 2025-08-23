//複数の型を受け入れる関数の例
// TypeScriptのユニオン型を使用して、異なる型の引数を受け入れる
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(
    input1: Combinable, 
    input2: Combinable, 
    resultConversion: ConversionDescriptor,
) {
    let result;
    if (
        (typeof input1 === 'number' && typeof input2 === 'number') || 
        resultConversion === 'as-number'
    ) {
        result = +input1 + +input2; // 数値の加算
    } else {
        result = input1.toString() + input2.toString(); // 文字列の連結
    }
    return result;
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges); // Output: 56

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges); // Output: 56

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames); // Output: MaxAnna