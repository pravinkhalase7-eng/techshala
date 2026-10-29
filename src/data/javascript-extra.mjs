import { lesson, q } from './build.mjs';

const js = (code, ask, correct, wrongs, why) => q(code, ask, correct, wrongs, why, 'node');

export const extraLessons = [
  lesson('strings-and-regex', 'Strings and regular expressions', 'intermediate', 'Search, slice, and replace text without guessing which characters matched.', [
    js(`console.log("a12 b3".match(/\\d+/g).join(","));`, 'What does this program print?', '12,3', ['1,2,3', 'a12,b3', '12'], '\\\\d+ matches a run of digits. The g flag finds every run, and join puts a comma between 12 and 3.'),
    js(`console.log("a.b.c".replace(".", "-"));
console.log("a.b.c".replaceAll(".", "-"));`, 'What does this program print?', 'a-b.c\na-b-c', ['a-b-c\na-b-c', 'a.b.c\na-b-c', 'a-b.c\na.b.c'], 'replace with a string changes the first match only. replaceAll changes every dot.'),
    js(`console.log("a.b".replace(/./g, "-"));
console.log("a.b".replaceAll(".", "-"));`, 'What does this program print?', '---\na-b', ['a-b\na-b', '---\n---', 'a-b\n---'], 'In a regular expression a dot matches any character, so three characters become three hyphens. replaceAll with a string treats the dot as a literal dot.'),
    js(`console.log("  a  b  ".trim().split(/\\s+/).join("-"));
console.log("  hi  ".trim().length);`, 'What does this program print?', 'a-b\n2', ['a-b\n6', '  a  b  \n2', 'a--b\n2'], 'trim drops the spaces at both ends. The remaining gap is one run of whitespace, so split produces a and b.'),
    js(`console.log("AbC".match(/[A-Z]/g).join(""));
console.log("baaac".match(/a+/)[0]);`, 'What does this program print?', 'AC\naaa', ['AbC\naaa', 'AC\na', 'b\naaa'], '[A-Z] keeps capital letters. a+ takes the longest run of the letter a, which is aaa.'),
    js(`console.log("abc".padStart(5, "0"));
console.log("abc".padEnd(5, "."));`, 'What does this program print?', '00abc\nabc..', ['abc00\nabc..', '00abc\n..abc', '000abc\nabc...'], 'padStart adds zeros on the left until the length is 5. padEnd adds dots on the right. The original three characters stay.'),
    js(`console.log("Hello".slice(1, 4));
console.log("Hello".at(-1));`, 'What does this program print?', 'ell\no', ['ell\nH', 'ello\no', 'Hel\no'], 'slice stops before index 4, so it keeps ell. at(-1) counts from the end and returns the last character.'),
    js(`console.log(JSON.stringify("a\\nb"));
console.log("cat cat".replaceAll("cat", "dog"));`, 'What does this program print?', '"a\\nb"\ndog dog', ['a\nb\ndog dog', '"a\\nb"\ndog cat', 'a\\nb\ndog dog'], 'JSON.stringify shows the newline as a backslash and n inside quotes. replaceAll changes both copies of cat.'),
    js(`console.log("id=4;ok".match(/id=(\\d+)/)[1]);
console.log("a,b;c".split(/[,;]/).join("|"));`, 'What does this program print?', '4\na|b|c', ['id=4\na|b|c', '4\na,b;c', '4\na|b;c'], 'The parentheses capture only the digits. split breaks the text on either a comma or a semicolon.'),
    js(`console.log("Hello".startsWith("He"));
console.log("Hello".endsWith("x"));
console.log("Hello".includes("ll"));`, 'What does this program print?', 'true\nfalse\ntrue', ['true\ntrue\ntrue', 'false\nfalse\ntrue', 'true\nfalse\nfalse'], 'startsWith checks the beginning, endsWith checks the end, and includes checks anywhere. ll is in the middle, and the string does not end with x.'),
  ]),
  lesson('json-and-copies', 'JSON and copies', 'intermediate', 'See which copies share nested data and which ones are fully separate.', [
    js(`const a = { n: [1] };
const b = { ...a };
b.n.push(2);
b.m = 3;
console.log(JSON.stringify(a));`, 'What does this program print?', '{"n":[1,2]}', ['{"n":[1]}', '{"n":[1,2],"m":3}', '{"n":[1],"m":3}'], 'Spread copies the fields, but the array stored in n is still shared. The new field m exists only on b.'),
    js(`const a = { n: [1] };
const b = structuredClone(a);
b.n.push(2);
console.log(JSON.stringify(a));
console.log(JSON.stringify(b));`, 'What does this program print?', '{"n":[1]}\n{"n":[1,2]}', ['{"n":[1,2]}\n{"n":[1,2]}', '{"n":[1]}\n{"n":[1]}', '{"n":[2]}\n{"n":[1,2]}'], 'structuredClone copies the nested array too. Pushing onto b leaves a unchanged.'),
    js(`const a = [1, 2];
const b = a;
b.push(3);
console.log(a.join(","));`, 'What does this program print?', '1,2,3', ['1,2', '3', '1,2,3,3'], 'b and a are two names for one array. push changes that array.'),
    js(`console.log(JSON.stringify(JSON.parse('{"b":1,"a":2}')));`, 'What does this program print?', '{"b":1,"a":2}', ['{"a":2,"b":1}', '{b:1,a:2}', 'b,a'], 'JSON.parse keeps the order of the keys in the text. stringify writes that same order back out.'),
    js(`const user = { name: "Ada", city: "Pune" };
const copy = JSON.parse(JSON.stringify(user));
copy.city = "Goa";
console.log(user.city);
console.log(copy.city);`, 'What does this program print?', 'Pune\nGoa', ['Goa\nGoa', 'Pune\nPune', 'Goa\nPune'], 'Parsing the JSON text builds a new object. Changing the copy does not change the original city.'),
    js(`const row = [0, 0];
const a = [row, row];
a[0][0] = 1;
console.log(JSON.stringify(a));`, 'What does this program print?', '[[1,0],[1,0]]', ['[[1,0],[0,0]]', '[[1,1],[1,1]]', '[[0,0],[0,0]]'], 'Both slots of a hold the same row array. Writing the first cell is visible through both slots.'),
    js(`const a = [[0, 0], [0, 0]];
a[0][0] = 1;
console.log(JSON.stringify(a));`, 'What does this program print?', '[[1,0],[0,0]]', ['[[1,0],[1,0]]', '[[1,1],[0,0]]', '[[0,0],[0,0]]'], 'Each nested array was created separately. Only the first row changes.'),
    js(`console.log(JSON.stringify([1, 2, , 4]));`, 'What does this program print?', '[1,2,null,4]', ['[1,2,4]', '[1,2,,4]', '[1,2,undefined,4]'], 'The array has a hole at index 2. JSON has no hole, so stringify writes null in that position.'),
    js(`const a = { x: 1 };
const b = Object.assign({}, a, { y: 2 });
console.log(JSON.stringify(a));
console.log(JSON.stringify(b));`, 'What does this program print?', '{"x":1}\n{"x":1,"y":2}', ['{"x":1,"y":2}\n{"x":1,"y":2}', '{"x":1}\n{"y":2}', '{"x":1,"y":2}\n{"x":1}'], 'Object.assign copies into the empty object passed first. a is only a source, so it stays as it was.'),
    js(`const a = { nested: { n: 1 } };
const b = { ...a, nested: { ...a.nested } };
b.nested.n = 9;
console.log(a.nested.n);`, 'What does this program print?', '1', ['9', 'undefined', 'Error'], 'The inner spread copies the fields of nested into a new object. Changing that copy does not change a.'),
  ]),
  lesson('numbers-and-math', 'Numbers and Math', 'intermediate', 'Bases, rounding, and the cases where two numbers that look equal are not.', [
    js(`console.log(Number.parseInt("ff", 16));
console.log((0.1 + 0.2).toFixed(2));`, 'What does this program print?', '255\n0.30', ['255\n0.3', '15\n0.30', 'ff\n0.30'], 'parseInt reads ff as base 16, which is 255. toFixed(2) rounds the sum to two decimal places and returns the text 0.30.'),
    js(`console.log(Number.isNaN("x"));
console.log(Number.isNaN(NaN));
console.log(Object.is(NaN, NaN));`, 'What does this program print?', 'false\ntrue\ntrue', ['true\ntrue\ntrue', 'false\ntrue\nfalse', 'true\nfalse\ntrue'], 'Number.isNaN does not convert its argument, so the string "x" is not NaN. Object.is treats NaN as the same value, unlike ===.'),
    js(`console.log(NaN === NaN);
console.log(Object.is(-0, 0));`, 'What does this program print?', 'false\nfalse', ['true\ntrue', 'false\ntrue', 'true\nfalse'], '=== says NaN is not equal to itself. Object.is also tells positive zero and negative zero apart.'),
    js(`console.log(1_000 + 1);
console.log(Number("1_000"));`, 'What does this program print?', '1001\nNaN', ['1001\n1000', '1_001\n1000', '1001\n1'], 'A numeric separator is allowed in source code. Number does not accept that separator in a string, so the conversion is NaN.'),
    js(`console.log(Math.trunc(-2.9));
console.log(Math.floor(-2.9));
console.log(Math.ceil(-2.1));`, 'What does this program print?', '-2\n-3\n-2', ['-3\n-3\n-2', '-2\n-2\n-2', '-2\n-3\n-3'], 'trunc drops the fractional part toward zero. floor goes down, so -2.9 becomes -3. ceil goes up, so -2.1 becomes -2.'),
    js(`console.log(Math.round(2.5));
console.log(Math.round(-2.5));`, 'What does this program print?', '3\n-2', ['3\n-3', '2\n-2', '2\n-3'], 'Math.round sends a tie toward positive infinity. 2.5 becomes 3, and -2.5 becomes -2.'),
    js(`console.log(0.1 + 0.2 === 0.3);
console.log(Math.abs(0.1 + 0.2 - 0.3) < 1e-10);`, 'What does this program print?', 'false\ntrue', ['true\ntrue', 'false\nfalse', 'true\nfalse'], 'Binary floats cannot store 0.1 exactly, so the sum is not === to 0.3. The difference is still tiny enough to pass a tolerance check.'),
    js(`console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2);`, 'What does this program print?', 'true', ['false', 'NaN', 'Error'], 'Past the safe integer limit, JavaScript can no longer represent every whole number. Those two additions land on the same value.'),
    js(`console.log((255).toString(16));
console.log((10).toString(2));`, 'What does this program print?', 'ff\n1010', ['255\n1010', 'FF\n1010', 'ff\n0b1010'], 'toString with a radix writes the number in that base. 255 is ff in hex, and 10 is 1010 in binary. No prefix is added.'),
    js(`console.log(Number.isInteger(5.0));
console.log(Number.isInteger(5.1));
console.log(2 ** 3);`, 'What does this program print?', 'true\nfalse\n8', ['true\ntrue\n8', 'false\nfalse\n8', 'true\nfalse\n6'], '5.0 has no fractional part, so it is an integer. 5.1 is not. 2 ** 3 is two raised to the third power.'),
  ]),
  lesson('dates-and-time', 'Dates and time', 'intermediate', 'UTC dates, month indexes, and one time shown in another zone.', [
    js(`const d = new Date(Date.UTC(2024, 0, 31));
d.setUTCDate(d.getUTCDate() + 1);
console.log(d.getUTCMonth());
console.log(d.getUTCDate());`, 'What does this program print?', '1\n1', ['0\n32', '1\n2', '0\n1'], 'Month numbers start at 0, so January is 0. Adding one day to 31 January rolls into 1 February, which is month 1 and day 1.'),
    js(`console.log(new Date(Date.UTC(2024, 0, 1)).toISOString().slice(0, 10));`, 'What does this program print?', '2024-01-01', ['2024-00-01', '2023-12-31', '2024-1-1'], 'Month 0 is January. toISOString writes a UTC timestamp, and the first ten characters are the calendar date.'),
    js(`const a = Date.UTC(2024, 0, 10);
const b = Date.UTC(2024, 0, 1);
console.log((a - b) / 86400000);`, 'What does this program print?', '9', ['10', '8', '86400000'], 'Date.UTC returns milliseconds. From the 1st to the 10th is nine days, and 86400000 is the number of milliseconds in a day.'),
    js(`console.log(new Date(Date.UTC(2024, 0, 1)).getUTCDay());`, 'What does this program print?', '1', ['0', 'Monday', '7'], 'getUTCDay uses Sunday as 0. 1 January 2024 was a Monday, so the result is 1.'),
    js(`const d = new Date(Date.UTC(2024, 0, 1, 12, 0));
const parts = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
}).formatToParts(d);
const hour = parts.find((part) => part.type === "hour").value;
const minute = parts.find((part) => part.type === "minute").value;
console.log(hour + ":" + minute);`, 'What does this program print?', '17:30', ['12:00', '05:30', '17:00'], 'Asia/Kolkata is 5 hours and 30 minutes ahead of UTC. 12:00 UTC is 17:30 there. formatToParts reads those fields without a locale comma.'),
    js(`const d = new Date("2024-07-04T00:00:00Z");
console.log(d.getUTCMonth() + 1);
console.log(d.getUTCDate());`, 'What does this program print?', '7\n4', ['6\n4', '7\n3', '07\n04'], 'The ISO text is parsed as UTC. getUTCMonth is zero-based, so July is 6 and adding 1 makes the calendar month 7.'),
    js(`console.log(new Date(Date.UTC(2024, 1, 29)).getUTCDate());
console.log(new Date(Date.UTC(2024, 1, 29)).getUTCMonth());`, 'What does this program print?', '29\n1', ['1\n29', '29\n2', '28\n1'], '2024 is a leap year, so 29 February is valid. The month argument 1 means February, and the day stays 29.'),
    js(`const start = Date.UTC(2024, 0, 1);
const later = start + 26 * 60 * 60 * 1000;
console.log((later - start) / 3600000);`, 'What does this program print?', '26', ['2', '1', '24'], 'Adding 26 hours of milliseconds and dividing back by the milliseconds in one hour returns 26. The calendar is not asked to roll the day.'),
    js(`console.log(new Date(Date.UTC(2023, 1, 28)).toISOString().slice(0, 10));`, 'What does this program print?', '2023-02-28', ['2023-01-28', '2023-03-01', '2023-02-29'], 'Month 1 is February. 2023 is not a leap year, but the 28th is still a real date, so the ISO date is 2023-02-28.'),
    js(`const d = new Date(Date.UTC(2024, 11, 31, 0, 0));
console.log(d.getUTCFullYear());
console.log(d.getUTCMonth());`, 'What does this program print?', '2024\n11', ['2024\n12', '2025\n0', '2024\n31'], 'The month argument 11 is December, the twelfth month. The year stays 2024 because the date is still in that year.'),
  ]),
  lesson('arrays-in-depth', 'Arrays in depth', 'intermediate', 'Change a copy, flatten nested lists, and read from either end.', [
    js(`const a = [1, 2, 3, 4];
console.log(a.splice(1, 2).join(","));
console.log(a.join(","));`, 'What does this program print?', '2,3\n1,4', ['1,2\n3,4', '2,3\n1,2,3,4', '1,4\n2,3'], 'splice(1, 2) removes two items starting at index 1 and returns those removed items. The original array keeps what was not removed.'),
    js(`console.log(JSON.stringify([1, [2, [3]]].flat(2)));
console.log(JSON.stringify([1, [2, [3]]].flat(1)));`, 'What does this program print?', '[1,2,3]\n[1,2,[3]]', ['[1,2,3]\n[1,2,3]', '[1,[2,3]]\n[1,[2,[3]]]', '[1,2,3]\n[1,[2,3]]'], 'flat(2) opens both levels, so the result is three numbers. flat(1) opens only the outer array and leaves [3] nested.'),
    js(`console.log([1, 2, 3].flatMap((n) => [n, n]).join(","));`, 'What does this program print?', '1,1,2,2,3,3', ['1,2,3,1,2,3', '1,2,3', '[1,1],[2,2],[3,3]'], 'flatMap maps each item to an array and then flattens one level. Each number is repeated beside itself.'),
    js(`const a = [3, 1, 2];
console.log(a.toSorted().join(","));
console.log(a.join(","));`, 'What does this program print?', '1,2,3\n3,1,2', ['1,2,3\n1,2,3', '3,1,2\n3,1,2', '2,1,3\n3,1,2'], 'toSorted returns a new array in order. The original array stays in the order it was written.'),
    js(`console.log([10, 20, 30].findIndex((n) => n > 15));
console.log([10, 20, 30].at(-1));`, 'What does this program print?', '1\n30', ['2\n30', '20\n30', '1\n10'], 'findIndex returns the position of the first match, and 20 is at index 1. at(-1) reads the last item.'),
    js(`const a = [1, 2, 3];
console.log(a.with(1, 9).join(","));
console.log(a.join(","));`, 'What does this program print?', '1,9,3\n1,2,3', ['1,9,3\n1,9,3', '1,2,9\n1,2,3', '9,2,3\n1,2,3'], 'with returns a copy that has a new value at index 1. The original array is not written to.'),
    js(`console.log(Array.from("ab", (ch) => ch.toUpperCase()).join(""));
console.log(Array.from({ length: 3 }, (_, i) => i).join(","));`, 'What does this program print?', 'AB\n0,1,2', ['ab\n0,1,2', 'AB\n1,2,3', 'A,B\n0,1,2'], 'Array.from can map each character while it builds the array. The length object produces indexes 0, 1, and 2.'),
    js(`console.log([1, 2, 3].fill(0, 1).join(","));`, 'What does this program print?', '1,0,0', ['0,0,0', '1,0,3', '0,2,3'], 'fill starts at index 1 and replaces every later item with 0. Index 0 stays 1.'),
    js(`console.log([1, 2, 1].lastIndexOf(1));
console.log([1, 2, 3].includes(2));`, 'What does this program print?', '2\ntrue', ['0\ntrue', '2\nfalse', '1\ntrue'], 'lastIndexOf finds the rightmost 1, which is at index 2. includes reports that 2 is present.'),
    js(`const a = [1, 2, 3];
const b = a.slice();
b.push(4);
console.log(a.join(","));
console.log(b.join(","));`, 'What does this program print?', '1,2,3\n1,2,3,4', ['1,2,3,4\n1,2,3,4', '1,2,3\n4', '1,2,3\n1,2,3'], 'slice with no arguments copies the array. push changes only that copy.'),
  ]),
  lesson('object-tools', 'Object tools', 'advanced', 'Own properties, prototypes, frozen objects, and maps.', [
    js(`const target = { a: 1 };
const result = Object.assign(target, { b: 2 });
console.log(JSON.stringify(target));
console.log(result === target);`, 'What does this program print?', '{"a":1,"b":2}\ntrue', ['{"a":1}\nfalse', '{"a":1,"b":2}\nfalse', '{"b":2}\ntrue'], 'Object.assign writes into the first object and returns that same object. target and result are one value.'),
    js(`const obj = Object.freeze({ a: 1 });
let message = "ok";
try {
  obj.a = 2;
} catch (error) {
  message = error.name;
}
console.log(message);
console.log(obj.a);`, 'What does this program print?', 'TypeError\n1', ['ok\n2', 'TypeError\n2', 'ok\n1'], 'A frozen object cannot be changed. In a module, the assignment throws TypeError, and a stays 1.'),
    js(`const proto = { kind: "base" };
const obj = Object.create(proto);
console.log(obj.kind);
console.log(Object.hasOwn(obj, "kind"));
console.log(Object.hasOwn(obj, "toString"));`, 'What does this program print?', 'base\nfalse\nfalse', ['base\ntrue\nfalse', 'base\nfalse\ntrue', 'undefined\nfalse\nfalse'], 'Object.create sets the prototype, so kind is visible, but it is not an own property. hasOwn does not look up the prototype chain.'),
    js(`console.log(JSON.stringify(Object.fromEntries([["a", 1], ["b", 2]])));`, 'What does this program print?', '{"a":1,"b":2}', ['[["a",1],["b",2]]', '{a:1,b:2}', 'a,b'], 'fromEntries builds an object from pairs. stringify writes the keys and values with JSON punctuation.'),
    js(`const original = { a: 1, b: 2 };
const { b, ...rest } = original;
delete rest.a;
console.log(original.a);
console.log(JSON.stringify(rest));`, 'What does this program print?', '1\n{}', ['undefined\n{}', '1\n{"a":1}', '1\n{"b":2}'], 'rest is a new object containing a. Deleting a from rest does not delete it from original, and rest is left empty.'),
    js(`const obj = { a: 1, b: 2 };
console.log(Object.keys(obj).join(","));
console.log(Object.values(obj).join(","));`, 'What does this program print?', 'a,b\n1,2', ['1,2\na,b', 'a,b\na,b', 'b,a\n2,1'], 'keys and values follow the order the fields were added. a comes before b.'),
    js(`const obj = { n: 1 };
Object.defineProperty(obj, "hidden", { value: 2, enumerable: false });
console.log(Object.keys(obj).join(","));
console.log(obj.hidden);`, 'What does this program print?', 'n\n2', ['n,hidden\n2', 'n\nundefined', 'hidden\n2'], 'A non-enumerable property is left out of keys, but reading it by name still returns 2.'),
    js(`const a = { x: 1 };
const b = { x: 2, y: 3 };
console.log(JSON.stringify({ ...b, ...a }));`, 'What does this program print?', '{"x":1,"y":3}', ['{"x":2,"y":3}', '{"x":1}', '{"x":2,"y":3,"x":1}'], 'Later spreads overwrite earlier fields with the same key. a supplies x, and y remains from b.'),
    js(`const map = new Map([["a", 1]]);
map.set("b", 2);
console.log(map.get("a"));
console.log(map.size);
console.log(map.get("missing"));`, 'What does this program print?', '1\n2\nundefined', ['1\n1\nundefined', '1\n2\nnull', 'a\n2\nundefined'], 'Map stores the pairs it was given and the pair added later. A missing key reads as undefined, and size counts both entries.'),
    js(`const proto = { a: 1 };
const obj = Object.create(proto);
obj.b = 2;
console.log(Object.keys(obj).join(","));
console.log(obj.a);`, 'What does this program print?', 'b\n1', ['a,b\n1', 'b\nundefined', 'a\n1'], 'keys lists own properties only, so a is hidden even though reading obj.a finds it on the prototype.'),
  ]),
  lesson('generators', 'Generators', 'advanced', 'Pause a function, send a value back in, and stop it early.', [
    js(`function* nums() {
  yield 1;
  yield 2;
}
console.log([...nums()].join(","));`, 'What does this program print?', '1,2', ['[1, 2]', '1', '1,2,undefined'], 'Each yield supplies one value. Spreading the generator collects both of them into an array.'),
    js(`function* nums() {
  yield 1;
  yield 2;
}
const g = nums();
console.log(g.next().value);
console.log(g.next().value);
console.log(g.next().done);`, 'What does this program print?', '1\n2\ntrue', ['1\n2\nfalse', '1\nundefined\ntrue', '2\ntrue\ntrue'], 'The first two next calls receive the yielded numbers. The third call finds the function finished, so done is true.'),
    js(`function* inner() {
  yield 2;
  yield 3;
}
function* outer() {
  yield 1;
  yield* inner();
}
console.log([...outer()].join(","));`, 'What does this program print?', '1,2,3', ['1,2', '1,[2,3]', '2,3'], 'yield* walks another generator and yields each of its values. outer therefore produces 1, then 2, then 3.'),
    js(`function* gen() {
  try {
    yield 1;
  } finally {
    console.log("end");
  }
}
const g = gen();
console.log(g.next().value);
g.return();`, 'What does this program print?', '1\nend', ['end\n1', '1', 'end'], 'The first next pauses at yield and prints 1. return() finishes the generator, and finally still runs, so end prints next.'),
    js(`function* gen() {
  yield 1;
  yield 2;
}
const g = gen();
g.next();
console.log(g.return(9).value);
console.log(g.next().done);`, 'What does this program print?', '9\ntrue', ['1\ntrue', '9\nfalse', '2\ntrue'], 'return(9) finishes the generator and reports 9 as the result value. A later next is already done.'),
    js(`function* count(n) {
  while (n < 3) {
    yield n;
    n += 1;
  }
}
console.log([...count(1)].join(","));`, 'What does this program print?', '1,2', ['1,2,3', '0,1,2', '3'], 'The loop yields while n is below 3. It yields 1 and 2, then 3 fails the test and the generator ends.'),
    js(`function* range(start, end) {
  for (let i = start; i < end; i += 1) yield i;
}
console.log([...range(0, 3)].join(","));`, 'What does this program print?', '0,1,2', ['0,1,2,3', '1,2,3', '0,1'], 'The loop stops before end. The yielded values are 0, 1, and 2.'),
    js(`function* gen() {
  const x = yield 1;
  yield x;
}
const g = gen();
console.log(g.next().value);
console.log(g.next(5).value);`, 'What does this program print?', '1\n5', ['1\n1', '5\n5', 'undefined\n5'], 'The first next runs up to the first yield and returns 1. The 5 passed to the next next becomes the value of that yield expression.'),
    js(`function* gen() {
  yield* [1, 2];
}
console.log(JSON.stringify([...gen()]));`, 'What does this program print?', '[1,2]', ['1,2', '[[1,2]]', '[1, 2]'], 'yield* walks the array. Spreading the generator builds [1, 2], and JSON.stringify writes it without spaces.'),
    js(`function* gen() {
  yield 1;
  return 2;
}
const g = gen();
g.next();
console.log(g.next().value);
console.log(g.next().done);`, 'What does this program print?', '2\ntrue', ['1\ntrue', '2\nfalse', 'undefined\ntrue'], 'The second next finishes the function and carries the returned 2, with done already true. The third next is done and has no new value.'),
  ]),
  lesson('promise-tools', 'Promise tools', 'advanced', 'Combine promises, keep errors as values, and see microtask order.', [
    js(`const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error("no")),
]);
console.log(results[0].status);
console.log(results[1].status);`, 'What does this program print?', 'fulfilled\nrejected', ['1\nno', 'fulfilled\nfulfilled', 'rejected\nrejected'], 'allSettled waits for every promise and records how each one finished. A rejection becomes a result instead of stopping the others.'),
    js(`const winner = await Promise.race([
  Promise.resolve("fast"),
  Promise.resolve("slow"),
]);
console.log(winner);`, 'What does this program print?', 'fast', ['slow', 'fast,slow', 'undefined'], 'Both promises are already settled. race uses the first one in the list, so the winner is fast.'),
    js(`try {
  await Promise.any([Promise.reject(1), Promise.reject(2)]);
  console.log("ok");
} catch (error) {
  console.log(error.name);
}`, 'What does this program print?', 'AggregateError', ['ok', '1', 'Error'], 'Promise.any needs one success. When every promise rejects, it fails with AggregateError.'),
    js(`const order = [];
await Promise.resolve()
  .finally(() => { order.push("done"); })
  .then(() => { order.push("value"); });
console.log(order.join(" "));`, 'What does this program print?', 'done value', ['value done', 'done', 'value'], 'finally runs when the promise settles, and the following then runs after that. done is recorded before value.'),
    js(`const order = [];
queueMicrotask(() => order.push("A"));
Promise.resolve().then(() => order.push("B"));
queueMicrotask(() => order.push("C"));
await Promise.resolve().then(() => order.push("D"));
console.log(order.join(" "));`, 'What does this program print?', 'A B C D', ['A C B D', 'B A C D', 'A B D C'], 'These callbacks are all microtasks and they run in the order they were queued. A is queued first, then B, then C, then D.'),
    js(`const value = await Promise.resolve(1)
  .then((n) => n + 1)
  .then((n) => n * 3);
console.log(value);`, 'What does this program print?', '6', ['4', '3', '1'], 'The first then adds 1, producing 2. The second then multiplies that result by 3.'),
    js(`const all = await Promise.all([Promise.resolve(1), Promise.resolve(2)]);
console.log(all.join(","));`, 'What does this program print?', '1,2', ['1', '2,1', '1,2,undefined'], 'Promise.all waits for every input and keeps the results in the same order. join prints them with a comma.'),
    js(`let seen = "start";
await Promise.reject(new Error("x")).catch(() => {
  seen = "caught";
});
console.log(seen);`, 'What does this program print?', 'caught', ['start', 'x', 'Error'], 'catch handles the rejection and returns a fulfilled promise. The assignment runs before the awaited chain finishes.'),
    js(`const result = await Promise.resolve(2).then((n) => Promise.resolve(n + 3));
console.log(result);`, 'What does this program print?', '5', ['2', '[object Promise]', '23'], 'A then callback may return a promise. await receives the number inside that promise, which is 2 + 3.'),
    js(`const order = [];
setTimeout(() => order.push("timer"), 0);
await Promise.resolve().then(() => order.push("micro"));
console.log(order.join(" "));`, 'What does this program print?', 'micro', ['timer micro', 'timer', 'micro timer'], 'A promise callback is a microtask, so it runs before the timer callback. The log happens before the timer is added to order.'),
  ]),
  lesson('classes-in-practice', 'Classes in practice', 'advanced', 'Private fields, static data, getters, and what each instance owns.', [
    js(`class Counter {
  #n = 0;
  inc() { this.#n += 1; return this.#n; }
}
const c = new Counter();
console.log(c.inc());
console.log(c.inc());`, 'What does this program print?', '1\n2', ['0\n1', '1\n1', 'undefined\nundefined'], 'The private field starts at 0 for this object. Each inc call adds 1 and returns the new value.'),
    js(`class Parent {
  static kind = "parent";
}
class Child extends Parent {
  static kind = "child";
}
console.log(Parent.kind);
console.log(Child.kind);`, 'What does this program print?', 'parent\nchild', ['child\nchild', 'parent\nparent', 'undefined\nchild'], 'A static field on the subclass is its own field. Assigning Child.kind does not change Parent.kind.'),
    js(`class Box {
  value = 1;
  get doubled() { return this.value * 2; }
}
console.log(new Box().doubled);`, 'What does this program print?', '2', ['1', 'undefined', 'doubled'], 'A getter runs when the property is read. doubled returns value times 2.'),
    js(`class A {
  greet() { return "A"; }
}
class B extends A {
  greet() { return "B"; }
}
const obj = new B();
console.log(obj.greet());
console.log(A.prototype.greet.call(obj));`, 'What does this program print?', 'B\nA', ['B\nB', 'A\nA', 'A\nB'], 'A normal call uses the method on B. Calling the method stored on A skips the override and returns A.'),
    js(`class User {
  constructor(name) { this.name = name; }
  label() { return this.name.toUpperCase(); }
}
console.log(new User("ada").label());`, 'What does this program print?', 'ADA', ['ada', 'name', 'undefined'], 'The constructor stores the argument on the object. label reads that name and uppercases it.'),
    js(`class Base {
  constructor() { this.ready = true; }
}
class Child extends Base {
  constructor() {
    super();
    this.ready = false;
  }
}
console.log(new Child().ready);`, 'What does this program print?', 'false', ['true', 'undefined', 'Error'], 'super() runs the parent constructor first and sets ready to true. The child constructor then assigns false.'),
    js(`class Pair {
  constructor(a, b) { this.a = a; this.b = b; }
  static sum(p) { return p.a + p.b; }
}
console.log(Pair.sum(new Pair(2, 5)));`, 'What does this program print?', '7', ['2', '5', 'undefined'], 'static sum is called on the class, not on an instance. It adds the two fields of the pair it receives.'),
    js(`class Node {
  constructor(value) { this.value = value; }
}
console.log(Object.getPrototypeOf(new Node(1)) === Node.prototype);
console.log(Object.getPrototypeOf(Node) === Function.prototype);`, 'What does this program print?', 'true\ntrue', ['true\nfalse', 'false\ntrue', 'false\nfalse'], 'An instance points at the class prototype. The class itself is a function, so its prototype is Function.prototype.'),
    js(`class Bag {
  items = [];
  add(n) { this.items.push(n); }
}
const a = new Bag();
const b = new Bag();
a.add(1);
console.log(a.items.join(","));
console.log(b.items.length);`, 'What does this program print?', '1\n0', ['1\n1', '1\nundefined', '0\n0'], 'A class field is created again for every instance. Adding to a does not add to the array owned by b.'),
    js(`class Counter {
  static total = 0;
  constructor() { Counter.total += 1; }
}
new Counter();
new Counter();
console.log(Counter.total);`, 'What does this program print?', '2', ['0', '1', 'undefined'], 'total lives on the class and is shared. Each constructor call adds 1, so two objects make the total 2.'),
  ]),
  lesson('iteration-protocol', 'The iteration protocol', 'advanced', 'for-of, spread, maps, and sets all use the same iterator contract.', [
    js(`const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let n = this.from;
    const end = this.to;
    return {
      next() {
        if (n <= end) return { value: n++, done: false };
        return { done: true };
      },
    };
  },
};
console.log([...range].join(","));`, 'What does this program print?', '1,2,3', ['1,2', '0,1,2,3', 'from,to'], 'Spread calls the iterator and collects every value until done is true. The numbers run from 1 through 3.'),
    js(`const it = [10, 20][Symbol.iterator]();
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().done);`, 'What does this program print?', '10\n20\ntrue', ['10\n20\nfalse', '0\n1\ntrue', '10\nundefined\ntrue'], 'An array iterator yields each item and then reports done. The third next has no further value.'),
    js(`console.log([..."ab"].join(","));
console.log([...new Set([1, 1, 2])].join(","));`, 'What does this program print?', 'a,b\n1,2', ['ab\n1,1,2', 'a,b\n1,1,2', 'a,b\n2'], 'Strings are iterable by character. A Set stores each value once, so the repeated 1 disappears.'),
    js(`const map = new Map([["a", 1], ["b", 2]]);
console.log([...map.keys()].join(","));
console.log([...map.values()].join(","));`, 'What does this program print?', 'a,b\n1,2', ['1,2\na,b', 'a,1,b,2', 'b,a\n2,1'], 'keys and values are iterators in insertion order. Spreading them builds arrays of the keys and then the values.'),
    js(`const set = new Set([1, 2, 2, 3]);
set.add(2);
console.log([...set].join(","));
console.log(set.size);`, 'What does this program print?', '1,2,3\n3', ['1,2,2,3\n4', '1,2,3\n4', '1,2,2,3\n3'], 'Adding a value that is already present does not create another entry. The size stays 3.'),
    js(`function* gen() { yield 1; yield 2; }
const it = gen();
console.log(typeof it[Symbol.iterator]);
console.log([...it].join(","));`, 'What does this program print?', 'function\n1,2', ['object\n1,2', 'function\n[1, 2]', 'undefined\n1,2'], 'A generator is iterable: it has a Symbol.iterator method. Spreading it pulls the yielded numbers.'),
    js(`const obj = { a: 1, b: 2 };
console.log(Object.entries(obj).map(([k, v]) => k + v).join(","));`, 'What does this program print?', 'a1,b2', ['a,b', '1,2', 'a,1,b,2'], 'entries returns pairs of key and value. The map concatenates each pair, so a with 1 becomes a1.'),
    js(`const set = new Set(["a", "b"]);
console.log(set.has("a"));
set.delete("a");
console.log(set.size);`, 'What does this program print?', 'true\n1', ['true\n2', 'false\n1', 'a\n1'], 'has reports that a is present. delete removes it, and one item, b, remains.'),
    js(`const map = new Map();
map.set("x", 1);
console.log(map.has("x"));
console.log(map.get("missing"));`, 'What does this program print?', 'true\nundefined', ['true\nnull', 'false\nundefined', '1\nundefined'], 'has checks the key, not the value. get returns undefined when the key was never added.'),
    js(`const chars = {
  *[Symbol.iterator]() {
    yield "a";
    yield "b";
  },
};
console.log([...chars].join(""));`, 'What does this program print?', 'ab', ['a,b', 'a', '[a,b]'], 'A generator method can be the iterator. Spread runs it and collects a and b, then join puts them together with nothing between.'),
  ]),
];
