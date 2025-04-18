---
title: no-shadow-restricted-names
rule_type: suggestion
related_rules:
- no-shadow
further_reading:
- https://es5.github.io/#x15.1.1
- https://es5.github.io/#C
---



ES5 §15.1.1 Value Properties of the Global Object (`NaN`, `Infinity`, `undefined`) as well as strict mode restricted identifiers `eval` and `arguments` are considered to be restricted names in JavaScript. Defining them to mean something else can have unintended consequences and confuse others reading the code. For example, there's nothing preventing you from writing:

```js
const undefined = "foo";
```

Then any code used within the same scope would not get the global `undefined`, but rather the local version with a very different meaning.

## Rule Details

Examples of **incorrect** code for this rule:

::: incorrect { "sourceType": "script" }

```js
/*eslint no-shadow-restricted-names: "error"*/

function NaN(){}

!function(Infinity){};

const undefined = 5;

try {} catch(eval){}
```

:::

::: incorrect

```js
/*eslint no-shadow-restricted-names: "error"*/

import NaN from "foo";

import { undefined } from "bar";

class Infinity {}
```

:::

Examples of **correct** code for this rule:

::: correct { "sourceType": "script" }

```js
/*eslint no-shadow-restricted-names: "error"*/

let Object;

function f(a, b){}

// Exception: `undefined` may be shadowed if the variable is never assigned a value.
let undefined;
```

:::

::: correct

```js
/*eslint no-shadow-restricted-names: "error"*/

import { undefined as undef } from "bar";
```

:::
