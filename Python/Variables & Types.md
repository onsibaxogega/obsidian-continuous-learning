# Naming Conventions

## Mandatory Rules

Variable names must adhere to the following rules, or the code will raise an error:

 - **Allowed Characters**: Can only contain letters (A-z), numbers (0-9), and underscores (`_`).
- **Starting Character**: Must start with a letter or an underscore, never a number.
- **Case Sensitivity**: Names are case-sensitive (`age`, `Age`, and `AGE` are different variables).
- **No Keywords**: Cannot use Python reserved keywords (e.g., `if`, `else`, `for`, `True`, `False`, `None, ...`).
- **No Spaces**: Spaces are not allowed within a variable name; use underscores to separate words

## Recommended Conventions

 In accordance with  [[Language Guidelines]]:
 
- **General Variables**: Use **snake case** (`lowercase_with_underscores`) for variable and function names.
    - _Example_: `user_name`, `purchase_amount`.
- **Constants**: Use **all uppercase** letters with underscores to separate words. This signals that the value is not meant to be changed.
    - _Example_: `MAX_CAPACITY`, `TOTAL_USERS`.
    - *Note*: Python **does not have true constants** - this is just to indicate intent
- **Class Names**: Use **Pascal case**.
    - _Example_: `UserModel`, `HTTPConnectionHandler`.
- **Non-public/Internal Variables**: Start the name with a single leading underscore (`_`) to indicate it is intended for internal use within a module or class.
    - _Example_: `_internal_cache`, `_calculate_tax()`.

---



# Declaration, Initialization & Reassignment

In Python, there is no explicit declaration command (like `var` or `int` in other languages). 

- **Creation:** A variable is created the moment you first assign a value to it.
- **Dynamic Typing:** You do not need to declare data types; Python infers them automatically.
- **Initialization:** Declaration and initialization happen simultaneously using the assignment operator (`=`), e.g.,
```python
age = 25
```

- **Reassignment:** You can change the type of a variable by assigning a new value of a different type, e.g.,
```python
x = 10
x = "Hello"
```

- **Initializing multiple variables**, e.g.,
```python
x, y = 1, 2
```

- **Assigning multiple variables to the same value**, e.g.,
```python
x = y = 1
```

---



# Variable Lifecycle


## Creation

- A variable comes into existence when it is first assigned a value. Referencing it before assignment causes a `NameError`.

## Scope

- **Local:** Declared inside a function, accessible only within that function.
- **Global:** Declared outside functions, accessible throughout the script.

## Lifetime
- **Local variables** are created when the function is called and destroyed when the function finishes.
- **Global variables** live until the program ends or the session is closed.

## Termination

- Variables are destroyed when they go out of scope or via garbage collection when they no longer have any references. 
>`NOTE:` The `del` keyword can be used to manually remove a reference to a variable


---




# Types

 - Types are determined **dynamically at runtime**, which **differs from type inference** in languages like C# (`which happens at compile time`).
 - "Primitive" types include: **int, float, str, bool**, and **None**.
	 - `NOTE:` This is not the same concept of 'primitivity' as in other OOP languages like Java
		 - **Every type in Python is an object**, including int, float, ...
 - The` type()` function returns the type of the passed variable, e.g.,
 ```python
 x = "hello"
 print(type(x))  # prints <class 'str'>
 x = 33
 print(type(x))  # prints <class 'int'>
 x = None
 print(type(x))  # prints <class 'NoneType'>
 ```


## Type Annotation / Hinting

 - **Type annotation/hinting** (`introduced in Python 3.6`) *allows you to specify a type when declaring a variable*
 - `NOTE:` Violating a specified **type hint will not affect runtime execution** when using the standard CPython compiler ()
	 - The primary benefit of this feature is to enable static analyzers (specifically **linters**) to detect variable misuse, and **display warning**
	 - Less commonly: some **specialized python compilers** (e.g., `Nuitka` and `Mypyc`) **make use of hinting to optimizer performance**
```python
# Type annotation/hinting example:
students_count: int = 1000
```



## Mutable vs. Immutable Types


 ### Immutable Types
 
 - These include:
	 - **All primitive types**
	 - Sequences:
		 - tuple
		 - bytes
	 - Sets:
		 - frozenset

 - When **reassigned, the memory address is not updated**; 
	 - instead, a new memory address is allocated for the new value. 
 - The garbage collector eventually releases the unreferenced memory.
#### Example

> `NOTE:` **id(object)** returns unique ID of the object - the actual mem address in standard CPython 

```python
x = 1
print(id(x)) # Outputs a specific memory address
x = x + 1
print(id(x)) # Outputs a DIFFERENT memory address
```


 ### Mutable Types 

- These include:
	- list
	- dict
	- set
	- bytearray
	- user-defined classes (unless explicitly designed to be immutable)
 - Changes are applied directly to the same memory location.

#### Example
```python
y = [1, 2, 3]
print(id(y)) # Outputs a specific memory address
y.append(4)
print(id(y)) # Outputs the SAME memory address
```



### Mixed types 

- **An immutable object**, like a tuple, **can contain a mutable object**, like a list 
- While you cannot change the tuple to point to a different list, you _can_ modify the contents of the list inside it, e.g.,
```python
t = (1, 2, [3, 4])
```