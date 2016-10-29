# angular-form-validator
> Angular validation directive with validation rules and error messages. Angular form validator that you will love!



## 1. Installation
`npm install angular-form-validator`



## 2. Description
This is angular module which gives you angular directive for HTML form validation.
- easy to integrate in your existing angular 1.4+ project
- many default validation rules inspired by [mongoose validation](http://mongoosejs.com/docs/validation.html)
- validation on almost all [jQuery events](https://api.jquery.com/category/events/): 'change', 'keyup', 'click', 'blur' ...etc
- developer can also create custom validation rules
- error messages in custom HTML
- not dependant on any CSS framework (Bootstrap, Foundation, Material, ...etc) or any JS library like jQuery
- 100% native angular

It's not only validator but corrector. For example if you put type:'number' it will automatically convert string into JS number format.

DEMO: [https://smikodanic.github.io/angular-form-validator/](https://smikodanic.github.io/angular-form-validator/)<br>
DEMO CODE: [https://github.com/smikodanic/angular-form-validator/blob/master/index.html](https://github.com/smikodanic/angular-form-validator/blob/master/index.html)


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

##### Also don't forget to include CSS file.
```html
<head>
	<link rel="stylesheet" type="text/css" href="./dist/css/ngFormValidator.css">
</head>
```


## 4. Angular Directive
Directive is **ngformValidator** and must be applied as a tag attribute.
Config (rules and error messages) are defined inside **config** object.

```html
<input type="text" list="countrylist" class="form-control"
	ng-model="userDoc.country"
	ngform-validator="configObject">
```



## 5. Validation rules

#### TYPE VALIDATORS
- **string** - accepts any string value
- **number** - accepts integer or float numbers (12 , 12.23, 1.2e-21)
- **date** - accept valid date formats mm/dd/yy , mm/d/yyy hh:mm:ss , m.d.yy , mm.dd.hh and converts it automatically

#### MIN, MAX, BETWEEN
- **min** - If type:'number' then it will compare two numbers (input >= number). If type:'string' will validate number of characters.
- **max** - If type:'number' then it will compare two numbers (input <= number). If type:'string' will validate number of characters.


## 6. Options

```html
ngform-validator-options="{validateOn: 'keyup'}"
```

- validateOn: 'change' | 'keyup' (any of [jQuery events](https://api.jquery.com/category/events/) )




## 6. Licence
*Copyright (c) 2016 Saša Mikodanić*

Licensed under [MIT](https://opensource.org/licenses/MIT) .

*(Freely you received, freely give. , Mt10:8)*


