# Contributing to Cesario

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/cesario.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit: `git commit -am 'Add feature'`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env .env.local

# Start development server with hot reload
npm run dev
```

## Code Style

- Use 2 spaces for indentation
- Use camelCase for variables and functions
- Use UPPER_CASE for constants
- Add comments for complex logic
- Keep functions small and focused

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## Commit Messages

Use clear, descriptive commit messages:
- ✨ Feature: `feat: add ban system`
- 🐛 Bug fix: `fix: resolve banner issue`
- 📚 Documentation: `docs: update README`
- 🔨 Refactor: `refactor: simplify code`
- ✅ Tests: `test: add ban tests`

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Ensure all tests pass
4. Keep PR focused on one feature
5. Add clear description of changes
6. Reference any related issues

## Reporting Issues

- Use clear, descriptive titles
- Provide steps to reproduce
- Include error messages and logs
- Specify your environment (OS, Node version, etc.)

## Feature Requests

- Clearly describe the feature
- Explain the use case
- Provide examples if possible
- Be open to discussion

## Questions?

Open an issue or start a discussion!

Thank you for contributing! 🚀