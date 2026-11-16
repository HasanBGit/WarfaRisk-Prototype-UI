# Contributing

Thank you for your interest in this prototype interface.

## Before you open a pull request

```bash
cd frontend && npm install && npx oxlint && npm run build
cd ../backend && uvx ruff check . && uvx ruff format --check .
```

All commands must pass.

## Guidelines

- Keep changes small and focused on one problem.
- Do not commit API keys, `.env` files or patient data. The interface only shows fixed example data.
- The code is released under the Apache License 2.0, and your contribution will be too.
