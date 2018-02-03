# bemblock

[![NPM version](http://img.shields.io/npm/v/bemblock.svg?style=flat)](https://www.npmjs.org/package/bemblock)
[![npm license](http://img.shields.io/npm/l/bemblock.svg?style=flat-square)](https://www.npmjs.org/package/bemblock)
[![Travis Build Status](https://img.shields.io/travis/jedmao/bemblock.svg)](https://travis-ci.org/jedmao/bemblock)
[![codecov](https://codecov.io/gh/jedmao/bemblock/branch/master/graph/badge.svg)](https://codecov.io/gh/jedmao/bemblock)
[![Dependency Status](https://gemnasium.com/badges/github.com/jedmao/bemblock.svg)](https://gemnasium.com/github.com/jedmao/bemblock)

[![npm](https://nodei.co/npm/bemblock.svg?downloads=true)](https://nodei.co/npm/bemblock/)

A function used to construct BEM class names.

## Introduction

What is BEM? See [MindBEMding – getting your head ’round BEM syntax](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
for a primer.

## Installation

```
$ npm install bemblock
```

## Usage

The default export is a function that can be used to construct BEM class names. In most cases, you can just import this module and use it directly in each component. To illustrate this, let's create a simple `Section` component:

```jsx
// /src/components/Section.jsx
import bemBlock from 'bemblock'

const b = bemBlock('section')
```

The above example uses the default options of `__` for the element separator and `--` for the modifiers. If you need to customize the element and modifier separators, see the [Custom Separators](#custom-separators) section below.

The new `b` function from above can be called in two different ways:

### `b( [blockModifiers] )`

Constructs the BEM block class names (e.g., `foo foo--mod1 foo--mod2`).

### `b( elementName [, elementModifiers] )`

Constructs the BEM element class names (e.g., `foo__bar foo__bar--mod1 foo__bar--mod2)`).

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

For ultimate reuse, you might consider allowing all of your components to accept an optional `blockName` prop that changes the default block name. To do this, you just need to move your first `bemBlock` call inside of your render function. Here's an exmaple of what that would look like:

```jsx
export const Foo = ({ blockName, children }) => {
  const b = bemBlock(blockName || 'foo')
  return (
    <div className={b()}>
      {children}
    </div>
  )
}
```

### Custom Separators

If your application requires custom element and modifier separators, you can easily do so by creating your own module that calls this one with configuration options as the first argument. Export the result of that and you can reuse it throughout your application. Here's an example:

```jsx
// ./src/helpers/bemblock.js
import bemBlock from 'bemblock'

export default bemBlock({
  elementSeparator: '__',  // <-- default
  modifierSeparator: '--', // <-- default
})
```

The default-exported function is now ready to be used in your application. Here's an example import for a component:

```jsx
import bemBlock from '../helpers/bemblock'
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
