
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
        return function (constructor : Function) {
            console.log(`decorator function called with : ${name}`);

            
        }
    }

    // show simple passing of parameter to decorator, but nothing is done with it
    @decoratorFactory('test name')
    class ClassWithDecoratorFactory {

    }

    // class decorator parameters

    function classConstructorDec(constructor: Function) {
        console.log(`constructor : ${constructor}`) ;

        // cast constructor to <any> to access its name property
        console.log(`constructor.name : ${(<any>constructor).name}`);

        // adding a property to the class definition, 'testProperty',
        // with the value 'testProperty_value'
        constructor.prototype.testProperty = "testProperty_value"

        console.log(`show a test branch`);
        
        
        
    }

    @classConstructorDec
    class ClassWithConstructor {

    }

    // and here you can see the dynamically added property
    let classConstrInstance = new ClassWithConstructor();
    console.log(`classConstrInstance.testProperty : ${(<any>classConstrInstance).testProperty}`);
    


}