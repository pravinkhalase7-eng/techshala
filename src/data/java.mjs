import { lesson, q } from './build.mjs';
import { extraLessons } from './java-extra.mjs';

const java = (code, ask, correct, wrongs, why) => q(code, ask, correct, wrongs, why);

export const track = {
  id: 'java',
  name: 'Java',
  blurb: 'A full path from main and types through streams, time, regex, and the collections library.',
  lessons: [
    lesson('first-programs', 'First programs', 'basic', 'A class, main, and the difference between print and println.', [
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world");
    }
}`, 'What does this program print?', 'Hello, world', ['Hello, world!', '"Hello, world"', 'Hello world'], 'println writes the characters between the quotes and then ends the line. The quotes are not printed.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(2 + 3 * 4);
    }
}`, 'What does this program print?', '14', ['20', '9', '24'], 'Multiplication happens before addition. 3 * 4 is 12, then 2 + 12 is 14.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(7 / 2);
    }
}`, 'What does this program print?', '3', ['3.5', '4', '3.0'], 'Both operands are ints, so / is integer division. The fractional part is discarded, leaving 3.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(7 / 2.0);
    }
}`, 'What does this program print?', '3.5', ['3', '3.50', '4'], '2.0 is a double, so the division is floating-point division and keeps the .5.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.print("Hi");
        System.out.println(" there");
    }
}`, 'What does this program print?', 'Hi there', ['Hi\nthere', 'Hithere', 'Hi  there'], 'print does not add a newline. The second call writes a space and "there" on the same line.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println("top");
        System.out.println("bottom");
    }
}`, 'What does this program print?', 'top\nbottom', ['top bottom', 'bottom\ntop', 'topbottom'], 'Statements run from top to bottom, and each println ends its line.'),
      java(`public class Main {
    public static void main(String[] args) {
        // System.out.println(1);
        System.out.println(2);
    }
}`, 'What does this program print?', '2', ['1\n2', '1', 'nothing'], 'The // comment is ignored by the compiler. Only the print of 2 remains.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println("A" + 1 + 2);
        System.out.println(1 + 2 + "A");
    }
}`, 'What does this program print?', 'A12\n3A', ['A3\n3A', 'A12\n12A', '3A\n3A'], '+ runs left to right. Once a string is involved, later values are appended as text. On the second line the ints are added before the string is seen.'),
    ]),
    lesson('types-and-variables', 'Types and variables', 'basic', 'ints, doubles, casts, and names that must be assigned.', [
      java(`public class Main {
    public static void main(String[] args) {
        int n = 5;
        double x = n;
        System.out.println(x);
    }
}`, 'What does this program print?', '5.0', ['5', '5.00', 'Error'], 'An int can be widened to a double. Printing a double whole number shows one decimal place.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = (int) 2.9;
        System.out.println(n);
    }
}`, 'What does this program print?', '2', ['3', '2.9', 'Error'], 'Casting a positive double to int truncates toward zero. 2.9 becomes 2, not 3.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = (int) -2.9;
        System.out.println(n);
    }
}`, 'What does this program print?', '-2', ['-3', '-2.9', '2'], 'Casting truncates toward zero for negatives too. -2.9 becomes -2, not -3.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(Integer.parseInt("12") + 3);
    }
}`, 'What does this program print?', '15', ['123', '12', 'Error'], 'parseInt turns the text "12" into the int 12. Adding 3 produces 15.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = Integer.MAX_VALUE;
        System.out.println(n + 1);
    }
}`, 'What does this program print?', '-2147483648', ['2147483648', '2147483647', 'Error'], 'int arithmetic wraps. One past the largest int lands on Integer.MIN_VALUE, which is -2147483648.'),
      java(`public class Main {
    public static void main(String[] args) {
        var name = "Ada";
        System.out.println(name);
    }
}`, 'What does this program print?', 'Ada', ['var', 'String', 'Error'], 'var asks the compiler to infer the type from the initializer. The value is still the string Ada.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n;
        System.out.println(n);
    }
}`, 'What happens when this program is compiled?', 'Does not compile', ['Prints 0', 'Prints null', 'Throws NullPointerException'], 'Local variables have no default value. Java refuses to compile a read of n before it is assigned.'),
      java(`public class Main {
    public static void main(String[] args) {
        final int n = 1;
        n = 2;
        System.out.println(n);
    }
}`, 'What happens when this program is compiled?', 'Does not compile', ['Prints 2', 'Prints 1', 'Prints 1 then 2'], 'final means the local variable cannot be assigned a second time. The compiler rejects n = 2.'),
    ]),
    lesson('operators', 'Operators', 'basic', 'Remainder, increment, promotion, and short-circuit logic.', [
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(7 % 2);
    }
}`, 'What does this program print?', '1', ['3', '0', '3.5'], '% is the remainder. 7 is 3 * 2 + 1, so the remainder is 1.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(-10 % 3);
    }
}`, 'What does this program print?', '-1', ['1', '2', '-2'], 'In Java the remainder takes the sign of the dividend. -10 is -3 * 3 + -1, so the result is -1.'),
      java(`public class Main {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(x++);
        System.out.println(x);
    }
}`, 'What does this program print?', '5\n6', ['6\n6', '5\n5', '6\n5'], 'x++ returns the current value, then adds 1. The first print sees 5, and the next print sees 6.'),
      java(`public class Main {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(++x);
        System.out.println(x);
    }
}`, 'What does this program print?', '6\n6', ['5\n6', '6\n7', '5\n5'], '++x adds 1 before the value is used. Both prints therefore see 6.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = 0;
        boolean ok = false && (n++ > 0);
        System.out.println(ok);
        System.out.println(n);
    }
}`, 'What does this program print?', 'false\n0', ['false\n1', 'true\n1', 'true\n0'], '&& stops when the left side is false. n++ never runs, so n stays 0 and the expression is false.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println('A' + 1);
    }
}`, 'What does this program print?', '66', ['B', 'A1', '65'], 'A char in arithmetic is promoted to int. The code point of A is 65, plus 1 is 66.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println((char) ('A' + 1));
    }
}`, 'What does this program print?', 'B', ['66', 'A', 'C'], 'The addition still happens as ints, producing 66. Casting that result back to char gives B.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(0.1 + 0.2 == 0.3);
    }
}`, 'What does this program print?', 'false', ['true', '0.3', 'Error'], 'Binary floating point cannot store these decimals exactly, so the sum is not exactly 0.3.'),
    ]),
    lesson('strings', 'Strings', 'basic', 'Indexes, immutability, and when == compares text.', [
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println("java".length());
        System.out.println("java".charAt(1));
    }
}`, 'What does this program print?', '4\na', ['4\nj', '5\na', '4\nv'], 'length is the number of characters. Indexes start at 0, so charAt(1) is the second character, a.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println("java".substring(1, 3));
    }
}`, 'What does this program print?', 'av', ['ava', 'jav', 'a'], 'substring starts at the first index and stops before the second. Indexes 1 and 2 are a and v.'),
      java(`public class Main {
    public static void main(String[] args) {
        String s = "cat";
        s.replace("c", "b");
        System.out.println(s);
    }
}`, 'What does this program print?', 'cat', ['bat', 'b', 'Error'], 'replace returns a new string. The return value is thrown away, so s still refers to "cat".'),
      java(`public class Main {
    public static void main(String[] args) {
        String s = "cat";
        s = s.replace("c", "b");
        System.out.println(s);
    }
}`, 'What does this program print?', 'bat', ['cat', 'b', 'Error'], 'The new string is stored back into s. The printed value is bat.'),
      java(`public class Main {
    public static void main(String[] args) {
        String a = new String("hi");
        String b = new String("hi");
        System.out.println(a == b);
        System.out.println(a.equals(b));
    }
}`, 'What does this program print?', 'false\ntrue', ['true\ntrue', 'false\nfalse', 'true\nfalse'], '== compares references. new String builds two objects, so == is false. equals compares the characters, so it is true.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println("ja" + "va" == "java");
    }
}`, 'What does this program print?', 'true', ['false', 'java', 'Error'], '+ binds tighter than ==, and both pieces are compile-time constants. Java folds them into the interned string "java", so == is true.'),
      java(`public class Main {
    public static void main(String[] args) {
        String a = "ja";
        String b = "va";
        System.out.println(a + b == "java");
    }
}`, 'What does this program print?', 'false', ['true', 'java', 'Error'], 'a and b are not constant variables, so a + b is a new string at runtime. == does not compare its characters, and equals would have returned true.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println("Java".equalsIgnoreCase("java"));
        System.out.println("Java".startsWith("Ja"));
    }
}`, 'What does this program print?', 'true\ntrue', ['true\nfalse', 'false\ntrue', 'false\nfalse'], 'equalsIgnoreCase ignores capitalization. startsWith is case-sensitive and "Java" does begin with "Ja".'),
    ]),
    lesson('decisions', 'Decisions', 'basic', 'if, else, switch, and conditions that stop early.', [
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(3 > 1 ? "yes" : "no");
    }
}`, 'What does this program print?', 'yes', ['no', 'true', '3 > 1'], 'The condition is true, so the ternary expression chooses the value before the colon.'),
      java(`public class Main {
    public static void main(String[] args) {
        int score = 70;
        if (score >= 90) System.out.println("A");
        else if (score >= 70) System.out.println("C");
        else System.out.println("F");
    }
}`, 'What does this program print?', 'C', ['A', 'F', 'A\nC'], '70 does not reach 90. It matches the else if, and the else is skipped.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = 15;
        if (n % 3 == 0 && n % 5 == 0) System.out.println("fizzbuzz");
        else if (n % 3 == 0) System.out.println("fizz");
        else System.out.println(n);
    }
}`, 'What does this program print?', 'fizzbuzz', ['fizz', '15', 'buzz'], '15 is divisible by both 3 and 5, so the first branch wins.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = 1;
        switch (n) {
            case 1: System.out.print("A");
            case 2: System.out.print("B"); break;
            default: System.out.print("C");
        }
    }
}`, 'What does this program print?', 'AB', ['A', 'ABC', 'B'], 'case 1 has no break, so execution falls into case 2. The break then prevents default from running.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = 2;
        String label = switch (n) {
            case 1 -> "one";
            case 2 -> "two";
            default -> "other";
        };
        System.out.println(label);
    }
}`, 'What does this program print?', 'two', ['one', 'other', '2'], 'A switch expression picks the arrow label whose case matches. 2 selects "two", and there is no fall-through.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = 0;
        if (true || n++ > 0) {
            System.out.println(n);
        }
    }
}`, 'What does this program print?', '0', ['1', 'true', 'Error'], '|| stops when the left side is true. n++ never runs, so the printed value is still 0.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = 0;
        if (n == 0) System.out.println("zero");
        else System.out.println("other");
    }
}`, 'What does this program print?', 'zero', ['other', '0', 'true'], 'The condition compares n with 0. It matches, so the first branch prints zero.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = 0;
        boolean seen = true && (n = 1) > 0;
        System.out.println(seen);
        System.out.println(n);
    }
}`, 'What does this program print?', 'true\n1', ['true\n0', 'false\n1', 'false\n0'], 'The left side of && is true, so the assignment runs. n becomes 1, the comparison is true, and seen is true.'),
    ]),
    lesson('loops', 'Loops', 'basic', 'for, while, do-while, break, and continue.', [
      java(`public class Main {
    public static void main(String[] args) {
        int s = 0;
        for (int i = 0; i < 3; i++) s += i;
        System.out.println(s);
    }
}`, 'What does this program print?', '3', ['6', '4', '2'], 'i takes 0, 1, and 2. The test i < 3 stops before 3. The sum is 3.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = 3;
        while (n > 0) n--;
        System.out.println(n);
    }
}`, 'What does this program print?', '0', ['1', '3', '-1'], 'The loop subtracts 1 while n is positive. It stops when n is 0, and that 0 is printed.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = 0;
        do {
            n++;
        } while (n < 0);
        System.out.println(n);
    }
}`, 'What does this program print?', '1', ['0', '-1', 'Error'], 'do-while runs the body before testing. n becomes 1, then n < 0 is false, so the loop stops.'),
      java(`public class Main {
    public static void main(String[] args) {
        int found = -1;
        for (int i = 0; i < 5; i++) {
            if (i == 2) {
                found = i;
                break;
            }
        }
        System.out.println(found);
    }
}`, 'What does this program print?', '2', ['5', '1', '-1'], 'break leaves the loop as soon as i is 2. found keeps that value.'),
      java(`public class Main {
    public static void main(String[] args) {
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            if (i % 2 == 0) continue;
            if (out.length() > 0) out.append(',');
            out.append(i);
        }
        System.out.println(out);
    }
}`, 'What does this program print?', '1,3', ['0,1,2,3', '0,2', '1,2,3'], 'continue skips the rest of the body for even i. Only 1 and 3 are appended.'),
      java(`public class Main {
    public static void main(String[] args) {
        int s = 0;
        for (int n : new int[]{1, 2, 3}) s += n;
        System.out.println(s);
    }
}`, 'What does this program print?', '6', ['3', '5', '123'], 'The enhanced for visits each stored number. 1 + 2 + 3 is 6.'),
      java(`public class Main {
    public static void main(String[] args) {
        int s = 0;
        for (int i = 0; i < 4; i += 2) s += i;
        System.out.println(s);
    }
}`, 'What does this program print?', '2', ['6', '4', '0'], 'i takes 0 then 2. Their sum is 2. The next step would be 4, which fails i < 4.'),
      java(`public class Main {
    public static void main(String[] args) {
        int n = 0;
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) n++;
        }
        System.out.println(n);
    }
}`, 'What does this program print?', '4', ['2', '3', '8'], 'The inner loop runs twice for each of the two outer values. That is four increments.'),
    ]),
    lesson('arrays', 'Arrays', 'intermediate', 'Fixed length, shared references, and what an array prints as.', [
      java(`public class Main {
    public static void main(String[] args) {
        int[] a = new int[3];
        System.out.println(a[0]);
        System.out.println(a.length);
    }
}`, 'What does this program print?', '0\n3', ['null\n3', '0\n2', 'Error'], 'A new int array fills every slot with 0. length is the number of slots, which is 3.'),
      java(`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3};
        System.out.println(a[1]);
        System.out.println(a[a.length - 1]);
    }
}`, 'What does this program print?', '2\n3', ['1\n3', '2\n2', '1\n2'], 'Index 1 is the second item. The last index is length - 1, which holds 3.'),
      java(`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2};
        int[] b = a;
        b[0] = 9;
        System.out.println(a[0]);
    }
}`, 'What does this program print?', '9', ['1', '2', 'Error'], 'b = a copies the reference. Both names see one array, so writing b[0] changes a[0].'),
      java(`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2};
        int[] b = a.clone();
        b[0] = 9;
        System.out.println(a[0]);
    }
}`, 'What does this program print?', '1', ['9', '2', 'Error'], 'clone copies the slots into a new array. Changing the copy leaves the original 1 in place.'),
      java(`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2};
        System.out.println(a[2]);
    }
}`, 'What happens when this program runs?', 'Throws ArrayIndexOutOfBoundsException', ['Prints 0', 'Prints null', 'Does not compile'], 'The valid indexes are 0 and 1. Index 2 is outside the array, so the program throws at runtime.'),
      java(`public class Main {
    public static void main(String[] args) {
        int[] a = {3, 1, 2};
        java.util.Arrays.sort(a);
        System.out.println(java.util.Arrays.toString(a));
    }
}`, 'What does this program print?', '[1, 2, 3]', ['[3, 1, 2]', '1 2 3', '[1,2,3]'], 'sort rearranges the same array. Arrays.toString prints the items with a comma and a space after each comma.'),
      java(`public class Main {
    public static void main(String[] args) {
        String[] words = {"ja", "va"};
        System.out.println(words[0] + words[1]);
    }
}`, 'What does this program print?', 'java', ['ja va', 'java\n', 'Error'], 'Two strings joined with + are concatenated with nothing between them.'),
      java(`public class Main {
    public static void main(String[] args) {
        int[][] grid = {{1, 2}, {3, 4}};
        System.out.println(grid[1][0]);
    }
}`, 'What does this program print?', '3', ['1', '2', '4'], 'grid[1] is the second row, {3, 4}. Index 0 of that row is 3.'),
    ]),
    lesson('methods', 'Methods', 'intermediate', 'Return values, overloading, and what a method can change.', [
      java(`public class Main {
    static int add(int a, int b) { return a + b; }
    public static void main(String[] args) {
        System.out.println(add(2, 3));
    }
}`, 'What does this program print?', '5', ['23', '2 3', 'Error'], 'add returns the sum. main prints that returned 5.'),
      java(`public class Main {
    static String f(int n) { return "int"; }
    static String f(long n) { return "long"; }
    public static void main(String[] args) {
        System.out.println(f(1));
    }
}`, 'What does this program print?', 'int', ['long', '1', 'Error'], 'The literal 1 is an int. Overload resolution prefers the int parameter over a widening conversion to long.'),
      java(`public class Main {
    static String f(Integer n) { return "Integer"; }
    static String f(int n) { return "int"; }
    public static void main(String[] args) {
        System.out.println(f(1));
    }
}`, 'What does this program print?', 'int', ['Integer', '1', 'Error'], 'When both a primitive and its wrapper match, Java chooses the primitive overload for a primitive argument.'),
      java(`public class Main {
    static void bump(int n) { n = n + 1; }
    public static void main(String[] args) {
        int n = 1;
        bump(n);
        System.out.println(n);
    }
}`, 'What does this program print?', '1', ['2', '0', 'Error'], 'Java passes the int by value. The assignment inside bump changes only the method parameter.'),
      java(`public class Main {
    static void bump(int[] a) { a[0] = 9; }
    public static void main(String[] args) {
        int[] a = {1};
        bump(a);
        System.out.println(a[0]);
    }
}`, 'What does this program print?', '9', ['1', '0', 'Error'], 'The array reference is copied, but both references point at the same array. Writing a slot is visible to the caller.'),
      java(`public class Main {
    static int fact(int n) {
        if (n <= 1) return 1;
        return n * fact(n - 1);
    }
    public static void main(String[] args) {
        System.out.println(fact(4));
    }
}`, 'What does this program print?', '24', ['10', '4', '12'], 'fact(4) is 4 * 3 * 2 * 1. The call that receives 1 returns immediately.'),
      java(`public class Main {
    static int f() {
        return 1;
        return 2;
    }
    public static void main(String[] args) {
        System.out.println(f());
    }
}`, 'What happens when this program is compiled?', 'Does not compile', ['Prints 1', 'Prints 2', 'Prints 1 then 2'], 'The second return can never run. Java rejects unreachable statements at compile time.'),
      java(`public class Main {
    static int sum(int... nums) {
        int s = 0;
        for (int n : nums) s += n;
        return s;
    }
    public static void main(String[] args) {
        System.out.println(sum(1, 2, 3));
    }
}`, 'What does this program print?', '6', ['123', '3', '1, 2, 3'], 'int... packs the arguments into an array. The loop adds 1, 2, and 3.'),
    ]),
    lesson('classes-and-objects', 'Classes and objects', 'intermediate', 'Constructors, fields, and identity versus equality.', [
      java(`class Box {
    int n;
    Box(int n) { this.n = n; }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Box(3).n);
    }
}`, 'What does this program print?', '3', ['0', 'null', 'Error'], 'this.n stores the argument on the new object. The field is then printed.'),
      java(`class Box {
    int n;
    String label;
}
public class Main {
    public static void main(String[] args) {
        Box box = new Box();
        System.out.println(box.n);
        System.out.println(box.label);
    }
}`, 'What does this program print?', '0\nnull', ['null\nnull', '0\n', 'Error'], 'Fields get defaults even when a constructor does not set them. An int defaults to 0 and a reference defaults to null.'),
      java(`class Counter {
    int n = 0;
    Counter inc() {
        n += 1;
        return this;
    }
}
public class Main {
    public static void main(String[] args) {
        Counter c = new Counter().inc().inc();
        System.out.println(c.n);
    }
}`, 'What does this program print?', '2', ['1', '0', 'Error'], 'inc returns the same object, so both calls update one counter. It was incremented twice.'),
      java(`class Bag {
    static int shared = 0;
    int own = 0;
}
public class Main {
    public static void main(String[] args) {
        Bag a = new Bag();
        Bag b = new Bag();
        a.shared = 1;
        a.own = 2;
        System.out.println(b.shared);
        System.out.println(b.own);
    }
}`, 'What does this program print?', '1\n0', ['0\n0', '1\n2', '2\n0'], 'shared belongs to the class, so every instance sees the update. own belongs to a, so b.own is still 0.'),
      java(`class Box {
    int n;
    Box(int n) { n = n; }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Box(3).n);
    }
}`, 'What does this program print?', '0', ['3', 'null', 'Error'], 'n = n assigns the parameter to itself. The field this.n is never written, so it stays at the default 0.'),
      java(`class Box {
    int n;
    Box(int n) { this.n = n; }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Box(1) == new Box(1));
    }
}`, 'What does this program print?', 'false', ['true', '1', 'Error'], '== on objects compares identity. These are two different objects, even though both store 1.'),
      java(`class Box {
    int n;
    Box(int n) { this.n = n; }
    public boolean equals(Object other) {
        return other instanceof Box box && box.n == n;
    }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Box(1).equals(new Box(1)));
    }
}`, 'What does this program print?', 'true', ['false', '1', 'Error'], 'equals is overridden to compare the stored numbers. Both boxes hold 1, so equals returns true. Pattern matching with instanceof binds the Box.'),
      java(`class Box {
    int n;
    Box() { this(2); }
    Box(int n) { this.n = n; }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Box().n);
    }
}`, 'What does this program print?', '2', ['0', 'null', 'Error'], 'The no-argument constructor calls this(2), so the field is set to 2 before the object is used.'),
    ]),
    lesson('inheritance', 'Inheritance and polymorphism', 'intermediate', 'What a call uses the object for, and what a field uses the variable for.', [
      java(`class A { String name() { return "A"; } }
