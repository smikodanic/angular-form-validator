# angular-form-validator
> Angular validation directive with validation rules and error messages.



## 1. Installation
`npm install angular-form-validator`



## 2. Description
This is angular module which gives you angular directive for HTML form validation.
- easy to integrate in your existing angular 1.4+ project
- many default validation rules inspired by [mongoose validation](http://mongoosejs.com/docs/validation.html)
- developer can also create custom validation rules
- tooltip error messages
- help-block error messages
- not dependant on any CSS framework (Bootstrap, Foundation, Material, ...etc) or any JS library like jQuery
- 100% native angular



## 3. Integration

### If you use browserify in your angular project

```javascript
require('angular-form-validator');

var clientApp = angular.module('clientApp', [
    'ngFormValidator'
]);
```

### If you use compiled version (/dist/ folder) include it in HTML file

```html
<script src="... /angular-form-validator/dist/js/ngFormValidator.js"></script>
```



## 4. Angular Directive
Directive is **ngformValidator** and must be applied as a tag attribute.
Config (rules and error messages) are defined inside **config** object.

```html
<input type="text" list="countrylist" class="form-control"
	ng-model="userDoc.country"
	ngform-validator="configObject">
```


## 5. Licence
*Copyright (c) 2016 Saša Mikodanić*

Licensed under [MIT](https://opensource.org/licenses/MIT) .

*(Freely you received, freely give. , Mt10:8)*


