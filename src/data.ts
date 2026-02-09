// JavaScript Cheatsheet - Comprehensive TOC
// 28 Topics organized into 9 main categories

export const cheatsheet = {

  // =================================================
  // BASIC JAVASCRIPT
  // =================================================
  basic: {
    title: "Basic JavaScript",
    pages: [
      {
        slug: "fundamentals",
        title: "Fundamentals",
        content: `
### Introduction to JavaScript
JavaScript is a programming language used to add behavior and interactivity to web pages. It runs inside the browser and can also run on servers using environments like Node.js.

JavaScript is dynamically typed, single-threaded, and interpreted at runtime.



### Linking a JavaScript File
JavaScript can be written inside HTML or in a separate .js file.

External file (recommended):

\`\`\`js
<script src="script.js"></script>
\`\`\`

Place the script tag at the end of <body>, or use defer in <head>. This ensures HTML loads before JavaScript runs.

### Using the Console
The browser console is used for debugging and testing code. Open console: Right click → Inspect → Console (or press F12).

\`\`\`js
console.log("Testing");
\`\`\`

The console does not affect program execution — it only shows output.

### console.log()
console.log() prints values to the console.

\`\`\`js
let x = 10;
console.log(x); //10
\`\`\`

Useful for debugging, checking variables, and understanding program flow.

### alert()
Shows a popup message.

\`\`\`js
alert("Welcome!");
\`\`\`

### prompt()
Takes user input as a string.

\`\`\`js
let name = prompt("Enter your name");
\`\`\`

### Single-line Comments
Comments explain code and are ignored by JavaScript.

\`\`\`js
// This is a comment
\`\`\`

### Multi-line Comments
Multi-line comments span multiple lines.

\`\`\`js
/*
This is
a multi-line comment
*/
\`\`\`

### Identifier Rules
Identifiers are names for variables, functions, and objects.

Rules:
• Must start with letter, _, or $
• Cannot start with number
• Cannot use reserved keywords
• Case-sensitive

\`\`\`js
let userName;  // valid
let _count;    // valid
let $value;    // valid
let 2name;     // invalid
let let;       // invalid (reserved keyword)
\`\`\`

### Strict Mode
Strict mode makes JavaScript safer by preventing common mistakes.

\`\`\`js
"use strict";

x = 10; // Error: must declare variable
\`\`\`

Without strict mode, this would create a global variable. Strict mode helps catch bugs early.

        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
      },
      {
        slug: "variables-and-data-types",
        title: "Variables & Data Types",
        content: `
### Variables
Variables store data in memory so it can be used later in a program. In JavaScript, variables are declared using let, const, or var (older, mostly avoided).

\`\`\`js
let age = 21;
const color = "purple";
\`\`\`

### let vs const vs var
let: Block-scoped and can be reassigned.

\`\`\`js
let score = 10;
score = 20;
\`\`\`

const: Block-scoped and cannot be reassigned.

\`\`\`js
const pi = 3.14;

// Important
const arr = [1, 2];
arr.push(3); // allowed
\`\`\`

The reference cannot change, but contents can.

> **Tip:** Use \`const\` by default for values that won't be reassigned. This makes your code more predictable and easier to understand.

var: Function-scoped and hoisted. Avoid in modern JavaScript.

> **Warning:** Avoid using \`var\` in modern JavaScript. It has function scope instead of block scope, which can lead to unexpected bugs.

### Data Types in JavaScript
JavaScript has two main categories:

**Primitive Types:** string, number, boolean, null, undefined, bigint, symbol.

\`\`\`js
let name = "Sam";
let age = 20;
let isStudent = true;
let value = null;
let data;
\`\`\`

**Reference Types:** Objects, Arrays, Functions.

\`\`\`js
let user = { name: "Sam" };
let nums = [1, 2, 3];
\`\`\`

### NaN (Not a Number)
NaN represents an invalid numeric result.

\`\`\`js
Number("hello"); // NaN
0 / 0;           // NaN

// Check using:
Number.isNaN(value);
\`\`\`

### null vs undefined
undefined — A variable declared but not assigned.

\`\`\`js
let x;
console.log(x); // undefined
\`\`\`

null — Represents an intentional empty value.

\`\`\`js
let data = null;
\`\`\`

### Type Checking
Use typeof to check types.

\`\`\`js
typeof "hello"   // "string"
typeof 10        // "number"
typeof true      // "boolean"
typeof undefined // "undefined"
typeof null      // "object" (historical bug)
\`\`\`

### Truthy and Falsy Values
Falsy values: false, 0, "", null, undefined, NaN. Everything else is truthy.

\`\`\`js
if ("hello") {
  console.log("runs");
}
\`\`\`

### Variable Summary
let → Block scope, reassignable, recommended. const → Block scope, not reassignable, recommended. var → Function scope, reassignable, avoid.

**Tip:** Use const by default. Use let only when reassignment is needed. Avoid var.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types"
      },
      {
        slug: "operators",
        title: "Operators",
        content: `
### Operators
Operators are symbols used to perform operations on values and variables.

\`\`\`js
5 + 2
age > 18
x += 1
\`\`\`

### Arithmetic Operators
Arithmetic operators perform mathematical calculations.

\`\`\`js
+   Addition        5 + 2   → 7
-   Subtraction     5 - 2   → 3
*   Multiplication  5 * 2   → 10
/   Division        5 / 2   → 2.5
%   Modulus         5 % 2   → 1
**  Exponent        2 ** 3  → 8

let result = 10 + 5;
\`\`\`

### Assignment Operators
Assignment operators assign values to variables.

\`\`\`js
=   assign          x = 5
+=  add assign      x += 2  → x = x + 2
-=  subtract        x -= 2  → x = x - 2
*=  multiply        x *= 2  → x = x * 2
/=  divide          x /= 2  → x = x / 2
%=  modulus         x %= 2

let x = 5;
x += 3; // 8
\`\`\`

### Unary Operators
Unary operators work on a single operand.

\`\`\`js
++  increment
--  decrement
+   convert to number
-   negation

let x = 5;
x++; // 6
\`\`\`

**Prefix vs postfix:**
\`\`\`js
++x  // increment first, then use
x++  // use first, then increment
\`\`\`

### Comparison Operators
Comparison operators compare values and return true or false.

\`\`\`js
===  strict equal       5 === "5"  → false
!=   not equal          5 != 4     → true
!==  strict not equal   5 !== "5"  → true
>    greater than       10 > 5     → true
<    less than          5 < 10     → true
>=   greater or equal   5 >= 5     → true
<=   less or equal      5 <= 5     → true
\`\`\`

Use === instead of == to avoid type coercion issues.

### Comparison for Non-Numbers
Strings are compared lexicographically.

\`\`\`js
"a" < "b" // true
"A" < "a" // true
\`\`\`

**Booleans:**
\`\`\`js
true == 1   // true
false == 0  // true
\`\`\`

### Logical Operators
Logical operators combine conditions (AND, OR, NOT).

\`\`\`js
true && false // false
true || false // true
!true         // false
\`\`\`

### Ternary Operator
Short form of if-else. Syntax: \`condition ? value1 : value2\`

\`\`\`js
let status = age > 18 ? "Adult" : "Minor";
\`\`\`

### Operator Precedence
Operator precedence determines the order of execution.

\`\`\`js
2 + 3 * 4 // result is 14

(2 + 3) * 4  // result is 20
\`\`\`

**Logical Precedence:** Order is ! then && then ||.

\`\`\`js
true || false && false // result is true
\`\`\`

**Tip:** Use parentheses when combining multiple operators to avoid confusion.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators"
      },
      {
        slug: "control-flow",
        title: "Control Flow",
        content: `
### Control Flow
Control flow statements allow programs to execute different blocks of code based on conditions. Examples: if/else, switch, nested conditions.

### if Statement
The if statement runs code only when a condition is true.

\`\`\`js
if (condition) {
  // code
}

// Example
let age = 20;

if (age >= 18) {
  console.log("Adult");
}
\`\`\`

### else Statement
Runs when the condition is false.

\`\`\`js
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
\`\`\`

### else if Statement
Used when checking multiple conditions.

\`\`\`js
let marks = 85;

if (marks >= 90) {
  console.log("A");
} else if (marks >= 75) {
  console.log("B");
} else {
  console.log("C");
}
\`\`\`

### Nested if-else
An if inside another if.

\`\`\`js
if (age >= 18) {
  if (age >= 21) {
    console.log("Can drink");
  }
}
\`\`\`

### Logical Conditions
Logical operators are commonly used in conditions.

\`\`\`js
if (age > 18 && age < 60) {
  console.log("Working age");
}
\`\`\`

### Switch Statement
Used when comparing one value against multiple options.

\`\`\`js
switch(day) {
  case "Mon":
    console.log("Start of week");
    break;

  case "Sun":
    console.log("Holiday");
    break;

  default:
    console.log("Normal day");
}
\`\`\`

break prevents execution from continuing to the next case.

### break Keyword
Stops execution of loops and switch statements.

\`\`\`js
switch(x) {
  case 1:
    break;
}
\`\`\`

### Conditional Flow Summary
if → single condition, else → fallback condition, else if → multiple conditions, switch → compare one value, break → stop execution.

**Tip:** Use if/else for complex logic. Use switch when comparing one variable to many fixed values.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling"
      },
      {
        slug: "loops",
        title: "Loops",
        content: `
### Loops
Loops allow a block of code to run multiple times until a condition is met. Common loops: for, while, for...of.

### for Loop
The most commonly used loop when the number of iterations is known.

\`\`\`js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// Outputs: 0 1 2 3 4
\`\`\`

### Dry Run (Execution)
\`\`\`js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
// i = 1 → print
// i = 2 → print
// i = 3 → print
// condition fails → stop
\`\`\`

### for Loop Use Cases
\`\`\`js
// Print Even Numbers
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}

// Print Odd Numbers
for (let i = 1; i <= 10; i += 2) {
  console.log(i);
}
\`\`\`

### Infinite Loop
A loop with no stopping condition. Avoid this unless intentionally needed.

\`\`\`js
while (true) {
  // Use break to exit
}
\`\`\`

### while Loop
Runs while a condition is true.

\`\`\`js
let i = 0;

while (i < 3) {
  console.log(i);
  i++;
}
\`\`\`

### Nested for Loop
A loop inside another loop.

\`\`\`js
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(i, j);
  }
}
\`\`\`

### break and continue
\`\`\`js
// break: stops loop execution immediately
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
}

// continue: skips current iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}
\`\`\`

### Loops with Arrays
\`\`\`js
const fruits = ["apple", "banana", "orange"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// for...of Loop (Simplified iteration)
for (const fruit of fruits) {
  console.log(fruit);
}
\`\`\`

### Nested Loops with Arrays
\`\`\`js
const matrix = [
  [1, 2],
  [3, 4]
];

for (const row of matrix) {
  for (const value of row) {
    console.log(value);
  }
}
\`\`\`

### Loop Summary
for → set number of times, while → while condition true, for...of → iterate over arrays, break → exit loop, continue → skip iteration.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration"
      }
    ]
  },

  // =================================================
  // STRINGS
  // =================================================
  strings: {
    title: "Strings",
    pages: [
      {
        slug: "string-basics",
        title: "Strings",
        content: `
### Strings
Strings represent text in JavaScript. Characters in a string are accessed using indices starting from 0.

\`\`\`js
let str = "welcome";

str[0]; // "w"
str.length; // 7
\`\`\`

### Strings are Immutable
Strings cannot be modified character by character.

\`\`\`js
let s = "Hello";

s[0] = "a"; // does nothing
console.log(s); // "Hello"

// But reassignment is allowed:
s = "Heyo";
\`\`\`

### trim()
Removes whitespace from the start and end of a string. Returns a new string.

\`\`\`js
let s = "  Hello";
console.log(s.trim());
\`\`\`

### Changing Case
\`\`\`js
"hello".toUpperCase(); // "HELLO"
"HELLO".toLowerCase(); // "hello"
\`\`\`

### indexOf()
Returns the index of the first occurrence of a substring.

\`\`\`js
let str = "welcome";
str.indexOf("come"); // 3

// Returns -1 if not found
\`\`\`

### Method Chaining
Methods can be used one after another, executed left to right.

\`\`\`js
str.trim().toUpperCase().indexOf("L");
\`\`\`

### slice()
Extracts part of a string. End index is not included.

\`\`\`js
// Syntax: slice(startIndex, endIndex)

let str = "welcome";

str.slice(3);     // "come"
str.slice(0, 4);  // "welc"
str.slice(-2);    // "me" (counts from end)
\`\`\`

### replace()
Replaces the first occurrence of a substring.

\`\`\`js
str.replace("e", "a");
str.trim().replace("e", "a");
\`\`\`

### repeat()
Repeats a string multiple times.

\`\`\`js
let str2 = "ha";
str2.repeat(5); // "hahahahaha"
\`\`\`

### String length
Counts all characters including spaces.

\`\`\`js
" ".length; // 1
\`\`\`

### String Summary
length → size, trim() → remove spaces, toUpperCase() → uppercase, toLowerCase() → lowercase, indexOf() → find substring, slice() → extract part, replace() → replace text, repeat() → repeat text.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String"
      },
      {
        slug: "string-methods",
        title: "String Methods",
        content: `
### Useful String Methods
JavaScript provides many methods to manipulate and query strings.

### split() and join()
split() converts a string into an array. join() converts an array into a string.

\`\`\`js
let str = "apple,banana,orange";
let fruits = str.split(","); // ["apple", "banana", "orange"]

let newStr = fruits.join("-"); // "apple-banana-orange"
\`\`\`

### includes(), startsWith(), endsWith()
Methods to check the content of a string. Returns boolean.

\`\`\`js
let str = "Hello World";

str.includes("Hello");    // true
str.startsWith("He");     // true
str.endsWith("ld");       // true
\`\`\`

### charAt() and charCodeAt()
Get character or Unicode at a specific index.

\`\`\`js
"ABC".charAt(0);     // "A"
"ABC".charCodeAt(0); // 65
\`\`\`

### match() and search()
Used with Regular Expressions (RegEx) to find patterns.

\`\`\`js
"The rain in Spain".match(/ain/g); // ["ain", "ain"]
\`\`\`
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods"
      }
    ]
  },

  // =================================================
  // ARRAYS
  // =================================================
  arrays: {
    title: "Arrays",
    pages: [
      {
        slug: "array-basics",
        title: "Arrays",
        content: `
### Arrays
Arrays store multiple values in a single variable. They can store different data types.

\`\`\`js
let cars = ["BMW", "Audi", "Mercedes"];
let mix = ["sushi", 34, "2", 345.2, true];
\`\`\`

### Arrays are Reference Types
Arrays are stored in memory, and variables store a reference (address).

\`\`\`js
let array = [1, 2];
let array2 = array;

array2.push(3);

console.log(array); // [1, 2, 3]
console.log(array === array2); // true
\`\`\`

**Comparing Arrays:** Two arrays with same values are still different because they have different references.

\`\`\`js
[1] == [1]; // false
\`\`\`

### indexOf() and includes()
\`\`\`js
let cars = ["BMW", "Audi"];

cars.indexOf("BMW"); // 0
cars.includes("BMW"); // true
\`\`\`

### concat()
Joins arrays together without modifying the originals.

\`\`\`js
let a = [1, 2];
let b = [3, 4];
let c = a.concat(b); // [1, 2, 3, 4]
\`\`\`

### Array Methods (Push, Pop, Shift, Unshift)
\`\`\`js
let fruits = ["apple"];

fruits.push("banana");    // Add to end: ["apple", "banana"]
fruits.pop();             // Remove from end: ["apple"]
fruits.unshift("grape");  // Add to start: ["grape", "apple"]
fruits.shift();           // Remove from start: ["apple"]
\`\`\`

### reverse()
Reverses the array in place (modifies original).

\`\`\`js
let arr = [1, 2, 3];
arr.reverse(); // [3, 2, 1]
\`\`\`

### slice()
Returns a copy of part of the array. Does NOT modify original.

\`\`\`js
let arr = [1, 2, 3, 4, 5];
arr.slice(1, 3); // [2, 3]
\`\`\`

### splice()
Used to add, remove, or replace elements. Modifies original. Syntax: \`splice(start, deleteCount, items...)\`

\`\`\`js
let c = [1, 2, 5];
c.splice(2, 0, 3, 4); // [1, 2, 3, 4, 5]
\`\`\`

### sort() and join()
\`\`\`js
["Banana", "Apple"].sort(); // ["Apple", "Banana"]
["a", "b"].join("-");       // "a-b"
\`\`\`

### Nested Arrays
\`\`\`js
let nums = [[1, 2], [3, 4]];

for (let row of nums) {
  for (let val of row) {
    console.log(val);
  }
}
\`\`\`

### Array Summary
push (add end), pop (remove end), unshift (add start), shift (remove start), slice (copy portion), splice (modify array), concat (merge), reverse (reverse), sort (sort), join (to string).
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
      },
      {
        slug: "functional-array-methods",
        title: "Functional Array Methods",
        content: `
### Functional Array Methods
These methods iterate over arrays and usually take a callback function as an argument. Common ones: forEach, map, filter, reduce, every, some.

### forEach()
Runs a function for every element. Does not return a new array.

\`\`\`js
let nums = [1, 2, 3];

nums.forEach((n) => {
  console.log(n);
});
\`\`\`

Use when you just want to perform an action.


### map()
Creates a new array by transforming elements. Original array is unchanged.

\`\`\`js
let nums = [1, 2, 3];
let doubled = nums.map((n) => n * 2);
\`\`\`


### filter()
Keeps elements that match a condition and returns a new array.

\`\`\`js
let nums = [1, 2, 3, 4];
let evens = nums.filter((n) => n % 2 === 0);
\`\`\`


### reduce()
Combines array values into one result. Syntax: \`array.reduce((acc, val) => {}, initialValue)\`.

\`\`\`js
let nums = [1, 2, 3];
let sum = nums.reduce((a, b) => a + b, 0);

// Maximum in Array (using reduce)
let max = nums.reduce((a, b) => a > b ? a : b);
\`\`\`


### every() and some()
\`\`\`js
// every(): checks if all elements satisfy condition
[2, 4, 6].every(n => n % 2 === 0); // true

// some(): checks if at least one element matches
[1, 3, 4].some(n => n % 2 === 0);  // true
\`\`\`


Functional Methods Summary
--------------------------
Method     Returns        Use
forEach    nothing        run code
map        new array      transform
filter     new array      select elements
reduce     single value   combine
every      boolean        all match
some       boolean        any match

Tip: These methods are preferred over loops in modern JavaScript because they are shorter, more readable, and less error-prone. You'll see them everywhere in real projects.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iteration_methods"
      }
    ]
  },

  // =================================================
  // OBJECTS
  // =================================================
  objects: {
    title: "Objects",
    pages: [
      {
        slug: "object-literals",
        title: "Object Literals",
        content: `
### Objects
Objects store data as key–value pairs. Keys are strings, values can be any type.

\`\`\`js
let user = {
  name: "Sushi",
  age: 21
};
\`\`\`

### Creating Object Literals
\`\`\`js
let post = {
  username: "sushi",
  content: "Hello world",
  likes: 10
};
\`\`\`

### Accessing Values
Two ways: Dot notation and Bracket notation.

\`\`\`js
// Dot notation
post.username;

// Bracket notation
post["content"];
\`\`\`

**Note:** Bracket notation is useful when the key is stored in a variable or is a non-standard name.

### Add / Update Values
\`\`\`js
// Add
post.comments = 5;

// Update
post.likes = 20;
\`\`\`

### Nested Objects and Arrays of Objects
\`\`\`js
let student = {
  name: "Sam",
  marks: { math: 90, science: 85 }
};

console.log(student.marks.math);

let users = [
  { name: "A" },
  { name: "B" }
];

console.log(users[0].name);
\`\`\`

### Object Methods
Functions inside objects.

\`\`\`js
let calculator = {
  add(a, b) {
    return a + b;
  }
};

calculator.add(2, 3);
\`\`\`

### Math Object
JavaScript provides a built-in Math object for mathematical constants and functions.

\`\`\`js
Math.PI;
Math.floor(4.7); // 4
Math.random();  // 0 to 1
\`\`\`

**Random Integers:**
\`\`\`js
// Random integer between 0 and 9
Math.floor(Math.random() * 10);

// Random integer between 1 and 5
Math.floor(Math.random() * 5) + 1;
\`\`\`

### Object Summary
concept (literal, access, nested, method) and example.

**Tip:** Objects are essential for modern JavaScript, used in APIs, state management, and more.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects"
      },
      {
        slug: "built-in-objects",
        title: "Built-in Objects",
        content: `
### JavaScript Call Stack
The call stack is a structure that tracks which functions are currently running (LIFO - Last In, First Out).

\`\`\`js
function a() { b(); }
function b() { console.log("Hello"); }

a();
// Execution order:
// 1. a() pushed
// 2. b() pushed
// 3. console.log runs
// 4. b() removed
// 5. a() removed
\`\`\`

### JavaScript is Single-Threaded
JavaScript runs one task at a time. It has one call stack and no parallel execution in the main thread. Long tasks can block the program.

\`\`\`js
console.log("Start");

function test() {
  console.log("Inside");
}

test();
console.log("End");

// Output: Start -> Inside -> End
\`\`\`

### Callback Hell
Callbacks can become deeply nested and hard to read, creating a pyramid shape. Promises and async/await solve this problem.

\`\`\`js
setTimeout(() => {
  setTimeout(() => {
    setTimeout(() => {
      console.log("Done");
    }, 1000);
  }, 1000);
}, 1000);
\`\`\`
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"
      }
    ]
  },

  // =================================================
  // FUNCTIONS
  // =================================================
  functions: {
    title: "Functions",
    pages: [
      {
        slug: "function-basics",
        title: "Functions (Basics)",
        content: `
### Functions
Functions are reusable blocks of code that perform a task.

\`\`\`js
function greet() {
  console.log("Hello");
}

// Calling a function:
greet();
\`\`\`

### Functions with Arguments
Functions can accept input values called parameters.

\`\`\`js
function greet(name) {
  console.log("Hello", name);
}

greet("Sushi");
\`\`\`

### return Keyword
Returns a value from a function. Without a return statement, the function returns undefined.

\`\`\`js
function add(a, b) {
  return a + b;
}

let sum = add(5, 10); // 15
\`\`\`
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
      },
      {
        slug: "function-types",
        title: "Function Types",
        content: `
### Function Expressions
Functions can be stored in variables. Unlike declarations, they are NOT hoisted.

\`\`\`js
const add = function(a, b) {
  return a + b;
};
\`\`\`

### Arrow Functions
Short syntax for functions.

\`\`\`js
const add = (a, b) => a + b;

// Implicit Return (Arrow Functions)
// If there is one expression, return is automatic.
const square = x => x * x;
\`\`\`

### Higher-Order Functions
Functions that take another function as an argument, or return a function.

\`\`\`js
// Taking function as argument
arr.map(n => n * 2);

// Returning a function
function multiply(x) {
  return function(y) {
    return x * y;
  };
}
\`\`\`

### Methods
A function inside an object is called a method.

\`\`\`js
let obj = {
  greet() {
    console.log("Hi");
  }
};
\`\`\`
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions"
      },
      {
        slug: "scope-and-this",
        title: "Scope & this",
        content: `
### Scope
Scope determines where variables are accessible. JavaScript has three types of scope: Global, Function, and Block.

### Block Scope
Variables declared with let and const are block-scoped (only accessible inside the curly braces {}).

\`\`\`js
{
  let x = 5;
  const y = 10;
}
// x and y are NOT accessible here
\`\`\`

### Lexical Scope
Inner functions can access variables from their outer scope.

\`\`\`js
function outer() {
  let x = 10;

  function inner() {
    console.log(x); // Works!
  }
}
\`\`\`

### this Keyword
The "this" keyword refers to the object that is currently executing the code. In a method, "this" refers to the owner object.

\`\`\`js
let user = {
  name: "Sushi",
  greet() {
    console.log(this.name); // "Sushi"
  }
};
\`\`\`

### this with Arrow Functions
Arrow functions do not bind their own "this". They inherit it from the surrounding (lexical) scope.

\`\`\`js
let user = {
  name: "Sushi",
  greet: () => {
    console.log(this.name); // undefined (inherits global this)
  }
};
\`\`\`
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this"
      },
      {
        slug: "advanced-functions",
        title: "Advanced Functions",
        content: `
### Higher-Order Functions
A higher-order function takes another function as an argument, or returns a function.

\`\`\`js
let nums = [1, 2, 3];
nums.map(n => n * 2); // map() is a higher-order function
\`\`\`

### Higher-Order Functions Returning Functions
Functions can return other functions, a pattern common in functional programming.

\`\`\`js
function multiplier(x) {
  return function(y) {
    return x * y;
  };
}

let double = multiplier(2);
double(5); // 10
\`\`\`

### Methods
A method is a function inside an object, allowing objects to have behavior.

\`\`\`js
let calculator = {
  add(a, b) {
    return a + b;
  }
};

calculator.add(2, 3);
\`\`\`

### Default Parameters
Functions can define default values for optional arguments.

\`\`\`js
function greet(name = "Guest") {
  console.log(name);
}

greet(); // "Guest"
\`\`\`

### Rest Parameters
Rest collects arguments into an array. It must be the last parameter.

\`\`\`js
function sum(...nums) {
  return nums.reduce((a, b) => a + b);
}

sum(1, 2, 3); // 6
\`\`\`

### Spread Operator
Spread expands values from arrays or objects.

\`\`\`js
// Array spread
let arr = [1, 2];
let copy = [...arr]; // [1, 2]

// Object spread
let obj = { a: 1 };
let copyObj = { ...obj }; // { a: 1 }
\`\`\`

### Destructuring
Extract values easily from arrays or objects.

\`\`\`js
// Array destructuring
let [a, b] = [1, 2];

// Object destructuring
let { name } = { name: "Sushi", age: 20 };
\`\`\`

### Advanced Functions Summary
Includes HOF, returning functions, methods, default params, rest, spread, and destructuring.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_parameters"
      }
    ]
  },

  // =================================================
  // ERROR HANDLING & TIMERS
  // =================================================
  errorHandling: {
    title: "Error Handling & Timers",
    pages: [
      {
        slug: "error-handling",
        title: "Error Handling",
        content: `
### Try & Catch
The try statement allows you to define a block of code to be tested for errors while it is being executed. The catch statement allows you to define a block of code to be executed, if an error occurs in the try block.

\`\`\`js
try {
  // Code that may throw an error
  riskyFunction();
} catch (error) {
  // Code to handle the error
  console.log("An error occurred:", error.message);
} finally {
  // Code that runs regardless of an error
  console.log("Cleanup complete");
}
\`\`\`
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#exception_handling_statements"
      },
      {
        slug: "timers",
        title: "Timers",
        content: `
### setTimeout()
The setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds.

\`\`\`js
// Runs after 1 second
setTimeout(() => {
  console.log("Hello after 1 second");
}, 1000);
\`\`\`

### setInterval()
The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).

\`\`\`js
// Runs every 1 second
const timerId = setInterval(() => {
  console.log("Tick");
}, 1000);

// Stop the timer
clearInterval(timerId);
\`\`\`
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals"
      }
    ]
  },

  // =================================================
  // DOM
  // =================================================
  dom: {
    title: "DOM",
    pages: [
      {
        slug: "dom-basics",
        title: "DOM Basics",
        content: `
### What is the DOM?
DOM stands for Document Object Model. It represents the HTML page as a tree of objects that JavaScript can read and modify.

\`\`\`html
<!-- Example HTML -->
<h1 id="title">Hello</h1>
\`\`\`

\`\`\`js
// JavaScript can access it like:
document.getElementById("title");
\`\`\`

### The document Object
The browser provides a global "document" object that represents the webpage. Most DOM operations start from document.

\`\`\`js
document.title; // Get/Set page title
\`\`\`

### Selecting Elements
JavaScript provides several methods to select elements from the DOM.

\`\`\`js
// 1. by ID
document.getElementById("title");

// 2. by Class Name (returns HTMLCollection)
document.getElementsByClassName("box");

// 3. by Tag Name
document.getElementsByTagName("p");

// 4. querySelector (CSS Selector - returns first match)
document.querySelector("#title");
document.querySelector(".box");
document.querySelector("p");

// 5. querySelectorAll (CSS Selector - returns NodeList)
document.querySelectorAll(".box");
\`\`\`

### DOM Selection Summary
Method (getElementById, getElementsByClassName, getElementsByTagName, querySelector, querySelectorAll) and primary use.

**Tip:** querySelector and querySelectorAll are the most flexible and commonly used in modern development.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"
      },
      {
        slug: "dom-manipulation",
        title: "DOM Manipulation",
        content: `
### DOM Manipulation
After selecting elements, you can change their content, attributes, styles, and list of classes.

### Content Properties
\`\`\`js
let el = document.querySelector("#title");

// Changes text only (ignores HTML tags)
el.textContent = "New Title";

// Changes HTML (renders tags)
el.innerHTML = "<b>Hello</b>";
\`\`\`

### Attributes
\`\`\`js
el.getAttribute("id");
el.setAttribute("class", "active");
\`\`\`

### Style Property
Style can be changed using the style property. CSS properties use camelCase in JavaScript.

\`\`\`js
el.style.color = "red";
el.style.backgroundColor = "yellow"; // background-color -> backgroundColor
\`\`\`

### classList Property
The standard way to add, remove, and toggle CSS classes.

\`\`\`js
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("active");
\`\`\`

### DOM Navigation
Move between elements in the tree.

\`\`\`js
el.parentElement
el.children
el.nextElementSibling
el.previousElementSibling
\`\`\`

### Adding & Removing Elements
\`\`\`js
// 1. Create element
let p = document.createElement("p");

// 2. Add text/content
p.textContent = "Hello";

// 3. Append to page
document.body.appendChild(p);

// 4. Remove element
p.remove();
\`\`\`

### DOM Manipulation Summary
Action (text, HTML, attributes, style, classes, create, add, remove) and corresponding method.

**Tip:** Modern frameworks like Vue or React handle most of this for you, but knowing the "Vanilla" way is crucial for deep understanding.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents"
      }
    ]
  },

  // =================================================
  // EVENTS
  // =================================================
  events: {
    title: "Events",
    pages: [
      {
        slug: "events",
        title: "Events",
        content: `
### What are Events?
An event is something that happens in the browser, such as clicking a button, typing in a field, submitting a form, or moving the mouse. JavaScript can "listen" for these and respond.

### Event Listeners
The most common way to handle events is **addEventListener()**.

\`\`\`js
// Syntax:
element.addEventListener("event", callbackFunction);

// Example:
let btn = document.querySelector("button");

btn.addEventListener("click", () => {
  console.log("Button was clicked!");
});
\`\`\`

### Common Events
- **Mouse:** click, mouseover, mouseout, mousedown, mouseup.
- **Keyboard:** keydown, keyup, keypress.
- **Form:** submit, change, input, focus, blur.
- **Window:** load, resize, scroll, unload.

### Event Object
The event listener automatically receives an "event" object as its first argument, containing details about what happened.

\`\`\`js
document.addEventListener("keydown", (e) => {
  console.log("Key pressed:", e.key);
  console.log("Key code:", e.code);
});

btn.addEventListener("click", (e) => {
  console.log("Target element:", e.target); // The element that was clicked
});
\`\`\`

### this in Event Listeners
Inside a normal function declaration, **this** refers to the element that triggered the event. Arrow functions do NOT bind their own **this**.

\`\`\`js
btn.addEventListener("click", function() {
  console.log(this); // refers to btn
});
\`\`\`

### preventDefault()
Used to stop the default browser behavior (like a link opening or a page refreshing on form submit).

\`\`\`js
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page reload
  console.log("Form submitted, but no refresh!");
});
\`\`\`

### Event Summary
addEventListener, event object (e.target, e.key), preventDefault.

**Tip:** Most interactivity on websites is built using DOM selection, DOM manipulation, and events. These three together form the foundation of frontend JavaScript.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/Events"
      },
      {
        slug: "forms",
        title: "Forms",
        content: `
### Working with Forms
Forms allow users to interact with the application and provide data.

\`\`\`html
<!-- Example HTML Form -->
<form id="form">
  <input id="name" type="text" placeholder="Enter name" />
  <button type="submit">Submit</button>
</form>
\`\`\`

### Form Submission
The **submit** event is the correct way to handle form data. Always use **preventDefault()** to stop the page from refreshing.

\`\`\`js
let form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page reload
  console.log("Form submitted!");
});
\`\`\`

### Getting Input Values
Use the **.value** property to access what the user typed.

\`\`\`js
let input = document.querySelector("#name");
console.log(input.value); // Logs the current text in the input
\`\`\`

### Basic Validation
Check values before processing them.

\`\`\`js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (input.value === "") {
    alert("Please enter a name");
  } else {
    console.log("Success:", input.value);
  }
});
\`\`\`

### Form Summary
submit event, preventDefault, input.value, basic validation.

**Tip:** For complex forms, use the **FormData** API to extract all values at once.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Learn/Forms"
      }
    ]
  },

  // =================================================
  // ASYNC JAVASCRIPT & APIs
  // =================================================
  async: {
    title: "Async JavaScript & APIs",
    pages: [
      {
        slug: "call-stack-and-execution",
        title: "Call Stack & Execution",
        content: `
### How JavaScript Executes Code
JavaScript is single-threaded, meaning it can only do one thing at a time. It uses the **Call Stack**, **Web APIs**, **Task Queue**, and **Event Loop** to handle asynchronous tasks.

### The Call Stack
A LIFO (Last In, First Out) structure that tracks function execution.

\`\`\`js
function first() { second(); }
function second() { console.log("Done"); }

first();
// 1. first() pushed
// 2. second() pushed
// 3. console.log executed
// 4. second() popped
// 5. first() popped
\`\`\`

### The Event Loop & Task Queue
Asynchronous tasks (like \`setTimeout\` or \`fetch\`) are sent to Web APIs. Once finished, their callbacks enter the **Task Queue**. The **Event Loop** moves these callbacks to the Call Stack ONLY when the stack is empty.

\`\`\`js
console.log("Start");

setTimeout(() => {
  console.log("Async Task");
}, 0);

console.log("End");

// Output:
// Start
// End
// Async Task (even with 0ms delay!)
\`\`\`

### Execution Summary
Call Stack (Synchronous), Web APIs (Browser), Task Queue (Pending Callbacks), Event Loop (Orchestrator).
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Glossary/Call_stack"
      },
      {
        slug: "promises",
        title: "Promises",
        content: `
### What is a Promise?
A Promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

### Promise States
- **Pending:** Initial state, neither fulfilled nor rejected.
- **Fulfilled:** The operation completed successfully.
- **Rejected:** The operation failed.

### Consuming Promises
Use **.then()** for success, **.catch()** for errors, and **.finally()** for code that runs regardless of the outcome.

\`\`\`js
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.log("Error:", error);
  })
  .finally(() => {
    console.log("Operation finished.");
  });
\`\`\`

### Promise Chaining
You can chain multiple **.then()** calls to perform sequential asynchronous operations.

\`\`\`js
asyncTask1()
  .then(result1 => asyncTask2(result1))
  .then(result2 => asyncTask3(result2))
  .catch(err => console.log(err));
\`\`\`

### Promise Summary
states (pending, fulfilled, rejected), then/catch/finally, chaining.

**Tip:** Promises are the foundation for the cleaner **async/await** syntax.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
      },
      {
        slug: "async-await",
        title: "Async / Await",
        content: `
### Async Functions
The **async** keyword is used to define an asynchronous function, which returns a **Promise**. It allows you to write asynchronous code that looks and behaves like synchronous code.

\`\`\`js
async function loadData() {
  return "Data loaded!";
}

loadData().then(result => console.log(result));
\`\`\`

### await Keyword
The **await** keyword can only be used inside an **async** function. It pauses the execution of the function until the promise is settled (fulfilled or rejected).

\`\`\`js
async function fetchUser() {
  // Execution pauses here until fetch completes
  let response = await fetch("https://api.example.com/user");
  let user = await response.json();
  console.log(user);
}
\`\`\`

### Handling Rejections
Inside an async function, you use **try/catch** blocks to handle promise rejections (errors).

\`\`\`js
async function safeFetch() {
  try {
    let response = await fetch("https://api.example.com/data");
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Something went wrong:", error.message);
  }
}
\`\`\`

### Async Summary
async keyword (returns promise), await keyword (pauses execution), try/catch (error handling).

**Tip:** Async/await is generally preferred over raw Promises (.then/.catch) because it is much easier to read and debug.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"
      },
      {
        slug: "apis",
        title: "APIs",
        content: `
### What is an API?
API stands for Application Programming Interface. It allows different applications to communicate and exchange data.

### JSON (JavaScript Object Notation)
JSON is a lightweight text format for storing and transporting data.

\`\`\`json
{
  "name": "Sushi",
  "age": 21,
  "isDeveloper": true
}
\`\`\`

### JSON Methods
\`\`\`js
// 1. JSON.parse()
// Converts JSON string -> JavaScript object
let user = JSON.parse('{"name":"Sushi"}');

// 2. JSON.stringify()
// Converts JavaScript object -> JSON string
let jsonStr = JSON.stringify({ name: "Sushi" });
\`\`\`

### HTTP Verbs
- **GET:** Fetch data from a server.
- **POST:** Send new data to a server.
- **PUT/PATCH:** Update existing data on a server.
- **DELETE:** Remove data from a server.

### Status Codes
- **200 OK:** Success.
- **201 Created:** Resource successfully created.
- **400 Bad Request:** Client error.
- **404 Not Found:** Resource doesn't exist.
- **500 Server Error:** Something went wrong on the server.

### Headers & Query Strings
**Headers** contain extra information about requests (e.g., authentication). **Query Strings** are used to send small bits of data in the URL.

\`\`\`js
// Query string example: 
// /search?q=books&category=tech
\`\`\`
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
      },
      {
        slug: "fetch-api",
        title: "Fetch API",
        content: `
### Fetch API
The modern way to make HTTP requests in JavaScript.

\`\`\`js
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.log("Fetch error:", error));
\`\`\`

### POST Request with Fetch
To send data, pass an options object as the second argument.

\`\`\`js
fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Sushi",
    role: "Developer"
  }),
})
  .then(res => res.json())
  .then(data => console.log(data));
\`\`\`

### Fetch Summary
fetch(url, options), response.json(), method, headers, body.

**Tip:** Always check **response.ok** to handle server-side errors (404, 500), as fetch only rejects on network failures.
        `,
        reference: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
      },
      {
        slug: "axios",
        title: "Axios",
        content: `
### Axios
Axios is a popular JavaScript library used to make HTTP requests. It simplifies request handling and automatically parses JSON responses.

### GET Request
\`\`\`js
axios.get("https://api.example.com/data")
  .then(res => {
    console.log(res.data); // Data is already parsed!
  })
  .catch(err => {
    console.log(err);
  });
\`\`\`

### POST Request
The second argument is the data you want to send as the request body.

\`\`\`js
axios.post("https://api.example.com/data", {
  name: "Sushi",
  age: 21
})
.then(res => console.log(res.data));
\`\`\`

### Headers and Params
\`\`\`js
axios.get(url, {
  headers: {
    Authorization: "Bearer token123"
  },
  params: {
    q: "JavaScript",
    page: 2
  }
});
\`\`\`

### Axios vs Fetch (Comparison)
- **JSON Parsing:** Axios (Automatic) | Fetch (Manual)
- **Error Handling:** Axios (Rejects on HTTP error) | Fetch (Requires manual check)
- **Headers/Body:** Axios (body) | Fetch (body: JSON.stringify)

### Axios Summary
axios.get(), axios.post(), res.data, headers, params.

**Tip:** Axios is the industry standard for production apps due to its interceptors and superior error handling features.
        `,
        reference: "https://axios-http.com/docs/intro"
      },
    ]
  }
}