class B extends A { String name() { return "B"; } }
public class Main {
    public static void main(String[] args) {
        A obj = new B();
        System.out.println(obj.name());
    }
}`, 'What does this program print?', 'B', ['A', 'AB', 'Error'], 'Instance methods are chosen from the real object. obj refers to a B, so B.name runs.'),
      java(`class A { String name = "A"; }
class B extends A { String name = "B"; }
public class Main {
    public static void main(String[] args) {
        A obj = new B();
        System.out.println(obj.name);
    }
}`, 'What does this program print?', 'A', ['B', 'AB', 'Error'], 'Fields are not polymorphic. The compiler uses the declared type of obj, which is A, so it reads A.name.'),
      java(`class A { static String name() { return "A"; } }
class B extends A { static String name() { return "B"; } }
public class Main {
    public static void main(String[] args) {
        A obj = new B();
        System.out.println(obj.name());
    }
}`, 'What does this program print?', 'A', ['B', 'AB', 'Error'], 'A static method is selected from the declared type, not the runtime object. The call uses A.name.'),
      java(`class A { String name() { return "A"; } }
class B extends A { String name() { return super.name() + "B"; } }
public class Main {
    public static void main(String[] args) {
        System.out.println(new B().name());
    }
}`, 'What does this program print?', 'AB', ['B', 'A', 'BA'], 'super.name() runs the parent method and returns A. B then appends the letter B.'),
      java(`class A { A() { System.out.print("A"); } }
