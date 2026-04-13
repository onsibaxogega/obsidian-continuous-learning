# Python: `if __name__ == '__main__':`

## Core Purpose
This statement acts as a traffic cop for your script. It allows a Python file to serve two distinct purposes:
1. **Standalone script:** Runs its own execution logic.
2. **Reusable module:** Can be imported by other scripts without automatically running its execution logic.

## How it Works
* **The `__name__` Variable:** A special built-in variable that Python automatically creates and assigns a value to whenever a script is loaded.
* **When run directly** (e.g., `python my_script.py`): Python assigns the string `'__main__'` to `__name__`. The code block indented under the `if` statement **is executed**.
* **When imported** (e.g., `import my_script`): Python assigns the actual name of the file (minus `.py`) to `__name__`. The code block indented under the `if` statement **is completely ignored**.

## Why the Double Underscores?
* Variables and methods wrapped in double underscores (like `__name__`, `__init__`, or `__str__`) are called **"dunder"** (double-under) variables.
* This is Python's standard naming convention for internal system variables. The underscores ensure these special variables never accidentally clash with normal variables you might create in your own code (e.g., `name = "John"`).

## Example Pattern

```python
# math_tools.py

def add(a, b):
    return a + b

# This line runs no matter what (run directly OR imported)
print("Loading math_tools...") 

if __name__ == '__main__':
    # This block ONLY runs if you execute `python math_tools.py` directly.
    # It is ignored if another file imports this module.
    print("Executing math_tools.py directly!")
    result = add(5, 5)
    print(f"5 + 5 = {result}")