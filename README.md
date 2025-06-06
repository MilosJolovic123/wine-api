# 🍷 Wine API

API for managing wine data, built using the [NestJS](https://nestjs.com/) framework.

## 🚀 Technologies

* [NestJS](https://nestjs.com/) – a progressive Node.js framework for building efficient and scalable server-side applications
* [TypeScript](https://www.typescriptlang.org/) – a statically typed superset of JavaScript
* [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) – code analysis and formatting tools

## 📁 Project Structure

```
wine-api/
├── src/                 # Main source code of the application
├── test/                # Tests
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── nest-cli.json        # Nest CLI configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tsconfig.build.json  # TypeScript config for build
└── README.md            # This file
```

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MilosJolovic123/wine-api.git
   cd wine-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run start:dev
   ```

## ✅ Scripts

* `npm run start:dev` – start the application in development mode
* `npm run build` – compile the TypeScript code
* `npm run lint` – run ESLint for code analysis
* `npm run format` – format code using Prettier

## 🔍 Testing

> Tests are not yet implemented. Adding unit and integration tests is planned for future versions.

## 📌 TODO

* [ ] Implement CRUD operations for the wine entity
* [ ] Add authentication and authorization
* [ ] Connect to a database (e.g., PostgreSQL)
* [ ] Write unit and integration tests

## 📄 License

MIT
