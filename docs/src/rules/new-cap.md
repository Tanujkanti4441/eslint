---
title: new-cap
rule_type: suggestion
---


The `new` operator in JavaScript creates a new instance of a particular type of object. That type of object is represented by a constructor function. Since constructor functions are just regular functions, the only defining characteristic is that `new` is being used as part of the call. Native JavaScript functions begin with an uppercase letter to distinguish those functions that are to be used as constructors from functions that are not. Many style guides recommend following this pattern to more easily determine which functions are to be used as constructors.

```js
const friend = new Person();
```

## Rule Details

This rule requires constructor names to begin with a capital letter. Certain built-in identifiers are exempt from this rule. These identifiers are:

* `Array`
* `Boolean`
* `Date`
* `Error`
* `Function`
* `Number`
* `Object`
* `RegExp`
* `String`
* `Symbol`
* `BigInt`

Examples of **correct** code for this rule:

::: correct

```js
/*eslint new-cap: "error"*/

function foo(arg) {
    return Boolean(arg);
}
```

:::

## Options

This rule has an object option:

* `"newIsCap": true` (default) requires all `new` operators to be called with uppercase-started functions.
* `"newIsCap": false` allows `new` operators to be called with lowercase-started or uppercase-started functions.
* `"capIsNew": true` (default) requires all uppercase-started functions to be called with `new` operators.
* `"capIsNew": false` allows uppercase-started functions to be called without `new` operators.
* `"newIsCapExceptions"` allows specified lowercase-started function names to be called with the `new` operator.
* `"newIsCapExceptionPattern"` allows any lowercase-started function names that match the specified regex pattern to be called with the `new` operator.
* `"capIsNewExceptions"` allows specified uppercase-started function names to be called without the `new` operator.
* `"capIsNewExceptionPattern"` allows any uppercase-started function names that match the specified regex pattern to be called without the `new` operator.
* `"properties": true` (default) enables checks on object properties
* `"properties": false` disables checks on object properties

### newIsCap

Examples of **incorrect** code for this rule with the default `{ "newIsCap": true }` option:

::: incorrect

```js
/*eslint new-cap: ["error", { "newIsCap": true }]*/

const friend = new person();
```

:::

Examples of **correct** code for this rule with the default `{ "newIsCap": true }` option:

::: correct

```js
/*eslint new-cap: ["error", { "newIsCap": true }]*/

const friend = new Person();
```

:::

Examples of **correct** code for this rule with the `{ "newIsCap": false }` option:

::: correct

```js
/*eslint new-cap: ["error", { "newIsCap": false }]*/

const friend = new person();
```

:::

### capIsNew

Examples of **incorrect** code for this rule with the default `{ "capIsNew": true }` option:

::: incorrect

```js
/*eslint new-cap: ["error", { "capIsNew": true }]*/

const colleague = Person();
```

:::

Examples of **correct** code for this rule with the default `{ "capIsNew": true }` option:

::: correct

```js
/*eslint new-cap: ["error", { "capIsNew": true }]*/

const colleague = new Person();
```

:::

Examples of **correct** code for this rule with the `{ "capIsNew": false }` option:

::: correct

```js
/*eslint new-cap: ["error", { "capIsNew": false }]*/

const colleague = Person();
```

:::

### newIsCapExceptions

Examples of additional **correct** code for this rule with the `{ "newIsCapExceptions": ["events"] }` option:

::: correct

```js
/*eslint new-cap: ["error", { "newIsCapExceptions": ["events"] }]*/

const events = require('events');

const emitter = new events();
```

:::

### newIsCapExceptionPattern

Examples of additional **correct** code for this rule with the `{ "newIsCapExceptionPattern": "^person\\.." }` option:

::: correct

```js
/*eslint new-cap: ["error", { "newIsCapExceptionPattern": "^person\\.." }]*/

const friend = new person.acquaintance();

const bestFriend = new person.friend();
```

:::

Examples of additional **correct** code for this rule with the `{ "newIsCapExceptionPattern": "\\.bar$" }` option:

::: correct

```js
/*eslint new-cap: ["error", { "newIsCapExceptionPattern": "\\.bar$" }]*/

const friend = new person.bar();
```

:::

### capIsNewExceptions

Examples of additional **correct** code for this rule with the `{ "capIsNewExceptions": ["Person"] }` option:

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptions": ["Person"] }]*/

function foo(arg) {
    return Person(arg);
}
```

:::

### capIsNewExceptionPattern

Examples of additional **correct** code for this rule with the `{ "capIsNewExceptionPattern": "^person\\.." }` option:

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^person\\.." }]*/

const friend = person.Acquaintance();
const bestFriend = person.Friend();
```

:::

Examples of additional **correct** code for this rule with the `{ "capIsNewExceptionPattern": "\\.Bar$" }` option:

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "\\.Bar$" }]*/

foo.Bar();
```

:::

Examples of additional **correct** code for this rule with the `{ "capIsNewExceptionPattern": "^Foo" }` option:

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^Foo" }]*/

const x = Foo(42);

const y = Foobar(42);

const z = Foo.Bar(42);
```

:::

### properties

Examples of **incorrect** code for this rule with the default `{ "properties": true }` option:

::: incorrect

```js
/*eslint new-cap: ["error", { "properties": true }]*/

const friend = new person.acquaintance();
```

:::

Examples of **correct** code for this rule with the default `{ "properties": true }` option:

::: correct

```js
/*eslint new-cap: ["error", { "properties": true }]*/

const friend = new person.Acquaintance();
```

:::

Examples of **correct** code for this rule with the `{ "properties": false }` option:

::: correct

```js
/*eslint new-cap: ["error", { "properties": false }]*/

const friend = new person.acquaintance();
```

:::

## When Not To Use It

If you have conventions that don't require an uppercase letter for constructors, or don't require capitalized functions be only used as constructors, turn this rule off.
