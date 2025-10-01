# Contributing to Pomodoro Focus

First off, thank you for considering contributing to Pomodoro Focus! It's people like you that make Pomodoro Focus such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** if possible.
* **Include your operating system and version**.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps** or provide mockups.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most Pomodoro Focus users.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript and Rust styleguides
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## Development Setup

### Prerequisites

- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Rust](https://www.rust-lang.org/) - Required for Tauri
- [Node.js](https://nodejs.org/) (optional, for npm compatibility)

### Setting Up Your Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/pomodoro-focus.git
   cd pomodoro-focus
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/bug-description
   ```

5. Run the development server:
   ```bash
   bun run tauri dev
   ```

### Making Changes

1. Make your changes in your branch
2. Test your changes thoroughly
3. Commit your changes:
   ```bash
   git commit -m "feat: add new feature" 
   # or
   git commit -m "fix: resolve bug description"
   ```

### Commit Message Guidelines

We follow conventional commits for clear and consistent commit messages:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect code meaning (white-space, formatting)
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Code change that improves performance
- `test:` - Adding missing tests or correcting existing tests
- `chore:` - Changes to the build process or auxiliary tools

### Code Style

#### TypeScript/React
- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Use functional components and React Hooks

#### Rust
- Follow the Rust style guide
- Run `cargo fmt` before committing
- Run `cargo clippy` and fix any warnings
- Write documentation for public APIs

### Testing

Before submitting a pull request:

1. Build the project:
   ```bash
   bun run build
   bun run tauri build
   ```

2. Test the application manually to ensure:
   - Timer functionality works correctly
   - Tasks can be created, edited, and deleted
   - Statistics are calculated properly
   - No console errors or warnings

### Submitting Your Pull Request

1. Push to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```

2. Open a Pull Request from your fork to the main repository
3. Fill in the PR template with all the required information
4. Link any related issues
5. Wait for review and address any feedback

## Project Structure

```
pomodoro-focus/
├── src/                    # Frontend React code
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript types
├── src-tauri/            # Tauri backend
│   ├── src/             # Rust source code
│   ├── migrations/      # Database migrations
│   └── Cargo.toml       # Rust dependencies
└── package.json         # Node dependencies
```

## Additional Resources

- [Tauri Documentation](https://tauri.app/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Rust Documentation](https://doc.rust-lang.org/)

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

---

Thank you for contributing! 🍅