class B extends A { B() { System.out.print("B"); } }
public class Main {
    public static void main(String[] args) {
        new B();
    }
}`, 'What does this program print?', 'AB', ['BA', 'B', 'A'], 'A subclass constructor calls the parent constructor first. A prints before the body of B runs.'),
      java(`class A { A(int n) {} }
class B extends A { B() {} }
public class Main {
    public static void main(String[] args) {
        new B();
    }
}`, 'What happens when this program is compiled?', 'Does not compile', ['Prints nothing', 'Prints 0', 'Throws at runtime'], 'B() inserts a call to super() with no arguments. A has no no-argument constructor, so the program does not compile.'),
      java(`class A {}
class B extends A {}
public class Main {
    public static void main(String[] args) {
        System.out.println(new B() instanceof A);
        System.out.println(new A() instanceof B);
    }
}`, 'What does this program print?', 'true\nfalse', ['true\ntrue', 'false\nfalse', 'false\ntrue'], 'A B object is also an A. An A object is not a B, because the relationship only goes from child to parent.'),
      java(`class A { String name() { return "A"; } }
class B extends A {}
public class Main {
    public static void main(String[] args) {
        System.out.println(new B().name());
    }
}`, 'What does this program print?', 'A', ['B', 'Error', 'null'], 'B does not declare name, so it inherits A.name and that method runs.'),
    ]),
    lesson('interfaces-enums-records', 'Interfaces, enums, and records', 'advanced', 'Contracts, default methods, and compact data types.', [
      java(`interface Speak { default String hi() { return "hi"; } }
