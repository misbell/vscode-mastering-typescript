////////////////////////////
// Chapter 3
// Interfaces, Classes and Inheritance
////////////////////////////
namespace chapter3 {

    /*   var i = 0;
      setInterval(() => {
          console.log('hello world:' + i++);
      }, 10);
   */
    interface IComplexType {
        id: number;
        name: string;
        //  print(): string;
        // usingTheAnyKeyword(arg1: any): void;
    }

    let complexType: IComplexType;
    complexType = { id: 1, name: "test" };

    console.log(`complexType.id = ${complexType.id}`);

    let incompleteType: IComplexType;
    // illegal incompleteType = {id: 1};


    // That’s because var declarations are accessible anywhere
    // within their containing function, module, namespace, or global scope


    // optionals in interfaces

    interface IOptionalProp {
        id: number;
        name?: string;
    }

    let idOnly: IOptionalProp = { id: 1 };
    let idAndName: IOptionalProp = { id: 2, name: "Gladys" };
    idAndName = idOnly;
    // illegal, not an array type  /// let [anId, aName] = idAndName;

    class SimpleClass {
        id: number;

        print(): void {
            console.log(`SimpleClass.print() called`);
            console.log(`SimpleClass has id : ${this.id}`);
        }
    }

    let mySimpleClass = new SimpleClass();
    mySimpleClass.print();
    let newSimpleClass = new SimpleClass();
    newSimpleClass.id = 1001;
    newSimpleClass.print();

    // relationship between classes and interfaces
    // memorize this example and be able to reproduce at will
    // this is the heart of Microsoft interface theory

    interface IPrint {
        print(): void; // add the return type to kill the error
    }

    function printClass(a: IPrint) {
        a.print();
    }
    class ClassA implements IPrint {
        print() {
            console.log('ClassA.print()');;
        }
    }

    class ClassB implements IPrint {
        print() {
            console.log('ClassB.print()');;
        }
    }

    let ca = new ClassA();
    let cb = new ClassB();

    printClass(ca);
    printClass(cb);

    // onward then saturday sep 30
    // class constructors

    class ClassWithConstructor {
        id: number;
        name: string;
        constructor(_id: number, _name: string) {
            this.id = _id;
            this.name = _name;
        }
    }

    var classWithConstructor = new ClassWithConstructor(1, "name");
    console.log(`classWithConstructor.id = ${classWithConstructor.id}`);
    console.log(`classWithConstructor.name = ${classWithConstructor.name}`);

    // class functions

    class ComplexType implements IComplexType {
        id: number;
        name: string;
        constructor(idArg: number, nameArg: string);
        constructor(idArg: string, nameArg: string);
        constructor(idArg: any, nameArg: any) {
            if (typeof idArg == "number") {
                this.id = idArg;
            }

            this.name = nameArg;
        }

        print(): string {
            return "id: " + this.id + " name: " + this.name;
        }

        usingTheAnyKeyword(arg1: any): any {
            this.id = arg1;
        }

        usingOptionalParameters(optionalArg1?: number) {
            if (optionalArg1) {
                this.id = optionalArg1;
            }
        }

        usingDefaultParameters(defaultArg1: number = 0) {
            this.id = defaultArg1;
        }

        usingRestSyntax(...argArray: number[]) {
            if (argArray.length > 0) {
                this.id = argArray[0];
            }
        }

        usingFunctionCallbacks(callback: (id: number) => string) {
            let cbval = callback(this.id);
            console.log(`callback cbval = ${cbval}`);
        }

    }

    // NOT SHIFT OPT F to prettify typescript code

    let ct1 = new ComplexType(1, "ct1");
    let ct2 = new ComplexType("1", "ct2");

    // error, because 'any' doesn't count as an overload, it's
    // just there to complete the syntax
    //  let ct3 = new ComplexType(true, "test");

    var pr1 = ct1.print();
    var pr2 = ct2.print();

    console.log(` ct1 is ${pr1}`);
    console.log(` ct2 is ${pr2}`);

    ct1.usingTheAnyKeyword(true);
    pr1 = ct1.print();
    console.log(` any ct1 is ${pr1}`);

    ct1.usingTheAnyKeyword({ id: 1, name: "string" });

    pr1 = ct1.print();
    console.log(` ct1 is ${pr1}`);

    ct1.usingOptionalParameters(1);
    pr1 = ct1.print();
    console.log(` optional ct1 is ${pr1}`);

    ct1.usingOptionalParameters();
    pr1 = ct1.print();
    console.log(` optional ct1 is ${pr1}`);

    ct1.usingDefaultParameters(2);
    pr1 = ct1.print();
    console.log(` default ct1 is ${pr1}`);


