/**
 * @fileoverview Disallow shadowing of globalThis, NaN, undefined, and Infinity (ES2020 section 18.1)
 * @author Michael Ficarra
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-shadow-restricted-names"),
	RuleTester = require("../../../lib/rule-tester/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
	languageOptions: {
		ecmaVersion: 5,
		sourceType: "script",
	},
});

ruleTester.run("no-shadow-restricted-names", rule, {
	valid: [
		"function foo(bar){ var baz; }",
		"!function foo(bar){ var baz; }",
		"!function(bar){ var baz; }",
		"try {} catch(e) {}",
		{
			code: "export default function() {}",
			languageOptions: { ecmaVersion: 6, sourceType: "module" },
		},
		{
			code: "try {} catch {}",
			languageOptions: { ecmaVersion: 2019 },
		},
		"var undefined;",
		"var undefined; doSomething(undefined);",
		"var undefined; var undefined;",
		{
			code: "let undefined",
			languageOptions: { ecmaVersion: 2015 },
		},
		{
			code: "import { undefined as undef } from 'foo';",
			languageOptions: {
				sourceType: "module",
				ecmaVersion: 2015,
			},
		},
		{
			code: "let globalThis;",
			languageOptions: { ecmaVersion: 2020 },
		},
		{
			code: "class globalThis {}",
			languageOptions: { ecmaVersion: 2020 },
		},
		{
			code: "import { baz as globalThis } from 'foo';",
			languageOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
			},
		},
		{
			code: "globalThis.foo",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2020 },
		},
		{
			code: "const foo = globalThis",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2020 },
		},
		{
			code: "function foo() { return globalThis; }",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2020 },
		},
		{
			code: "import { globalThis as foo } from 'bar'",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2020, sourceType: "module" },
		},
	],
	invalid: [
		{
			code: "function NaN(NaN) { var NaN; !function NaN(NaN) { try {} catch(NaN) {} }; }",
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "NaN" },
					type: "Identifier",
					column: 10,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "NaN" },
					type: "Identifier",
					column: 14,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "NaN" },
					type: "Identifier",
					column: 25,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "NaN" },
					type: "Identifier",
					column: 40,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "NaN" },
					type: "Identifier",
					column: 44,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "NaN" },
					type: "Identifier",
					column: 64,
				},
			],
		},
		{
			code: "function undefined(undefined) { !function undefined(undefined) { try {} catch(undefined) {} }; }",
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 10,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 20,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 43,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 53,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 79,
				},
			],
		},
		{
			code: "function Infinity(Infinity) { var Infinity; !function Infinity(Infinity) { try {} catch(Infinity) {} }; }",
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "Infinity" },
					type: "Identifier",
					column: 10,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "Infinity" },
					type: "Identifier",
					column: 19,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "Infinity" },
					type: "Identifier",
					column: 35,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "Infinity" },
					type: "Identifier",
					column: 55,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "Infinity" },
					type: "Identifier",
					column: 64,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "Infinity" },
					type: "Identifier",
					column: 89,
				},
			],
		},
		{
			code: "function arguments(arguments) { var arguments; !function arguments(arguments) { try {} catch(arguments) {} }; }",
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "arguments" },
					type: "Identifier",
					column: 10,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "arguments" },
					type: "Identifier",
					column: 20,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "arguments" },
					type: "Identifier",
					column: 37,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "arguments" },
					type: "Identifier",
					column: 58,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "arguments" },
					type: "Identifier",
					column: 68,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "arguments" },
					type: "Identifier",
					column: 94,
				},
			],
		},
		{
			code: "function eval(eval) { var eval; !function eval(eval) { try {} catch(eval) {} }; }",
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 10,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 15,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 27,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 43,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 48,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 69,
				},
			],
		},
		{
			code: "var eval = (eval) => { var eval; !function eval(eval) { try {} catch(eval) {} }; }",
			languageOptions: { ecmaVersion: 6 },
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 5,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 13,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 28,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 44,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 49,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "eval" },
					type: "Identifier",
					column: 70,
				},
			],
		},
		{
			code: "var [undefined] = [1]",
			languageOptions: { ecmaVersion: 6 },
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 6,
				},
			],
		},
		{
			code: "var {undefined} = obj; var {a: undefined} = obj; var {a: {b: {undefined}}} = obj; var {a, ...undefined} = obj;",
			languageOptions: { ecmaVersion: 9 },
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 6,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 32,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 63,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 94,
				},
			],
		},
		{
			code: "var undefined; undefined = 5;",
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 5,
				},
			],
		},
		{
			code: "class undefined {}",
			languageOptions: {
				ecmaVersion: 2015,
			},
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 7,
				},
			],
		},
		{
			code: "(class undefined {})",
			languageOptions: {
				ecmaVersion: 2015,
			},
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 8,
				},
			],
		},
		{
			code: "import undefined from 'foo';",
			languageOptions: {
				ecmaVersion: 2015,
				sourceType: "module",
			},
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 8,
				},
			],
		},
		{
			code: "import { undefined } from 'foo';",
			languageOptions: {
				ecmaVersion: 2015,
				sourceType: "module",
			},
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 10,
				},
			],
		},
		{
			code: "import { baz as undefined } from 'foo';",
			languageOptions: {
				ecmaVersion: 2015,
				sourceType: "module",
			},
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 17,
				},
			],
		},
		{
			code: "import * as undefined from 'foo';",
			languageOptions: {
				ecmaVersion: 2015,
				sourceType: "module",
			},
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "undefined" },
					type: "Identifier",
					column: 13,
				},
			],
		},
		{
			code: "function globalThis(globalThis) { var globalThis; !function globalThis(globalThis) { try {} catch(globalThis) {} }; }",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2015 },
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 10,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 21,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 39,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 61,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 72,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 99,
				},
			],
		},
		{
			code: "function globalThis(globalThis) { var globalThis; !function globalThis(globalThis) { try {} catch(globalThis) {} }; }",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2020 },
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 10,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 21,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 39,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 61,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 72,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 99,
				},
			],
		},
		{
			code: "const [globalThis] = [1]",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2020 },
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 8,
				},
			],
		},
		{
			code: "var {globalThis} = obj; var {a: globalThis} = obj; var {a: {b: {globalThis}}} = obj; var {a, ...globalThis} = obj;",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2020 },
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 6,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 33,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 65,
				},
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 97,
				},
			],
		},
		{
			code: "let globalThis; globalThis = 5;",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2020 },
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 5,
				},
			],
		},
		{
			code: "class globalThis {}",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2020 },
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 7,
				},
			],
		},
		{
			code: "(class globalThis {})",
			options: [{ reportGlobalThis: true }],
			languageOptions: { ecmaVersion: 2020 },
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 8,
				},
			],
		},
		{
			code: "import globalThis from 'foo';",
			options: [{ reportGlobalThis: true }],
			languageOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
			},
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 8,
				},
			],
		},
		{
			code: "import { globalThis } from 'foo';",
			options: [{ reportGlobalThis: true }],
			languageOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
			},
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 10,
				},
			],
		},
		{
			code: "import { baz as globalThis } from 'foo';",
			options: [{ reportGlobalThis: true }],
			languageOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
			},
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 17,
				},
			],
		},
		{
			code: "import * as globalThis from 'foo';",
			options: [{ reportGlobalThis: true }],
			languageOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
			},
			errors: [
				{
					messageId: "shadowingRestrictedName",
					data: { name: "globalThis" },
					type: "Identifier",
					column: 13,
				},
			],
		},
	],
});
