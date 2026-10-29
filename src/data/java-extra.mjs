import { lesson, q } from './build.mjs';

const java = (code, ask, correct, wrongs, why) => q(code, ask, correct, wrongs, why);

export const extraLessons = [
  lesson('string-methods', 'More string methods', 'intermediate', 'Search, trim, and build text. None of these calls change the original string.', [
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("  hi  ".strip());
        System.out.println("  ".isBlank());
        System.out.println("ab".repeat(3));
    }
}`, 'What does this program print?', 'hi\ntrue\nababab', ['hi\nfalse\nababab', '  hi  \ntrue\nababab', 'hi\ntrue\nabab'], 'strip removes whitespace at both ends. A string of only spaces is blank. repeat writes ab three times, and the original string is left unchanged.'),
    java(`public class Main {
    public static void main(String[] args) {
        String s = "ababa";
        System.out.println(s.indexOf("a"));
        System.out.println(s.lastIndexOf("a"));
        System.out.println(s.substring(1, 4));
    }
}`, 'What does this program print?', '0\n4\nbab', ['1\n4\nbab', '0\n4\naba', '0\n2\nbab'], 'indexOf finds the first a at position 0. lastIndexOf finds the last a at position 4. substring stops before index 4, so it keeps bab.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(String.join("-", "a", "b", "c"));
        System.out.println("Ada".transform(String::toLowerCase));
    }
}`, 'What does this program print?', 'a-b-c\nada', ['abc\nada', 'a-b-c\nAda', 'a,b,c\nada'], 'join places the separator between the parts and not after the last one. transform passes the string to toLowerCase and returns the new text.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("a.b".replace(".", "-"));
        System.out.println("a.b".replaceAll(".", "-"));
    }
}`, 'What does this program print?', 'a-b\n---', ['a-b\na-b', '---\n---', 'a-b\n--'], 'replace treats the dot as a literal character, so only that dot changes. replaceAll reads the pattern as a regular expression, and a dot matches every character.'),
    java(`public class Main {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println(s.substring(1, 4));
        System.out.println(s);
    }
}`, 'What does this program print?', 'ell\nHello', ['ell\nell', 'Hell\nHello', 'ello\nHello'], 'substring returns a new string. Printing s again shows that the original text is still Hello.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello".startsWith("He"));
        System.out.println("Hello".endsWith("lo"));
        System.out.println("Hello".contains("ll"));
    }
}`, 'What does this program print?', 'true\ntrue\ntrue', ['true\nfalse\ntrue', 'true\ntrue\nfalse', 'false\ntrue\ntrue'], 'The string starts with He, ends with lo, and contains ll in the middle. All three checks succeed.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("".isEmpty());
        System.out.println("  ".isEmpty());
        System.out.println("  ".isBlank());
    }
}`, 'What does this program print?', 'true\nfalse\ntrue', ['true\ntrue\ntrue', 'false\nfalse\ntrue', 'true\nfalse\nfalse'], 'isEmpty is true only when the length is zero. Spaces have a length, but isBlank treats a string of only whitespace as blank.'),
    java(`public class Main {
    public static void main(String[] args) {
        String s = "ababa";
        System.out.println(s.replace("a", "x"));
        System.out.println(s.replaceFirst("a", "x"));
    }
}`, 'What does this program print?', 'xbxbx\nxbaba', ['xbxbx\nxbxbx', 'xbaba\nxbaba', 'ababa\nxbaba'], 'replace changes every literal a. replaceFirst stops after the first match, so only the leading a becomes x.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("a".repeat(0).length());
        System.out.println("ab".repeat(2));
    }
}`, 'What does this program print?', '0\nabab', ['1\nabab', '0\nab', '2\nabab'], 'Repeating zero times produces an empty string, so the length is 0. Repeating ab twice concatenates it with itself.'),
    java(`public class Main {
    public static void main(String[] args) {
        String s = "Java";
        System.out.println(s.charAt(1));
        System.out.println(s.length());
    }
}`, 'What does this program print?', 'a\n4', ['J\n4', 'a\n3', 'v\n4'], 'Indexes start at 0, so charAt(1) is a. length counts every character, which is 4.'),
  ]),
  lesson('formatting-text', 'Formatting text', 'intermediate', 'Widths, bases, and a builder that can change its buffer.', [
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(String.format(java.util.Locale.US, "%.2f", 3.14159));
        System.out.println(String.format(java.util.Locale.US, "%05d", 21));
    }
}`, 'What does this program print?', '3.14\n00021', ['3.14\n21', '3.1\n00021', '3.142\n00021'], '%.2f keeps two digits after the decimal. %05d writes the integer in a field of width 5, padded on the left with zeros. Locale.US keeps the decimal point as a dot.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(new StringBuilder("abc").reverse());
    }
}`, 'What does this program print?', 'cba', ['abc', 'bca', 'abcba'], 'reverse reorders the characters in the builder. Printing the builder writes that new order, cba.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(String.format(java.util.Locale.US, "%x", 255));
        System.out.println(String.format(java.util.Locale.US, "%,d", 1000));
    }
}`, 'What does this program print?', 'ff\n1,000', ['255\n1,000', 'FF\n1000', 'ff\n1000'], '%x writes lowercase hexadecimal, and 255 is ff. %,d inserts a thousands separator, so 1000 is shown as 1,000.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(String.format(java.util.Locale.US, "|%-4s|", "hi"));
        System.out.println(String.format(java.util.Locale.US, "|%4s|", "hi"));
    }
}`, 'What does this program print?', '|hi  |\n|  hi|', ['|hi|\n|hi|', '|  hi|\n|hi  |', '|hi  |\n|hi  |'], 'The width is 4. A minus sign pads on the right, and without it the text is padded on the left. The bars show the edges of the field.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(String.format(java.util.Locale.US, "%s-%d", "go", 3));
        System.out.println(String.format(java.util.Locale.US, "%.1f", 2.0));
    }
}`, 'What does this program print?', 'go-3\n2.0', ['go-3\n2', 'go3\n2.0', '%s-%d\n2.0'], '%s inserts text and %d inserts an integer. %.1f keeps one digit after the decimal, so 2.0 is printed with that digit.'),
    java(`public class Main {
    public static void main(String[] args) {
        var sb = new StringBuilder();
        sb.append("a").append(1);
        System.out.println(sb);
        System.out.println(sb.length());
    }
}`, 'What does this program print?', 'a1\n2', ['a1\n1', 'a\n1', 'a1\n3'], 'append adds to the same builder and converts the int to text. The builder then holds two characters, a and 1.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(String.format(java.util.Locale.US, "%04x", 21));
        System.out.println(String.format(java.util.Locale.US, "%04d", 21));
    }
}`, 'What does this program print?', '0015\n0021', ['0015\n0015', '0021\n0021', '15\n21'], 'x writes hexadecimal, and 21 is 15 in hex. d writes decimal. Both results are padded to four characters.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("hi".toUpperCase(java.util.Locale.US));
        System.out.println(String.valueOf(5));
    }
}`, 'What does this program print?', 'HI\n5', ['hi\n5', 'HI\n"5"', 'HI\n5.0'], 'toUpperCase returns new text and does not print the quotes. valueOf turns the int into the characters 5.'),
    java(`public class Main {
    public static void main(String[] args) {
        var sb = new StringBuilder("ab");
        sb.insert(1, "-");
        System.out.println(sb);
    }
}`, 'What does this program print?', 'a-b', ['-ab', 'ab-', 'ab'], 'insert writes at an index and shifts the later characters right. Index 1 is between a and b.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(String.format(java.util.Locale.US, "%d%%", 50));
    }
}`, 'What does this program print?', '50%', ['50%%', '50', '%d%'], '%% is how a format string writes one percent sign. The %d is replaced by 50, then the escaped percent is printed.'),
  ]),
  lesson('dates-and-time', 'Dates and time', 'intermediate', 'Calendar arithmetic, format patterns, and a clock in another zone.', [
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.time.LocalDate.of(2024, 1, 31).plusDays(1));
    }
}`, 'What does this program print?', '2024-02-01', ['2024-01-32', '2024-02-00', '2024-01-01'], 'January has 31 days. Adding one day rolls the date into 1 February.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.time.LocalDate.of(2024, 1, 1).getDayOfWeek());
    }
}`, 'What does this program print?', 'MONDAY', ['SUNDAY', '1', 'TUESDAY'], '1 January 2024 was a Monday. getDayOfWeek prints the enum name MONDAY.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.time.LocalTime.of(9, 5));
    }
}`, 'What does this program print?', '09:05', ['9:05', '09:05:00', '9:5'], 'LocalTime prints the hour and minute with two digits each. Seconds are omitted when they are zero.'),
    java(`public class Main {
    public static void main(String[] args) {
        var a = java.time.LocalDate.of(2024, 1, 10);
        var b = java.time.LocalDate.of(2024, 1, 1);
        System.out.println(java.time.temporal.ChronoUnit.DAYS.between(b, a));
    }
}`, 'What does this program print?', '9', ['10', '8', '11'], 'between counts the days from the start date up to, but not including, the end date. From the 1st to the 10th is 9 days.'),
    java(`public class Main {
    public static void main(String[] args) {
        var dt = java.time.LocalDateTime.of(2024, 5, 1, 9, 5);
        var pattern = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        System.out.println(dt.format(pattern));
    }
}`, 'What does this program print?', '2024-05-01 09:05', ['2024-5-1 9:5', '01-05-2024 09:05', '2024-05-01 9:05'], 'yyyy, MM, dd, HH, and mm are zero-padded fields. The hour and minute stay two digits.'),
    java(`public class Main {
    public static void main(String[] args) {
        var utc = java.time.ZonedDateTime.of(2024, 1, 1, 12, 0, 0, 0, java.time.ZoneOffset.UTC);
        var kolkata = utc.withZoneSameInstant(java.time.ZoneId.of("Asia/Kolkata"));
        System.out.println(kolkata.toLocalTime());
    }
}`, 'What does this program print?', '17:30', ['12:00', '05:30', '17:00'], 'Asia/Kolkata is 5 hours and 30 minutes ahead of UTC. The same instant is 17:30 on the local clock.'),
    java(`public class Main {
    public static void main(String[] args) {
        var span = java.time.Duration.ofHours(26);
        System.out.println(span.toHours());
        System.out.println(span.toDays());
    }
}`, 'What does this program print?', '26\n1', ['26\n26', '2\n1', '1\n1'], 'toHours returns the whole duration as 26 hours. toDays counts only complete 24-hour days, so one day fits and the remaining 2 hours are left out.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.time.Year.isLeap(2024));
        System.out.println(java.time.Year.isLeap(2023));
    }
}`, 'What does this program print?', 'true\nfalse', ['true\ntrue', 'false\nfalse', 'false\ntrue'], '2024 is divisible by 4 and is a leap year. 2023 is not, so isLeap is false.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.time.LocalDate.of(2024, 12, 31).withMonth(1));
    }
}`, 'What does this program print?', '2024-01-31', ['2024-01-01', '2024-12-01', '2025-01-31'], 'withMonth changes only the month and keeps the day. Day 31 is valid in January, and the year stays 2024.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.time.LocalDate.of(2024, 1, 31).plusMonths(1));
        System.out.println(java.time.LocalDate.of(2023, 1, 31).plusMonths(1));
    }
}`, 'What does this program print?', '2024-02-29\n2023-02-28', ['2024-02-31\n2023-02-31', '2024-03-02\n2023-03-03', '2024-02-28\n2023-02-28'], 'plusMonths lands on the last valid day when the day does not exist. 2024 is a leap year, so February has 29 days. 2023 stops at 28.'),
  ]),
  lesson('regular-expressions', 'Regular expressions', 'advanced', 'Patterns, capture groups, and the difference between literal text and a pattern.', [
    java(`public class Main {
    public static void main(String[] args) {
        var matcher = java.util.regex.Pattern.compile("(\\\\w+)@(\\\\w+)").matcher("ada@mail");
        matcher.matches();
        System.out.println(matcher.group(1));
        System.out.println(matcher.group(2));
    }
}`, 'What does this program print?', 'ada\nmail', ['ada@mail\nmail', 'ada\nada', 'mail\nada'], 'Parentheses capture groups. Group 1 is the text before @ and group 2 is the text after it. matches() must run before the groups can be read.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("a12 b3".replaceAll("\\\\d+", "#"));
    }
}`, 'What does this program print?', 'a# b#', ['a## b#', 'a12 b3', '#12 #3'], '\\\\d+ matches a run of digits. replaceAll swaps each run for one hash, so both 12 and 3 are replaced.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("123".matches("\\\\d{3}"));
        System.out.println("1234".matches("\\\\d{3}"));
    }
}`, 'What does this program print?', 'true\nfalse', ['true\ntrue', 'false\nfalse', 'false\ntrue'], 'String.matches requires the whole text to match. 123 is exactly three digits. 1234 is longer, so it fails.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(String.join("|", "a,b;c".split("[,;]")));
    }
}`, 'What does this program print?', 'a|b|c', ['a,b;c', 'a|b;c', 'abc'], 'The pattern matches either a comma or a semicolon. split breaks the text at each one, and join shows the parts with bars.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("cat cat".replaceFirst("cat", "dog"));
    }
}`, 'What does this program print?', 'dog cat', ['dog dog', 'cat cat', 'dog'], 'replaceFirst stops after one match. The second cat stays as it was.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("AbC".replaceAll("[^A-Z]", ""));
        System.out.println("AbC".chars().filter(Character::isUpperCase).count());
    }
}`, 'What does this program print?', 'AC\n2', ['AbC\n2', 'AC\n3', 'b\n1'], '[^A-Z] matches everything that is not a capital letter, and replacing it with nothing leaves AC. The stream counts those same two capitals.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("Ada,Lin".replaceAll("(\\\\w+),(\\\\w+)", "$2 $1"));
    }
}`, 'What does this program print?', 'Lin Ada', ['Ada Lin', 'Ada,Lin', '$2 $1'], '$1 and $2 refer to the captured groups. The replacement swaps them and puts a space between the names.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.util.regex.Pattern.quote("a.b"));
    }
}`, 'What does this program print?', '\\Qa.b\\E', ['a.b', 'a\\.b', '\\Qa.b'], 'quote wraps the text so every character is literal in a later pattern. The dot is no longer "any character"; it sits between \\\\Q and \\\\E.'),
    java(`public class Main {
    public static void main(String[] args) {
        var matcher = java.util.regex.Pattern.compile("\\\\d+").matcher("a12 b3");
        int count = 0;
        while (matcher.find()) count++;
        System.out.println(count);
    }
}`, 'What does this program print?', '2', ['3', '1', '5'], 'find walks the text one match at a time. There are two runs of digits, 12 and 3, so the loop counts 2.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println("a.b".replace(".", "-"));
        System.out.println("a.b".replaceAll("\\\\.", "-"));
    }
}`, 'What does this program print?', 'a-b\na-b', ['a-b\n---', '---\na-b', 'a.b\na-b'], 'replace looks for a literal dot. In replaceAll the backslash makes the dot literal too, so both calls change only the dot and leave a and b.'),
  ]),
  lesson('queues-and-sorted-maps', 'Queues and sorted maps', 'advanced', 'Ends of a deque, sorted keys, and which item a priority queue gives back first.', [
    java(`public class Main {
    public static void main(String[] args) {
        var q = new java.util.ArrayDeque<Integer>();
        q.add(1);
        q.add(2);
        q.addFirst(0);
        System.out.println(q.removeLast());
        System.out.println(q);
    }
}`, 'What does this program print?', '2\n[0, 1]', ['0\n[1, 2]', '2\n[1, 2]', '0\n[0, 1]'], 'addFirst puts 0 at the front. removeLast takes the right end, which is still 2. The deque then prints the remaining items from front to back.'),
    java(`public class Main {
    public static void main(String[] args) {
        var q = new java.util.ArrayDeque<String>();
        System.out.println(q.poll());
        try {
            System.out.println(q.remove());
        } catch (java.util.NoSuchElementException e) {
            System.out.println("empty");
        }
    }
}`, 'What does this program print?', 'null\nempty', ['empty\nempty', 'null\nnull', 'Error'], 'poll returns null when the deque is empty. remove refuses the same situation and throws NoSuchElementException, so the catch prints empty.'),
    java(`public class Main {
    public static void main(String[] args) {
        var map = new java.util.TreeMap<String, Integer>();
        map.put("b", 1);
        map.put("a", 2);
        System.out.println(map.keySet());
    }
}`, 'What does this program print?', '[a, b]', ['[b, a]', '[a, b, 1, 2]', '[2, 1]'], 'TreeMap keeps keys in sorted order. a comes before b even though b was inserted first.'),
    java(`public class Main {
    public static void main(String[] args) {
        var set = new java.util.TreeSet<Integer>();
        set.add(3);
        set.add(1);
        set.add(2);
        System.out.println(set);
    }
}`, 'What does this program print?', '[1, 2, 3]', ['[3, 1, 2]', '[3, 2, 1]', '1, 2, 3'], 'TreeSet stores unique values in sorted order. Printing it walks from the smallest to the largest.'),
    java(`public class Main {
    public static void main(String[] args) {
        var q = new java.util.PriorityQueue<Integer>();
        q.add(3);
        q.add(1);
        q.add(2);
        System.out.println(q.poll());
        System.out.println(q.poll());
    }
}`, 'What does this program print?', '1\n2', ['3\n1', '1\n3', '2\n1'], 'poll removes the smallest item, not the one added first. 1 comes out, then 2. The remaining item is 3.'),
    java(`public class Main {
    public static void main(String[] args) {
        var map = new java.util.LinkedHashMap<String, Integer>();
        map.put("b", 1);
        map.put("a", 2);
        System.out.println(map.keySet());
    }
}`, 'What does this program print?', '[b, a]', ['[a, b]', '[1, 2]', '[b, a, 1, 2]'], 'LinkedHashMap remembers insertion order. b was added before a, so it is printed first.'),
    java(`public class Main {
    public static void main(String[] args) {
        var list = new java.util.LinkedList<String>();
        list.add("a");
        list.addFirst("b");
        System.out.println(list);
        System.out.println(list.getLast());
    }
}`, 'What does this program print?', '[b, a]\na', ['[a, b]\nb', '[b, a]\nb', '[a, b]\na'], 'addFirst inserts b at the front. getLast still returns a, the item that was added at the end.'),
    java(`public class Main {
    public static void main(String[] args) {
        var q = new java.util.ArrayDeque<Integer>();
        q.offer(1);
        q.offer(2);
        System.out.println(q.peek());
        System.out.println(q.size());
    }
}`, 'What does this program print?', '1\n2', ['1\n1', '2\n2', 'null\n2'], 'peek reads the front item and does not remove it. Both offered numbers are still in the deque, so the size is 2.'),
    java(`public class Main {
    public static void main(String[] args) {
        var map = new java.util.TreeMap<String, Integer>();
        map.put("b", 1);
        map.put("a", 2);
        System.out.println(map.firstKey());
        System.out.println(map.get("b"));
    }
}`, 'What does this program print?', 'a\n1', ['b\n1', 'a\n2', 'b\n2'], 'firstKey is the smallest key, which is a. get("b") returns the value stored for b, which is 1.'),
    java(`public class Main {
    public static void main(String[] args) {
        var set = new java.util.TreeSet<Integer>();
        set.add(3);
        set.add(1);
        set.add(2);
        System.out.println(set.first());
        System.out.println(set.last());
    }
}`, 'What does this program print?', '1\n3', ['3\n1', '1\n2', '2\n3'], 'first is the smallest value and last is the largest. The order they were added does not change that.'),
  ]),
  lesson('streams-in-practice', 'Streams in practice', 'advanced', 'Filter, flatten a pipeline, and collect a result you can print.', [
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.util.stream.Stream.of("b", "a", "b").distinct().sorted().toList());
    }
}`, 'What does this program print?', '[a, b]', ['[b, a, b]', '[b, a]', '[a, b, b]'], 'distinct drops the repeated b. sorted then orders the remaining letters, and toList prints them in a list.'),
    java(`public class Main {
    public static void main(String[] args) {
        int sum = java.util.stream.IntStream.rangeClosed(1, 5)
            .filter(n -> n % 2 == 0)
            .map(n -> n * 10)
            .sum();
        System.out.println(sum);
    }
}`, 'What does this program print?', '60', ['40', '150', '20'], 'rangeClosed includes 5. The even numbers are 2 and 4, and multiplying each by 10 gives 20 + 40.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.util.stream.Stream.of("a", "c").reduce("", (x, y) -> x + y));
    }
}`, 'What does this program print?', 'ac', ['a', 'ca', 'a c'], 'reduce starts from the empty string and appends each item. a is appended first, then c.'),
    java(`public class Main {
    public static void main(String[] args) {
        long count = java.util.stream.Stream.of(1, 2, 3)
            .map(n -> n * n)
            .filter(n -> n > 1)
            .count();
        System.out.println(count);
    }
}`, 'What does this program print?', '2', ['3', '1', '4'], 'The squares are 1, 4, and 9. Only 4 and 9 are greater than 1, so count is 2.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.util.stream.Stream.of(2, 4, 6).allMatch(n -> n % 2 == 0));
        System.out.println(java.util.stream.Stream.of(1, 2).anyMatch(n -> n > 5));
    }
}`, 'What does this program print?', 'true\nfalse', ['true\ntrue', 'false\nfalse', 'false\ntrue'], 'allMatch is true because every number is even. anyMatch is false because neither 1 nor 2 is greater than 5.'),
    java(`public class Main {
    public static void main(String[] args) {
        String text = java.util.stream.Stream.of("a", "b")
            .collect(java.util.stream.Collectors.joining("-"));
        System.out.println(text);
    }
}`, 'What does this program print?', 'a-b', ['ab', 'a-b-', '-a-b'], 'joining places the separator between items. There is no extra hyphen before a or after b.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.util.stream.Stream.of(3, 1, 2).min(Integer::compare).orElseThrow());
    }
}`, 'What does this program print?', '1', ['3', '2', '6'], 'min uses the comparator to find the smallest number. The stream has a value, so orElseThrow is not used.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.util.stream.Stream.of(1, 2).map(n -> n + 1).toList());
    }
}`, 'What does this program print?', '[2, 3]', ['[1, 2]', '[3, 4]', '2, 3'], 'map adds 1 to each item and keeps the order. toList prints the results with a comma and a space.'),
    java(`public class Main {
    public static void main(String[] args) {
        String name = java.util.stream.Stream.of("Lin", "Ada")
            .filter(s -> s.startsWith("L"))
            .findFirst()
            .orElse("none");
        System.out.println(name);
    }
}`, 'What does this program print?', 'Lin', ['Ada', 'none', 'Lin Ada'], 'filter keeps names that start with L. findFirst returns the first one that remains, which is Lin.'),
    java(`public class Main {
    public static void main(String[] args) {
        int sum = java.util.stream.Stream.of(1, 2, 3).mapToInt(n -> n * 2).sum();
        System.out.println(sum);
    }
}`, 'What does this program print?', '12', ['6', '123', '8'], 'mapToInt doubles each number, producing 2, 4, and 6. Their sum is 12.'),
  ]),
  lesson('initialization-order', 'Initialization order', 'advanced', 'Static blocks once, instance blocks on every object, and fields that are still zero.', [
    java(`class Parent {
    static { System.out.print("S"); }
    { System.out.print("I"); }
    Parent() { System.out.print("C"); }
}
public class Main {
    public static void main(String[] args) {
        new Parent();
        new Parent();
    }
}`, 'What does this program print?', 'SICIC', ['SICSIC', 'ICIC', 'SCICIC'], 'The static block runs once, the first time the class is used. Each new object then runs the instance block and the constructor, so the rest is IC twice.'),
    java(`class Demo {
    { System.out.print("i"); }
    Demo() { System.out.print("c"); }
}
public class Main {
    public static void main(String[] args) {
        new Demo();
    }
}`, 'What does this program print?', 'ic', ['ci', 'i', 'c'], 'Instance initializers run after the superclass constructor and before the constructor body. i prints, then c.'),
    java(`class Parent {
    int value = show();
    int show() { return 1; }
}
class Child extends Parent {
    int extra = 5;
    int show() { return extra; }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Child().value);
    }
}`, 'What does this program print?', '0', ['5', '1', 'Error'], 'Parent initializes value by calling show before Child has assigned extra. The override runs, but extra is still the default 0, so value becomes 0.'),
    java(`class Parent {
    Parent() { System.out.print("P"); }
}
class Child extends Parent {
    Child() { System.out.print("C"); }
}
public class Main {
    public static void main(String[] args) {
        new Child();
    }
}`, 'What does this program print?', 'PC', ['CP', 'C', 'P'], 'A constructor calls its superclass constructor first, even when super() is not written. P prints, then the child body prints C.'),
    java(`class Box {
    int n = 1;
    { n = 2; }
    Box() { n = 3; }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Box().n);
    }
}`, 'What does this program print?', '3', ['1', '2', '6'], 'The field starts at 1, the instance block changes it to 2, and the constructor body runs last and sets 3. The printed value is the last assignment.'),
    java(`class Demo {
    static int count = 0;
    static { count = 1; }
    Demo() { count += 1; }
}
public class Main {
    public static void main(String[] args) {
        new Demo();
        new Demo();
        System.out.println(Demo.count);
    }
}`, 'What does this program print?', '3', ['2', '1', '4'], 'The static block sets count to 1 once. Each constructor adds 1, so two objects leave the count at 3.'),
    java(`class Parent {
    Parent() { System.out.print("P"); }
}
class Child extends Parent {
    { System.out.print("I"); }
    Child() { System.out.print("C"); }
}
public class Main {
    public static void main(String[] args) {
        new Child();
    }
}`, 'What does this program print?', 'PIC', ['IPC', 'PCI', 'ICP'], 'super() runs the parent constructor before the child instance block. The order is parent body, then the child initializer, then the child body.'),
    java(`class Parent {
    static { System.out.print("P"); }
}
class Child extends Parent {
    static { System.out.print("C"); }
}
public class Main {
    public static void main(String[] args) {
        new Child();
    }
}`, 'What does this program print?', 'PC', ['CP', 'P', 'C'], 'Loading Child also loads Parent. Parent static initializers run before Child static initializers. The constructors print nothing.'),
    java(`class A {
    int value = 5;
    int shown() { return value; }
}
class B extends A {
    int value = 9;
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new B().shown());
    }
}`, 'What does this program print?', '5', ['9', '0', '14'], 'shown is declared in A and was not overridden. A field read uses the field in the class that contains the method, so the result is A value, 5.'),
    java(`class A {
    int value = 5;
    int shown() { return value; }
}
class B extends A {
    int value = 9;
    int shown() { return value; }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new B().shown());
    }
}`, 'What does this program print?', '9', ['5', '0', '14'], 'B overrides shown. After the object is fully built, B.value is 9, and the override returns that field.'),
  ]),
  lesson('numbers-and-math', 'Numbers and math', 'intermediate', 'Bases, big integers, rounding, and values the int cache does not share.', [
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(Integer.parseInt("ff", 16));
        System.out.println(Integer.toBinaryString(5));
    }
}`, 'What does this program print?', '255\n101', ['255\n0b101', '15\n101', 'ff\n101'], 'parseInt reads ff as base 16, which is 255. toBinaryString writes 5 in binary and does not add a 0b prefix.'),
    java(`public class Main {
    public static void main(String[] args) {
        var n = new java.math.BigInteger("2");
        System.out.println(n.pow(3));
        System.out.println(n.pow(3).mod(java.math.BigInteger.valueOf(5)));
    }
}`, 'What does this program print?', '8\n3', ['6\n3', '8\n8', '2\n3'], 'pow(3) is 2 cubed, which is 8. 8 divided by 5 leaves a remainder of 3, and mod returns that remainder.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(Math.round(2.5));
        System.out.println(Math.round(-2.5));
    }
}`, 'What does this program print?', '3\n-2', ['3\n-3', '2\n-2', '2\n-3'], 'Math.round adds 0.5 and then floors. 2.5 becomes 3. -2.5 becomes -2, so a tie moves toward positive infinity.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(-3 / 2);
        System.out.println(Math.floorDiv(-3, 2));
    }
}`, 'What does this program print?', '-1\n-2', ['-1\n-1', '-2\n-2', '-1.5\n-2'], 'int division truncates toward zero, so -3 / 2 is -1. floorDiv goes down instead, and the next lower integer is -2.'),
    java(`public class Main {
    public static void main(String[] args) {
        Integer a = 1000;
        Integer b = 1000;
        System.out.println(a == b);
        System.out.println(a.equals(b));
    }
}`, 'What does this program print?', 'false\ntrue', ['true\ntrue', 'false\nfalse', 'true\nfalse'], '== compares object identity. 1000 is outside the cached range, so these are two objects. equals compares the numeric value, which matches.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(Double.compare(0.1 + 0.2, 0.3) == 0);
    }
}`, 'What does this program print?', 'false', ['true', '0', '0.3'], '0.1 and 0.2 cannot be stored exactly in binary. Their sum is not the same double as 0.3, so compare does not return 0.'),
    java(`public class Main {
    public static void main(String[] args) {
        Integer a = 100;
        Integer b = 100;
        System.out.println(a == b);
        System.out.println(a.equals(b));
    }
}`, 'What does this program print?', 'true\ntrue', ['false\ntrue', 'true\nfalse', 'false\nfalse'], 'Integers from -128 through 127 are cached. Both variables point at the same cached 100, so == and equals are true.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(Integer.toHexString(255));
        System.out.println(Integer.toBinaryString(10));
    }
}`, 'What does this program print?', 'ff\n1010', ['FF\n1010', '255\n10', '0xff\n0b1010'], 'toHexString writes lowercase hex without a prefix. toBinaryString writes the bits of 10, which are 1010.'),
    java(`public class Main {
    public static void main(String[] args) {
        System.out.println(Math.abs(-3));
        System.out.println(Math.max(3, 9));
    }
}`, 'What does this program print?', '3\n9', ['-3\n9', '3\n3', '3\n12'], 'abs drops the sign. max returns the larger of the two arguments, which is 9.'),
    java(`public class Main {
    public static void main(String[] args) {
        var sum = new java.math.BigDecimal("0.1").add(new java.math.BigDecimal("0.2"));
        System.out.println(sum.equals(new java.math.BigDecimal("0.3")));
        System.out.println(0.1 + 0.2 == 0.3);
    }
}`, 'What does this program print?', 'true\nfalse', ['true\ntrue', 'false\nfalse', 'false\ntrue'], 'BigDecimal built from text adds the decimal values you wrote, so the sum equals 0.3. The same addition with doubles is not exact.'),
  ]),
  lesson('enums-in-practice', 'Enums in practice', 'advanced', 'Constants with data, behavior, and an order you can compare.', [
    java(`enum Level {
    LOW(1), HIGH(2);
    final int rank;
    Level(int rank) { this.rank = rank; }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(Level.valueOf("LOW"));
        System.out.println(Level.values().length);
        System.out.println(Level.HIGH.rank);
    }
}`, 'What does this program print?', 'LOW\n2\n2', ['1\n2\n2', 'LOW\n1\n2', 'HIGH\n2\n1'], 'valueOf finds the constant by its declared name. values() contains both constants. HIGH was constructed with rank 2.'),
    java(`enum Op {
    ADD { int apply(int a, int b) { return a + b; } },
    MUL { int apply(int a, int b) { return a * b; } };
    abstract int apply(int a, int b);
}
public class Main {
    public static void main(String[] args) {
        System.out.println(Op.ADD.apply(2, 3));
        System.out.println(Op.MUL.apply(2, 3));
    }
}`, 'What does this program print?', '5\n6', ['2\n3', '5\n5', '6\n5'], 'Each constant supplies its own apply. ADD returns 2 + 3, and MUL returns 2 * 3.'),
    java(`enum Level { LOW, MID, HIGH }
public class Main {
    public static void main(String[] args) {
        System.out.println(Level.LOW.compareTo(Level.HIGH));
        System.out.println(Level.MID.ordinal());
    }
}`, 'What does this program print?', '-2\n1', ['1\n1', '-2\n2', '0\n1'], 'compareTo subtracts ordinals. LOW is 0 and HIGH is 2, so the difference is -2. MID is the second constant, and its ordinal is 1.'),
    java(`public class Main {
    public static void main(String[] args) {
        int n = 2;
        System.out.println(switch (n) {
            case 1 -> "one";
            case 2 -> "two";
            default -> "other";
        });
    }
}`, 'What does this program print?', 'two', ['one', 'other', '2'], 'The switch expression selects the arm whose case matches n. 2 selects two, and the other arms are skipped.'),
    java(`enum App { INSTANCE }
public class Main {
    public static void main(String[] args) {
        System.out.println(App.INSTANCE == App.valueOf("INSTANCE"));
    }
}`, 'What does this program print?', 'true', ['false', 'INSTANCE', 'Error'], 'Each enum constant exists once. valueOf returns that same constant, so == is true.'),
    java(`enum Color { RED, BLUE }
public class Main {
    public static void main(String[] args) {
        System.out.println(Color.RED == Color.valueOf("RED"));
        System.out.println(Color.values()[1]);
    }
}`, 'What does this program print?', 'true\nBLUE', ['true\nRED', 'false\nBLUE', 'RED\nBLUE'], 'valueOf("RED") is the same constant as Color.RED. values() is in declaration order, so index 1 is BLUE.'),
    java(`enum Size { S, M, L }
public class Main {
    public static void main(String[] args) {
        System.out.println(Size.S.ordinal() < Size.L.ordinal());
        System.out.println(Size.L.ordinal());
    }
}`, 'What does this program print?', 'true\n2', ['true\n3', 'false\n2', 'true\n1'], 'Ordinals follow the source order, starting at 0. S is before L, and L is the third constant, so its ordinal is 2.'),
    java(`enum Level {
    A, B;
    Level() { System.out.print(name()); }
}
public class Main {
    public static void main(String[] args) {
        System.out.print(Level.B.ordinal());
    }
}`, 'What does this program print?', 'AB1', ['B1', '1', 'BA1'], 'Enum constructors run in declaration order when the enum is first used. A is created, then B, and only then does main print the ordinal of B, which is 1.'),
    java(`enum Level { LOW, HIGH }
public class Main {
    public static void main(String[] args) {
        Level level = Level.HIGH;
        System.out.println(level.name());
        System.out.println(level.ordinal());
    }
}`, 'What does this program print?', 'HIGH\n1', ['HIGH\n2', 'LOW\n0', '1\nHIGH'], 'name() returns the declared name. HIGH is the second constant, so its ordinal is 1.'),
    java(`enum Mode { ON, OFF }
public class Main {
    public static void main(String[] args) {
        System.out.println(Mode.values().length);
        System.out.println(Mode.valueOf("OFF") == Mode.OFF);
    }
}`, 'What does this program print?', '2\ntrue', ['2\nfalse', '1\ntrue', 'OFF\ntrue'], 'There are two constants, so the array length is 2. valueOf returns the existing OFF constant, and == confirms it is the same object.'),
  ]),
  lesson('ordering-and-records', 'Ordering and records', 'advanced', 'Sort by a field, print a record, and let a compact constructor fix a value.', [
    java(`record Score(String name, int score) implements Comparable<Score> {
    public int compareTo(Score other) {
        return Integer.compare(other.score, this.score);
    }
}
public class Main {
    public static void main(String[] args) {
        var items = new java.util.ArrayList<Score>();
        items.add(new Score("Ada", 2));
        items.add(new Score("Lin", 5));
        java.util.Collections.sort(items);
        System.out.println(items.get(0).name());
    }
}`, 'What does this program print?', 'Lin', ['Ada', '5', '2'], 'compareTo puts the higher score first because it compares the other score with this score. Lin has 5, so Lin is first after the sort.'),
    java(`record Point(int x, int y) {}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Point(1, 2));
    }
}`, 'What does this program print?', 'Point[x=1, y=2]', ['(1, 2)', 'Point(1, 2)', '1,2'], 'A record generates toString from its name and components. The fields are printed in declaration order inside square brackets.'),
    java(`record Point(int x, int y) {
    public Point {
        if (x < 0) x = 0;
    }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Point(-3, 2).x());
    }
}`, 'What does this program print?', '0', ['-3', '2', 'Error'], 'The compact constructor can replace a component before it is stored. A negative x is stored as 0, and y is left at 2.'),
    java(`record User(String name, int age) {}
public class Main {
    public static void main(String[] args) {
        var users = new java.util.ArrayList<User>();
        users.add(new User("Lin", 30));
        users.add(new User("Ada", 30));
        users.add(new User("Bea", 20));
        users.sort(java.util.Comparator.comparingInt(User::age).thenComparing(User::name));
        System.out.println(users.get(0).name());
        System.out.println(users.get(1).name());
    }
}`, 'What does this program print?', 'Bea\nAda', ['Lin\nAda', 'Ada\nBea', 'Bea\nLin'], 'comparingInt orders by age first, so Bea at 20 comes first. Ada and Lin share age 30, and thenComparing puts Ada before Lin by name.'),
    java(`public class Main {
    public static void main(String[] args) {
        var nums = new java.util.ArrayList<>(java.util.List.of(1, 3, 2));
        nums.sort(java.util.Comparator.reverseOrder());
        System.out.println(nums);
    }
}`, 'What does this program print?', '[3, 2, 1]', ['[1, 2, 3]', '[1, 3, 2]', '[2, 3, 1]'], 'reverseOrder sorts from largest to smallest. The list prints with a comma and a space between items.'),
    java(`record Point(int x, int y) {}
public class Main {
    public static void main(String[] args) {
        var a = new Point(1, 2);
        var b = new Point(1, 2);
        System.out.println(a.equals(b));
        System.out.println(a.hashCode() == b.hashCode());
    }
}`, 'What does this program print?', 'true\ntrue', ['false\nfalse', 'true\nfalse', 'false\ntrue'], 'Records with the same components are equal, and equal records share a hash code. These two points both store 1 and 2.'),
    java(`record Point(int x, int y) {}
public class Main {
    public static void main(String[] args) {
        var p = new Point(1, 2);
        System.out.println(p.x() + p.y());
    }
}`, 'What does this program print?', '3', ['1', '2', 'Point[x=1, y=2]'], 'The generated accessors return the components. x() is 1, y() is 2, and their sum is 3.'),
    java(`record Point(int x, int y) {
    public Point {
        if (x < 0) x = 0;
    }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Point(4, -1));
    }
}`, 'What does this program print?', 'Point[x=4, y=-1]', ['Point[x=4, y=0]', 'Point[x=0, y=-1]', 'Point[x=0, y=0]'], 'The compact constructor changes x only when x is negative. 4 stays 4, and y is not checked, so it stays -1.'),
    java(`record Point(int x, int y) {}
public class Main {
    public static void main(String[] args) {
        var moved = new Point(1, 9);
        System.out.println(new Point(1, 2).equals(moved));
        System.out.println(moved);
    }
}`, 'What does this program print?', 'false\nPoint[x=1, y=9]', ['true\nPoint[x=1, y=9]', 'false\nPoint[x=1, y=2]', 'false\n1'], 'equals requires every component to match, so a different y makes the points unequal. The new point keeps x as 1 and stores 9 as y.'),
    java(`record Word(String text) implements Comparable<Word> {
    public int compareTo(Word other) {
        return text.length() - other.text.length();
    }
}
public class Main {
    public static void main(String[] args) {
        var words = new java.util.ArrayList<Word>();
        words.add(new Word("ccc"));
        words.add(new Word("a"));
        java.util.Collections.sort(words);
        System.out.println(words.get(0).text());
    }
}`, 'What does this program print?', 'a', ['ccc', '1', '3'], 'compareTo orders by length, shorter first. a has length 1 and ccc has length 3, so a is first after the sort.'),
  ]),
];
