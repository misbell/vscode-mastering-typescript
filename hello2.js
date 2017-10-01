"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
////////////////////////////
// Chapter 3
// Interfaces, Classes and Inheritance
////////////////////////////
var chapter3;
(function (chapter3) {
    var complexType;
    complexType = { id: 1, name: "test" };
    console.log("complexType.id = " + complexType.id);
    var incompleteType;
    var idOnly = { id: 1 };
    var idAndName = { id: 2, name: "Gladys" };
    idAndName = idOnly;
    // illegal, not an array type  /// let [anId, aName] = idAndName;
    var SimpleClass = /** @class */ (function () {
        function SimpleClass() {
        }
        SimpleClass.prototype.print = function () {
            console.log("SimpleClass.print() called");
            console.log("SimpleClass has id : " + this.id);
        };
        return SimpleClass;
    }());
    var mySimpleClass = new SimpleClass();
    mySimpleClass.print();
    var newSimpleClass = new SimpleClass();
    newSimpleClass.id = 1001;
    newSimpleClass.print();
    function printClass(a) {
        a.print();
    }
    var ClassA = /** @class */ (function () {
        function ClassA() {
        }
        ClassA.prototype.print = function () {
            console.log('ClassA.print()');
            ;
        };
        return ClassA;
    }());
    var ClassB = /** @class */ (function () {
        function ClassB() {
        }
        ClassB.prototype.print = function () {
            console.log('ClassB.print()');
            ;
        };
        return ClassB;
    }());
    var ca = new ClassA();
    var cb = new ClassB();
    printClass(ca);
    printClass(cb);
    // onward then saturday sep 30
    // class constructors
    var ClassWithConstructor = /** @class */ (function () {
        function ClassWithConstructor(_id, _name) {
            this.id = _id;
            this.name = _name;
        }
        return ClassWithConstructor;
    }());
    var classWithConstructor = new ClassWithConstructor(1, "name");
    console.log("classWithConstructor.id = " + classWithConstructor.id);
    console.log("classWithConstructor.name = " + classWithConstructor.name);
    // class functions
    var ComplexType = /** @class */ (function () {
        function ComplexType(idArg, nameArg) {
            if (typeof idArg == "number") {
                this.id = idArg;
            }
            this.name = nameArg;
        }
        ComplexType.prototype.print = function () {
            return "id: " + this.id + " name: " + this.name;
        };
        ComplexType.prototype.usingTheAnyKeyword = function (arg1) {
            this.id = arg1;
        };
        ComplexType.prototype.usingOptionalParameters = function (optionalArg1) {
            if (optionalArg1) {
                this.id = optionalArg1;
            }
        };
        ComplexType.prototype.usingDefaultParameters = function (defaultArg1) {
            if (defaultArg1 === void 0) { defaultArg1 = 0; }
            this.id = defaultArg1;
        };
        ComplexType.prototype.usingRestSyntax = function () {
            var argArray = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argArray[_i] = arguments[_i];
            }
            if (argArray.length > 0) {
                this.id = argArray[0];
            }
        };
        ComplexType.prototype.usingFunctionCallbacks = function (callback) {
            var cbval = callback(this.id);
            console.log("callback cbval = " + cbval);
        };
        return ComplexType;
    }());
    // NOT SHIFT OPT F to prettify typescript code
    var ct1 = new ComplexType(1, "ct1");
    var ct2 = new ComplexType("1", "ct2");
    // error, because 'any' doesn't count as an overload, it's
    // just there to complete the syntax
    //  let ct3 = new ComplexType(true, "test");
    var pr1 = ct1.print();
    var pr2 = ct2.print();
    console.log(" ct1 is " + pr1);
    console.log(" ct2 is " + pr2);
    ct1.usingTheAnyKeyword(true);
    pr1 = ct1.print();
    console.log(" any ct1 is " + pr1);
    ct1.usingTheAnyKeyword({ id: 1, name: "string" });
    pr1 = ct1.print();
    console.log(" ct1 is " + pr1);
    ct1.usingOptionalParameters(1);
    pr1 = ct1.print();
    console.log(" optional ct1 is " + pr1);
    ct1.usingOptionalParameters();
    pr1 = ct1.print();
    console.log(" optional ct1 is " + pr1);
    ct1.usingDefaultParameters(2);
    pr1 = ct1.print();
    console.log(" default ct1 is " + pr1);
    ct1.usingDefaultParameters();
    pr1 = ct1.print();
    console.log(" default ct1 is " + pr1);
    ct1.usingRestSyntax(1, 2, 3);
    pr1 = ct1.print();
    console.log(" REST ct1 is " + pr1);
    ct2.usingRestSyntax(1, 2, 3, 4, 5);
    pr2 = ct2.print();
    console.log(" REST ct2 is " + pr2);
    function myCallbackFunction(id) {
        return id.toString();
    }
    ct1.usingFunctionCallbacks(myCallbackFunction);
})(chapter3 || (chapter3 = {})); // namespace chapter3
// constructors can't be included in an interface because the interface constructor is implicitly 
// typed by the compiler. IComplexType's constructor return type would be IComplexType, whereas 
// ComplexType constructor return type would always be ComplexType. So it just doesn't logically
// work.
// class modifiers
var chapter3ClassModifiers;
(function (chapter3ClassModifiers) {
    var ClassWithPublicProperty = /** @class */ (function () {
        function ClassWithPublicProperty() {
        }
        return ClassWithPublicProperty;
    }());
    var publicAccess = new ClassWithPublicProperty();
    publicAccess.id = 10;
    var ClassWithPrivateProperty = /** @class */ (function () {
        function ClassWithPrivateProperty(_id) {
            this.id = _id;
        }
        return ClassWithPrivateProperty;
    }());
    var privateAccess = new ClassWithPrivateProperty(10);
    // privateAccess.id = 20;
    // doesn't work, access is private
    // clss functions are public by default
    // also an option to mark access as protected
    var classWithAutomaticProperties = /** @class */ (function () {
        function classWithAutomaticProperties(id, name) {
            this.id = id;
            this.name = name;
        }
        return classWithAutomaticProperties;
    }());
    var myAutoClass = new classWithAutomaticProperties(1, "className");
    console.log("myAutoClass id: " + myAutoClass.id);
    // console.log(`myAutoClass.name: ${myAutoClass.name}`);
    // shorthand, best not to use it
    var ClassWithReadOnly = /** @class */ (function () {
        function ClassWithReadOnly(_name) {
            this.name = _name;
        }
        ClassWithReadOnly.prototype.setReadOnly = function (_name) {
            // this.name = _name; no. only in constructor
        };
        return ClassWithReadOnly;
    }());
    var input = "...";
    ;
    try {
        JSON.parse(input);
    }
    catch (_a) {
        console.log("invalid JSON given\n\n " + input);
    }
    // catch with no variable now allowed
    var Colors;
    (function (Colors) {
        Colors["red"] = "RED";
        Colors["blue"] = "BLUE";
        Colors["green"] = "GREEN";
    })(Colors || (Colors = {}));
    // string init now allowed
    var ClassWithAccessors = /** @class */ (function () {
        function ClassWithAccessors() {
        }
        Object.defineProperty(ClassWithAccessors.prototype, "id", {
            get: function () {
                console.log("inside get id()");
                return this._id;
            },
            set: function (value) {
                console.log("inside set id()");
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        return ClassWithAccessors;
    }());
    var classWithAccessors = new ClassWithAccessors();
    classWithAccessors.id = 2;
    console.log("id property is set to " + classWithAccessors.id);
    // static functions
    var StaticClass = /** @class */ (function () {
        function StaticClass() {
        }
        StaticClass.printTwo = function () {
            console.log("2");
        };
        return StaticClass;
    }());
    StaticClass.printTwo();
    var StaticProperty = /** @class */ (function () {
        function StaticProperty() {
        }
        StaticProperty.prototype.updateCount = function () {
            StaticProperty.count++;
        };
        StaticProperty.count = 0;
        return StaticProperty;
    }());
    var firstInstance = new StaticProperty();
    console.log;
    firstInstance.updateCount();
    console.log("1 StaticProperty.count = " + StaticProperty.count);
    var secondInstance = new StaticProperty();
    secondInstance.updateCount();
    console.log("2 StaticProperty.count = " + StaticProperty.count);
    // namespaces, but I've already been using them
    // ah but you can export a class out of the namespace
    var FirstNameSpace;
    (function (FirstNameSpace) {
        var NotExported = /** @class */ (function () {
            function NotExported() {
            }
            return NotExported;
        }());
        var NameSpaceClass = /** @class */ (function () {
            function NameSpaceClass() {
            }
            return NameSpaceClass;
        }());
        FirstNameSpace.NameSpaceClass = NameSpaceClass;
    })(FirstNameSpace || (FirstNameSpace = {}));
    // Inheritance and Interfaces,
    // implements and extends
    var a = new FirstNameSpace.NameSpaceClass();
    var InterfaceInheritanceClass = /** @class */ (function () {
        function InterfaceInheritanceClass() {
        }
        return InterfaceInheritanceClass;
    }());
    var BaseClass = /** @class */ (function () {
        function BaseClass() {
        }
        return BaseClass;
    }());
    var DerivedFromBaseClass = /** @class */ (function (_super) {
        __extends(DerivedFromBaseClass, _super);
        function DerivedFromBaseClass() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DerivedFromBaseClass;
    }(BaseClass));
    var MultipleInterfaces = /** @class */ (function () {
        function MultipleInterfaces() {
        }
        return MultipleInterfaces;
    }());
    // super
    var BaseClassWithConstructor = /** @class */ (function () {
        function BaseClassWithConstructor(_id) {
            this.id = _id;
        }
        return BaseClassWithConstructor;
    }());
    var DerivedClassWithConstructor = /** @class */ (function (_super) {
        __extends(DerivedClassWithConstructor, _super);
        function DerivedClassWithConstructor(_id, _name) {
            var _this = _super.call(this, _id) || this;
            _this.name = name;
            return _this;
        }
        return DerivedClassWithConstructor;
    }(BaseClassWithConstructor));
    var BaseClassWithFunction = /** @class */ (function () {
        function BaseClassWithFunction() {
        }
        BaseClassWithFunction.prototype.getProperties = function () {
            return "id: " + this.id;
        };
        return BaseClassWithFunction;
    }());
    // also use super for function overloading: 
    var DerivedClassWithFunction = /** @class */ (function (_super) {
        __extends(DerivedClassWithFunction, _super);
        function DerivedClassWithFunction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DerivedClassWithFunction.prototype.getProperties = function () {
            return "id: " + _super.prototype.getProperties.call(this) + " , " + this.name;
        };
        DerivedClassWithFunction.prototype.afunction = function () {
            this.id = 2;
        };
        return DerivedClassWithFunction;
    }(BaseClassWithFunction));
    var derivedClassWithFunction = new DerivedClassWithFunction();
    derivedClassWithFunction.id = 1;
    derivedClassWithFunction.name = "derivedName";
    console.log(derivedClassWithFunction.getProperties()); // because returns string
    // protected class members
    var ClassUsingProtected = /** @class */ (function () {
        function ClassUsingProtected() {
        }
        ClassUsingProtected.prototype.getId = function () {
            return this.id;
        };
        return ClassUsingProtected;
    }());
    var DerivedFromProtected = /** @class */ (function (_super) {
        __extends(DerivedFromProtected, _super);
        function DerivedFromProtected() {
            var _this = _super.call(this) || this;
            _this.id = 0;
            return _this;
        }
        return DerivedFromProtected;
    }(ClassUsingProtected));
    var derivedFromProtected = new DerivedFromProtected();
    // illegal derivedFromProtected.id = 1;
    console.log("getId returns: " + derivedFromProtected.getId());
    // abstract classes
    var Employee = /** @class */ (function () {
        function Employee() {
        }
        Employee.prototype.printDetails = function () {
            console.log("id: " + this.id + ", name " + this.name);
        };
        return Employee;
    }());
    var Manager = /** @class */ (function () {
        function Manager() {
        }
        Manager.prototype.printDetails = function () {
            console.log("id: " + this.id + " , name " + this.name + " , employeeCount " + this.Employees.length);
        };
        return Manager;
    }());
    var AbstractEmployee = /** @class */ (function () {
        function AbstractEmployee() {
        }
        AbstractEmployee.prototype.printDetails = function () {
            console.log("" + this.getDetails());
        };
        return AbstractEmployee;
    }());
    var NewEmployee = /** @class */ (function (_super) {
        __extends(NewEmployee, _super);
        function NewEmployee() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NewEmployee.prototype.getDetails = function () {
            return "id: " + this.id + ", name: " + this.name;
        };
        return NewEmployee;
    }(AbstractEmployee));
    var NewManager = /** @class */ (function (_super) {
        __extends(NewManager, _super);
        function NewManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NewManager.prototype.getDetails = function () {
            return _super.prototype.getDetails.call(this) + (", employeeCount " + this.Employees.length);
        };
        return NewManager;
    }(NewEmployee));
    var employee = new NewEmployee();
    employee.id = 1;
    employee.name = "Employee Name";
    var manager = new Manager();
    manager.id = 2;
    manager.name = "Manager Name";
    manager.Employees = new Array();
    employee.printDetails();
    manager.printDetails();
    // on to the Factory Design Pattern
})(chapter3ClassModifiers || (chapter3ClassModifiers = {}));
var FactoryPatternExample;
(function (FactoryPatternExample) {
    var PersonCategory;
    (function (PersonCategory) {
        PersonCategory[PersonCategory["Infant"] = 0] = "Infant";
        PersonCategory[PersonCategory["Child"] = 1] = "Child";
        PersonCategory[PersonCategory["Adult"] = 2] = "Adult";
    })(PersonCategory || (PersonCategory = {}));
    var Person = /** @class */ (function () {
        function Person(dateOfBirth) {
            this.DateOfBirth = dateOfBirth;
        }
        Person.prototype.printDetails = function () {
            console.log(" Person : ");
            console.log(" Date of Birth : " + (" " + this.DateOfBirth.toDateString() + " "));
            console.log(" Category : " + (" " + PersonCategory[this.Category] + " "));
            console.log(" Can sign : " + (" " + this.canSignContracts() + " "));
        };
        return Person;
    }());
    /// and now the Specialist classes
    var Infant = /** @class */ (function (_super) {
        __extends(Infant, _super);
        function Infant(dateOfBirth) {
            var _this = _super.call(this, dateOfBirth) || this;
            _this.Category = PersonCategory.Infant;
            return _this;
        }
        Infant.prototype.canSignContracts = function () { return false; };
        return Infant;
    }(Person));
    var Child = /** @class */ (function (_super) {
        __extends(Child, _super);
        function Child(dateOfBirth) {
            var _this = _super.call(this, dateOfBirth) || this;
            _this.Category = PersonCategory.Child;
            return _this;
        }
        Child.prototype.canSignContracts = function () { return false; };
        return Child;
    }(Person));
    var Adult = /** @class */ (function (_super) {
        __extends(Adult, _super);
        function Adult(dateOfBirth) {
            var _this = _super.call(this, dateOfBirth) || this;
            _this.Category = PersonCategory.Adult;
            return _this;
        }
        Adult.prototype.canSignContracts = function () { return true; };
        return Adult;
    }(Person));
    var PersonFactory = /** @class */ (function () {
        function PersonFactory() {
        }
        PersonFactory.prototype.getPerson = function (dateOfBirth) {
            var dateNow = new Date();
            var currentMonth = dateNow.getMonth() + 1;
            var currentDate = dateNow.getDate();
            var dateTwoYearsAgo = new Date(dateNow.getFullYear() - 2, currentMonth, currentDate);
            var date18YearsAgo = new Date(dateNow.getFullYear() - 18, currentMonth, currentDate);
            if (dateOfBirth >= dateTwoYearsAgo) {
                return new Infant(dateOfBirth);
            }
            if (dateOfBirth >= date18YearsAgo) {
                return new Child(dateOfBirth);
            }
            return new Adult(dateOfBirth);
        };
        return PersonFactory;
    }());
    var factory = new PersonFactory();
    var p1 = factory.getPerson(new Date(2016, 0, 20));
    var p2 = factory.getPerson(new Date(2000, 0, 20));
    var p3 = factory.getPerson(new Date(1969, 0, 20));
    p1.printDetails();
    p2.printDetails();
    p3.printDetails();
})(FactoryPatternExample || (FactoryPatternExample = {}));
//# sourceMappingURL=hello2.js.map