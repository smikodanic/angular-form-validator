/*!
 *  v1.0.0 (https://github.com/smikodanic/angular-form-validator#readme)
 * Copyright 2014-2016 Sasa Mikodanic
 * Licensed under MIT 
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}

},{}],2:[function(require,module,exports){
/**
 * Controller: 'NgFormValidatorCtrl'
 */
var stringify = require('json-stringify-safe');


module.exports = function ($scope, $element, $attrs) {
    'use strict';

    console.log('CTRL works');

    var attrs = JSON.parse(stringify($attrs));
    console.log(attrs);

    console.log(JSON.stringify($attrs.class, null, 2));

};

},{"json-stringify-safe":1}],3:[function(require,module,exports){
/*global angular*/
var stringify = require('json-stringify-safe');

module.exports = function (ngValidationRules, $parse, $timeout) {
    'use strict';
    console.log('DIRECT works');

    var directiveObj = {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, iElem, iAttrs) { //post-link function
            //model input value
            var inputModel = scope[iAttrs.ngModel];

            /************* DETERMINE TYPE (string, number, date, boolean, objectId, mixed) ***************/

            //get type from <input type="number" ...
            var inputType;
            if (iAttrs.type) {
                inputType = iAttrs.type.toLowerCase();

                switch (inputType) {
                case 'text':
                    inputType = 'string';
                    break;
                case 'number':
                    inputType = 'number';
                    break;
                case 'range':
                    inputType = 'number';
                    break;
                case 'date':
                    inputType = 'date';
                    break;
                case 'datetime-local':
                    inputType = 'date';
                    break;
                default:
                    inputType = 'string';
                }
            } else {
                inputType = 'string';
            }

            console.log('INPUT TYPE: ' + inputType);

            //rules object
            var rulesObj = iAttrs.ngformValidator;
            rulesObj = $parse(rulesObj)(); //convert string to object
            // console.log(rulesObj);


            //// define type
            var type = rulesObj.type || inputType;
            type = type.toLowerCase();
            console.log(type, 'FINAL TYPE');


            scope.$watch(iAttrs.ngModel, function (val) {
                console.log(val);

                if (type === 'number') {
                    iAttrs.ngModel = Number(val); //converting to number if possible
                    console.info(iAttrs.ngModel);
                    var tf = ngValidationRules.isNumber(iAttrs.ngModel);
                    console.log(tf);

                    if (!tf) {
                        iElem.addClass('redborder');
                    } else {
                        iElem.removeClass('redborder');
                    }
                }

            });
        }
    };

    return directiveObj;

};

},{"json-stringify-safe":1}],4:[function(require,module,exports){
/*global angular*/
module.exports = function () {
    'use strict';


    return {
        isString: function (input) {
            return angular.isString(input);
        },

        isNumber: function (input) {
            var tf;
            if (isNaN(input)) {
                tf = false;
            } else {
                tf = angular.isNumber(input);
            }
            return tf;
        }
    };

};

},{}],5:[function(require,module,exports){
/*global angular, window*/

var ngFormValidator = angular.module('ngFormValidator', []);

ngFormValidator.controller('NgFormValidatorCtrl', require('./controller/ngFormValidatorCtrl'));

ngFormValidator.factory('ngValidationRules', require('./factory/ngValidationRules'));



/* login form and logout button directives */
ngFormValidator.directive('ngformValidator', require('./directive/ngFormValidatorDirc'));


//define default templates
ngFormValidator.run(function ($templateCache) {
    'use strict';
    $templateCache.put('simple.html', '<div>jednostavno</div>');
});


/*when used in browserify (require('angular-passport')) */
module.exports = ngFormValidator;



/*when included in html file
<script src=".../dist/js/ngFormValidator.js"></script>
*/
window.ngFormValidator = ngFormValidator;

},{"./controller/ngFormValidatorCtrl":2,"./directive/ngFormValidatorDirc":3,"./factory/ngValidationRules":4}]},{},[5]);
