# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

<!-- // client/.env save the below config in side client root and save the file name as .env -->

VITE_APP_BASE_URL = http://localhost:8800

<!-- /server/.env    save the below config in side client root and save the file name as .env -->

NODE_ENV = development

MONGODB_URI = "mongodb://127.0.0.1:27017/taskDB"

JWT_SECRET = fdgdfgdfg876868jkbjku798789jk

PORT = 8800

MAILGUN_HOST= smtp.mailgun.org

MAILGUN_PORT=2525
MAILGUN_USER=postmaster@sandboxe4212d2738d34840b4a5818baff8143a.mailgun.org

MAILGUN_PASS=17fab6fa0918ee2677a4a525dcbb2fd2-ac3d5f74-84da0999
MAILGUN_DOMAIN=sandboxe4212d2738d34840b4a5818baff8143a.mailgun.org

```

```
