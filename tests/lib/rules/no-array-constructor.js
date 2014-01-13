/**
 * @fileoverview Tests for the no-array-constructor rule
 * @author Matt DuVall <http://www.mattduvall.com/>
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslintTester = require("../../../lib/tests/eslintTester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

eslintTester.addRuleTest("no-array-constructor", {
    valid: [
        "new foo.Array()",
        "foo.Array()",
        "new Array.foo",
        "Array.foo()"
    ],
    invalid: [
        { code: "new Array()", errors: [{ message: "The array literal notation [] is preferrable.", type: "NewExpression"}] },
        { code: "new Array", errors: [{ message: "The array literal notation [] is preferrable.", type: "NewExpression"}] },
        { code: "new Array(x, y)", errors: [{ message: "The array literal notation [] is preferrable.", type: "NewExpression"}] },
        { code: "new Array(0, 1, 2)", errors: [{ message: "The array literal notation [] is preferrable.", type: "NewExpression"}] }
    ]
});
