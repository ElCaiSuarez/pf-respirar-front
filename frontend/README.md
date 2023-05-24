# estacionapp

This template should help get you started developing with Vue 3 in Vite.


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

FRONT:
```sh
npm run dev
```
BACK:
npm run-script run
Endpoints:
localhost:3000/station/
localhost:3000/station/?userId=1
POST Body:
{
    "name": "Text station",
    "description": "Text station description",
    "userId": 2
}

### Compile and Minify for Production

```sh
npm run build
```
