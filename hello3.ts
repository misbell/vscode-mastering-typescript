
import 'reflect-metadata';

namespace ExperimentsDecorators {


    // decorator function
    function simpleDecorator(constructor: Function) {
        console.log(`simpleDecorator called`);

    }
    function secondDecorator(constructor: Function) {
        console.log(`secondDecorator called`);

    }

    @simpleDecorator
    @secondDecorator
    class ClassWithSimpleDecorator {

    }

    // note that decorator is only called once as class is defined
    let csd1 = new ClassWithSimpleDecorator();
    let csd2 = new ClassWithSimpleDecorator();

    // decorator function
    function decoratorFactory(name: string) {
        return function (constructor: Function) {
            console.log(`decorator function called with : ${name}`);


        }
    }

    // show simple passing of parameter to decorator, but nothing is done with it
    @decoratorFactory('test name')
    class ClassWithDecoratorFactory {

        // class decorators
        // 1 param, class prototype
    }

    // class decorator parameters

    function classConstructorDec(constructor: Function) {
        console.log(`constructor : ${constructor}`);

        // cast constructor to <any> to access its name property
        console.log(`constructor.name : ${(<any>constructor).name}`);

        // adding a property to the class definition, 'testProperty',
        // with the value 'testProperty_value'
        constructor.prototype.testProperty = "testProperty_value"

        console.log(`show a test branch`);

        console.log(`still`);




    }

    @classConstructorDec
    class ClassWithConstructor {

    }

    // and here you can see the dynamically added property
    let classConstrInstance = new ClassWithConstructor();
    console.log(`classConstrInstance.testProperty : ${(<any>classConstrInstance).testProperty}`);


    // property decorators
    // 2 params, class prototype and property name

    function propertyDec(target: any, propertyKey: string) {
        console.log(`target : ${target}`);
        console.log(`target.constructor : ${target.constructor}`);

        if (typeof (target) === `function`) {
            console.log(`class name : ${target.name}`);
        } else {
            console.log(`class name : ${target.constructor.name}`);
        }

        console.log(`propertyKey : ${propertyKey} `);

    }

    class ClassWithPropertyDec {

        @propertyDec
        name: string;
    }

    class StaticClassWithPropertyDec {
        @propertyDec
        static nname: string;

    }

    // method decorators
    // 3 params, class prototype, method name, method desc (only for ES5 and above)
    // 

    function methodDec(target: any, methodName: string, descriptor?: PropertyDescriptor) {
        console.log(`target: ${target}`),
            console.log(`methodName : ${methodName}`),
            console.log(`target[methodName] : ${target[methodName]} `);

    }

    class ClassWithMethodDec {
        @methodDec
        print(output: string) {
            console.log(`ClassWithMethodDec.print (${output}) called.`);
        }
    }

    // using method decorators to create an audit trail

    function auditLogDec(target: any, methodName: string, descriptor?: PropertyDescriptor) {

        console.log(`auditLogDec is called here`);
        console.log(`method name is ${methodName}`)

        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, methodName);
        }

        let originalFunction = target[methodName];

        let auditFunction = descriptor;

        auditFunction.value = function () {
            console.log(`auditLogDec : override of ${methodName} called`);
            originalFunction.apply(this, arguments);

        };

        target[methodName] = auditFunction;
        console.log(`target method name is now  ${methodName}`)

        return auditFunction;

    }

    class ClassWithAuditDec {
        @auditLogDec
        print(output: string) {
            console.log(`ClassWithMethodDec.print (${output} called.)`);
        }

    }

    let auditClass = new ClassWithAuditDec();
    auditClass.print("test ");

    // parameter decorators

    function parameterDec(target: any, methodName: string, parameterIndex: number) {
        console.log(`target: ${target}`);
        console.log(`methodName: ${methodName}`);
        console.log(`parameterIndex ${parameterIndex}`);

    }

    class ClassWithParamDec {
        print( @parameterDec value: string, @parameterDec name: string) {

            console.log(`in print`);
            // note no name or type or value info
            // not much use
            // this was in the book. checking current status.

            // interested code, where you can mark a parameter as
            // required, and then the decorate the method itself
            // with a validate decorator

            // https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators


        }

    }

    let cp = new ClassWithParamDec();
    cp.print("hello", "world");


    // and now moving on to metadata


    function metadataParameterDec(target: any, methodName: string, parameterIndex: number) {


        let designType = Reflect.getMetadata("design:type", target, methodName);
        console.log(`designType: ${designType}`);

        let designParamTypes = Reflect.getMetadata("design:paramtypes", target, methodName);
        console.log(`paramtypes: ${designParamTypes}`);

        let designReturnType = Reflect.getMetadata("design:returntype", target, methodName);
        console.log(`returnType: ${designReturnType}`);
        
    }

    class ClassWithMetaData {
        print(
            @metadataParameterDec
            id: number,
            name: string): number {
                return 1000;

        }

    }

 // stopped here to npm install reflect-metadata and @types/reflect-metadata
 

}

namespace Generics {

    class Concatenator<T> {
        concatenateArray(inputArray: Array<T>): string {
            
            let returnString = "";

            for (let i = 0; i < inputArray.length; i++) {

            }
            return returnString;
        };
    }

}
