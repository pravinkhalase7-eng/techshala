import { lesson, q } from './build.mjs';
import { extraLessons } from './python-extra.mjs';

const py = (code, ask, correct, wrongs, why) => q(code, ask, correct, wrongs, why, 'python');

export const track = {
  id: 'python',
  name: 'Python',
  blurb: 'A full path from your first print through objects, async code, and the standard library.',
  lessons: [
    lesson('first-programs', 'First programs', 'basic', 'Print, comments, and how a Python file runs from top to bottom.', [
      py(`print("Hello, world")`, 'What does this program print?', 'Hello, world', ['Hello, world!', 'hello, world', '"Hello, world"'], 'print writes the text between the quotes. The quotes themselves are not part of the output.'),
      py(`print(2 + 3 * 4)`, 'What does this program print?', '14', ['20', '9', '24'], 'Multiplication happens before addition. 3 * 4 is 12, then 2 + 12 is 14.'),
      py(`print("Hi", "there")`, 'What does this program print?', 'Hi there', ['Hithere', 'Hi\nthere', 'Hi, there'], 'When print receives several values, it separates them with a single space.'),
      py(`print("A\\nB")`, 'What does this program print?', 'A\nB', ['A\\nB', 'AB', 'A B'], '\\n inside a string is a newline character, so A and B appear on two lines.'),
      py(`# print(1)
print(2)
print(3)  # trailing note`, 'What does this program print?', '2\n3', ['1\n2\n3', '2', '1\n3'], 'Anything after # on a line is a comment and is ignored. Only the two print calls run.'),
      py(`print(10 / 2)`, 'What does this program print?', '5.0', ['5', '5.00', '4'], 'In Python 3, / is true division and always returns a float, even when the result is a whole number.'),
      py(`print("top")
print("bottom")`, 'What does this program print?', 'top\nbottom', ['top bottom', 'bottom\ntop', 'topbottom'], 'Python runs statements from top to bottom. Each print ends with a newline.'),
      py(`print(1 + 2)
print("done")`, 'What does this program print?', '3\ndone', ['1 + 2\ndone', '12\ndone', 'done\n3'], 'The expression is evaluated before printing, so the first line is 3. Then done is printed.'),
    ]),
    lesson('variables-and-types', 'Variables and types', 'basic', 'Names, rebinding, conversion, and truth values.', [
      py(`x = 5
print(type(x).__name__)`, 'What does this program print?', 'int', ['float', 'str', 'number'], 'A whole number written without a decimal point has type int.'),
      py(`x = 5
x = "5"
print(type(x).__name__)`, 'What does this program print?', 'str', ['int', 'str and int', 'Error'], 'A name can be rebound to a value of a different type. After the second line, x refers to a string.'),
      py(`print(int("12") + 3)`, 'What does this program print?', '15', ['123', '12', 'Error'], 'int("12") converts the text into the number 12. Adding 3 then gives 15.'),
      py(`print(bool(""))
print(bool("0"))`, 'What does this program print?', 'False\nTrue', ['False\nFalse', 'True\nTrue', 'True\nFalse'], 'An empty string is false. Any non-empty string is true, including the text "0".'),
      py(`a, b = 1, 2
a, b = b, a
print(a, b)`, 'What does this program print?', '2 1', ['1 2', '2, 1', 'Error'], 'The right side is evaluated first, so a and b swap in one assignment.'),
      py(`print(None is None)
x = None
print(x is None)`, 'What does this program print?', 'True\nTrue', ['True\nFalse', 'False\nFalse', 'None\nNone'], 'None is a single shared object. Use is when you want to test for None.'),
      py(`name = "Ada"
print(f"Hi {name}")`, 'What does this program print?', 'Hi Ada', ['Hi {name}', 'Hi name', 'f"Hi Ada"'], 'An f-string replaces {name} with the current value of that variable.'),
      py(`n = 1
print(n)
n = n + 1
print(n)`, 'What does this program print?', '1\n2', ['2\n2', '1\n1', '2'], 'The first print sees the original 1. The name is then rebound to 2 before the second print.'),
    ]),
    lesson('numbers-and-operators', 'Numbers and operators', 'basic', 'Division, remainder, powers, and comparisons.', [
      py(`print(7 // 2)`, 'What does this program print?', '3', ['3.5', '4', '3.0'], '// is floor division. 7 divided by 2 is 3.5, and the floor of that is 3.'),
      py(`print(7 % 2)`, 'What does this program print?', '1', ['3', '0', '3.5'], '% is the remainder. 7 is 3 * 2 + 1, so the remainder is 1.'),
      py(`print(2 ** 3)`, 'What does this program print?', '8', ['6', '9', '5'], '** is exponentiation. 2 to the power of 3 is 8.'),
      py(`print(0.1 + 0.2 == 0.3)`, 'What does this program print?', 'False', ['True', '0.3', 'Error'], 'Binary floating point cannot store 0.1 and 0.2 exactly, so their sum is not exactly 0.3.'),
      py(`x = 5
x += 2
print(x)`, 'What does this program print?', '7', ['5', '52', '2'], 'x += 2 means x = x + 2. The name now refers to 7.'),
      py(`print(-3 // 2)`, 'What does this program print?', '-2', ['-1', '-1.5', '1'], 'Floor division rounds toward negative infinity. The exact quotient is -1.5, and the floor of that is -2.'),
      py(`print(round(2.5))
print(round(3.5))`, 'What does this program print?', '2\n4', ['3\n4', '2\n3', '3\n3'], 'Python 3 rounds halves to the nearest even integer. 2.5 goes to 2, and 3.5 goes to 4.'),
      py(`print(1 < 3 < 2)
print(1 < 2 < 3)`, 'What does this program print?', 'False\nTrue', ['True\nTrue', 'False\nFalse', 'True\nFalse'], 'Chained comparisons are combined with and. 1 < 3 < 2 means 1 < 3 and 3 < 2, which is false.'),
    ]),
    lesson('strings', 'Strings', 'basic', 'Indexing, slicing, and why strings cannot be changed in place.', [
      py(`s = "python"
print(s[0])`, 'What does this program print?', 'p', ['python', 'y', 'Error'], 'Indexes start at 0, so the first character is p.'),
      py(`s = "python"
print(s[-1])`, 'What does this program print?', 'n', ['p', 'o', 'Error'], 'A negative index counts from the end. -1 is the last character.'),
      py(`s = "python"
print(s[0:3])
print(s[::2])`, 'What does this program print?', 'pyt\npto', ['pyth\npy', 'pyt\npt', 'thon\npto'], 'A slice stops before the end index, so [0:3] is pyt. A step of 2 keeps every other character: p, t, o.'),
      py(`print("ab" * 3)
print(len("a b"))`, 'What does this program print?', 'ababab\n3', ['ababab\n2', 'ab3\n3', 'ab ab ab\n3'], 'Multiplying a string repeats it. len counts every character, including the space.'),
      py(`print("Hi".lower())
print("a,b".split(","))`, 'What does this program print?', "hi\n['a', 'b']", ['Hi\n[a, b]', 'hi\n["a", "b"]', 'HI\n[a, b]'], 'lower returns a new lowercase string. split returns a list, and printing a list shows quotes around each string.'),
      py(`s = "cat"
try:
    s[0] = "b"
    print("ok")
except TypeError:
    print("TypeError")`, 'What does this program print?', 'TypeError', ['bat', 'ok', 'cat'], 'Strings are immutable. Replacing a character in place raises TypeError.'),
      py(`print("python"[::-1])`, 'What does this program print?', 'nohtyp', ['python', 'pyt', 'nothyp'], 'A step of -1 walks the string backward, which reverses it.'),
      py(`text = "  hi  "
print(text.strip())
print("ja" + "va")`, 'What does this program print?', 'hi\njava', ['  hi  \njava', 'hi\nja va', 'hi\n"java"'], 'strip removes whitespace from both ends. + joins strings with nothing in between.'),
    ]),
    lesson('decisions', 'Decisions', 'basic', 'if, elif, else, and which values count as false.', [
      py(`x = 10
print("big" if x > 5 else "small")`, 'What does this program print?', 'big', ['small', 'True', 'big if x > 5 else small'], 'The condition x > 5 is true, so the expression chooses the value before if.'),
      py(`if 0:
    print("yes")
else:
    print("no")`, 'What does this program print?', 'no', ['yes', '0', 'Error'], '0 is a false value, so the else branch runs.'),
      py(`x = 0
if x:
    print("truthy")
elif x == 0:
    print("zero")
else:
    print("other")`, 'What does this program print?', 'zero', ['truthy', 'other', '0'], 'The first test fails because 0 is false. The elif test x == 0 succeeds.'),
      py(`print("yes" if [] else "no")
print("yes" if [0] else "no")`, 'What does this program print?', 'no\nyes', ['no\nno', 'yes\nyes', 'yes\nno'], 'An empty list is false. A list with one item is true, even when that item is 0.'),
      py(`a, b = 3, 3
if a == b:
    print("eq")
else:
    print("ne")`, 'What does this program print?', 'eq', ['ne', 'True', '3'], '== compares values. Both names refer to 3, so they are equal.'),
      py(`x = 5
print(x > 1 and x < 10)
print(not True or False)`, 'What does this program print?', 'True\nFalse', ['True\nTrue', 'False\nFalse', 'False\nTrue'], 'Both comparisons are true, so and is true. not binds tighter than or, so not True or False is False.'),
      py(`n = 15
if n % 3 == 0 and n % 5 == 0:
    print("fizzbuzz")
elif n % 3 == 0:
    print("fizz")
else:
    print(n)`, 'What does this program print?', 'fizzbuzz', ['fizz', '15', 'buzz'], '15 is divisible by both 3 and 5, so the first branch wins and the elif is skipped.'),
      py(`score = 70
if score >= 90:
    print("A")
elif score >= 70:
    print("C")
else:
    print("F")`, 'What does this program print?', 'C', ['A', 'F', 'A\nC'], '90 is not reached. 70 matches the elif, and Python does not continue into else.'),
    ]),
    lesson('loops', 'Loops', 'basic', 'for, while, break, continue, and the loop else.', [
      py(`s = 0
for i in range(3):
    s += i
print(s)`, 'What does this program print?', '3', ['6', '4', '2'], 'range(3) yields 0, 1, and 2. Their sum is 3. The stop value itself is not included.'),
      py(`s = ""
for c in "ab":
    s += c.upper()
print(s)`, 'What does this program print?', 'AB', ['ab', 'A B', 'Ab'], 'The loop visits each character. upper makes it capital, and the pieces are joined into AB.'),
      py(`n = 3
while n > 0:
    n -= 1
print(n)`, 'What does this program print?', '0', ['1', '3', '-1'], 'The loop subtracts 1 while n is positive. It stops when n becomes 0, then that 0 is printed.'),
      py(`for i in range(5):
    if i == 2:
        break
print(i)`, 'What does this program print?', '2', ['5', '1', '0'], 'break leaves the loop immediately. i is still 2, and that value is printed after the loop.'),
      py(`out = []
for i in range(4):
    if i % 2 == 0:
        continue
    out.append(i)
print(out)`, 'What does this program print?', '[1, 3]', ['[0, 1, 2, 3]', '[0, 2]', '[1, 2, 3]'], 'continue skips the rest of the body. Even numbers are skipped, so only 1 and 3 are appended.'),
      py(`for i in range(2):
    pass
else:
    print("done")`, 'What does this program print?', 'done', ['0\n1\ndone', 'pass', 'nothing'], 'The else of a for loop runs when the loop finishes without break. pass does nothing, and there is no break.'),
      py(`parts = []
for i in range(1, 4, 2):
    parts.append(str(i))
print(" ".join(parts))`, 'What does this program print?', '1 3', ['1 2 3', '1 3 4', '2'], 'range(start, stop, step) begins at 1, stops before 4, and steps by 2. That is 1 then 3.'),
      py(`n = 0
for i in range(2):
    for j in range(2):
        n += 1
print(n)`, 'What does this program print?', '4', ['2', '3', '8'], 'The inner loop runs twice for each of the two outer values. 2 * 2 increments make 4.'),
    ]),
    lesson('lists', 'Lists', 'intermediate', 'Indexes, slices, and the difference between two names and two lists.', [
      py(`a = [1, 2, 3]
print(a[1])
print(a[-1])`, 'What does this program print?', '2\n3', ['1\n3', '2\n2', '1\n2'], 'Index 1 is the second item. Index -1 is the last item.'),
      py(`a = [1, 2]
a.append(3)
print(a)`, 'What does this program print?', '[1, 2, 3]', ['[1, 2]', '[3, 1, 2]', '[1, 2, 3, 3]'], 'append adds one item at the end of the same list and returns nothing.'),
      py(`a = [3, 1, 2]
a.sort()
print(a)`, 'What does this program print?', '[1, 2, 3]', ['[3, 1, 2]', '[2, 1, 3]', 'None'], 'sort rearranges the list in place. Printing a shows the sorted list, not the return value of sort.'),
      py(`a = [1, 2, 3]
b = a
b.append(4)
print(a)`, 'What does this program print?', '[1, 2, 3, 4]', ['[1, 2, 3]', '[4]', '[1, 2, 3]\n[1, 2, 3, 4]'], 'b = a does not copy the list. Both names refer to the same list, so appending through b changes a.'),
      py(`a = [1, 2, 3, 4]
b = a[:]
b.append(5)
print(a)
print(b)`, 'What does this program print?', '[1, 2, 3, 4]\n[1, 2, 3, 4, 5]', ['[1, 2, 3, 4, 5]\n[1, 2, 3, 4, 5]', '[1, 2, 3, 4]\n[5]', '[1, 2, 3]\n[1, 2, 3, 4, 5]'], 'A full slice builds a new list. Changing b leaves a as it was.'),
      py(`a = [1, 2, 3, 4]
print(a[1:3])
print([1, 2] + [3])`, 'What does this program print?', '[2, 3]\n[1, 2, 3]', ['[1, 2, 3]\n[1, 2, 3]', '[2, 3, 4]\n[1, 2, 3]', '[2, 3]\n[6]'], 'The slice starts at index 1 and stops before 3. + joins lists into a new list.'),
      py(`a = [1, 2, 3]
a.pop()
print(a)
print(a.pop(0))`, 'What does this program print?', '[1, 2]\n1', ['[1, 2, 3]\n1', '[2, 3]\n1', '[1, 2]\n2'], 'pop() removes the last item. pop(0) removes and returns the item at the front, which is now 1.'),
      py(`nums = [1, 2, 3, 4]
print(nums[::-1])`, 'What does this program print?', '[4, 3, 2, 1]', ['[1, 2, 3, 4]', '[4, 3, 2]', '[1, 3]'], 'A slice with step -1 copies the list in reverse order.'),
    ]),
    lesson('dicts-tuples-sets', 'Dicts, tuples, and sets', 'intermediate', 'Lookup, immutability, and unique values.', [
      py(`d = {"a": 1}
print(d["a"])
print(d.get("b", 0))`, 'What does this program print?', '1\n0', ['1\nNone', '1\nError', 'None\n0'], 'Square brackets return the stored value. get returns the default 0 when the key is missing, instead of raising.'),
      py(`d = {}
d["x"] = 5
print(d["x"])
print("x" in d)`, 'What does this program print?', '5\nTrue', ['5\nFalse', 'None\nTrue', 'Error'], 'Assigning d["x"] inserts the key. in checks keys, not values.'),
      py(`t = (1, 2)
print(t[0])
try:
    t[0] = 3
    print("ok")
except TypeError:
    print("TypeError")`, 'What does this program print?', '1\nTypeError', ['1\nok', '3\nok', 'TypeError'], 'A tuple can be read by index, but its slots cannot be reassigned.'),
      py(`a = (1, [2])
a[1].append(3)
print(a)`, 'What does this program print?', '(1, [2, 3])', ['(1, [2])', 'TypeError', '(1, 2, 3)'], 'The tuple itself cannot be resized, but the list stored inside it can still be changed.'),
      py(`s = {1, 2, 2, 3}
print(len(s))
print(1 in {1, 2})`, 'What does this program print?', '3\nTrue', ['4\nTrue', '3\nFalse', '2\nTrue'], 'A set keeps each value once, so the duplicate 2 disappears. in tests membership.'),
      py(`print((1, 2) + (3,))
print(len({"b": 1, "a": 2}))`, 'What does this program print?', '(1, 2, 3)\n2', ['(1, 2, 3)\n1', '(4, 2)\n2', 'Error'], 'Tuples concatenate with +. A dict length is the number of keys.'),
      py(`d = {"a": 1, "b": 2}
print(list(d))
print(d.get("a"))`, 'What does this program print?', "['a', 'b']\n1", ["['a', 'b']\n2", '[1, 2]\n1', "['b', 'a']\n1"], 'Iterating a dict yields keys, in insertion order. get("a") returns the stored 1.'),
      py(`a = {1, 2}
b = {2, 3}
print(len(a | b))
print(len(a & b))`, 'What does this program print?', '3\n1', ['4\n1', '3\n2', '2\n1'], 'The union contains 1, 2, and 3. The intersection contains only 2.'),
    ]),
    lesson('functions', 'Functions', 'intermediate', 'Parameters, return, and what a function is allowed to change.', [
      py(`def add(a, b):
    return a + b
print(add(2, 3))`, 'What does this program print?', '5', ['2 3', 'None', '23'], 'return sends the sum back to the caller. print then writes that 5.'),
      py(`def greet(name="Ada"):
    return "Hi " + name
print(greet())
print(greet("Lin"))`, 'What does this program print?', 'Hi Ada\nHi Lin', ['Hi name\nHi Lin', 'Hi Ada\nHi Ada', 'Error'], 'When the caller omits the argument, the default Ada is used. The second call passes Lin.'),
      py(`def f(x):
    x = x + 1
n = 1
f(n)
print(n)`, 'What does this program print?', '1', ['2', 'None', 'Error'], 'The parameter x is a local name. Rebinding it does not change the caller\'s n.'),
      py(`def f(xs):
    xs.append(1)
nums = []
f(nums)
print(nums)`, 'What does this program print?', '[1]', ['[]', '[1]\n[1]', 'None'], 'The list object is shared. append changes that object, so the caller sees the new item.'),
      py(`def fact(n):
    if n <= 1:
        return 1
    return n * fact(n - 1)
print(fact(4))`, 'What does this program print?', '24', ['10', '4', '12'], 'fact(4) is 4 * 3 * 2 * 1. The base case returns 1 and the multiplications unwind to 24.'),
      py(`def apply(fn, x):
    return fn(x)
print(apply(lambda n: n * 2, 4))`, 'What does this program print?', '8', ['4', '2', 'lambda'], 'lambda n: n * 2 is a function. apply calls it with 4, and 4 * 2 is 8.'),
      py(`def f(a, b=[]):
    b.append(a)
    return b
print(f(1))
print(f(2))`, 'What does this program print?', '[1]\n[1, 2]', ['[1]\n[2]', '[1]\n[1]', 'Error'], 'The default list is created once, not on every call. The second call appends to that same list.'),
      py(`def area(w, h):
    return w * h
print(area(h=3, w=2))`, 'What does this program print?', '6', ['5', 'Error', '32'], 'Keyword arguments are matched by name, so w is 2 and h is 3 even though the order is reversed.'),
    ]),
    lesson('scope-and-arguments', 'Scope and arguments', 'intermediate', 'Local names, global, nonlocal, and extra arguments.', [
      py(`x = 1
def f():
    x = 2
    return x
print(f(), x)`, 'What does this program print?', '2 1', ['2 2', '1 1', 'Error'], 'The assignment inside f creates a local x. The global x stays 1.'),
      py(`x = 1
def f():
    global x
    x = 2
f()
print(x)`, 'What does this program print?', '2', ['1', 'Error', 'None'], 'global tells Python that the assignment updates the module-level x.'),
      py(`def outer():
    n = 1
    def inner():
        return n + 1
    return inner()
print(outer())`, 'What does this program print?', '2', ['1', 'Error', 'None'], 'inner can read n from the enclosing function. It does not assign to n, so no nonlocal is required.'),
      py(`def make():
    n = 0
    def inc():
        nonlocal n
        n += 1
        return n
    return inc
f = make()
print(f(), f())`, 'What does this program print?', '1 2', ['1 1', '0 1', 'Error'], 'nonlocal lets inc update n in make. Each call sees the value left by the previous call.'),
      py(`x = "global"
def f():
    x = "local"
    def g():
        return x
    return g()
print(f())`, 'What does this program print?', 'local', ['global', 'Error', 'None'], 'g looks outward and finds the local x in f before it ever reaches the global one.'),
      py(`def f(a, *args):
    return len(args)
print(f(1, 2, 3))`, 'What does this program print?', '2', ['3', '1', '(2, 3)'], '*args collects the extra positional values. a takes 1, and args holds the remaining two.'),
      py(`def f(**kwargs):
    return kwargs.get("a", 0)
print(f(a=4, b=5))`, 'What does this program print?', '4', ['5', '0', 'Error'], '**kwargs collects keyword arguments into a dict. The key "a" maps to 4.'),
      py(`def f(x, y=2, *rest):
    return x + y + sum(rest)
print(f(1, 3, 4))`, 'What does this program print?', '8', ['7', '6', '10'], 'x is 1, y is 3, and rest is (4,). 1 + 3 + 4 is 8.'),
    ]),
    lesson('comprehensions', 'Comprehensions', 'intermediate', 'Build lists, sets, and dicts in one expression.', [
      py(`print([n * 2 for n in range(3)])`, 'What does this program print?', '[0, 2, 4]', ['[2, 4, 6]', '[0, 1, 2]', '[1, 2, 3]'], 'range(3) is 0, 1, 2. Doubling each value produces 0, 2, 4.'),
      py(`print([n for n in range(6) if n % 2 == 0])`, 'What does this program print?', '[0, 2, 4]', ['[1, 3, 5]', '[0, 2, 4, 6]', '[2, 4, 6]'], 'The if filter keeps even numbers. range stops before 6, so 6 is not included.'),
      py(`print(len({c for c in "aab"}))`, 'What does this program print?', '2', ['3', '1', "['a', 'b']"], 'A set comprehension drops duplicates. The characters a and b remain, so the length is 2.'),
      py(`squares = {k: k * k for k in range(3)}
print(squares[2])`, 'What does this program print?', '4', ['2', '9', '{2: 4}'], 'The dict maps each number to its square. The value stored for key 2 is 4.'),
      py(`matrix = [[1, 2], [3, 4]]
print([n for row in matrix for n in row])`, 'What does this program print?', '[1, 2, 3, 4]', ['[[1, 2], [3, 4]]', '[1, 3]', '[2, 4]'], 'The left for walks rows, and the right for walks items in that row. The result is one flat list.'),
      py(`print(sum(n for n in range(4)))`, 'What does this program print?', '6', ['10', '4', '0'], 'This is a generator expression. It yields 0, 1, 2, and 3, and their sum is 6.'),
      py(`words = ["Hi", "yo"]
print([w.lower() for w in words])`, 'What does this program print?', "['hi', 'yo']", ['[Hi, yo]', "['Hi', 'yo']", "['HI', 'YO']"], 'The comprehension calls lower on each word and builds a new list of strings.'),
      py(`pairs = [(x, y) for x in range(2) for y in range(2)]
print(len(pairs))
print(pairs[0])`, 'What does this program print?', '4\n(0, 0)', ['2\n(0, 0)', '4\n(1, 1)', '2\n(0, 1)'], 'Each of the two x values is paired with each of the two y values, so there are 4 pairs. The first is (0, 0).'),
    ]),
    lesson('exceptions', 'Exceptions', 'intermediate', 'try, except, else, finally, and the order they run.', [
      py(`try:
    print(1 / 0)
except ZeroDivisionError:
    print("zero")`, 'What does this program print?', 'zero', ['0', 'Error', 'zero\n0'], 'Dividing by zero raises ZeroDivisionError. The matching except handles it and prints zero.'),
      py(`try:
    print(int("x"))
except ValueError:
    print("bad")
else:
    print("ok")`, 'What does this program print?', 'bad', ['bad\nok', 'ok', 'Error'], 'int("x") raises ValueError, so except runs. else runs only when the try block does not raise.'),
      py(`try:
    print("run")
finally:
    print("end")`, 'What does this program print?', 'run\nend', ['end\nrun', 'run', 'end'], 'finally runs whether or not an exception happened. Here the try block succeeds, then finally runs.'),
      py(`try:
    x = 1
except Exception:
    print("err")
else:
    print("ok")
finally:
    print("done")`, 'What does this program print?', 'ok\ndone', ['done', 'err\ndone', 'ok'], 'Nothing is raised, so else runs. finally still runs afterward.'),
      py(`def f():
    try:
        return 1
    finally:
        return 2
print(f())`, 'What does this program print?', '2', ['1', '1\n2', 'Error'], 'A return inside finally replaces the return that was waiting in try. The caller receives 2.'),
      py(`try:
    [][0]
except IndexError as e:
    print(type(e).__name__)`, 'What does this program print?', 'IndexError', ['0', 'KeyError', 'TypeError'], 'An empty list has no index 0. That specific failure is an IndexError.'),
      py(`class AppError(Exception):
    pass
try:
    raise AppError("nope")
except AppError:
    print("caught")`, 'What does this program print?', 'caught', ['nope', 'AppError', 'Error'], 'AppError is a subclass of Exception. The except clause matches that class and handles the raise.'),
      py(`try:
    print(1)
    raise RuntimeError("x")
except RuntimeError:
    print(2)
print(3)`, 'What does this program print?', '1\n2\n3', ['2\n3', '1\n3', '1\n2'], '1 is printed before the raise. The except prints 2, then execution continues after the try and prints 3.'),
    ]),
    lesson('classes', 'Classes and objects', 'advanced', 'Instances, shared data, and special methods.', [
      py(`class Box:
    def __init__(self, n):
        self.n = n
print(Box(3).n)`, 'What does this program print?', '3', ['None', 'Box', 'Error'], '__init__ runs when the instance is created and stores 3 on that instance.'),
      py(`class A:
    kind = "a"
a = A()
b = A()
a.kind = "b"
print(a.kind, b.kind)`, 'What does this program print?', 'b a', ['b b', 'a a', 'a b'], 'Assigning a.kind creates an instance attribute that hides the class attribute. b still sees the class value a.'),
      py(`class A:
    shared = []
a = A()
b = A()
a.shared.append(1)
print(b.shared)`, 'What does this program print?', '[1]', ['[]', '[1]\n[]', 'None'], 'shared is one list on the class. Both instances use that same list, so the append is visible through b.'),
      py(`class A:
    def greet(self):
        return "hi"
print(A.greet(A()))`, 'What does this program print?', 'hi', ['Error', 'greet', 'None'], 'A method is a function that expects the instance as its first argument. Passing an instance explicitly works.'),
      py(`class Counter:
    def __init__(self):
        self.n = 0
    def inc(self):
        self.n += 1
        return self
c = Counter().inc().inc()
print(c.n)`, 'What does this program print?', '2', ['1', '0', 'Error'], 'inc returns the same instance, so the second inc updates that same counter. It was incremented twice.'),
      py(`class A:
    def __init__(self, n):
        self.n = n
    def __eq__(self, other):
        return self.n == other.n
print(A(1) == A(1))
print(A(1) == A(2))`, 'What does this program print?', 'True\nFalse', ['False\nFalse', 'True\nTrue', 'Error'], '__eq__ defines ==. The comparison uses the stored numbers, not object identity.'),
      py(`class A:
    def __len__(self):
        return 3
print(len(A()))`, 'What does this program print?', '3', ['0', 'Error', 'None'], 'len(obj) calls obj.__len__ and prints the number that method returns.'),
      py(`class A:
    def __init__(self):
        self.items = [1]
    def __getitem__(self, i):
        return self.items[i]
print(A()[0])`, 'What does this program print?', '1', ['[1]', 'Error', '0'], 'Square brackets call __getitem__. Index 0 returns the first stored item.'),
    ]),
    lesson('inheritance', 'Inheritance', 'advanced', 'Overriding, super, and the method search order.', [
      py(`class A:
    def name(self):
        return "A"
class B(A):
    def name(self):
        return "B"
print(B().name())`, 'What does this program print?', 'B', ['A', 'AB', 'Error'], 'B defines its own name, so the call uses that method and never reaches A.'),
      py(`class A:
    def name(self):
        return "A"
class B(A):
    def name(self):
        return super().name() + "B"
print(B().name())`, 'What does this program print?', 'AB', ['B', 'A', 'BA'], 'super().name() runs the parent method, which returns A. B then adds the letter B.'),
      py(`class A:
    def __init__(self):
        self.x = 1
class B(A):
    def __init__(self):
        super().__init__()
        self.y = 2
b = B()
print(b.x, b.y)`, 'What does this program print?', '1 2', ['2 2', '1', 'Error'], 'super().__init__() runs A and sets x. B then sets y on the same instance.'),
      py(`class A:
    pass
class B(A):
    pass
print(isinstance(B(), A))
print(isinstance(A(), B))`, 'What does this program print?', 'True\nFalse', ['True\nTrue', 'False\nFalse', 'False\nTrue'], 'A B instance is also an A. An A instance is not a B, because the relationship only goes downward.'),
      py(`class A:
    def f(self):
        return 1
class B(A):
    pass
print(B().f())`, 'What does this program print?', '1', ['Error', 'None', 'B'], 'B does not define f, so Python finds f on A and runs it with the B instance.'),
      py(`class A:
    def f(self):
        return "A"
class B(A):
    def f(self):
        return "B"
class C(A):
    def f(self):
        return "C"
class D(B, C):
    pass
print(D().f())`, 'What does this program print?', 'B', ['A', 'C', 'D'], 'D lists B before C. Method search visits D, then B, so B.f wins.'),
      py(`class A:
    def __str__(self):
        return "box"
print(str(A()))
print(f"{A()}")`, 'What does this program print?', 'box\nbox', ['A\nA', 'box\nA', 'Error'], '__str__ supplies the friendly text. Both str() and an f-string use it.'),
      py(`class A:
    def __init__(self):
        print("A")
class B(A):
    def __init__(self):
        print("B")
print("go")
B()`, 'What does this program print?', 'go\nB', ['go\nA\nB', 'A\nB', 'go\nB\nA'], 'B replaces __init__ and does not call super. Creating a B prints B only. A.__init__ is not run.'),
    ]),
    lesson('modules-and-files', 'Modules and context managers', 'advanced', 'Imports from the standard library, and code that always cleans up.', [
      py(`import io
buf = io.StringIO()
buf.write("hi")
buf.seek(0)
print(buf.read())`, 'What does this program print?', 'hi', ['(empty)', 'None', 'Error'], 'StringIO is an in-memory file. seek(0) moves back to the start so read can return the text that was written.'),
      py(`class CM:
    def __enter__(self):
        print("in")
        return self
    def __exit__(self, *args):
        print("out")
with CM():
    print("body")`, 'What does this program print?', 'in\nbody\nout', ['body\nin\nout', 'in\nout\nbody', 'body'], 'with calls __enter__ first, runs the body, then calls __exit__ even if the body is only a print.'),
      py(`import math
print(math.floor(3.9))
print(math.ceil(3.1))`, 'What does this program print?', '3\n4', ['3.9\n3.1', '4\n3', '3\n3'], 'floor goes down to 3. ceil goes up to 4.'),
      py(`from pathlib import PurePosixPath
print(PurePosixPath("a") / "b")`, 'What does this program print?', 'a/b', ['a\\b', 'ab', 'PurePosixPath'], 'The / operator on a path joins segments. PurePosixPath always uses a forward slash.'),
      py(`import json
print(json.dumps({"b": 1, "a": 2}))`, 'What does this program print?', '{"b": 1, "a": 2}', ["{'b': 1, 'a': 2}", '{"a": 2, "b": 1}', 'Error'], 'json.dumps writes JSON with double quotes and keeps the dict insertion order.'),
      py(`from collections import Counter
print(Counter("aab")["a"])`, 'What does this program print?', '2', ['1', '3', "Counter({'a': 2, 'b': 1})"], 'Counter tallies each character. a appears twice, so its count is 2.'),
      py(`import csv, io
buf = io.StringIO("name,age\\nAda,36\\n")
rows = list(csv.DictReader(buf))
print(rows[0]["name"])`, 'What does this program print?', 'Ada', ['name', '36', 'Error'], 'DictReader uses the first row as keys. The first data row stores Ada under the key name.'),
      py(`name = "script"
if __name__ == "__main__":
    print("ran")
else:
    print("imported")`, 'What does this program print?', 'ran', ['imported', 'script', 'Error'], 'A file executed directly has __name__ set to "__main__", so the first branch runs.'),
    ]),
    lesson('generators-decorators', 'Generators, decorators, and typing', 'advanced', 'Pausing functions, wrapping functions, and what annotations do not do.', [
      py(`def gen():
    yield 1
    yield 2
print(list(gen()))`, 'What does this program print?', '[1, 2]', ['[1]', '1\n2', 'None'], 'Each yield produces the next value. list pulls from the generator until it ends.'),
      py(`def gen():
    yield 1
    return 2
g = gen()
print(next(g))
try:
    next(g)
except StopIteration as e:
    print(e.value)`, 'What does this program print?', '1\n2', ['1\nNone', '1', '2\n1'], 'The first next returns the yielded 1. The return value is delivered as StopIteration.value when the generator ends.'),
      py(`def shout(fn):
    def wrap():
        return fn().upper()
    return wrap

@shout
def greet():
    return "hi"
print(greet())`, 'What does this program print?', 'HI', ['hi', 'shout', 'Error'], '@shout replaces greet with wrap. Calling greet runs the original function and uppercases its result.'),
      py(`def twice(fn):
    def wrap(x):
        return fn(fn(x))
    return wrap

@twice
def inc(n):
    return n + 1
print(inc(1))`, 'What does this program print?', '3', ['2', '1', '4'], 'The wrapper calls inc twice: 1 becomes 2, then 2 becomes 3.'),
      py(`g = (n * n for n in range(3))
print(next(g), next(g))`, 'What does this program print?', '0 1', ['0 1 4', '1 4', '0 0'], 'The generator yields squares lazily. The first two values are 0 squared and 1 squared.'),
      py(`def add(a: int, b: int) -> int:
    return a + b
print(add("a", "b"))`, 'What does this program print?', 'ab', ['Error', '0', 'int'], 'Annotations are not checked at runtime. The function still concatenates the two strings.'),
      py(`from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

print(Point(1, 2).x)`, 'What does this program print?', '1', ['Point(x=1, y=2)', '2', 'Error'], '@dataclass generates __init__ from the class fields. The first argument is stored as x.'),
      py(`funcs = [lambda: i for i in range(3)]
print(funcs[0]())
fixed = [lambda i=i: i for i in range(3)]
print(fixed[0]())`, 'What does this program print?', '2\n0', ['0\n0', '2\n2', '0\n2'], 'The first lambdas read i later, after the loop left it at 2. A default i=i captures the value from that iteration, so the first fixed lambda returns 0.'),
    ]),
    ...extraLessons,
  ],
};