    ct1.usingDefaultParameters();
    pr1 = ct1.print();
    console.log(` default ct1 is ${pr1}`);


    ct1.usingRestSyntax(1, 2, 3);
    pr1 = ct1.print();
    console.log(` REST ct1 is ${pr1}`);

    ct2.usingRestSyntax(1, 2, 3, 4, 5);
    pr2 = ct2.print();
    console.log(` REST ct2 is ${pr2}`);

    function myCallbackFunction(id: number): string {
        return id.toString();
    }
    ct1.usingFunctionCallbacks(myCallbackFunction);




}// namespace chapter3

namespace chapter3a {

    // NOTE
    // No signatures for constructor functions

    interface IComplexType {
        id: number;
        name: string;
        print(): string;
        usingTheAnyKeyword(arg1: any): any;
        usingOptionalParameters(optionalArg1?: number): void;
        usingDefaultParameters(defaultArg1?: number): void;
        usingRestSyntax(...argArray: number[]): void;
        usingFunctionCallbacks(callback: (id: number) => string): void;
        // not noted in the book, you have to specify the void return type
    }
}

// constructors can't be included in an interface because the interface constructor is implicitly 
// typed by the compiler. IComplexType's constructor return type would be IComplexType, whereas 
// ComplexType constructor return type would always be ComplexType. So it just doesn't logically
// work.

// class modifiers

namespace chapter3ClassModifiers {

    class ClassWithPublicProperty {
        public id: number;
    }

    let publicAccess = new ClassWithPublicProperty();
    publicAccess.id = 10;



    class ClassWithPrivateProperty {
        private id: number;


        constructor(_id: number) {
            this.id = _id;
        }
    }

    let privateAccess = new ClassWithPrivateProperty(10);
    // privateAccess.id = 20;
    // doesn't work, access is private

    // clss functions are public by default
    // also an option to mark access as protected

    class classWithAutomaticProperties {
        constructor(public id: number, private name: string) {

        }
    }

    let myAutoClass = new classWithAutomaticProperties(
        1, "className");
    console.log(`myAutoClass id: ${myAutoClass.id}`);
    // console.log(`myAutoClass.name: ${myAutoClass.name}`);
    // shorthand, best not to use it

    class ClassWithReadOnly {
        readonly name: string;
        constructor(_name: string) {
            this.name = _name;
        }
        setReadOnly(_name: string) {
            // this.name = _name; no. only in constructor
        }

    }

    let input = "...";;
    try {
        JSON.parse(input);
    }
    catch {
        console.log(`invalid JSON given\n\n ${input}`);
    }
    // catch with no variable now allowed

    enum Colors {
        red = "RED",
        blue = "BLUE",
        green = "GREEN"
    }
    // string init now allowed


    class ClassWithAccessors {
        private _id: number;
        get id() {
            console.log(`inside get id()`);
            return this._id;
        }
        set id(value: number) {
            console.log(`inside set id()`);
            this._id = value;
        }
    }

    let classWithAccessors = new ClassWithAccessors();
    classWithAccessors.id = 2;
    console.log(`id property is set to ${classWithAccessors.id}`);

    // static functions

    class StaticClass {
        static printTwo() {
            console.log(`2`);
        }
    }

    StaticClass.printTwo();

    class StaticProperty {
        static count = 0;
        updateCount() {
            StaticProperty.count++;

        }
    }

    let firstInstance = new StaticProperty();

    console.log

    firstInstance.updateCount();

    console.log(`1 StaticProperty.count = ${StaticProperty.count}`);


    let secondInstance = new StaticProperty();
    secondInstance.updateCount();
    console.log(`2 StaticProperty.count = ${StaticProperty.count}`);

    // namespaces, but I've already been using them
    // ah but you can export a class out of the namespace


    namespace FirstNameSpace {
        class NotExported {

        }

        export class NameSpaceClass {
            id: number;
        }


    }
    // Inheritance and Interfaces,
    // implements and extends

    let a = new FirstNameSpace.NameSpaceClass();
    // illegal  let b = new FirstNameSpace.NotExported();

    interface iBase {
        id: number;
    }

    interface iDerivedFromBase extends iBase {
        name: string;
    }

    class InterfaceInheritanceClass implements iDerivedFromBase {
        id: number;
        name: string;
    }

    class BaseClass implements iBase {
        id: number;
    }

    class DerivedFromBaseClass extends BaseClass implements iDerivedFromBase {
        name: string;
    }

    interface IFirstInterface {
        id: number;
    }

    interface ISecondInterface {
        name: string;
    }

    class MultipleInterfaces implements IFirstInterface, ISecondInterface {
        id: number;
        name: string;
    }

    // super

    class BaseClassWithConstructor {
        private id: number;
        constructor(_id: number) {
            this.id = _id;
        }
    }