class Bot implements Speak {}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Bot().hi());
    }
}`, 'What does this program print?', 'hi', ['Speak', 'null', 'Error'], 'A default method is inherited by the class. Bot does not override hi, so the interface implementation runs.'),
      java(`interface Speak { String hi(); }
public class Main {
    public static void main(String[] args) {
        Speak s = new Speak();
        System.out.println(s.hi());
    }
}`, 'What happens when this program is compiled?', 'Does not compile', ['Prints null', 'Prints hi', 'Throws at runtime'], 'An interface cannot be constructed with new. A class has to implement it first.'),
      java(`abstract class Shape { abstract int sides(); }
class Line extends Shape { int sides() { return 1; } }
public class Main {
    public static void main(String[] args) {
        System.out.println(new Line().sides());
    }
}`, 'What does this program print?', '1', ['0', 'Error', 'null'], 'Line provides the abstract method. Calling sides on a Line returns 1.'),
      java(`enum Level { BASIC, ADVANCED }
public class Main {
    public static void main(String[] args) {
        System.out.println(Level.ADVANCED.ordinal());
        System.out.println(Level.BASIC.name());
    }
}`, 'What does this program print?', '1\nBASIC', ['0\nBASIC', '2\nADVANCED', 'ADVANCED\nBASIC'], 'ordinal starts at 0, so ADVANCED is 1. name() returns the declared constant name BASIC.'),
      java(`record Point(int x, int y) {}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Point(1, 2).x());
    }
}`, 'What does this program print?', '1', ['2', 'Point[x=1, y=2]', 'Error'], 'A record generates an accessor for each component. x() returns the first value, 1.'),
      java(`record Point(int x, int y) {}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Point(1, 2).equals(new Point(1, 2)));
    }
}`, 'What does this program print?', 'true', ['false', '1', 'Error'], 'Records compare components in equals. Both points store 1 and 2, so they are equal.'),
      java(`interface Op { int apply(int n); }
