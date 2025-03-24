# Xello Take Home Assignment

## Structure

There are 2 top level directories:
- `xl-lit` — contains a Lit/Vite project with a library of components.
- `demo-app` — contains minimal angular app that uses imports and uses lit components.

## Preparing the project

### 1. Install and build Lit Components

```bash

> cd ./xl-lit

# install dependencies
> npm install

# build
> npx vite build

# !IMPORTANT
# This will create a symlink to current project
# and will make it available in npm
# under the name @xl/lit-components
> npm link

```

### 2. Install and run Demo App

```bash

# assuming you're in project root
> cd ./demo-app

# install dependencies
> npm install

# !IMPORTANT
# Link lit components to make them available in
# angular project
> npm link @xl/lit-components

# run the demo app
> npx ng serve
```

After this the app should be available at http://localhost:4200/

## Running Component Tests

Lit Components are tested in the browser using playwright as per Lit documentation recommendations https://lit.dev/docs/tools/testing/#testing-in-the-browser.

To run tests you need to install Playwright on your computer:

```bash
# assuming you're in project root
> cd ./xl-lit

> npx playwright install
```

After this.

```bash
# assuming you're in project root
> cd ./xl-lit

> npx vitest

# Alternatively
> npm run test
```

## Notes on issues and further improvements

- `xl-reaction-picker` component creates a popup and positions it using a very recent CSS feature — _CSS anchor positioning API_. This API natively only works in Chrome. To add support in other browsers there is a polyfill available (https://github.com/oddbird/css-anchor-positioning).

- `xl-reaction-picker` popup sheet is an `absolute`ly positioned `div` that lives in the shadow dom of `xl-reaction-picker`. This means that it is susceptible to z-index stacking issues. Even right now in current implementation it is pretty easy to cover it with some `relative` or `absolute` positioned element.
  
  One way to address this issue is to use a portal implementation for lit that would render the popup as a last node in the dom of the page. I looked at https://github.com/nicholas-wilcox/lit-modal-portal but to use it I would need to re-architect `xl-reaction-picker` to separate popup into it's own components. Reason being `lit-modal-portal` treatment of `<slot />` elements.

- Accessibility of `xl-reaction-picker`. Current implementation of the picker is basically accessible just by nature of it being put together from a set of native HTML `<button />`s. It is possible to "Tab into" the right button to do an action like add/remove reaction, pick reaction from a picker.
  
  To make this component fully accessible it should be updated to adhere to WAI ARIA _Combobox Pattern_ from https://www.w3.org/WAI/ARIA/apg/patterns/combobox/.






