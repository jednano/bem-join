# bem-join

[![NPM version](http://img.shields.io/npm/v/bem-join.svg?style=flat)](https://www.npmjs.org/package/bem-join)
[![npm license](http://img.shields.io/npm/l/bem-join.svg?style=flat-square)](https://www.npmjs.org/package/bem-join)
[![Travis Build Status](https://img.shields.io/travis/jedmao/bem-join.svg)](https://travis-ci.org/jedmao/bem-join)
[![codecov](https://codecov.io/gh/jedmao/bem-join/branch/master/graph/badge.svg)](https://codecov.io/gh/jedmao/bem-join)
[![Dependency Status](https://gemnasium.com/badges/github.com/jedmao/bem-join.svg)](https://gemnasium.com/github.com/jedmao/bem-join)
[![Unicorn Approved](https://img.shields.io/badge/unicorn-approved-ff69b4.svg)](https://twitter.com/sindresorhus/status/457989012528316416?ref_src=twsrc%5Etfw&ref_url=https%3A%2F%2Fwww.quora.com%2FWhat-does-the-unicorn-approved-shield-mean-in-GitHub)

[![npm](https://nodei.co/npm/bem-join.svg?downloads=true)](https://nodei.co/npm/bem-join/)

A single, [configurable](#custom-separators) function used to construct [BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) class names.
- No dependencies.
- Super tiny footprint @ under 500 bytes (min + gzip).
- Works great with or without [React](http://facebook.github.io/react/).
- Fresh [TypeScript](https://www.typescriptlang.org/) definitions included with each build/release.

## Installation

```
$ npm install bem-join
```

## Usage

The default export is a function that can be used to construct BEM class names. In most cases, you can just import this module and use it directly in each component. To illustrate this, let's create a simple `Section` component:

```jsx
// /src/components/Section.jsx
import bemJoin from 'bem-join'

const b = bemJoin('section')
```

The above example uses the default options of `__` for the element separator and `--` for the modifiers. If you need to customize the element and modifier separators, see the [Custom Separators](#custom-separators) section below.

The new `b` function from above can be called in two different ways:

### `b( [blockModifiers] )`

Constructs the BEM block class names (e.g., `foo foo--mod1 foo--mod2`).

See the [`BEMModifiers`](#bemmodifiers-interface) section below for the modifiers interface.

### `b( elementName [, elementModifiers] )`

Constructs the BEM element class names (e.g., `foo__bar foo__bar--mod1 foo__bar--mod2)`).

See the [`BEMModifiers`](#bemmodifiers-interface) section below for the modifiers interface.

_Let's see it in action!_

```jsx
export const Section = ({ children, heading, isDark, isExpanded }) => (
  <section className={b({ dark: isDark })}>
    <h1 className={b('heading')}>
      {heading}
    </h1>
    <div className={b('body', { expanded: isExpanded })}>
      {children}
    </div>
  </section>
)
```

If `isDark` and `isExpanded` props were both truthy, the result would be the
following HTML:

```html
<section class="section section--dark">
  <h1 class="section__heading">
    Heading
  </h1>
  <div class="section__body section__body--expanded">
    children
  </div>
</section>
```

Of course, if `isDark` and `isExpanded` were false, no `--dark` or `--expanded` modifiers would be constructed for them.

For ultimate reuse, you might consider allowing all of your components to accept an optional `blockName` prop that changes the default block name. To do this, you just need to move your first `bem-join` call inside of your render function. Here's an exmaple of what that would look like:

```jsx
export const Foo = ({ blockName, children }) => {
  const b = bemJoin(blockName || 'foo')
  return (
    <div className={b()}>
      {children}
    </div>
  )
}
```

### `BEMModifiers` Interface

All modifiers must be provided as a hash with `Boolean` or `undefined` values:

```ts
export interface BEMModifiers {
	[modifierName: string]: boolean | undefined
}
```

### Custom Separators

If your application requires custom element and modifier separators, you can easily do so by creating your own module that calls this one with configuration options as the first argument. Export the result of that and you can reuse it throughout your application. Here's an example:

```jsx
// ./src/helpers/bem-join.js
import bemJoin from 'bem-join'

export default bemJoin({
  elementSeparator: '__',  // <-- default
  modifierSeparator: '--', // <-- default
})
```

The default-exported function is now ready to be used in your application. Here's an example import for a component:

```jsx
import bemJoin from '../helpers/bem-join'
```

From here, everything is the same as previously stated in the [Usage](#usage) section.

## Testing

Run the following command:

```
$ npm test
```

This will build scripts, run tests and generate a code coverage report. Anything less than 100% coverage will throw an error.

### Watching

For much faster development cycles, run the following commands in 2 separate processes:

```
$ npm run build:watch
```

Compiles TypeScript source into the `./dist` folder and watches for changes.

```
$ npm run watch
```

Runs the tests in the `./dist` folder and watches for changes.
