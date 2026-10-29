import { lesson, q } from './build.mjs';

const py = (code, ask, correct, wrongs, why) => q(code, ask, correct, wrongs, why, 'python');

export const extraLessons = [
  lesson('enumerate-zip-sorted', 'enumerate, zip, and sorted', 'intermediate', 'Walk two sequences together, keep the original list, and test groups of values.', [
    py(`names = ["Ada", "Lin"]
print([i for i, _ in enumerate(names, start=1)])`, 'What does this program print?', '[1, 2]', ['[0, 1]', '[1, 2, 3]', '[(1, Ada)]'], 'enumerate with start=1 numbers the items from 1. The comprehension keeps only those numbers.'),
    py(`pairs = list(zip([1, 2], ["a", "b", "c"]))
print(len(pairs))
print(pairs[0])`, 'What does this program print?', "2\n(1, 'a')", ["3\n(1, 'a')", "2\n(2, 'b')", "3\n(2, 'c')"], 'zip stops at the shorter sequence, so the extra letter is dropped. The first pair is 1 with a.'),
    py(`nums = [3, 1, 2]
print(sorted(nums))
print(nums)`, 'What does this program print?', '[1, 2, 3]\n[3, 1, 2]', ['[1, 2, 3]\n[1, 2, 3]', '[3, 1, 2]\n[3, 1, 2]', '[2, 1, 3]\n[3, 1, 2]'], 'sorted returns a new list. The original nums is left in its old order.'),
    py(`words = ["bb", "a", "ccc"]
print(sorted(words, key=len))`, 'What does this program print?', "['a', 'bb', 'ccc']", ["['a', 'bb', 'ccc']\n", "['bb', 'a', 'ccc']", "['ccc', 'bb', 'a']"], 'key=len sorts by length, shortest first. The words themselves are not changed before sorting.'),
    py(`print(any([0, "", 1]))
print(all([1, 2, 0]))`, 'What does this program print?', 'True\nFalse', ['False\nFalse', 'True\nTrue', 'False\nTrue'], 'any is true when one value is true, and 1 is enough. all needs every value, and 0 makes it false.'),
    py(`print(list(map(str.upper, ["ab", "c"])))
print(list(filter(None, [0, 1, "", "x"])))`, 'What does this program print?', "['AB', 'C']\n[1, 'x']", ["['ab', 'c']\n[1, 'x']", "['AB', 'C']\n[0, 1, 'x']", "['AB', 'C']\n['x']"], 'map uppercases each word. filter(None, ...) drops values that count as false, so 0 and the empty string go away.'),
    py(`print(sum(n for n, _ in zip(range(5), range(2))))`, 'What does this program print?', '1', ['10', '3', '0'], 'zip keeps only two pairs, (0, 0) and (1, 1). The sum uses the first item of each pair, 0 + 1.'),
    py(`rows = [[2, 1], [4, 3]]
print(sorted(n for row in rows for n in row))`, 'What does this program print?', '[1, 2, 3, 4]', ['[2, 1, 4, 3]', '[4, 3, 2, 1]', '[1, 2]'], 'The generator walks every nested number, then sorted puts them in order.'),
    py(`print(min(["bb", "a", "ccc"], key=len))
print(max([3, 1, 9]))`, 'What does this program print?', 'a\n9', ['ccc\n9', 'bb\n3', 'a\n3'], 'min with key=len chooses the shortest word. max of the numbers is 9.'),
    py(`names = ["Ada", "Lin"]
scores = [3, 5]
print(dict(zip(names, scores))["Lin"])`, 'What does this program print?', '5', ['3', 'Lin', 'Error'], 'zip pairs each name with a score, and dict builds a lookup. Lin is paired with 5.'),
  ]),
  lesson('copying-values', 'Copying values', 'intermediate', 'Shallow copies share inner objects. Deep copies do not.', [
    py(`a = [1, 2]
b = a.copy()
b.append(3)
print(a)
print(b)`, 'What does this program print?', '[1, 2]\n[1, 2, 3]', ['[1, 2, 3]\n[1, 2, 3]', '[1, 2]\n[3]', '[1, 2]\n[1, 2]'], 'list.copy makes a new list. Appending to b does not change a.'),
    py(`import copy
a = [[1], [2]]
b = copy.copy(a)
b[0].append(9)
print(a)`, 'What does this program print?', '[[1, 9], [2]]', ['[[1], [2]]', '[[1, 9], [2, 9]]', '[[9], [2]]'], 'copy.copy is shallow. The outer list is new, but both lists still hold the same inner list, so the append shows up in a.'),
    py(`import copy
a = [[1], [2]]
b = copy.deepcopy(a)
b[0].append(9)
print(a)
print(b)`, 'What does this program print?', '[[1], [2]]\n[[1, 9], [2]]', ['[[1, 9], [2]]\n[[1, 9], [2]]', '[[1], [2]]\n[[1], [2]]', '[[1], [2]]\n[[9], [2]]'], 'deepcopy copies the nested lists too. Changing b leaves a untouched.'),
    py(`a = {"n": [1]}
b = a.copy()
b["n"].append(2)
b["m"] = 3
print(a)`, 'What does this program print?', "{'n': [1, 2]}", ["{'n': [1], 'm': 3}", "{'n': [1, 2], 'm': 3}", "{'n': [1]}"], 'dict.copy is shallow. The new key m stays on b, but the shared list n is changed for both names.'),
    py(`a = [[0] * 2] * 2
a[0][0] = 1
print(a)`, 'What does this program print?', '[[1, 0], [1, 0]]', ['[[1, 0], [0, 0]]', '[[1, 1], [1, 1]]', '[[0, 0], [0, 0]]'], 'Multiplying a list repeats the same inner list. Writing the first cell of row 0 also writes row 1.'),
    py(`a = [[0] * 2 for _ in range(2)]
a[0][0] = 1
print(a)`, 'What does this program print?', '[[1, 0], [0, 0]]', ['[[1, 0], [1, 0]]', '[[1, 1], [0, 0]]', '[[0, 0], [0, 0]]'], 'The comprehension builds a new inner list for each row. Only the first row changes.'),
    py(`a = [1, 2, 3]
b = a[:]
print(a is b)
print(b == a)`, 'What does this program print?', 'False\nTrue', ['True\nTrue', 'False\nFalse', 'True\nFalse'], 'A full slice copies the list, so the objects are different. The values are still equal.'),
    py(`a = (1, 2)
b = tuple([1, 2])
print(a == b)
print(a is b)`, 'What does this program print?', 'True\nFalse', ['True\nTrue', 'False\nFalse', 'False\nTrue'], '== compares the items. tuple() builds a new object, so is is false even when the two tuples hold the same numbers.'),
    py(`import copy
a = {"user": {"city": "Pune"}}
b = copy.deepcopy(a)
b["user"]["city"] = "Goa"
print(a["user"]["city"])`, 'What does this program print?', 'Pune', ['Goa', 'Error', 'None'], 'deepcopy copies the nested dict. Changing the city on b does not change a.'),
    py(`nums = [3, 1, 2]
ordered = sorted(nums)
ordered.append(4)
print(nums)`, 'What does this program print?', '[3, 1, 2]', ['[1, 2, 3, 4]', '[3, 1, 2, 4]', '[1, 2, 3]'], 'sorted already returned a separate list. Appending to that copy does not touch nums.'),
  ]),
  lesson('formatting-text', 'Formatting text', 'intermediate', 'Control decimals, padding, and thousands separators.', [
    py(`print(f"{3.14159:.2f}")
print(f"{5:03d}")`, 'What does this program print?', '3.14\n005', ['3.14\n53', '3.1\n005', '3.142\n005'], ':.2f keeps two digits after the decimal. :03d writes the integer in a field three characters wide, padded with zeros.'),
    py(`print("{name}={n}".format(name="Ada", n=2))
print("{},{}".format(1, 2))`, 'What does this program print?', 'Ada=2\n1,2', ['{name}=2\n1,2', 'Ada=2\n1 2', 'name=n\n1,2'], 'Named placeholders are filled by keyword. Empty braces are filled from left to right.'),
    py(`print("%s-%d" % ("go", 3))
print(f"{1000:,}")`, 'What does this program print?', 'go-3\n1,000', ['go-3\n1000', 'go-%d\n1,000', 'go3\n1,000'], '%s inserts text and %d inserts an integer. The comma format adds a thousands separator.'),
    py(`print(f"{'hi':>5}")
print(f"{'hi':*^5}")`, 'What does this program print?', '   hi\n*hi**', ['hi\n*hi**', '   hi\nhi***', 'hi   \n**hi*'], 'The width is 5. > pads on the left with spaces. * is the fill character and ^ centers the text.'),
    py(`print(format(255, "x"))
print(format(255, "b"))`, 'What does this program print?', 'ff\n11111111', ['255\n11111111', 'FF\n11111111', 'ff\n255'], 'The x format is lowercase hexadecimal. The b format is binary. 255 is ff and eight 1 bits.'),
    py(`print(f"{1/2:.0%}")
print(repr("a\\nb"))`, 'What does this program print?', "50%\n'a\\nb'", ['50%\na\nb', '0.50%\n\'a\\\\nb\'', '50%\n"a\\nb"'], 'A percent format multiplies by 100. repr shows the newline as a backslash and n, inside quotes, instead of breaking the line.'),
    py(`name = "Ada"
n = 3
print(f"{name!r} x{n}")`, 'What does this program print?', "'Ada' x3", ['Ada x3', '"Ada" x3', 'Ada x 3'], '!r inserts the repr of the value, so the name is shown with quotes.'),
    py(`print("{0}{1}{0}".format("a", "b"))
print("{score:.1f}".format(score=2))`, 'What does this program print?', 'aba\n2.0', ['abb\n2', 'aba\n2', 'ab\n2.0'], 'Numbered braces can reuse 0. .1f prints one decimal place, so the integer 2 becomes 2.0.'),
    py(`text = "hi"
print(f"{text:<4}|")
print(f"{text:>4}|")`, 'What does this program print?', 'hi  |\n  hi|', ['hi|\n  hi|', '  hi|\nhi  |', 'hi  |\nhi  |'], '< pads on the right and > pads on the left. The bar shows where the field of width 4 ends.'),
    py(`print(f"{21:04x}")
print(f"{21:04d}")`, 'What does this program print?', '0015\n0021', ['0015\n0015', '0021\n0021', '15\n21'], 'x writes hexadecimal, and 21 is 15 in hex. d writes decimal. Both are padded to four characters.'),
  ]),
  lesson('regular-expressions', 'Regular expressions', 'advanced', 'Find, replace, and check text with the re module.', [
    py(`import re
print(re.findall(r"\\d+", "a12 b3"))`, 'What does this program print?', "['12', '3']", ["['1', '2', '3']", "['a12', 'b3']", "['12']"], '\\\\d+ matches a run of digits. findall returns every match, so 12 and 3 are kept and the letters are not.'),
    py(`import re
print(re.sub(r"\\s+", "-", "a  b\\tc"))`, 'What does this program print?', 'a-b-c', ['a--b-c', 'a  b\\tc', 'a-b\\tc'], '\\\\s+ matches spaces and tabs. sub replaces each run with one hyphen.'),
    py(`import re
match = re.search(r"(\\w+)@(\\w+)", "ada@mail")
print(match.group(1))
print(match.group(2))`, 'What does this program print?', 'ada\nmail', ['ada@mail\nmail', 'ada\nada', 'mail\nada'], 'Parentheses capture groups. Group 1 is the text before @ and group 2 is the text after it.'),
    py(`import re
print(bool(re.fullmatch(r"\\d{3}", "123")))
print(bool(re.fullmatch(r"\\d{3}", "1234")))`, 'What does this program print?', 'True\nFalse', ['True\nTrue', 'False\nFalse', 'False\nTrue'], 'fullmatch succeeds only when the whole string matches. 123 is exactly three digits. 1234 is too long.'),
    py(`import re
print(re.split(r"[,;]", "a,b;c"))`, 'What does this program print?', "['a', 'b', 'c']", ["['a,b;c']", "['a', 'b,c']", "['a', 'b', 'c', '']"], 'The pattern matches either comma or semicolon, and split breaks the text at each one.'),
    py(`import re
print(re.sub(r"cat", "dog", "cat cat", count=1))`, 'What does this program print?', 'dog cat', ['dog dog', 'cat cat', 'dog'], 'count=1 stops after the first replacement. The second cat stays.'),
    py(`import re
print(re.findall(r"[A-Z]", "AbC"))
print(re.search(r"a+", "baaac").group())`, 'What does this program print?', "['A', 'C']\naaa", ["['A', 'b', 'C']\naaa", "['A', 'C']\na", "['b']\naaa"], '[A-Z] keeps capital letters only. a+ takes the longest run of the letter a, which is aaa.'),
    py(`import re
print(re.search(r"id=(\\d+)", "id=4;ok").group(1))
print(re.escape("a.b"))`, 'What does this program print?', '4\na\\.b', ['id=4\na.b', '4\na.b', '4\na\\\\b'], 'The capture group keeps only the digits. escape makes the dot a literal character so it will not mean "any character" in a later pattern.'),
    py(`import re
print(re.sub(r"(\\w+),(\\w+)", r"\\2 \\1", "Ada,Lin"))`, 'What does this program print?', 'Lin Ada', ['Ada Lin', 'Ada,Lin', '2 1'], '\\\\1 and \\\\2 refer to the captured groups. The replacement swaps them and puts a space between.'),
    py(`import re
print(re.findall(r"a.b", "a b a-b"))
print(len(re.findall(r"^a", "a\\na")))`, 'What does this program print?', "['a b', 'a-b']\n1", ["['a b']\n2", "['a-b']\n1", "['a b', 'a-b']\n2"], 'A dot matches the space and the hyphen. Without a multiline flag, ^ matches only at the start of the whole string, so the second a is ignored.'),
  ]),
  lesson('dates-and-times', 'Dates and times', 'intermediate', 'Calendar dates, differences, and time zones.', [
    py(`from datetime import date, timedelta
print(date(2024, 1, 31) + timedelta(days=1))`, 'What does this program print?', '2024-02-01', ['2024-01-32', '2024-02-00', '2024-01-01'], 'January has 31 days. Adding one day rolls the date into February.'),
    py(`from datetime import date
print(date(2024, 1, 1).weekday())
print(date(2024, 1, 1).strftime("%A"))`, 'What does this program print?', '0\nMonday', ['1\nMonday', '0\nSunday', '6\nMonday'], 'weekday uses Monday as 0. 1 January 2024 was a Monday, so the number is 0 and the name is Monday.'),
    py(`from datetime import datetime
dt = datetime(2024, 5, 1, 9, 5)
print(dt.strftime("%Y-%m-%d %H:%M"))`, 'What does this program print?', '2024-05-01 09:05', ['2024-5-1 9:5', '2024-05-01 9:05', '01-05-2024 09:05'], '%Y, %m, %d, %H, and %M are zero-padded. The hour and minute stay two digits.'),
    py(`from datetime import date
a = date(2024, 1, 10)
b = date(2024, 1, 1)
print((a - b).days)`, 'What does this program print?', '9', ['10', '8', '11'], 'Subtracting dates gives a timedelta. From the 1st to the 10th is 9 days, not 10.'),
    py(`from datetime import datetime
print(datetime.strptime("03/04/2024", "%d/%m/%Y").day)
print(datetime.strptime("03/04/2024", "%m/%d/%Y").day)`, 'What does this program print?', '3\n4', ['4\n3', '3\n3', '4\n4'], 'The pattern decides which number is the day. %d/%m reads 03 as the day. %m/%d reads 04 as the day.'),
    py(`from datetime import timedelta
print(timedelta(hours=26))
print(timedelta(minutes=90).seconds)`, 'What does this program print?', '1 day, 2:00:00\n5400', ['26:00:00\n90', '1 day, 2:00:00\n90', '1 day, 2:00:00\n5400\n'], '26 hours is stored as 1 day and 2 hours. seconds is the time left inside the day, and 90 minutes is 5400 seconds.'),
    py(`from datetime import date
print(date(2024, 12, 31).replace(month=1).isoformat())
print(date(2024, 2, 29).isoformat())`, 'What does this program print?', '2024-01-31\n2024-02-29', ['2024-01-01\n2024-02-29', '2024-12-01\nError', '2024-01-31\n2024-03-01'], 'replace changes only the month and keeps day 31. 2024 is a leap year, so 29 February is a real date.'),
    py(`from datetime import time
print(time(9, 30).isoformat(timespec="minutes"))`, 'What does this program print?', '09:30', ['9:30:00', '09:30:00', '9:30'], 'timespec="minutes" stops after the minute and still pads the hour.'),
    py(`from datetime import datetime, timezone, timedelta
dt = datetime(2024, 1, 1, 12, 0, tzinfo=timezone.utc)
local = dt.astimezone(timezone(timedelta(hours=5, minutes=30)))
print(local.strftime("%H:%M"))`, 'What does this program print?', '17:30', ['12:00', '05:30', '17:00'], 'India is 5 hours and 30 minutes ahead of UTC. 12:00 UTC is 17:30 in that offset.'),
    py(`from datetime import date
print(date.fromisoformat("2024-07-04").month)
print(date(2023, 2, 28).isoformat())`, 'What does this program print?', '7\n2023-02-28', ['07\n2023-02-28', '4\n2023-02-28', '7\n2023-03-01'], 'fromisoformat reads the month from the text. 2023 is not a leap year, but 28 February is still valid.'),
  ]),
  lesson('collections-tools', 'defaultdict, Counter, and deque', 'advanced', 'Counts, default values, and queues from the collections module.', [
    py(`from collections import defaultdict
counts = defaultdict(int)
counts["a"] += 1
print(counts["a"], counts["missing"])`, 'What does this program print?', '1 0', ['1 1', '1 None', 'Error'], 'defaultdict(int) creates 0 the first time a missing key is read. missing was never added, so it is 0.'),
    py(`from collections import defaultdict
groups = defaultdict(list)
groups["k"].append(1)
print(groups["k"])`, 'What does this program print?', '[1]', ['[]', 'Error', '1'], 'defaultdict(list) starts a missing key with a new list. append then adds 1 to that list.'),
    py(`from collections import deque
q = deque([1, 2])
q.appendleft(0)
print(q.pop())
print(list(q))`, 'What does this program print?', '2\n[0, 1]', ['0\n[1, 2]', '2\n[1, 2]', '0\n[0, 1]'], 'appendleft puts 0 at the front. pop removes the right end, which is still 2.'),
    py(`from collections import deque
q = deque("ab", maxlen=2)
q.append("c")
print("".join(q))`, 'What does this program print?', 'bc', ['abc', 'ab', 'ac'], 'maxlen=2 drops the oldest item when a new one is added. a falls off, leaving b and c.'),
    py(`from collections import Counter
print(Counter("abca").most_common(1)[0])
print(Counter(a=2, b=1)["a"])`, 'What does this program print?', "('a', 2)\n2", ["('b', 1)\n2", "('a', 3)\n2", "('a', 2)\n1"], 'a appears twice, so it is the most common item. A keyword Counter stores that same count under the key a.'),
    py(`from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(1, 2)
print(p.x, p[1])`, 'What does this program print?', '1 2', ['1 1', '2 2', 'Point 2'], 'A namedtuple can be read by field name or by index. y is index 1.'),
    py(`from collections import ChainMap
first = {"x": 1}
second = {"x": 2, "y": 3}
print(ChainMap(first, second)["x"], ChainMap(first, second)["y"])`, 'What does this program print?', '1 3', ['2 3', '1 2', '2 1'], 'ChainMap searches the maps from left to right. x is found in the first map. y exists only in the second.'),
    py(`from collections import Counter
counts = Counter(a=2, b=1)
counts.subtract(Counter(a=1))
print(counts["a"], counts["b"])`, 'What does this program print?', '1 1', ['2 1', '1 0', '0 1'], 'subtract removes counts. a goes from 2 to 1. b is not in the subtracted counter, so it stays 1.'),
    py(`from collections import deque
q = deque([1, 2, 3])
q.rotate(1)
print(list(q))`, 'What does this program print?', '[3, 1, 2]', ['[2, 3, 1]', '[1, 2, 3]', '[3, 2, 1]'], 'rotate(1) moves the last item to the front. 3 wraps around.'),
    py(`from collections import namedtuple
User = namedtuple("User", "name city")
print(User("Ada", "Pune")._asdict()["city"])`, 'What does this program print?', 'Pune', ['Ada', 'city', 'Error'], '_asdict turns the named fields into a dictionary. The city field is Pune.'),
  ]),
  lesson('unpacking-and-match', 'Unpacking and match', 'advanced', 'Split sequences, pass arguments, and branch on structure.', [
    py(`first, *rest = [1, 2, 3, 4]
print(first)
print(rest)`, 'What does this program print?', '1\n[2, 3, 4]', ['1\n(2, 3, 4)', '4\n[1, 2, 3]', '1\n2'], 'The star gathers every item that was not assigned to a single name. first takes 1 and rest is a list.'),
    py(`a, *mid, b = [1, 2, 3, 4]
print(a, b)
print(mid)`, 'What does this program print?', '1 4\n[2, 3]', ['1 2\n[3, 4]', '1 4\n[2, 3, 4]', '4 1\n[2, 3]'], 'a takes the first item and b takes the last. The star in the middle collects what is left.'),
    py(`def total(a, b, c):
    return a + b + c
print(total(*[1, 2, 3]))
print(total(**{"c": 1, "a": 4, "b": 2}))`, 'What does this program print?', '6\n7', ['6\n6', '123\n7', '6\nError'], 'A star passes list items as separate arguments. Two stars pass dictionary keys as keyword arguments.'),
    py(`command = "go"
match command:
    case "go":
        print("run")
    case "stop":
        print("halt")
    case _:
        print("other")`, 'What does this program print?', 'run', ['halt', 'other', 'go'], 'match compares the value with each case in order. "go" matches the first case, so the later cases are skipped.'),
    py(`point = (0, 2)
match point:
    case (0, y):
        print(y)
    case _:
        print("other")`, 'What does this program print?', '2', ['0', '(0, 2)', 'other'], 'The pattern (0, y) matches a pair whose first item is 0 and stores the second item in y.'),
    py(`user = {"name": "Ada", "role": "dev"}
match user:
    case {"role": role}:
        print(role)`, 'What does this program print?', 'dev', ['Ada', 'role', 'Error'], 'A mapping pattern matches when the key is present. It does not require the dict to contain only that key.'),
    py(`n = 0
values = []
while (n := n + 1) <= 3:
    values.append(n)
print(values)`, 'What does this program print?', '[1, 2, 3]', ['[0, 1, 2, 3]', '[1, 2]', '[0, 1, 2]'], 'The walrus assigns n before the comparison. The loop body runs for 1, 2, and 3, then 4 fails the test.'),
    py(`pairs = [(1, 2), (3, 4)]
print([a + b for a, b in pairs])`, 'What does this program print?', '[3, 7]', ['[1, 2, 3, 4]', '[3, 4]', '[2, 4]'], 'Each pair is unpacked into a and b. The sums are 1+2 and 3+4.'),
    py(`head, *_, tail = range(4)
print(head, tail)`, 'What does this program print?', '0 3', ['0 1', '1 3', '0 4'], 'range(4) is 0, 1, 2, 3. head takes 0, tail takes the last item, and the star discards the middle.'),
    py(`items = [10, 20]
a, b = items
items.append(30)
print(a, b)`, 'What does this program print?', '10 20', ['10 20 30', '20 30', 'Error'], 'Unpacking copies the current items into a and b. Later changes to the list do not change those names.'),
  ]),
  lesson('async-tasks', 'Async tasks', 'advanced', 'Coroutines, gather, and what await actually waits for.', [
    py(`import asyncio
async def main():
    return 1
print(asyncio.run(main()))`, 'What does this program print?', '1', ['<coroutine>', 'None', 'Error'], 'asyncio.run drives the coroutine until it finishes. The returned 1 is printed.'),
    py(`import asyncio
async def add(n):
    await asyncio.sleep(0)
    return n + 1
print(asyncio.run(add(2)))`, 'What does this program print?', '3', ['2', 'None', 'Error'], 'await pauses add until sleep finishes, then the function returns 2 + 1.'),
    py(`import asyncio
async def one():
    return 1
async def two():
    return 2
async def main():
    a, b = await asyncio.gather(one(), two())
    print(a + b)
asyncio.run(main())`, 'What does this program print?', '3', ['12', '1', '2'], 'gather waits for both coroutines and keeps their results in order. 1 + 2 is 3.'),
    py(`import asyncio
async def main():
    try:
        raise ValueError("no")
    except ValueError:
        print("bad")
asyncio.run(main())`, 'What does this program print?', 'bad', ['no', 'ValueError', 'Error'], 'try works inside a coroutine the same way it works in a normal function. ValueError is caught and bad is printed.'),
    py(`import asyncio
async def gen():
    yield 1
    yield 2
async def main():
    out = []
    async for n in gen():
        out.append(n)
    print(out)
asyncio.run(main())`, 'What does this program print?', '[1, 2]', ['[1]', '1\n2', 'Error'], 'async for pulls every yielded value from the async generator. Both numbers are collected.'),
    py(`import asyncio
async def main():
    task = asyncio.create_task(asyncio.sleep(0, result=5))
    print(await task)
asyncio.run(main())`, 'What does this program print?', '5', ['None', '0', 'Error'], 'sleep can return a result instead of None. await receives that result, which is 5.'),
    py(`import asyncio
async def fail():
    raise RuntimeError("x")
async def main():
    results = await asyncio.gather(asyncio.sleep(0, result=1), fail(), return_exceptions=True)
    print(results[0], type(results[1]).__name__)
asyncio.run(main())`, 'What does this program print?', '1 RuntimeError', ['1 x', 'Error', '1 None'], 'return_exceptions=True stores the error as a result instead of stopping gather. The first result is 1 and the second is the RuntimeError object.'),
    py(`import asyncio
async def main():
    print("A")
    await asyncio.sleep(0)
    print("B")
print("start")
asyncio.run(main())`, 'What does this program print?', 'start\nA\nB', ['A\nB\nstart', 'start\nB\nA', 'A\nstart\nB'], 'start prints before run enters the coroutine. Inside main, A prints before the await and B prints after it.'),
    py(`import asyncio
def blocking():
    return 4
async def main():
    print(await asyncio.to_thread(blocking))
asyncio.run(main())`, 'What does this program print?', '4', ['None', '<function>', 'Error'], 'to_thread runs a normal function and await receives its return value.'),
    py(`import asyncio
async def main():
    async with asyncio.timeout(1):
        print("in")
asyncio.run(main())`, 'What does this program print?', 'in', ['Error', '1', 'timeout'], 'The body finishes immediately, well inside the one-second limit, so timeout does not cancel it.'),
  ]),
  lesson('itertools-tools', 'itertools', 'advanced', 'Chain, group, and slice iterators without building everything by hand.', [
    py(`import itertools
print(list(itertools.accumulate([1, 2, 3, 4])))`, 'What does this program print?', '[1, 3, 6, 10]', ['[1, 2, 3, 4]', '[10]', '[4, 6, 9, 10]'], 'accumulate yields a running total. 1, then 1+2, then 3+3, then 6+4.'),
    py(`import itertools
print(list(itertools.chain([1], [2, 3], (4,))))`, 'What does this program print?', '[1, 2, 3, 4]', ['[[1], [2, 3], (4,)]', '[1, 2, 3]', '[4, 3, 2, 1]'], 'chain walks each iterable in turn and yields one flat sequence.'),
    py(`import itertools
print(list(itertools.product([0, 1], repeat=2)))`, 'What does this program print?', '[(0, 0), (0, 1), (1, 0), (1, 1)]', ['[(0, 1), (1, 0)]', '[(0, 0), (1, 1)]', '[(0, 1)]'], 'product with repeat=2 builds every pair from the two values, including the pairs of the same value.'),
    py(`import itertools
print("".join(itertools.islice("abcdef", 2, 5)))`, 'What does this program print?', 'cde', ['abc', 'cdef', 'ab'], 'islice starts at index 2 and stops before index 5. Those characters are c, d, and e.'),
    py(`import itertools
print(list(itertools.pairwise([1, 2, 3])))`, 'What does this program print?', '[(1, 2), (2, 3)]', ['[(1, 2), (2, 3), (3, 1)]', '[(1, 1), (2, 2), (3, 3)]', '[(1, 3)]'], 'pairwise yields each item with the item that follows it. The last item has no partner, so it is not a first element.'),
    py(`import itertools
text = "aaabb"
print([(k, len(list(g))) for k, g in itertools.groupby(text)])`, 'What does this program print?', "[('a', 3), ('b', 2)]", ["[('a', 3), ('b', 2), ('a', 0)]", "[('a', 1), ('b', 1)]", "[('b', 2), ('a', 3)]"], 'groupby bundles adjacent equal characters. Three a characters come before two b characters.'),
    py(`import itertools
print(list(itertools.takewhile(lambda n: n < 3, [1, 2, 3, 1])))
print(list(itertools.dropwhile(lambda n: n < 3, [1, 2, 3, 1])))`, 'What does this program print?', '[1, 2]\n[3, 1]', ['[1, 2, 1]\n[3]', '[1, 2, 3]\n[1]', '[3]\n[1, 2]'], 'takewhile stops at the first failure, so the later 1 is not included. dropwhile skips until the test fails, then keeps the rest.'),
    py(`import itertools
print(list(itertools.zip_longest([1, 2], [3], fillvalue=0)))`, 'What does this program print?', '[(1, 3), (2, 0)]', ['[(1, 3)]', '[(1, 3), (2, None)]', '[(1, 3), (0, 2)]'], 'zip_longest continues until the longer iterable ends. The missing partner is the fill value 0.'),
    py(`import itertools
print(list(itertools.batched("abcd", 3)))`, 'What does this program print?', "[('a', 'b', 'c'), ('d',)]", ["[('a', 'b', 'c', 'd')]", "[('a', 'b'), ('c', 'd')]", "[('abc',), ('d',)]"], 'batched takes items three at a time. The final group is shorter because only one character is left.'),
    py(`import itertools
print(list(itertools.compress("abcd", [1, 0, 1, 0])))`, 'What does this program print?', "['a', 'c']", ["['b', 'd']", "['a', 'b']", "['abcd']"], 'compress keeps an item when the selector in the same position is true. Positions 0 and 2 are kept.'),
  ]),
  lesson('exact-numbers', 'Exact numbers', 'intermediate', 'Decimals, fractions, and bases that binary floats do not handle cleanly.', [
    py(`from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))
print(0.1 + 0.2 == 0.3)`, 'What does this program print?', 'True\nFalse', ['True\nTrue', 'False\nFalse', 'False\nTrue'], 'Decimal built from text stores the decimal you wrote. A binary float cannot store 0.1 exactly, so the second comparison fails.'),
    py(`from fractions import Fraction
print(Fraction(1, 2) + Fraction(1, 3))
print(float(Fraction(1, 2)))`, 'What does this program print?', '5/6\n0.5', ['0.8333333333333334\n0.5', '5/6\n1/2', '2/5\n0.5'], 'Fraction adds the exact rational numbers: 1/2 + 1/3 is 5/6. float converts one half to 0.5.'),
    py(`print(int("ff", 16))
print(bin(5))
print(hex(255))`, 'What does this program print?', '255\n0b101\n0xff', ['255\n101\nff', '15\n0b101\n0xff', '255\n0b5\n0x255'], 'int reads ff as base 16. bin and hex add the 0b and 0x prefixes.'),
    py(`print(round(1.25, 1))
print(round(1.35, 1))`, 'What does this program print?', '1.2\n1.4', ['1.3\n1.4', '1.2\n1.3', '1.3\n1.3'], 'Python rounds halves toward the nearest even digit in that place. 1.25 goes to 1.2. 1.35 goes to 1.4.'),
    py(`import math
print(math.sqrt(9))
print(math.comb(5, 2))`, 'What does this program print?', '3.0\n10', ['3\n10', '3.0\n20', '9\n10'], 'sqrt returns a float, so the result is 3.0. comb(5, 2) is the number of ways to choose 2 items from 5, which is 10.'),
    py(`print(pow(2, 3, 5))
print(divmod(7, 2))`, 'What does this program print?', '3\n(3, 1)', ['8\n(3, 1)', '3\n(1, 3)', '6\n(3, 1)'], 'pow with three arguments returns 2 cubed modulo 5, which is 3. divmod returns the quotient and the remainder together.'),
    py(`print(int("1010", 2))
print(format(10, "b"))`, 'What does this program print?', '10\n1010', ['1010\n10', '2\n1010', '10\n0b1010'], 'int with base 2 reads binary text. format with b writes binary text and does not add a prefix.'),
    py(`from decimal import Decimal
print(Decimal("1.20") + Decimal("0.10"))
print(Decimal("1.20") == Decimal("1.2"))`, 'What does this program print?', '1.30\nTrue', ['1.3\nTrue', '1.30\nFalse', '1.20\nTrue'], 'The sum keeps two decimal places because 1.20 has two. Decimal equality compares the numeric value, so 1.20 and 1.2 are equal.'),
    py(`from fractions import Fraction
print(Fraction("1.5"))
print(Fraction(3, 2) == Fraction("1.5"))`, 'What does this program print?', '3/2\nTrue', ['1.5\nTrue', '3/2\nFalse', '15/10\nTrue'], 'Fraction converts 1.5 to the reduced fraction 3/2. The same value written as 3/2 compares equal.'),
    py(`print(abs(-3.5))
print(min(3, 1, 9), max(3, 1, 9))`, 'What does this program print?', '3.5\n1 9', ['-3.5\n1 9', '3.5\n3 9', '3.5\n1 3'], 'abs drops the sign and keeps the fractional part. min and max accept several arguments and return one number each.'),
  ]),
];
