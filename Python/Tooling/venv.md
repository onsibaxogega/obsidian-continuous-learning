# Overview

> `venv` is a built-in Python module that allows you to *create isolated virtual environments* to manage project-specific dependencies (packages) without interfering with the global Python installation or other projects.

---

# Installation

## Windows

- Built into Python 3.3 and later. No separate installation is required.
- `NOTE:` 
	- `venv` cannot install Python versions. It uses the Python interpreter that is currently active when you run the command (e.g., the version set by `pyenv`).

## Linux (Ubuntu)

- While the module is part of standard Python, Ubuntu often requires installing the specific system package:
```bash
sudo apt update
sudo apt install python3-venv
```


# Command Cheat Sheet

- `NOTE: ` some examples will use `.venv` as <env_name> (the directory in which the venv files are stored)

## Creating an Environment

| **Command**                 | **What It Does**                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `python -m venv <env_name>` | Creates a new virtual environment folder in the current directory. (Standard naming convention is usually `.venv` or `venv`). |

## Activating and Deactivating

_Note: You must activate the environment every time you open a new terminal session to work on your project. Activation commands differ by OS and shell._

| **OS / Shell**       | **Command**                    | **What It Does**                                                                          |
| -------------------- | ------------------------------ | ----------------------------------------------------------------------------------------- |
| Windows (PowerShell) | `.\.venv\Scripts\Activate.ps1` | Activates the environment in PowerShell. Your prompt will change to show the env name.    |
| Windows (CMD)        | `.venv\Scripts\activate.bat`   | Activates the environment in Command Prompt.                                              |
| Linux (Bash/Zsh)     | `source .venv/bin/activate`    | Activates the environment in standard Unix shells.                                        |
| Any OS               | `deactivate`                   | Exits the virtual environment and returns your terminal to the global Python environment. |

## Working with Dependencies

_Note: These commands should be run AFTER activating your virtual environment._

|**Command**|**What It Does**|
|---|---|
|`pip install <package_name>`|Installs a package specifically into the active virtual environment, keeping it isolated from the rest of your system.|
|`pip list`|Lists the packages currently installed inside the active virtual environment.|
|`pip freeze > requirements.txt`|Saves a list of all installed packages and their exact versions to a text file, allowing others to replicate your environment.|
|`pip install -r requirements.txt`|Reads the text file and installs all listed packages into the active environment.|