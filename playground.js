// my personal little javascript playground

window.onload = () => {

    // example of anonymous function
    console.log("playground.js")
    var addVar = function(a,b) {
        return a + b;
    }

    var addVarResult = addVar(2,3);
    console.log("addVarResult:" + addVarResult);

    // strings

    var concatStrings = function(a,b,c) {
        return a + b + c;
    }
    var concatAbc = concatStrings("a", "b", "c");
    console.log("concatAbc :" + concatAbc);

    var concatAb = concatStrings("a", "b");
    console.log("concatAb :" + concatAb);

    console.log("1 got here");
    // rest parameters, first the JavaScript

    function testArguments() {
        console.log (`arguments.length: ${arguments.length}`);
        if (arguments.length > 0) {
            for (var i = 0; i < arguments.length; i++ ) {
                console.log("argument[" + i + "] = " + arguments[i]);

            }
        }
    }

    console.log("got here");
    testArguments(1,2,3);
    testArguments("firstArg");


    function TestClosure(value) {
        this._value = value;
        function printValue() {
            console.log("closure:")
            console.log(this._value);
    
        }
        return printValue() // NOTE RETURNING A FUNCTION
    }

    var myClosure = TestClosure(12); // RETURNING PRINTVALUE
    myClosure; // EXECUTING PRINTVALUE

    var BaseClassWithConstructor = (function() {
        function BaseClassWithConstructor(_id) {
            this.id = _id;
        }
        return BaseClassWithConstructor;
    })()
}

