
# Overview

> `pyenv` is a CLI utility that allows you to *install, manage, and switch between multiple Python versions* on your computer.

---


# Installation

## Windows

- The simplest way is to use a package manager, e.g. choco:
```powershell
choco install pyenv-win
```

- `NOTE:` 
	- pyenv is not officially available on windows; pyenv-win is a windows-compatible fork



## Linux (Ubuntu)

- *TODO: Add instructions*

---


# Command Cheat Sheet

## Checking & Listing Versions

| Command                        | What It Does                                                                                                                        |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `pyenv versions`               | **(Most Important)** Lists all Python versions you have installed with pyenv. An asterisk indicates the currently active version.   |
| `pyenv install --list` or `-l` | Lists all Python versions that are available for you to install.                                                                    |
| `pyenv version`                | Shows the currently active Python version and why it is active (e.g., set by a local `.python-version` file or the global setting). |

## Installing & Uninstalling

| Command | What It Does |
| :--- | :--- |
| `pyenv install <version>` | Installs a specific Python version (e.g., `pyenv install 3.10.11`). |
| `pyenv uninstall <version>` | Uninstalls a specific Python version (e.g., `pyenv uninstall 3.10.11`). |

## Setting & Switching Versions

*Note: pyenv works by priority: **shell > local > global**.*

| Command                  | What It Does                                                                                                                                                            |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pyenv local <version>`  | **(Most Recommended)** Sets the Python version for the current directory and its subdirectories. It creates a `.python-version` file that you can safely commit to Git. |
| `pyenv global <version>` | Sets the default Python version for your entire user account. Use this if you do not have a local version set.                                                          |
| `pyenv shell <version>`  | Sets the Python version for your current terminal session only. It overrides any local or global settings and deactivates when you close the terminal.                  |

## System & Maintenance

| Command | What It Does |
| :--- | :--- |
| `pyenv rehash` | Updates pyenv's "shims" (the "traffic controllers"). **Important for pyenv-win:** You must run this on Windows after installing a new Python version or any package that has a command-line tool. |
| `pyenv which python` | Shows the full path to the python executable that pyenv is currently using. This is highly useful for debugging your PATH. |