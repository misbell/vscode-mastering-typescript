namespace chapter2 { 

console.log("hello, vscode");
console.log("hello, vscode");
console.log("hello, vscode");
console.log("hello, vscode ");

function doCalculation(
    a : number,
    b : number,
    c : number
) {
    return (a * b) + c;
}

var result = doCalculation(3,2,1) ;
console.log("docalc(): " + result)

var myString: string;
var myBoolean : boolean;
var myNumber : number;

myString = "1";
myNumber = 1;
myBoolean = true;

// errors
/// myString = myNumber;
// myBoolean = myString;
//myNumber = myBoolean;

// fix with
myString = myNumber.toString();
myBoolean = (myString === "test") // so I guess === is a string comparison for string equality
if (myBoolean) {
    myNumber = 1;
}

// inferred typing

var inferredString = "this is a string";
var inferredNumber = 1;

// this is then illegal
// inferredString = inferredNumber;


// duck typing, if it looks like a duck and quacks like a duck
// it's probably a duck

var complexType = { name: "myName", id: 1};
complexType = {id: 2, name: "anotherName"};

// not allowed, missing a property
// complexType = {id: 2};

// also, no extra properties assigned on the fly
// (I think that's allowed in JavaScript...)

//AND NOW TEMPLATE STRINGS

var myVariable = "test";
console.log(`myVariable=${myVariable}`);

// keep an eye on stack for answer to this one

var arrayOfNumbers: number[] = [1,2,3];
arrayOfNumbers = [3,4,5,6,7,8];
console.log(`arrayOfNumbers: ${arrayOfNumbers}`);
//var mystr = arrayOfNumbers.to
console.log("arrayOfNumbers: " + arrayOfNumbers.toString())




// error, string[] not assignable to number[]
// arrayOfNumbers = ["1", "2", "3"]


var arrayOfStrings : string[] = ["first", "second", "third"];
arrayOfStrings[0] = "fourth";

for (var i = 0; i < arrayOfStrings.length; i++) {
    console.log(`arrayOfStrings[${i}] = ${arrayOfStrings[i]}`);

}

arrayOfStrings[0] = "fourth"



// the any tpe relaxes the compilers strict type checking


var item1 : any = { name: "myName", id: 1};
item1 = {id: 2}; // creates new object, second prop undefined
item1 = { name: "myName", id: 1};
item1.name = "yourname"; // just assigns new value to name property, same object

console.log(`item1 : ${item1.id} ${item1.name}`)


// explicit casting

var item2 = <any> {id: 1, name: "item 2"};
item2 = {id: 2};

enum DoorState {
    Open,
    Closed,
    Ajar
}

var openDoor = DoorState.Open;
console.log(`openDoor is: ${openDoor}`);
// equal to 0, Open

// you can also use a string lookup to get the numerical value
var closedDoor = DoorState["Closed"];
console.log(`closedDoor is: ${closedDoor}`);

// use an array index to get the string value of the enum
var ajarDoor = DoorState[2];
console.log(`ajarDoor is: ${ajarDoor}`);

// destructuring arrays

let input = [1,2];
let [first, second] = input;
// so this is like dealing with tuples in swift
// have to read through the docs, not just Mastering.
// always new stuff coming


// const enums, created for performancer reasons
// resolves to a simple evaluation, no closure


const enum DoorStateConst {
    Open,
    Closed,
    Ajar
}

var openDoorc = DoorStateConst.Open;
console.log(`openDoorc is: ${openDoorc}`);
// equal to 0, Open

// you can also use a string lookup to get the numerical value
var closedDoorc = DoorStateConst["Closed"];
console.log(`closedDoorc is: ${closedDoorc}`);

// use an array index to get the string value of the enum
// can't be done with const var ajarDoorc = DoorStateConst[2];
//                          console.log(`ajarDoorc is: ${ajarDoorc}`);


// const values

const constValue = "test"
// can't reset it - constValue = "ok"

let lvalue = 1;
console.log(`letValue = ${lvalue}`);
lvalue = 2;
console.log(`letValue = ${lvalue}`);

// let values are block scoped
// var values are not 
// I suppose this means vars are global in scope

let lv = 2
console.log(`lv = ${lv}`);
if (lv == 2) {
    let lv = 2001;
    console.log(`block scoped lv = ${lv}`);

}
console.log(`outside the block = ${lv}`);

// on to functions

function addNumbers(a: number, b: number) : string {
  //  return a + b;
  return (a + b).toString();
}

var addResult = addNumbers(2,3);
console.log('addNumbers returned : ${addResult}');


// amonymous functions

var addFunction = function(a: number, b:number) : number {
    return a + b
}

var addFunctionResult = addFunction(2,3)
console.log(`addFunctionResult : ${addFunctionResult}`)

// introduction of the optional parameter
// ? in TypeScript
// to deal with problem of not shipping enough 
// parameters into a function and getting an unwanted 'undefined'
// in JavaScript

// here c is an optional parameter
function concatStrings ( a: string, b: string, c?: string) {

    if ( c !== undefined) {
        return a + b + c;
    } 
        
    return a + b;
    
}

var concatAbc = concatStrings("a", "b", "c");
console.log("concatAbc :" + concatAbc);

var concatAb = concatStrings("a", "b");
console.log("concatAb :" + concatAb);

// with TypeScript interpolation
var concatAbc2 = concatStrings("a", "b", "c");
console.log(`concatAbc2 : ${concatAbc2}`);

var concatAb2 = concatStrings("a", "b");
console.log(`concatAb2 :  ${concatAb2}`);

// illegal
// var concatA1 = concatStrings("a");
// console.log(`concatA1 :  ${concatA1}`);

// demonstrates adding a default to the parameter

function concatStringsDefault ( a: string, b: string = "bb", c: string = "c") {
    
        if ( c !== undefined) {
            return a + b + c;
        } 
            
        return a + b;
        
    }


var defaultConcat = concatStringsDefault("a", "b");
console.log(`defaultConcat :  ${defaultConcat}`);

defaultConcat = concatStringsDefault("a");
console.log(`defaultConcat :  ${defaultConcat}`);

//Rest Parameters
//Rest, meaning what?

// uses the ... syntax for variadic parameters

function testArguments(... argArray: number []) { // any type also works
    if (argArray.length > 0) {
        for (var i = 0; i < argArray.length; i++) {
            // arguments are Number type
            console.log(`argArray[${i}] = ${argArray[i]}`);
            // use JavaScript argumehts variable, iow it still works
            // arguments are Any Type because using JS arguments 
            console.log(`arguments[${i}] = ${arguments[i]}`);
        }
    }
}

testArguments(9);
testArguments(1,2,3);

// callback functions
// and fat arrow syntax

function callbackFunction(text: string) {
    console.log(`inside callbackFunction ${text}`);
}

function doSomethingWithACallback(
    initialText: string,
    callback: (initialText: string) => void
) {
    console.log(`inside doSomethingWithCallback ${initialText}`) ;
    callback(initialText);
}

doSomethingWithACallback("my test", callbackFunction);

// not legal doSomethingWithACallback("my test", "not a func");

// remember declaration files, coming up
// .d.ts files

// function overloads

function add(a: string, b: string) : string;
function add(a: number, b: number) : number;
function add(a: any, b: any): any {
    return a + b;
}

console.log(`add(1,1) = ${add(1,1)}`);
console.log(`add("1","1") = ${add("1","1")}`);

// note using ANY above is just a convention for enabling the overload
// you can only pass two strings, or two numbers, not two anys

// null vs undefined
// null, variable known but no value
// undefined, variable no defined in current scope

function testUndef(test: null | number) {
    console.log(`test paramater: ` + test);

}

testUndef(null);
// but not testUndef();

// | is called a union, like in C
// 'a type can be this or that
let x : number | undefined | null;
x = 1;
x = undefined;
x = null;

// object rest and spread

let firstObj = {id: 1, name: "firstObj"};

let secondObj = {...firstObj}; // WOW copies the properties of firstObj into secondObj
//AH as opposed to a reference copy

// you can also accumulate properties from different objects

let nameObj = {name: "mike"};
let idObj = {id: 1};

let obj3 = {...nameObj, ...idObj};

console.log(`obj3.id = ${obj3.id}`);
console.log(`obj3.name = ${obj3.name}`);


} // namespace chapter2