public class Main {
    public static void main(String[] args) {
        Op doubleIt = (n) -> n * 2;
        System.out.println(doubleIt.apply(4));
    }
}`, 'What does this program print?', '8', ['4', '2', 'Error'], 'The lambda implements the single abstract method. apply(4) returns 4 * 2.'),
      java(`interface A { default String name() { return "A"; } }
interface B { default String name() { return "B"; } }
class C implements A, B {
    public String name() { return A.super.name(); }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new C().name());
    }
}`, 'What does this program print?', 'A', ['B', 'AB', 'Error'], 'Two default methods share a name, so C must override name. A.super.name() selects the version from interface A.'),
    ]),
    lesson('exceptions', 'Exceptions', 'advanced', 'Checked and unchecked failures, and the block that always runs.', [
      java(`public class Main {
    public static void main(String[] args) {
        try {
            System.out.println(1 / 0);
        } catch (ArithmeticException e) {
            System.out.println("zero");
        }
    }
}`, 'What does this program print?', 'zero', ['Infinity', '0', 'Error'], 'Integer division by zero throws ArithmeticException. The catch block prints zero instead.'),
      java(`public class Main {
    public static void main(String[] args) {
        try {
            System.out.println(1.0 / 0);
        } catch (ArithmeticException e) {
            System.out.println("zero");
        }
    }
}`, 'What does this program print?', 'Infinity', ['zero', '0.0', 'NaN'], 'Floating-point division by zero does not throw. The double result is Infinity, so the catch does not run.'),
      java(`public class Main {
    public static void main(String[] args) {
        String s = null;
        try {
            System.out.println(s.length());
        } catch (NullPointerException e) {
            System.out.println("null");
        }
    }
}`, 'What does this program print?', 'null', ['0', 'Error', 'blank'], 'Calling a method on null throws NullPointerException. The catch prints null.'),
      java(`public class Main {
    static int f() {
        try { return 1; }
        finally { return 2; }
    }
    public static void main(String[] args) {
        System.out.println(f());
    }
}`, 'What does this program print?', '2', ['1', '1\n2', 'Error'], 'A return inside finally replaces the pending return from try. The caller receives 2.'),
      java(`public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("run");
        } finally {
            System.out.println("end");
        }
    }
}`, 'What does this program print?', 'run\nend', ['end\nrun', 'run', 'end'], 'finally runs after the try block whether or not it succeeded. run prints, then end.'),
      java(`public class Main {
    public static void main(String[] args) {
        Thread.sleep(1);
    }
}`, 'What happens when this program is compiled?', 'Does not compile', ['Sleeps and prints nothing', 'Throws InterruptedException', 'Prints 1'], 'Thread.sleep declares the checked exception InterruptedException. main neither catches it nor declares it, so the code does not compile.'),
      java(`public class Main {
    public static void main(String[] args) {
        try {
            System.out.println(1);
            throw new RuntimeException("x");
        } catch (RuntimeException e) {
            System.out.println(2);
        }
        System.out.println(3);
    }
}`, 'What does this program print?', '1\n2\n3', ['2\n3', '1\n3', '1\n2'], '1 prints before the throw. catch prints 2, then execution continues after the try and prints 3.'),
      java(`public class Main {
    public static void main(String[] args) {
        try {
            System.out.println(Integer.parseInt("12a"));
        } catch (NumberFormatException e) {
            System.out.println("bad");
        }
    }
}`, 'What does this program print?', 'bad', ['12', '12a', '0'], 'parseInt requires the whole string to be an integer. The extra letter throws NumberFormatException, and catch prints bad.'),
    ]),
    lesson('collections', 'Collections', 'advanced', 'Lists, maps, and sets, and which of them can change.', [
      java(`public class Main {
    public static void main(String[] args) {
        var list = new java.util.ArrayList<String>();
        list.add("a");
        list.add("b");
        System.out.println(list.get(1));
        System.out.println(list.size());
    }
}`, 'What does this program print?', 'b\n2', ['a\n2', 'b\n1', 'null\n2'], 'get uses a zero-based index, so 1 is the second item. size counts both added strings.'),
      java(`public class Main {
    public static void main(String[] args) {
        var a = new java.util.ArrayList<Integer>();
        a.add(1);
        var b = a;
        b.add(2);
        System.out.println(a);
    }
}`, 'What does this program print?', '[1, 2]', ['[1]', '[2]', '1, 2'], 'b and a refer to the same list. Adding through b changes what a prints.'),
      java(`public class Main {
    public static void main(String[] args) {
        var items = java.util.List.of("a", "b");
        try {
            items.add("c");
            System.out.println("ok");
        } catch (UnsupportedOperationException e) {
            System.out.println(items.size());
        }
    }
}`, 'What does this program print?', '2', ['ok', '3', 'Error'], 'List.of returns a list that cannot be modified. add throws, and the catch prints the original size, 2.'),
      java(`public class Main {
    public static void main(String[] args) {
        var map = new java.util.HashMap<String, Integer>();
        map.put("a", 1);
        map.put("a", 2);
        System.out.println(map.get("a"));
        System.out.println(map.size());
    }
}`, 'What does this program print?', '2\n1', ['1\n2', '2\n2', '1\n1'], 'Putting the same key again replaces the value. The map still contains one entry.'),
      java(`public class Main {
    public static void main(String[] args) {
        var map = new java.util.HashMap<String, Integer>();
        System.out.println(map.get("missing"));
        System.out.println(map.getOrDefault("missing", 0));
    }
}`, 'What does this program print?', 'null\n0', ['0\n0', 'null\nnull', 'Error'], 'get returns null for a missing key. getOrDefault returns the supplied 0 instead.'),
      java(`public class Main {
    public static void main(String[] args) {
        var set = new java.util.HashSet<Integer>();
        set.add(1);
        set.add(1);
        set.add(2);
        System.out.println(set.size());
        System.out.println(set.contains(2));
    }
}`, 'What does this program print?', '2\ntrue', ['3\ntrue', '2\nfalse', '1\ntrue'], 'A set keeps one copy of each value, so the second 1 is ignored. contains reports that 2 is present.'),
      java(`public class Main {
    public static void main(String[] args) {
        var nums = new java.util.ArrayList<>(java.util.List.of(3, 1, 2));
        java.util.Collections.sort(nums);
        System.out.println(nums);
    }
}`, 'What does this program print?', '[1, 2, 3]', ['[3, 1, 2]', '[2, 1, 3]', '1, 2, 3'], 'Collections.sort orders the list in place. ArrayList prints items separated by a comma and a space.'),
      java(`public class Main {
    public static void main(String[] args) {
        var list = new java.util.ArrayList<>(java.util.List.of("a", "b", "c"));
        list.remove(0);
        System.out.println(list.get(0));
    }
}`, 'What does this program print?', 'b', ['a', 'c', '0'], 'remove(0) deletes the first item. The old second item, b, shifts into index 0.'),
    ]),
    lesson('generics-and-lambdas', 'Generics and lambdas', 'advanced', 'Typed collections, predicates, and method references.', [
      java(`public class Main {
    public static void main(String[] args) {
        java.util.List<Integer> nums = new java.util.ArrayList<>();
        nums.add(1);
        System.out.println(nums.get(0) + 1);
    }
}`, 'What does this program print?', '2', ['11', '1', 'Error'], 'The list stores Integer values. get returns 1, unboxing lets + add it, and the result is 2.'),
      java(`public class Main {
    static <T> T first(java.util.List<T> items) { return items.get(0); }
    public static void main(String[] args) {
        System.out.println(first(java.util.List.of("Ada")));
    }
}`, 'What does this program print?', 'Ada', ['T', '0', 'Error'], 'The type parameter T is inferred as String from the argument. first returns the item at index 0.'),
      java(`public class Main {
    public static void main(String[] args) {
        java.util.List<String> names = java.util.List.of("Ada");
        System.out.println(names.get(0).toUpperCase());
    }
}`, 'What does this program print?', 'ADA', ['Ada', 'ada', 'Error'], 'The list is a List of String, so get returns a String and toUpperCase can be called on it.'),
      java(`public class Main {
    public static void main(String[] args) {
        var nums = new java.util.ArrayList<>(java.util.List.of(10, 2, 1));
        nums.sort((a, b) -> a - b);
        System.out.println(nums);
    }
}`, 'What does this program print?', '[1, 2, 10]', ['[1, 10, 2]', '[10, 2, 1]', '[2, 1, 10]'], 'The lambda compares the numbers themselves. Subtracting them produces numeric order, not text order.'),
      java(`public class Main {
    public static void main(String[] args) {
        var copy = new java.util.ArrayList<>(java.util.List.of("b", "a"));
        copy.sort(String::compareTo);
        System.out.println(copy);
    }
}`, 'What does this program print?', '[a, b]', ['[b, a]', 'a, b', 'Error'], 'String::compareTo is a method reference for the comparator. It sorts the letters alphabetically.'),
      java(`public class Main {
    public static void main(String[] args) {
        java.util.function.Function<String, Integer> len = String::length;
        System.out.println(len.apply("java"));
    }
}`, 'What does this program print?', '4', ['java', '1', 'Error'], 'The method reference implements Function by calling length. "java" has 4 characters.'),
      java(`public class Main {
    public static void main(String[] args) {
        java.util.function.Predicate<Integer> even = n -> n % 2 == 0;
        System.out.println(even.test(4));
        System.out.println(even.test(5));
    }
}`, 'What does this program print?', 'true\nfalse', ['true\ntrue', 'false\nfalse', '4\n5'], 'test runs the predicate. 4 is even, so the first result is true. 5 is not even.'),
      java(`interface Op { int apply(int n); }
