"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
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
        console.log("still");
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
    // property decorators
    // 2 params, class prototype and property name
    function propertyDec(target, propertyKey) {
        console.log("target : " + target);
        console.log("target.constructor : " + target.constructor);
        if (typeof (target) === "function") {
            console.log("class name : " + target.name);
        }
        else {
            console.log("class name : " + target.constructor.name);
        }
        console.log("propertyKey : " + propertyKey + " ");
    }
    var ClassWithPropertyDec = /** @class */ (function () {
        function ClassWithPropertyDec() {
        }
        __decorate([
            propertyDec,
            __metadata("design:type", String)
        ], ClassWithPropertyDec.prototype, "name", void 0);
        return ClassWithPropertyDec;
    }());
    var StaticClassWithPropertyDec = /** @class */ (function () {
        function StaticClassWithPropertyDec() {
        }
        __decorate([
            propertyDec,
            __metadata("design:type", String)
        ], StaticClassWithPropertyDec, "nname", void 0);
        return StaticClassWithPropertyDec;
    }());
    // method decorators
    // 3 params, class prototype, method name, method desc (only for ES5 and above)
    // 
    function methodDec(target, methodName, descriptor) {
        console.log("target: " + target),
            console.log("methodName : " + methodName),
            console.log("target[methodName] : " + target[methodName] + " ");
    }
    var ClassWithMethodDec = /** @class */ (function () {
        function ClassWithMethodDec() {
        }
        ClassWithMethodDec.prototype.print = function (output) {
            console.log("ClassWithMethodDec.print (" + output + ") called.");
        };
        __decorate([
            methodDec,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String]),
            __metadata("design:returntype", void 0)
        ], ClassWithMethodDec.prototype, "print", null);
        return ClassWithMethodDec;
    }());
    // using method decorators to create an audit trail
    function auditLogDec(target, methodName, descriptor) {
        console.log("auditLogDec is called here");
        console.log("method name is " + methodName);
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, methodName);
        }
        var originalFunction = target[methodName];
        var auditFunction = descriptor;
        auditFunction.value = function () {
            console.log("auditLogDec : override of " + methodName + " called");
            originalFunction.apply(this, arguments);
        };
        target[methodName] = auditFunction;
        console.log("target method name is now  " + methodName);
        return auditFunction;
    }
    var ClassWithAuditDec = /** @class */ (function () {
        function ClassWithAuditDec() {
        }
        ClassWithAuditDec.prototype.print = function (output) {
            console.log("ClassWithMethodDec.print (" + output + " called.)");
        };
        __decorate([
            auditLogDec,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String]),
            __metadata("design:returntype", void 0)
        ], ClassWithAuditDec.prototype, "print", null);
        return ClassWithAuditDec;
    }());
    var auditClass = new ClassWithAuditDec();
    auditClass.print("test ");
    // parameter decorators
    function parameterDec(target, methodName, parameterIndex) {
        console.log("target: " + target);
        console.log("methodName: " + methodName);
        console.log("parameterIndex " + parameterIndex);
    }
    var ClassWithParamDec = /** @class */ (function () {
        function ClassWithParamDec() {
        }
        ClassWithParamDec.prototype.print = function (value, name) {
            console.log("in print");
            // note no name or type or value info
            // not much use
            // this was in the book. checking current status.
            // interested code, where you can mark a parameter as
            // required, and then the decorate the method itself
            // with a validate decorator
            // https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators
        };
        __decorate([
            __param(0, parameterDec), __param(1, parameterDec),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, String]),
            __metadata("design:returntype", void 0)
        ], ClassWithParamDec.prototype, "print", null);
        return ClassWithParamDec;
    }());
    var cp = new ClassWithParamDec();
    cp.print("hello", "world");
    // and now moving on to metadata
    function metadataParameterDec(target, methodName, parameterIndex) {
        var designType = Reflect.getMetadata("design:type", target, methodName);
        console.log("designType: " + designType);
        var designParamTypes = Reflect.getMetadata("design:paramtypes", target, methodName);
        console.log("paramtypes: " + designParamTypes);
        var designReturnType = Reflect.getMetadata("design:returntype", target, methodName);
        console.log("returnType: " + designReturnType);
    }
    var ClassWithMetaData = /** @class */ (function () {
        function ClassWithMetaData() {
        }
        ClassWithMetaData.prototype.print = function (id, name) {
            return 1000;
        };
        __decorate([
            __param(0, metadataParameterDec),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Number, String]),
            __metadata("design:returntype", Number)
        ], ClassWithMetaData.prototype, "print", null);
        return ClassWithMetaData;
    }());
    // stopped here to npm install reflect-metadata and @types/reflect-metadata
})(ExperimentsDecorators || (ExperimentsDecorators = {}));
var Generics;
(function (Generics) {
    var Concatenator = /** @class */ (function () {
        function Concatenator() {
        }
        Concatenator.prototype.concatenateArray = function (inputArray) {
            var returnString = "";
            for (var i = 0; i < inputArray.length; i++) {
            }
            return returnString;
        };
        ;
        return Concatenator;
    }());
})(Generics || (Generics = {}));
//# sourceMappingURL=hello3.js.map