"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ExperimentsDecorators;
(function (ExperimentsDecorators) {
    // decorator function
    function simpleDecorator(constructor) {
        console.log("simpleDecorator called");
    }
    function secondDecorator(constructor) {
        console.log("secondDecorator called");
    }
    var ClassWithSimpleDecorator = /** @class */ (function () {
        function ClassWithSimpleDecorator() {
        }
        ClassWithSimpleDecorator = __decorate([
            simpleDecorator,
            secondDecorator
        ], ClassWithSimpleDecorator);
        return ClassWithSimpleDecorator;
    }());
    // note that decorator is only called once as class is defined
    var csd1 = new ClassWithSimpleDecorator();
    var csd2 = new ClassWithSimpleDecorator();
    // decorator function
    function decoratorFactory(name) {
        return function (constructor) {
            console.log("decorator function called with : " + name);
        };
    }
    // show simple passing of parameter to decorator, but nothing is done with it
    var ClassWithDecoratorFactory = /** @class */ (function () {
        function ClassWithDecoratorFactory() {
        }
        ClassWithDecoratorFactory = __decorate([
            decoratorFactory('test name')
        ], ClassWithDecoratorFactory);
        return ClassWithDecoratorFactory;
    }());
    // class decorator parameters
    function classConstructorDec(constructor) {
        console.log("constructor : " + constructor);
        // cast constructor to <any> to access its name property
        console.log("constructor.name : " + constructor.name);
        // adding a property to the class definition, 'testProperty',
        // with the value 'testProperty_value'
        constructor.prototype.testProperty = "testProperty_value";
        console.log("show a test branch");
    }
    var ClassWithConstructor = /** @class */ (function () {
        function ClassWithConstructor() {
        }
        ClassWithConstructor = __decorate([
            classConstructorDec
        ], ClassWithConstructor);
        return ClassWithConstructor;
    }());
    // and here you can see the dynamically added property
    var classConstrInstance = new ClassWithConstructor();
    console.log("classConstrInstance.testProperty : " + classConstrInstance.testProperty);
})(ExperimentsDecorators || (ExperimentsDecorators = {}));
//# sourceMappingURL=hello3.js.map