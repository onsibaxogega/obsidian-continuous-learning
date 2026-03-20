
3. Strings
Length, Indexing, and Substrings
 * len() returns the number of items in a container like a string or an array.
 * Individual items are accessed using bracket notation with 0-based indices.
 * Negative indices wrap around to the end of the container (e.g., -1 is the last element, -2 is the penultimate).
 * Substrings are extracted using slicing: string_var[start_index_incl : end_index_excl].
 * If the start index is omitted, 0 is implicitly used. If the end index is omitted, the length of the string is implicitly used. Both can be omitted to copy the entire string.
Formatting and Escape Sequences
 * If double quotes (") are used to define a string, they cannot be used inside the string unless escaped; however, single quotes (') can be used inside, and vice versa.
 * The backslash (\) is used to escape invalid characters.
 * Best Practice: Use triple quotes for multi-line strings instead of relying on \n.
 * Formatted Strings (f-strings): The syntax is f"{variable_or_expression}". Values inside the curly braces are evaluated at runtime, replacing older string concatenation methods.


 - Triple quotation marks (""") are used for multi-line strings and automatically include newline characters.
Useful String Methods & Operators
Note: String methods do not modify the original string; they return a new string, so you must assign the return value if you want to keep the modification.
| Method / Operator | Description |
|---|---|
| upper() | Converts string to uppercase. |
| lower() | Converts string to lowercase. |
| title() | Converts string to title case. |
| strip() | Trims whitespace at the beginning and end. |
| lstrip() / rstrip() | Trims whitespace from the left or right side respectively. |
| find(arg) | Returns the index of the argument (character or substring). Returns the index of the first character if a substring is passed. It is case-sensitive and returns -1 if not found. |
| replace(arg0, arg1) | Similar to find() for arg0; if found, replaces it with arg1. If not found, returns the original string. |
| in / not in | Operators used to check if a substring exists within a string, evaluating to a boolean. |
4. Numbers & Math
Number Systems & Complex Numbers
 * Hexadecimal (0x...) and binary (0b...) representations are primarily associated with integers.
 * hex(int) and bin(int) convert an integer to its corresponding hexadecimal or binary string representation.
 * Complex numbers have a real and imaginary component (a + bi). In Python, the imaginary component is represented by j or J (e.g., x = 1 + 2j).


 ---
Arithmetic Operators
 * +, -, * : Standard addition, subtraction, multiplication.
 * / : Division (always returns a float).
 * // : Floor division (returns an integer).
 * % : Modulo (remainder).
 * ** : Exponentiation.
 * Augmented assignment operators exist for all arithmetic operators (e.g., x += 1).
 * Python lacks increment/decrement operators like x++ or x--.
Useful Math Methods
 * round(float): Rounds a float to the nearest integer.
 * abs(): Returns the absolute value.
 * math.floor(float): Truncates a float downwards (requires import math).
5. Type Conversion
Python is strongly-typed, meaning type conversion is explicit at runtime.
 * Conversion Functions: int(), float(), bool(), str().
 * Truthy/Falsy Evaluation: Boolean conversion relies on truthy/falsy values. Falsy values include: False, 0, "" (empty string), [] (empty list), and None.
6. Conditionals & Control Flow
Operators
 * Comparison: >, <, >=, <=, ==, !=.
 * Logical: and, or, not. These can be used with non-boolean values, evaluating them based on their truthy/falsy nature.
If-Elif-Else
 * Indentation (typically 4 spaces per PEP 8) is used instead of curly braces. Tabs and spaces cannot be interchanged in the same code in Python 3.
 * Parentheses around the condition are optional.
 * Python uses elif instead of else if.
 * The pass keyword can be used to fill an empty conditional branch to prevent syntax errors.
 * Mathematical notation can be chained for ranges (e.g., if 18 <= age < 65:).
Ternary Conditional Operator
Python uses a specific syntax for ternary operations:
<value_if_true> if <condition> else <value_if_false>
# Ternary Assignment Example
message = "Eligible" if age >= 18 else "Not eligible"

For Loops
 * Python does not use traditional for(int i=0; i<x; i++) syntax.
 * Instead, it uses for ... in ... syntax over iterable constructs (strings, arrays, range objects).
 * Range Object: Generates iteration indices on-the-fly, generally occupying less memory space than a standard array.
   * range(stop): Iterates from 0 to stop - 1.
   * range(start, stop): Iterates from start to stop - 1.
   * range(start, stop, step): Iterates from start to stop - 1, incrementing by step size.
7. Compiling .py to .exe
To package a Python script into a distributable executable file, use the PyInstaller library.
# 1. Install PyInstaller
pip install pyinstaller

# 2. Compile to a single executable file
pyinstaller --onefile your_script.py

# 3. (Optional) Compile without a background console window appearing
pyinstaller --onefile --windowed your_script.py

 * The --onefile (or -F) flag bundles everything into a single file. Without it, a directory is created containing the executable alongside supporting files.
 * The --windowed (or -w) flag prevents the console window from appearing when the application runs.

Would you like me to expand on any of these topics, or help you generate some practice questions based on these notes?
