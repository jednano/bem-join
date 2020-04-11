# bem-join

[![GitHub Actions](https://github.com/jedmao/bem-join/workflows/Node%20CI/badge.svg?event=push)](https://github.com/jedmao/bem-join/actions)
[![NPM version](http://img.shields.io/npm/v/bem-join.svg?style=flat)](https://www.npmjs.org/package/bem-join)
[![npm license](http://img.shields.io/npm/l/bem-join.svg?style=flat-square)](https://www.npmjs.org/package/bem-join)
[![codecov](https://codecov.io/gh/jedmao/bem-join/branch/master/graph/badge.svg)](https://codecov.io/gh/jedmao/bem-join)
[![BundlePhobia Minified](https://badgen.net/bundlephobia/min/bem-join?label=min)](https://bundlephobia.com/result?p=bem-join)
[![BundlePhobia Minified + gzip](https://badgen.net/bundlephobia/minzip/bem-join?label=min%2Bgzip)](https://bundlephobia.com/result?p=bem-join)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Unicorn Approved](https://img.shields.io/badge/unicorn-approved-ff69b4.svg)](https://twitter.com/sindresorhus/status/457989012528316416?ref_src=twsrc%5Etfw&ref_url=https%3A%2F%2Fwww.quora.com%2FWhat-does-the-unicorn-approved-shield-mean-in-GitHub)

[![npm](https://nodei.co/npm/bem-join.svg?downloads=true)](https://nodei.co/npm/bem-join/)

A single, [configurable](#custom-separators) function used to construct [BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) class names.

- No dependencies.
- Super tiny footprint @ under 500 bytes (min + gzip).
- Works great with or without [React](http://facebook.github.io/react/).
- Generated [TypeScript](https://www.typescriptlang.org/) definitions packaged with each build/release.

## Installation

```
$ npm install bem-join
```

## Usage

The `bemJoin` function can be used to construct BEM class names. In most cases, you can just import this module and use it directly in each component. To illustrate this, let's create a simple `Section` component:

```jsx
// /src/components/Section.jsx
import { bemJoin } from 'bem-join';

const b = bemJoin('section');
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
    <h1 className={b('heading')}>{heading}</h1>
    <div className={b('body', { expanded: isExpanded })}>{children}</div>
  </section>
);
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

Of course, if `isDark` and `isExpanded` were falsey, no `--dark` or `--expanded` modifiers would be constructed for them.

For ultimate reuse, you might consider allowing all of your components to accept an optional `blockName` prop that changes the default block name. To do this, you just need to move your first `bem-join` call inside of your render function. Here's an example of what that would look like:

```jsx
export const Foo = ({ blockName, children }) => {
  const b = bemJoin(blockName || 'foo');
  return <div className={b()}>{children}</div>;
};
```

### `BEMModifiers` Interface

All modifiers must be provided as a `Record` object with `Boolean` or `undefined` values:

```ts
export type BEMModifiers = Record<string, boolean | undefined>;
```

### Custom Separators

If your application requires custom element and modifier separators, you can easily do so by creating your own module that calls this one with configuration options as the first argument. Export the result of that and you can reuse it throughout your application. Here's an example:

```jsx
// ./src/helpers/bem-join.js
import { bemJoin as _bemJoin } from 'bem-join';

export const bemJoin = _bemJoin({
  elementSeparator: '__', // <-- default
  modifierSeparator: '--', // <-- default
});
```

The exported function is now ready to be used in your application. Here's an example import for a component:

```jsx
import { bemJoin } from '../helpers/bem-join';
```

From here, everything is the same as previously stated in the [Usage](#usage) section.

## Testing

Run the following command:

```
$ npm test
```
