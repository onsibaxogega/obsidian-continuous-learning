In Python, `from typing import Protocol` is ==used to implement **structural subtyping**== (often called static duck typing). 

Unlike traditional object-oriented programming where a class must explicitly inherit from an interface or abstract base class (nominal typing), a `Protocol` allows a type checker to verify a class based solely on its **structure and methods**, regardless of its inheritance chain.

## 💡 Core Concept
If a class implements all the methods and variables defined in a `Protocol` with matching type signatures, Python's static type checkers (like `mypy` or `pyright`) will treat it as a valid subtype automatically.

### Example

```python
from typing import Protocol

# 1. Define the Protocol (the contract)
class Renderable(Protocol):
    def render(self) -> str:
        ...  # Use ellipsis for empty method bodies

# 2. Define classes that fit the structural contract (No inheritance needed!)
class Button:
    def render(self) -> str:
        return "<button>Submit</button>"

class Image:
    def render(self) -> str:
        return "<img src='logo.png' />"

# 3. Use the Protocol as a type hint
def display_component(component: Renderable) -> None:
    print(component.render())

# Both work flawlessly with static type checkers
display_component(Button())
display_component(Image())

```