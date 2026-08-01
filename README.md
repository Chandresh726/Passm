# Passm

Passm is a local-first password manager built as a Rust command-line application. It stores credentials on your device and provides commands for adding, retrieving, listing, updating, and deleting entries.

[Website](https://passm.slope726.in) · [Download for Windows](https://github.com/Chandresh726/Passm/releases/latest/download/passm-cli-windows.exe) · [Releases](https://github.com/Chandresh726/Passm/releases)

## Features

- Local credential storage
- Master-password verification using PBKDF2
- Password encryption using ChaCha20-Poly1305
- Interactive prompts that keep passwords out of normal command history
- Simple `init`, `add`, `get`, `list`, `update`, and `delete` commands

## Getting started on Windows

Download `passm-cli-windows.exe` from the [latest release](https://github.com/Chandresh726/Passm/releases/latest), then run it from PowerShell:

```powershell
.\passm-cli-windows.exe init
.\passm-cli-windows.exe add github --username your-username
.\passm-cli-windows.exe get github
.\passm-cli-windows.exe list
```

Omit the password option when adding an entry to enter it through a hidden interactive prompt.

By default, Passm stores its data at `~/.config/passm/passwords.json`. Set `JSON_PATH` to use a different file location.

## Developer setup

Install [Rust](https://www.rust-lang.org/tools/install), clone the repository, and run:

```bash
git clone git@github.com:Chandresh726/Passm.git
cd Passm
cargo build
cargo run -- init
```

To work on the React and Vite website, install Node.js and npm, then run:

```bash
cd frontend
npm ci
npm run dev
```

Useful checks:

```bash
cargo test
cd frontend && npm run build
```

## Project structure

- `src/` — Rust CLI, local storage, and encryption logic
- `frontend/` — React and Vite project website published with GitHub Pages

## Security note

Passm is a personal project and has not undergone an independent security audit. Review the implementation before using it for critical credentials.
