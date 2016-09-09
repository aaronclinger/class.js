# Class

`createClass` is a utility that creates classes, with inheritance, in JavaScript. `createClass` is inspired by John Resig’s [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) and MooTool’s [base Class](http://mootools.net/docs/core/Class/Class), but has a unique set of design decisions and functionality:

* Classes can be defined using many different [styles and structures](https://github.com/aaronclinger/class.js#defining-a-class)
* Allows private variables and functions
* Has the ability to create static classes
* Easily namespaced

## Example Usage

```js
createClass(function Person() {
	var personName;
	
	this.init = function(name) {
		personName = name;
	};
	
	this.getName = function() {
		return personName;
	};
});

var person = new Person('Aaron');

console.log(person.getName());

createClass({
	namespace: 'com.aaronclinger',
	extend: Person,
	define: function PersonProfession() {
		var personProfession;
		
		this.init = function(name, profession) {
			this.parent(name);
			
			personProfession = profession;
		};
		
		this.getProfession = function() {
			return personProfession;
		};
	}
});

var proPerson = new com.aaronclinger.PersonProfession('Aaron', 'Programmer');

console.log(proPerson.getName(), proPerson.getProfession());
```


## Documentation

`createClass`’s function constructor either accepts a function or an options object:

### createClass(*define*)

* **define** (function) - The function that defines the class. See *[Defining a Class](https://github.com/aaronclinger/class.js#defining-a-class)* below.

### createClass(*options*)

* **options** (object) - An object that defines the routes settings and callback function.
    * **options.define** (function) - The function that defines the class. See *[Defining a Class](https://github.com/aaronclinger/class.js#defining-a-class)* below.
    * **[options.extend]** (Class/function) - The `createClass` that this class will extend.
    * **[options.namespace]** (string) - The namespace path in object dot notation. `createClass` will automatically create the namespace objects if they do not previously exist.
    * **[options.type]** (string) - Pass the value `"static"` to create a static class. 
    * **[options.name]** (string) - Defines the name of the class. If a name is not provided, the name of the function provided to **options.define** will be used.

### Defining a Class

There are many different philosophies on creating class-like structures in JavaScript. `createClass` aims to work with as many of these styles as possible and supports mixed styles throughout your project. The following are some common styles that will work to define the same class:

```js
createClass(function Person() {
	var public = {},
	    personName;
	
	public.init = function(name) {
		personName = name;
	};
	
	public.getName = function() {
		return personName;
	};
	
	return public;
});

function Person() {}
Person.prototype.init = function(name) {
	this.personName = name;
};
Person.prototype.getName = function() {
	return this.personName;
};
createClass(Person);

createClass({
	name: 'Person',
	define: {
		init: function(name) {
			this.personName = name;
		},
		getName: function() {
			return this.personName;
		}
	}
});

createClass(function Person() {
	var personName;
	
	this.init = function(name) {
		personName = name;
	};
	
	this.getName = function() {
		return personName;
	};
});
```


### Special Methods

Classes created by `createClass` have two special methods:

* **init([*params*])** - If an `init()` method is defined in the class, it will act as the constructor and will be called when new instances of the class are created.
* **parent([*params*])** - When extending a class, `parent()` allows you to invoke, and pass parameters to, an overridden method from the subclass' method. `parent()` acts similarly to `super()` in other programming languages.


### Scope

By default, the `createClass` function and class namespaces are added to the global `window` object. If you wish to change this scope, you can modify the last line of `class.js` where scope is passed into the self-executing function as a parameter.


### Inheritance and instanceof

`createClass` does not use the prototype chain and `instanceof` will not properly test the class or its inheritance.


## License

`createClass` can be used freely for any open source or commercial works and is released under a [MIT license](http://en.wikipedia.org/wiki/MIT_License).


## Author

[Aaron Clinger](http://aaronclinger.com)
