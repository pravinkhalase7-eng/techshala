import { lesson, q } from './build.mjs';
import { extraLessons } from './javascript-extra.mjs';

const js = (code, ask, correct, wrongs, why) => q(code, ask, correct, wrongs, why, 'node');

export const track = {
  id: 'javascript',
  name: 'JavaScript',
  blurb: 'A full path from values and scope through async code, generators, and modern objects.',
  lessons: [
    lesson('values-and-types', 'Values and types', 'basic', 'Numbers, strings, typeof, and the values that surprise people.', [
      js(`console.log("Hello, world");`, 'What does this program print?', 'Hello, world', ['Hello, world!', '"Hello, world"', 'undefined'], 'console.log writes the string value. The quotes are syntax and are not part of the output.'),
      js(`console.log(typeof 5);
console.log(typeof "5");
console.log(typeof true);`, 'What does this program print?', 'number\nstring\nboolean', ['int\nstring\nbool', 'number\nstring\nbool', 'Number\nString\nBoolean'], 'typeof reports a lowercase name. A whole number is still type number, and true is a boolean.'),
      js(`console.log(typeof null);
console.log(typeof undefined);
console.log(typeof NaN);`, 'What does this program print?', 'object\nundefined\nnumber', ['null\nundefined\nNaN', 'object\nundefined\nNaN', 'null\nobject\nnumber'], 'typeof null is the historical result "object". NaN is a number value, so typeof reports number.'),
      js(`let x;
console.log(x);
x = null;
console.log(x);`, 'What does this program print?', 'undefined\nnull', ['null\nnull', 'undefined\nundefined', 'Error'], 'A let binding with no assignment is undefined. null is different: it is a value you assign on purpose.'),
      js(`console.log(Number("12") + 3);
console.log(Number("12px"));`, 'What does this program print?', '15\nNaN', ['123\n12', '15\n12', 'Error'], 'Number converts an entire numeric string, so "12" becomes 12. Extra letters make the conversion fail with NaN.'),
      js(`console.log(parseInt("12px", 10));
console.log(Boolean(""));
console.log(Boolean("0"));`, 'What does this program print?', '12\nfalse\ntrue', ['NaN\nfalse\nfalse', '12\nfalse\nfalse', '12px\ntrue\ntrue'], 'parseInt stops at the first non-digit. An empty string is false, but any other string, including "0", is true.'),
      js(`const name = "Ada";
console.log(\`Hi \${name}\`);`, 'What does this program print?', 'Hi Ada', ['Hi name', 'Hi undefined', 'Hi {name}'], 'The placeholder in a template literal is replaced with the current value of name.'),
      js(`console.log(2 + 3 * 4);
console.log((2 + 3) * 4);`, 'What does this program print?', '14\n20', ['20\n20', '14\n14', '9\n20'], 'Multiplication runs before addition, so the first line is 14. Parentheses make the addition happen first.'),
    ]),
    lesson('variables-and-scope', 'let, const, and scope', 'basic', 'What can be reassigned, and where a name is visible.', [
      js(`let n = 1;
n = n + 1;
console.log(n);`, 'What does this program print?', '2', ['1', 'n + 1', 'Error'], 'let allows a later assignment. n becomes 2 before it is printed.'),
      js(`const n = 1;
try {
  n = 2;
  console.log("ok");
} catch (error) {
  console.log(error.name);
}`, 'What does this program print?', 'TypeError', ['2', 'ok', 'SyntaxError'], 'const does not allow that name to be assigned again. The attempt throws TypeError.'),
      js(`const box = { n: 1 };
box.n = 2;
console.log(box.n);`, 'What does this program print?', '2', ['1', 'Error', 'undefined'], 'const locks the binding, not the object. Properties of that object can still change.'),
      js(`console.log(a);
var a = 1;`, 'What does this program print?', 'undefined', ['1', 'Error', 'null'], 'var hoists the name and initializes it to undefined. The assignment to 1 happens after the log.'),
      js(`try {
  console.log(b);
  let b = 1;
} catch (error) {
  console.log(error.name);
}`, 'What does this program print?', 'ReferenceError', ['undefined', '1', 'SyntaxError'], 'let exists in the block but cannot be read before its line. That window is the temporal dead zone.'),
      js(`function outer() {
  const n = 1;
  function inner() {
    return n + 1;
  }
  return inner();
}
console.log(outer());`, 'What does this program print?', '2', ['1', 'Error', 'undefined'], 'inner can read n from the enclosing function. Adding 1 produces 2.'),
      js(`{
  let n = 1;
  console.log(n);
}
try {
  console.log(n);
} catch (error) {
  console.log(error.name);
}`, 'What does this program print?', '1\nReferenceError', ['1\n1', '1\nundefined', 'ReferenceError'], 'The let lives only inside the braces. Outside that block the name n does not exist.'),
      js(`var x = 1;
{
  var x = 2;
}
console.log(x);`, 'What does this program print?', '2', ['1', 'Error', 'undefined'], 'var ignores block braces. Both declarations are the same module-level x, so it ends as 2.'),
    ]),
    lesson('operators-and-coercion', 'Operators and coercion', 'basic', 'Loose equality, + with strings, and values that count as true.', [
      js(`console.log(1 + "2");
console.log(1 - "2");`, 'What does this program print?', '12\n-1', ['3\n-1', '12\n12', '3\n3'], '+ concatenates when either side is a string. - converts both sides to numbers, so "2" becomes 2.'),
      js(`console.log("1" + 2 + 3);
console.log(1 + 2 + "3");`, 'What does this program print?', '123\n33', ['6\n6', '123\n123', '15\n33'], '+ runs left to right. "1" + 2 becomes "12" before 3 is seen. On the next line, 1 + 2 is already 3.'),
      js(`console.log([] + []);
console.log([] + {});`, 'What does this program print?', '\n[object Object]', ['0\n0', '[]{}', 'Error'], '+ converts the array to an empty string, so the first line is blank. An object converts to the text [object Object].'),
      js(`console.log([] == false);
console.log([] == ![]);`, 'What does this program print?', 'true\ntrue', ['false\nfalse', 'true\nfalse', 'false\ntrue'], '![] is false. Loose equality turns [] into the number 0, and false is also 0, so both comparisons succeed.'),
      js(`console.log(null == undefined);
console.log(null === undefined);`, 'What does this program print?', 'true\nfalse', ['true\ntrue', 'false\nfalse', 'false\ntrue'], '== treats null and undefined as equal. === also checks the type, so those two values are not strictly equal.'),
      js(`console.log(0.1 + 0.2 === 0.3);
console.log(Number.isNaN(0 / 0));`, 'What does this program print?', 'false\ntrue', ['true\ntrue', 'false\nfalse', 'true\nfalse'], 'Those decimals are not stored exactly, so the sum is not 0.3. Dividing 0 by 0 produces NaN.'),
      js(`let n = 0;
console.log(false && (n = 1));
console.log(n);
console.log(true || (n = 2));
console.log(n);`, 'What does this program print?', 'false\n0\ntrue\n0', ['false\n1\ntrue\n2', '0\n0\n2\n2', 'false\n0\ntrue\n2'], '&& and || stop as soon as the result is known. Neither assignment runs, so n stays 0.'),
      js(`console.log(Boolean(0));
console.log(Boolean("0"));
console.log(Boolean([]));`, 'What does this program print?', 'false\ntrue\ntrue', ['false\nfalse\nfalse', 'false\nfalse\ntrue', 'true\ntrue\nfalse'], 'The number 0 is false. A non-empty string and any object, including an empty array, are true.'),
    ]),
    lesson('strings-and-templates', 'Strings and templates', 'basic', 'Characters, slices, and building new text.', [
      js(`const s = "javascript";
console.log(s[0]);
console.log(s.at(-1));`, 'What does this program print?', 'j\nt', ['j\nj', 'javascript\nt', 'Error'], 'Index 0 is the first character. at(-1) counts from the end and returns the last character.'),
      js(`const s = "javascript";
console.log(s.slice(0, 4));
console.log(s.slice(-6));`, 'What does this program print?', 'java\nscript', ['java\njava', 'javasc\nscript', 'Error'], 'slice stops before the end index, so four characters make java. A negative start counts back from the end.'),
      js(`console.log("ab".repeat(3));
console.log("a b".length);`, 'What does this program print?', 'ababab\n3', ['ab3\n2', 'ababab\n2', 'ab ab ab\n3'], 'repeat copies the string three times. length counts every character, including the space.'),
      js(`console.log("Hi".toLowerCase());
console.log("a,b".split(",").join("-"));`, 'What does this program print?', 'hi\na-b', ['Hi\na,b', 'hi\nab', 'HI\na-b'], 'toLowerCase returns new text. split breaks on the comma, then join places a hyphen between the parts.'),
      js(`let s = "cat";
try {
  s[0] = "b";
  console.log(s);
} catch (error) {
  console.log(error.name);
}`, 'What does this program print?', 'TypeError', ['bat', 'cat', 'b'], 'Modules are strict. A string index is read-only, so assigning to it throws TypeError instead of changing the text.'),
      js(`console.log("  hi  ".trim());
console.log("ja" + "va");`, 'What does this program print?', 'hi\njava', ['  hi  \njava', 'hi\nja va', 'hi\n"java"'], 'trim removes whitespace from both ends. + joins strings with nothing between them.'),
      js(`console.log("java".includes("av"));
console.log("java".startsWith("Ja"));`, 'What does this program print?', 'true\nfalse', ['true\ntrue', 'false\nfalse', 'false\ntrue'], 'includes finds a piece in the middle. startsWith is case-sensitive, so "Ja" does not match "java".'),
      js(`const n = 2;
console.log(\`\${n + 1} items\`);`, 'What does this program print?', '3 items', ['2 + 1 items', 'n + 1 items', '2 items'], 'The expression inside the placeholder runs first. 2 + 1 is 3, and that number is inserted into the text.'),
    ]),
    lesson('decisions-and-loops', 'Decisions and loops', 'basic', 'Conditions, for, while, break, continue, and switch.', [
      js(`let s = 0;
for (let i = 0; i < 3; i += 1) s += i;
console.log(s);`, 'What does this program print?', '3', ['6', '4', '2'], 'i takes 0, 1, and 2. The test i < 3 fails before 3 is used. The sum is 3.'),
      js(`const parts = [];
for (const c of "ab") parts.push(c.toUpperCase());
console.log(parts.join(""));`, 'What does this program print?', 'AB', ['ab', 'A,B', 'Ab'], 'for...of visits each character. toUpperCase capitalizes it, and join puts the letters together.'),
      js(`let n = 3;
while (n > 0) n -= 1;
console.log(n);`, 'What does this program print?', '0', ['1', '3', '-1'], 'The loop subtracts 1 while n is positive. It stops when n is 0, and that value is printed.'),
      js(`let found = -1;
for (let i = 0; i < 5; i += 1) {
  if (i === 2) {
    found = i;
    break;
  }
}
console.log(found);`, 'What does this program print?', '2', ['5', '1', '-1'], 'break leaves the loop as soon as i is 2. found keeps that value.'),
      js(`const out = [];
for (let i = 0; i < 4; i += 1) {
  if (i % 2 === 0) continue;
  out.push(i);
}
console.log(out.join(","));`, 'What does this program print?', '1,3', ['0,1,2,3', '0,2', '1,2,3'], 'continue skips the rest of the body. Even numbers are skipped, so only 1 and 3 are kept.'),
      js(`const x = 0;
if (x) console.log("truthy");
else if (x === 0) console.log("zero");
else console.log("other");`, 'What does this program print?', 'zero', ['truthy', 'other', '0'], '0 is false, so the first branch is skipped. The else if then matches x === 0.'),
      js(`const n = 15;
if (n % 3 === 0 && n % 5 === 0) console.log("fizzbuzz");
else if (n % 3 === 0) console.log("fizz");
else console.log(n);`, 'What does this program print?', 'fizzbuzz', ['fizz', '15', 'buzz'], '15 is divisible by both 3 and 5, so the first branch runs and the else if is not considered.'),
      js(`const n = 1;
switch (n) {
  case 1:
    console.log("A");
  case 2:
    console.log("B");
    break;
  default:
    console.log("C");
}`, 'What does this program print?', 'A\nB', ['A', 'A\nB\nC', 'B'], 'Without break, case 1 falls into case 2. The break then stops the switch before default.'),
    ]),
    lesson('functions', 'Functions', 'intermediate', 'Parameters, return values, arrows, and shared objects.', [
      js(`function add(a, b) {
  return a + b;
}
console.log(add(2, 3));`, 'What does this program print?', '5', ['23', 'undefined', '2 3'], 'return sends the sum back to the caller. console.log then writes 5.'),
      js(`function greet(name = "Ada") {
  return "Hi " + name;
}
console.log(greet());
console.log(greet("Lin"));`, 'What does this program print?', 'Hi Ada\nHi Lin', ['Hi undefined\nHi Lin', 'Hi Ada\nHi Ada', 'Error'], 'A missing argument uses the default Ada. Passing Lin replaces that default.'),
      js(`function f(x) {
  x = x + 1;
}
let n = 1;
f(n);
console.log(n);`, 'What does this program print?', '1', ['2', 'undefined', 'Error'], 'The parameter is a local binding. Assigning to x does not change the caller variable n.'),
      js(`function f(xs) {
  xs.push(1);
}
const nums = [];
f(nums);
console.log(JSON.stringify(nums));`, 'What does this program print?', '[1]', ['[]', '1', 'undefined'], 'The array object is shared with the caller. push changes that object, so nums contains 1.'),
      js(`function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
console.log(fact(4));`, 'What does this program print?', '24', ['10', '4', '12'], 'fact(4) multiplies 4 * 3 * 2 * 1. The call that receives 1 stops the recursion.'),
      js(`const double = (n) => n * 2;
console.log(double(4));`, 'What does this program print?', '8', ['4', '2', 'undefined'], 'An arrow with one expression returns that expression. 4 * 2 is 8.'),
      js(`function f(a, b = []) {
  b.push(a);
  return b;
}
console.log(JSON.stringify(f(1)));
console.log(JSON.stringify(f(2)));`, 'What does this program print?', '[1]\n[2]', ['[1]\n[1,2]', '[1]\n[1]', 'Error'], 'JavaScript evaluates a default expression on every call that omits the argument. Each call gets a new array, so the second print is [2], not an append onto the first array.'),
      js(`function greet(name = "Ada") {
  return "Hi " + name;
}
console.log(greet(undefined));
console.log(greet(null));`, 'What does this program print?', 'Hi Ada\nHi null', ['Hi Ada\nHi Ada', 'Hi null\nHi null', 'Hi undefined\nHi null'], 'Passing undefined triggers the default. Passing null does not: null is a real argument and becomes the text "null".'),
    ]),
    lesson('arrays', 'Arrays', 'intermediate', 'Indexes, copies, and the two kinds of sort.', [
      js(`const a = [10, 20, 30];
console.log(a[1]);
console.log(a.at(-1));`, 'What does this program print?', '20\n30', ['10\n30', '20\n20', 'Error'], 'Index 1 is the second item. at(-1) reads the last item.'),
      js(`const a = [1, 2];
a.push(3);
console.log(a.join(","));`, 'What does this program print?', '1,2,3', ['1,2', '3,1,2', '3'], 'push adds one item at the end of the same array.'),
      js(`const a = [1, 2, 3];
const b = a;
b.push(4);
console.log(a.join(","));`, 'What does this program print?', '1,2,3,4', ['1,2,3', '4', '1,2,3,4,4'], 'b = a does not copy the array. Both names point at one array, so push is visible through a.'),
      js(`const a = [1, 2, 3];
const b = a.slice();
b.push(4);
console.log(a.join(","));
console.log(b.join(","));`, 'What does this program print?', '1,2,3\n1,2,3,4', ['1,2,3,4\n1,2,3,4', '1,2,3\n4', '1,2,3\n1,2,3'], 'slice with no arguments copies the array. Changing the copy leaves the original alone.'),
      js(`const a = [10, 2, 1];
a.sort();
console.log(a.join(","));`, 'What does this program print?', '1,10,2', ['1,2,10', '10,2,1', '2,1,10'], 'The default sort converts items to strings. "10" comes before "2" because the character "1" comes before "2".'),
      js(`const a = [10, 2, 1];
a.sort((x, y) => x - y);
console.log(a.join(","));`, 'What does this program print?', '1,2,10', ['1,10,2', '10,2,1', '2,1,10'], 'Subtracting the numbers tells sort their numeric order. The array is rearranged in place.'),
      js(`const a = [1, 2, 3];
console.log(a.pop());
console.log(a.shift());
console.log(a.join(","));`, 'What does this program print?', '3\n1\n2', ['1\n3\n2', '3\n2\n1', '1\n2\n3'], 'pop removes the last item, 3. shift then removes the new first item, 1. Only 2 remains.'),
      js(`const a = [1, 2, 3];
const b = [...a, 4];
console.log(a.join(","));
console.log(b.join(","));`, 'What does this program print?', '1,2,3\n1,2,3,4', ['1,2,3,4\n1,2,3,4', '1,2,3\n4', '4\n1,2,3,4'], 'Spread copies the items into a new array and then adds 4. The original array is unchanged.'),
    ]),
    lesson('objects', 'Objects', 'intermediate', 'Properties, missing keys, and copying fields.', [
      js(`const user = { name: "Ada", city: "London" };
console.log(user.name);
console.log(user.age);`, 'What does this program print?', 'Ada\nundefined', ['Ada\nnull', 'Ada\nError', 'undefined\nundefined'], 'name is stored on the object. A missing property reads as undefined rather than throwing.'),
      js(`const box = { n: 1 };
function add(x) {
  return box.n + x;
}
console.log(add(2));`, 'What does this program print?', '3', ['1', '2', 'undefined'], 'The function reads the property n and adds the argument. 1 + 2 is 3.'),
      js(`const box = { n: 1, add(x) { return this.n + x; } };
console.log(box.add(2));`, 'What does this program print?', '3', ['NaN', 'Error', '2'], 'A method call sets this to the object before the dot. this.n is 1, plus 2 is 3.'),
      js(`const user = { name: "Ada" };
console.log("name" in user);
console.log("age" in user);`, 'What does this program print?', 'true\nfalse', ['Ada\nundefined', 'true\ntrue', 'false\nfalse'], 'in tests whether the key exists. name is present and age is not.'),
      js(`const user = { b: 1, a: 2 };
console.log(Object.keys(user).join(","));
console.log(JSON.stringify(user));`, 'What does this program print?', 'b,a\n{"b":1,"a":2}', ['a,b\n{"a":2,"b":1}', '1,2\n{"b":1,"a":2}', 'b,a\n{b:1,a:2}'], 'String keys keep insertion order. JSON.stringify writes those keys with double quotes and no extra spaces.'),
      js(`const a = { n: 1 };
const b = a;
b.n = 9;
console.log(a.n);`, 'What does this program print?', '9', ['1', 'undefined', 'Error'], 'b = a copies the reference, not the object. Updating b.n changes the one shared object.'),
      js(`const text = '{"n":4}';
const data = JSON.parse(text);
console.log(data.n + 1);`, 'What does this program print?', '5', ['41', '4', 'Error'], 'JSON.parse turns the text into an object. The property n is the number 4, and adding 1 gives 5.'),
      js(`const key = "score";
const row = { [key]: 10 };
console.log(row.score);
console.log(row.key);`, 'What does this program print?', '10\nundefined', ['10\nscore', 'undefined\n10', 'Error'], 'Brackets around key use the variable value as the property name. The literal name "key" was never stored.'),
    ]),
    lesson('closures-and-this', 'Closures and this', 'intermediate', 'Functions that remember variables, and what this points at.', [
      js(`function make() {
  let n = 0;
  return function inc() {
    n += 1;
    return n;
  };
}
const f = make();
console.log(f(), f());`, 'What does this program print?', '1 2', ['1 1', '0 1', '2 2'], 'inc keeps the same n after make returns. The first call sets it to 1, and the second call sets it to 2.'),
      js(`const funcs = [];
for (var i = 0; i < 3; i += 1) funcs.push(() => i);
console.log(funcs[0]());`, 'What does this program print?', '3', ['0', '1', '2'], 'var has one i for the whole loop. Each arrow reads it later, after the loop has left i at 3.'),
      js(`const funcs = [];
for (let i = 0; i < 3; i += 1) funcs.push(() => i);
console.log(funcs[0]());`, 'What does this program print?', '0', ['3', '1', 'undefined'], 'let creates a new i for each iteration. The first arrow captured the i from the first pass, which is 0.'),
      js(`const box = { n: 1, add(x) { return this.n + x; } };
console.log(box.add(2));`, 'What does this program print?', '3', ['NaN', 'Error', '1'], 'Calling box.add sets this to box. this.n + 2 is 3.'),
      js(`const box = { n: 1, add(x) { return this.n + x; } };
const add = box.add;
try {
  console.log(add(2));
} catch (error) {
  console.log(error.name);
}`, 'What does this program print?', 'TypeError', ['3', 'NaN', 'undefined'], 'The function is called on its own, so this is undefined in a module. Reading this.n throws TypeError.'),
      js(`const box = {
  n: 1,
  add: (x) => this?.n + x,
};
console.log(box.add(2));`, 'What does this program print?', 'NaN', ['3', '2', 'Error'], 'An arrow does not get this from the call. It captured the module this, which is undefined, and undefined + 2 is NaN.'),
      js(`function f() {
  return this.n;
}
const box = { n: 4 };
console.log(f.call(box));`, 'What does this program print?', '4', ['undefined', 'Error', 'NaN'], 'call invokes the function with an explicit this. Inside f, this.n is 4.'),
      js(`const box = { n: 2, get() { return this.n; } };
const get = box.get.bind(box);
console.log(get());`, 'What does this program print?', '2', ['undefined', 'Error', 'NaN'], 'bind permanently sets this to box. The later bare call still reads box.n.'),
    ]),
    lesson('array-methods', 'Array methods', 'intermediate', 'map, filter, reduce, and friends that build new results.', [
      js(`console.log([1, 2, 3].map((n) => n * 2).join(","));`, 'What does this program print?', '2,4,6', ['1,2,3', '2,4,6,8', '3,6,9'], 'map builds a new array by doubling every item. The original numbers are 1, 2, and 3.'),
      js(`console.log([1, 2, 3, 4].filter((n) => n % 2 === 0).join(","));`, 'What does this program print?', '2,4', ['1,3', '1,2,3,4', '4'], 'filter keeps items for which the function returns true. The even numbers are 2 and 4.'),
      js(`const nums = [1, 2, 3, 4];
console.log(nums.filter((n) => n % 2 === 0).map((n) => n * 10).join(","));`, 'What does this program print?', '20,40', ['10,20,30,40', '2,4', '20,40,60,80'], 'filter first keeps 2 and 4. map then multiplies those remaining numbers by 10.'),
      js(`console.log([1, 2, 3, 4].reduce((sum, n) => sum + n, 0));`, 'What does this program print?', '10', ['4', '24', '0'], 'reduce starts at 0 and adds each number. 1 + 2 + 3 + 4 is 10.'),
      js(`console.log([1, 2, 3].find((n) => n > 1));
console.log([1, 2, 3].find((n) => n > 9));`, 'What does this program print?', '2\nundefined', ['1\nundefined', '2\n3', '3\nundefined'], 'find returns the first match, which is 2. If nothing matches, it returns undefined.'),
      js(`console.log([1, 2, 3].some((n) => n > 2));
console.log([1, 2, 3].every((n) => n > 0));`, 'What does this program print?', 'true\ntrue', ['false\ntrue', 'true\nfalse', 'false\nfalse'], 'some is true when at least one item matches. every is true only when all items match, and each number is greater than 0.'),
      js(`const a = [1, 2, 3];
const b = a.map((n) => n + 1);
console.log(a.join(","));
console.log(b.join(","));`, 'What does this program print?', '1,2,3\n2,3,4', ['2,3,4\n2,3,4', '1,2,3\n1,2,3', '2,3,4\n1,2,3'], 'map returns a new array. The original array is not modified.'),
      js(`console.log(["Ada", "Lin"].join(" & "));
console.log([1, 2, 3].includes(2));`, 'What does this program print?', 'Ada & Lin\ntrue', ['Ada,Lin\ntrue', 'Ada & Lin\nfalse', 'Ada Lin\n2'], 'join places the separator between items. includes reports whether 2 occurs in the array.'),
    ]),
    lesson('destructuring-and-spread', 'Destructuring and spread', 'intermediate', 'Pull values out of arrays and objects, and copy them.', [
      js(`const user = { name: "Ada", city: "London" };
const { name, city } = user;
console.log(name + " " + city);`, 'What does this program print?', 'Ada London', ['name city', 'undefined undefined', 'Ada'], 'Destructuring reads the properties with the same names into local variables.'),
      js(`const { name = "guest" } = {};
console.log(name);`, 'What does this program print?', 'guest', ['undefined', '{}', 'Error'], 'When the property is missing, the default in the pattern is used.'),
      js(`const [first, ...rest] = [1, 2, 3];
console.log(first);
console.log(rest.join(","));`, 'What does this program print?', '1\n2,3', ['1\n1,2,3', '3\n1,2', '1\n3'], 'first takes the first item. The rest pattern collects everything left over.'),
      js(`function f({ n }) {
  return n + 1;
}
console.log(f({ n: 4 }));`, 'What does this program print?', '5', ['4', 'undefined', 'Error'], 'The parameter pattern pulls n out of the argument object. 4 + 1 is 5.'),
      js(`const a = { n: 1, m: 2 };
const b = { ...a, n: 3 };
console.log(b.n, b.m);`, 'What does this program print?', '3 2', ['1 2', '3 undefined', '1 3'], 'Spread copies the fields, then n: 3 overwrites the copied n. m is still 2.'),
      js(`const [a, b = 2] = [1];
console.log(a, b);`, 'What does this program print?', '1 2', ['1 undefined', '1 1', '2 2'], 'a receives the only item. b has no item to take, so its default 2 is used.'),
      js(`const user = { name: "Ada", city: "London" };
const { name, ...rest } = user;
console.log(name);
console.log(JSON.stringify(rest));`, 'What does this program print?', 'Ada\n{"city":"London"}', ['Ada\n{"name":"Ada","city":"London"}', 'London\n{"name":"Ada"}', 'Ada\n{}'], 'name is pulled out on its own. The rest pattern gets the remaining fields, which is only city.'),
      js(`function total(...nums) {
  return nums.reduce((sum, n) => sum + n, 0);
}
console.log(total(1, 2, 3));`, 'What does this program print?', '6', ['123', '3', '1,2,3'], 'The rest parameter gathers every argument into an array. Their sum is 6.'),
    ]),
    lesson('classes-and-prototypes', 'Classes and prototypes', 'advanced', 'Methods, inheritance, and the prototype chain underneath class.', [
      js(`class Box {
  constructor(n) { this.n = n; }
  value() { return this.n; }
}
console.log(new Box(3).value());`, 'What does this program print?', '3', ['undefined', 'Box', 'Error'], 'constructor stores 3 on the instance. value reads that property back.'),
      js(`class A {
  name() { return "A"; }
}
class B extends A {
  name() { return "B"; }
}
console.log(new B().name());`, 'What does this program print?', 'B', ['A', 'AB', 'Error'], 'B defines name, so the call uses the method on B and does not continue to A.'),
      js(`class A {
  name() { return "A"; }
}
class B extends A {
  name() { return super.name() + "B"; }
}
console.log(new B().name());`, 'What does this program print?', 'AB', ['B', 'A', 'BA'], 'super.name() runs the parent method and returns A. B then adds the letter B.'),
      js(`class A {}
class B extends A {}
console.log(new B() instanceof A);
console.log(new A() instanceof B);`, 'What does this program print?', 'true\nfalse', ['true\ntrue', 'false\nfalse', 'false\ntrue'], 'A B instance is also an A. An A instance is not a B.'),
      js(`class A {
  static kind() { return "A"; }
}
class B extends A {
  static kind() { return "B"; }
}
console.log(A.kind());
console.log(B.kind());`, 'What does this program print?', 'A\nB', ['A\nA', 'B\nB', 'Error'], 'static methods are called on the class. B overrides kind, while A still returns A.'),
      js(`function Box(n) { this.n = n; }
Box.prototype.double = function () { return this.n * 2; };
console.log(new Box(4).double());`, 'What does this program print?', '8', ['4', 'Error', 'undefined'], 'Methods placed on the prototype are shared by instances. double reads this.n and multiplies by 2.'),
      js(`class Box {
  #n;
  constructor(n) { this.#n = n; }
  value() { return this.#n; }
}
console.log(new Box(3).value());`, 'What does this program print?', '3', ['undefined', '#n', 'Error'], 'The # name is private to the class. value can read it, and the constructor stored 3 there.'),
      js(`class Counter {
  constructor() { this.n = 0; }
  inc() { this.n += 1; return this; }
}
const c = new Counter().inc().inc();
console.log(c.n);`, 'What does this program print?', '2', ['1', '0', 'undefined'], 'inc returns the same instance, so both calls update one counter. It was incremented twice.'),
    ]),
    lesson('errors', 'Errors', 'advanced', 'try, catch, finally, and the error names you will meet.', [
      js(`try {
  JSON.parse("{");
} catch (error) {
  console.log(error.name);
}`, 'What does this program print?', 'SyntaxError', ['ok', 'Error', 'ReferenceError'], 'The text is not valid JSON. JSON.parse throws SyntaxError, and catch prints that name.'),
      js(`function f() {
  try {
    return "try";
  } finally {
    return "finally";
  }
}
console.log(f());`, 'What does this program print?', 'finally', ['try', 'try\nfinally', 'undefined'], 'A return inside finally replaces the return that was about to leave try. The caller receives "finally".'),
      js(`class AppError extends Error {}
try {
  throw new AppError("nope");
} catch (error) {
  console.log(error.name);
}`, 'What does this program print?', 'Error', ['AppError', 'nope', 'TypeError'], 'The Error constructor sets name to "Error" on the instance. Extending the class does not change that unless the subclass assigns this.name itself.'),
      js(`try {
  console.log(1);
  throw new Error("x");
} catch (error) {
  console.log(2);
}
console.log(3);`, 'What does this program print?', '1\n2\n3', ['2\n3', '1\n3', '1\n2'], '1 is printed before the throw. catch prints 2, then the program continues after the try and prints 3.'),
      js(`try {
  const user = null;
  console.log(user.name);
} catch (error) {
  console.log(error.name);
}`, 'What does this program print?', 'TypeError', ['null', 'undefined', 'ReferenceError'], 'null has no properties. Reading .name from it throws TypeError.'),
      js(`try {
  console.log(notDefined);
} catch (error) {
  console.log(error.name);
}`, 'What does this program print?', 'ReferenceError', ['undefined', 'TypeError', 'notDefined'], 'notDefined was never declared. Reading an unknown name throws ReferenceError.'),
      js(`function parse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
console.log(parse("1"));
console.log(parse("{"));`, 'What does this program print?', '1\nnull', ['1\nError', '1\nundefined', 'null\nnull'], 'The text "1" is valid JSON and becomes the number 1. A broken object returns the null from catch.'),
      js(`try {
  try {
    throw new Error("x");
  } finally {
    console.log("cleanup");
  }
} catch {
  console.log("caught");
}`, 'What does this program print?', 'cleanup\ncaught', ['caught\ncleanup', 'caught', 'cleanup'], 'finally runs before the error leaves the inner try. The outer catch then prints caught.'),
    ]),
    lesson('promises-and-event-loop', 'Promises and the event loop', 'advanced', 'What runs now, what runs as a microtask, and what waits for a timer.', [
      js(`console.log("A");
Promise.resolve().then(() => console.log("B"));
console.log("C");`, 'What does this program print?', 'A\nC\nB', ['A\nB\nC', 'B\nA\nC', 'A\nC'], 'A and C run immediately. The then callback is a microtask, so it runs after the current script finishes.'),
      js(`Promise.resolve(1)
  .then((n) => n + 1)
  .then((n) => console.log(n));`, 'What does this program print?', '2', ['1', '3', 'undefined'], 'The first then returns 2. The next then receives that 2 and prints it.'),
      js(`Promise.reject(new Error("no"))
  .then(() => console.log("ok"))
  .catch(() => console.log("bad"));`, 'What does this program print?', 'bad', ['ok', 'no', 'ok\nbad'], 'A rejected promise skips then handlers until a catch handles it. The catch callback prints bad.'),
      js(`console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`, 'What does this program print?', 'A\nD\nC\nB', ['A\nB\nC\nD', 'A\nD\nB\nC', 'A\nC\nD\nB'], 'Sync logs run first: A then D. The promise microtask C runs before the timer callback B.'),
      js(`const values = await Promise.all([Promise.resolve(1), Promise.resolve(2)]);
console.log(values.join(","));`, 'What does this program print?', '1,2', ['1', '2', '1\n2'], 'Promise.all waits for every promise and keeps the results in the same order.'),
      js(`const value = await Promise.any([
  Promise.reject(new Error("no")),
  Promise.resolve("yes"),
]);
console.log(value);`, 'What does this program print?', 'yes', ['no', 'Error', 'undefined'], 'Promise.any fulfills with the first success. The rejection is ignored because another input succeeds.'),
      js(`function fail() {
  return Promise.reject(new Error("no"));
}
try {
  await fail();
  console.log("ok");
} catch (error) {
  console.log(error.message);
}`, 'What does this program print?', 'no', ['ok', 'Error', 'undefined'], 'await throws when the promise rejects. catch reads the Error message, which is no.'),
      js(`queueMicrotask(() => console.log("micro"));
console.log("sync");`, 'What does this program print?', 'sync\nmicro', ['micro\nsync', 'sync', 'micro'], 'queueMicrotask schedules work after the current script. The sync log therefore prints first.'),
    ]),
    lesson('async-await', 'async and await', 'advanced', 'Writing asynchronous code that reads from top to bottom.', [
      js(`async function f() {
  return 1;
}
console.log(await f());`, 'What does this program print?', '1', ['Promise', 'undefined', '[object Promise]'], 'An async function wraps a returned value in a promise. await unwraps that promise back to 1.'),
      js(`async function f() {
  throw new Error("no");
}
try {
  await f();
  console.log("ok");
} catch {
  console.log("bad");
}`, 'What does this program print?', 'bad', ['ok', 'no', 'Error'], 'A throw inside an async function rejects its promise. await turns that rejection into a catchable exception.'),
      js(`async function main() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}
console.log(0);
await main();
console.log(3);`, 'What does this program print?', '0\n1\n2\n3', ['0\n1\n3\n2', '1\n2\n0\n3', '0\n3\n1\n2'], 'await main() pauses this file until main finishes. Inside main, 1 prints, the await resumes, then 2 prints, and only then does 3 run.'),
      js(`async function main() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}
console.log(0);
main();
console.log(3);`, 'What does this program print?', '0\n1\n3\n2', ['0\n1\n2\n3', '1\n2\n0\n3', '0\n3\n1\n2'], 'main() is not awaited, so the caller continues. 2 waits on the promise and prints after 3.'),
      js(`async function f() {
  return Promise.resolve(4);
}
console.log(await f());`, 'What does this program print?', '4', ['Promise', 'undefined', '[object Promise]'], 'Returning a promise from an async function unwraps it. await therefore receives 4, not a nested promise.'),
      js(`async function one() { return 1; }
async function two() { return 2; }
console.log((await one()) + (await two()));`, 'What does this program print?', '3', ['12', 'undefined', '0'], 'Each await produces a number. The numbers are added with +, so the result is 3 rather than text.'),
      js(`async function f() {
  try {
    await Promise.reject(new Error("no"));
    return "ok";
  } catch {
    return "bad";
  }
}
console.log(await f());`, 'What does this program print?', 'bad', ['ok', 'no', 'Error'], 'The rejection is caught inside f, so f fulfills with the return value "bad" instead of rejecting.'),
      js(`function f() {
  return Promise.resolve("ok");
}
console.log(await f());`, 'What does this program print?', 'ok', ['Promise', 'undefined', '[object Promise]'], 'await works on any promise. f does not need to be async if it already returns one.'),
    ]),
    lesson('modern-javascript', 'Modern JavaScript', 'advanced', 'Nullish values, optional access, Map, and Set.', [
      js(`console.log(null ?? "guest");
console.log(0 ?? "guest");
console.log(0 || "guest");`, 'What does this program print?', 'guest\n0\nguest', ['guest\nguest\nguest', 'null\n0\n0', 'guest\n0\n0'], '?? replaces only null and undefined, so 0 is kept. || replaces every false value, so 0 becomes "guest".'),
      js(`const user = { profile: { name: "Ada" } };
console.log(user.profile?.name);
console.log(user.account?.name);`, 'What does this program print?', 'Ada\nundefined', ['Ada\nnull', 'Ada\nError', 'undefined\nundefined'], '?. reads the property when the left side exists. account is missing, so the second read is undefined instead of a throw.'),
      js(`const m = new Map();
m.set("a", 1);
m.set("a", 2);
console.log(m.get("a"));
console.log(m.size);`, 'What does this program print?', '2\n1', ['1\n2', '2\n2', '1\n1'], 'Setting an existing key replaces the value. The map still has one entry.'),
      js(`const set = new Set([1, 1, 2]);
console.log(set.size);
console.log(set.has(2));`, 'What does this program print?', '2\ntrue', ['3\ntrue', '2\nfalse', '1\ntrue'], 'A Set stores each value once, so the duplicate 1 disappears. has reports that 2 is present.'),
      js(`const obj = {};
const map = new Map();
const key = {};
obj[key] = 1;
map.set(key, 2);
const other = {};
console.log(obj[other]);
console.log(map.get(key));
console.log(map.get(other));`, 'What does this program print?', '1\n2\nundefined', ['1\n2\n2', 'undefined\n2\nundefined', '1\n1\nundefined'], 'Object keys are turned into strings, so both objects collide as "[object Object]". Map uses the object itself as the key, so the other object misses.'),
      js(`const nums = [1, 2, 3];
console.log(nums.includes(2));
console.log(Object.keys({ b: 1, a: 2 }).join(","));`, 'What does this program print?', 'true\nb,a', ['true\na,b', '2\nb,a', 'false\nb,a'], 'includes searches values. Object.keys lists string keys in insertion order: b then a.'),
      js(`const city = undefined;
console.log(city ?? "Pune");
const nickname = "";
console.log(nickname ?? "anon");`, 'What does this program print?', 'Pune\n', ['Pune\nanon', '\n', 'undefined\n'], 'undefined is replaced by ??. An empty string is neither null nor undefined, so it stays and the second line is blank.'),
      js(`const score = 0;
console.log(score ?? 10);
console.log(score || 10);`, 'What does this program print?', '0\n10', ['10\n10', '0\n0', '10\n0'], 'Zero is a real score. ?? keeps it, while || treats it as false and substitutes 10.'),
    ]),
    ...extraLessons,
  ],
};