public class Main {
    static int run(Op op, int n) { return op.apply(n); }
    public static void main(String[] args) {
        System.out.println(run(n -> n + 1, 4));
    }
}`, 'What does this program print?', '5', ['4', '1', 'Error'], 'The lambda is passed as the Op argument. run calls it with 4, and 4 + 1 is 5.'),
    ]),
    lesson('streams-and-optional', 'Streams and Optional', 'advanced', 'Filter, map, reduce, and a value that might be absent.', [
      java(`public class Main {
    public static void main(String[] args) {
        int sum = java.util.stream.IntStream.range(1, 4).sum();
        System.out.println(sum);
    }
}`, 'What does this program print?', '6', ['10', '4', '7'], 'range stops before the end value. It yields 1, 2, and 3, and their sum is 6.'),
      java(`public class Main {
    public static void main(String[] args) {
        int sum = java.util.stream.IntStream.of(1, 2, 3).filter(n -> n % 2 == 1).sum();
        System.out.println(sum);
    }
}`, 'What does this program print?', '4', ['6', '2', '3'], 'filter keeps the odd numbers 1 and 3. Their sum is 4.'),
      java(`public class Main {
    public static void main(String[] args) {
        String text = java.util.stream.Stream.of("a", "b")
            .map(String::toUpperCase)
            .reduce("", (x, y) -> x + y);
        System.out.println(text);
    }
}`, 'What does this program print?', 'AB', ['ab', 'A B', 'a'], 'map uppercases each letter, then reduce appends them onto the empty starting string.'),
      java(`public class Main {
    public static void main(String[] args) {
        long count = java.util.stream.Stream.of(1, 2, 3, 4).filter(n -> n > 2).count();
        System.out.println(count);
    }
}`, 'What does this program print?', '2', ['4', '3', '1'], 'Only 3 and 4 are greater than 2. count reports how many items remain.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.util.Optional.of("hi").orElse("no"));
        System.out.println(java.util.Optional.empty().orElse("no"));
    }
}`, 'What does this program print?', 'hi\nno', ['hi\nhi', 'no\nno', 'hi\nnull'], 'orElse returns the stored value when one is present. An empty Optional returns the fallback "no".'),
      java(`public class Main {
    public static void main(String[] args) {
        String input = null;
        System.out.println(java.util.Optional.ofNullable(input).orElse("none"));
    }
}`, 'What does this program print?', 'none', ['null', 'Error', 'blank'], 'ofNullable accepts null and produces an empty Optional. orElse then supplies none.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(java.util.Optional.of("hi").map(String::toUpperCase).orElse("no"));
    }
}`, 'What does this program print?', 'HI', ['hi', 'no', 'Error'], 'map transforms the value inside the Optional. The uppercased text is still present, so orElse is not used.'),
      java(`public class Main {
    public static void main(String[] args) {
        int max = java.util.stream.IntStream.of(3, 1, 4).max().orElse(-1);
        System.out.println(max);
    }
}`, 'What does this program print?', '4', ['3', '1', '-1'], 'max finds 4. The stream has a value, so orElse(-1) is not used.'),
    ]),
    lesson('careful-details', 'Details that trip people up', 'advanced', 'Identity, interning, hidden fields, and cleanup.', [
      java(`public class Main {
    public static void main(String[] args) {
        Integer a = 127;
        Integer b = 127;
        System.out.println(a == b);
        Integer c = 128;
        Integer d = 128;
        System.out.println(c == d);
    }
}`, 'What does this program print?', 'true\nfalse', ['true\ntrue', 'false\nfalse', 'false\ntrue'], 'Autoboxing reuses cached Integer objects from -128 through 127. 127 is the same cached object, but 128 is not, so == becomes false.'),
      java(`public class Main {
    public static void main(String[] args) {
        Integer c = 128;
        Integer d = 128;
        System.out.println(c.equals(d));
    }
}`, 'What does this program print?', 'true', ['false', '128', 'Error'], 'equals compares the numeric values. Both objects hold 128, so equals is true even though == would be false.'),
      java(`public class Main {
    public static void main(String[] args) {
        String a = "hi";
        String b = "hi";
        System.out.println(a == b);
    }
}`, 'What does this program print?', 'true', ['false', 'hi', 'Error'], 'Identical string literals are interned. a and b refer to the same pooled object, so == is true.'),
      java(`public class Main {
    public static void main(String[] args) {
        final String a = "ja";
        final String b = "va";
        System.out.println(a + b == "java");
    }
}`, 'What does this program print?', 'true', ['false', 'java', 'Error'], 'final variables initialized with constants are constant expressions. Java folds a + b into the interned string "java" at compile time.'),
      java(`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3};
        System.out.println(a);
    }
}`, 'What does this program print?', 'A reference such as [I@1a2b3c, not the numbers', ['[1, 2, 3]', '1 2 3', 'Does not compile'], 'Printing an array uses the default object text: the type name and a hex identity. Arrays.toString is what prints the numbers.'),
      java(`class Box implements AutoCloseable {
    public void close() { System.out.print("closed"); }
}
public class Main {
    public static void main(String[] args) {
        try (Box box = new Box()) {
            System.out.print("use");
        }
    }
}`, 'What does this program print?', 'useclosed', ['closeduse', 'use', 'closed'], 'The try body runs first. close is called when the try block ends, so "closed" is printed after "use".'),
      java(`class A { int n = 1; }
class B extends A { int n = 2; }
public class Main {
    public static void main(String[] args) {
        B b = new B();
        A a = b;
        System.out.println(a.n);
        System.out.println(b.n);
    }
}`, 'What does this program print?', '1\n2', ['2\n2', '1\n1', '2\n1'], 'Both variables point at the same object, but fields are selected from the variable type. a.n reads A.n and b.n reads B.n.'),
      java(`public class Main {
    public static void main(String[] args) {
        System.out.println(Math.abs(-4));
        System.out.println(10 % 3);
    }
}`, 'What does this program print?', '4\n1', ['-4\n1', '4\n3', '4\n0'], 'abs drops the sign. 10 divided by 3 is 3 with a remainder of 1.'),
    ]),
    ...extraLessons,
  ],
};