    class DerivedClassWithConstructor extends BaseClassWithConstructor {
        private name: string;
        constructor(_id: number, _name: string) {
            super(_id);
            this.name = name;
        }
    }

    class BaseClassWithFunction {
        public id: number;
        getProperties(): string {
            return `id: ${this.id}`;
        }
    }

    // also use super for function overloading: 

    class DerivedClassWithFunction extends BaseClassWithFunction {
        public name: string;

        getProperties(): string {
            return `id: ${super.getProperties()} , ${this.name}`;
        }

        afunction(): void {
            this.id = 2;
        }

    }

    var derivedClassWithFunction = new DerivedClassWithFunction();
    derivedClassWithFunction.id = 1;
    derivedClassWithFunction.name = "derivedName";

    console.log(derivedClassWithFunction.getProperties()); // because returns string

    // protected class members

    class ClassUsingProtected {
        protected id: number;
        public getId() {
            return this.id;
        }
    }

    class DerivedFromProtected extends ClassUsingProtected {
        constructor() {
            super()
            this.id = 0;
        }

    }

    var derivedFromProtected = new DerivedFromProtected();
    // illegal derivedFromProtected.id = 1;

    console.log(`getId returns: ${derivedFromProtected.getId()}`);

    // abstract classes

    class Employee {
        public id: number;
        public name: string;

        printDetails() {
            console.log(`id: ${this.id}, name ${this.name}`);


        }
    }

    class Manager {
        public id: number;
        public name: string;
        public Employees: Employee[];
        printDetails() {
            console.log(`id: ${this.id} , name ${this.name} , employeeCount ${this.Employees.length}`);


        }
    }

    abstract class AbstractEmployee {
        public id: number;
        public name: string;

        abstract getDetails(): string;
        public printDetails() {
            console.log(`${this.getDetails()}`);

        }
    }

    class NewEmployee extends AbstractEmployee {
        getDetails(): string {
            return `id: ${this.id}, name: ${this.name}`;

        }
    }

    class NewManager extends NewEmployee {
        public Employees: NewEmployee[];
        getDetails(): string {
            return super.getDetails() + `, employeeCount ${this.Employees.length}`;
        }
    }

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





}

namespace FactoryPatternExample {

    enum PersonCategory {
        Infant,
        Child,
        Adult
    }

    interface IPerson {
        Category: PersonCategory;
        canSignContracts(): boolean;
        printDetails(): any;

    }

    abstract class Person implements IPerson {

        Category: PersonCategory;
        private DateOfBirth: Date;

        constructor(dateOfBirth: Date) {
            this.DateOfBirth = dateOfBirth;
        }

        abstract canSignContracts(): boolean;

        printDetails(): void {
            console.log(` Person : `);
            console.log(` Date of Birth : ` + ` ${this.DateOfBirth.toDateString()} `);
            console.log(` Category : ` + ` ${PersonCategory[this.Category]} `);
            console.log(` Can sign : ` + ` ${this.canSignContracts()} `);

        }


    }

    /// and now the Specialist classes

    class Infant extends Person {
        constructor(dateOfBirth: Date) {
            super(dateOfBirth);
            this.Category = PersonCategory.Infant;
        }

        canSignContracts(): boolean { return false; }

    }

    class Child extends Person {
        constructor(dateOfBirth: Date) {
            super(dateOfBirth);
            this.Category = PersonCategory.Child;
        }

        canSignContracts(): boolean { return false; }

    }
    class Adult extends Person {
        constructor(dateOfBirth: Date) {
            super(dateOfBirth);
            this.Category = PersonCategory.Adult;
        }

        canSignContracts(): boolean { return true; }

    }

    class PersonFactory {
        getPerson(dateOfBirth: Date): IPerson {
            let dateNow = new Date();
            let currentMonth = dateNow.getMonth() + 1;
            let currentDate = dateNow.getDate();

            let dateTwoYearsAgo = new Date(
                dateNow.getFullYear() - 2,
                currentMonth, currentDate);

            let date18YearsAgo = new Date(
                dateNow.getFullYear() - 18,
                currentMonth, currentDate);

            if (dateOfBirth >= dateTwoYearsAgo) {
                return new Infant(dateOfBirth);

            }

            if (dateOfBirth >= date18YearsAgo) {
                return new Child(dateOfBirth);

            }
            return new Adult(dateOfBirth);
        }


    }

    let factory = new PersonFactory();

    let p1 = factory.getPerson(new Date(2016,0,20));
    let p2 = factory.getPerson(new Date(2000, 0, 20));
    let p3 = factory.getPerson(new Date(1969, 0, 20));

    p1.printDetails();

    p2.printDetails();

    p3.printDetails();
    

}







