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


module.exports = function ($scope, $element, $attrs, $timeout) {
    'use strict';

    // console.log(stringify($attrs, null, 2));


    $scope.mySubmit = function (evt) {
        $timeout(function () {
            $scope.errMsg.age = 'Error on age field';
            alert('SUBMITTED with error');
        }, 1300);
    };




};

},{"json-stringify-safe":1}],3:[function(require,module,exports){
/*global angular*/
// var stringify = require('json-stringify-safe');

module.exports = function ($parse, $timeout, validateFact) {
    'use strict';

    var directiveObj = {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, iElem, iAttrs) { //post-link function
            // console.log(stringify(iAttrs.ngModel, null, 2));

            //GET INPUT MODEL (if ng-model="age" => iAttrs.model='age')
            // var inputModel = scope[iAttrs.ngModel];

            //GET RULES (from ngform-validator="{...}" which is string)
            var rulesObj = iAttrs.ngformValidator;
            rulesObj = $parse(rulesObj)() || {type: 'string'}; //$parse converts string to object
            // console.log(rulesObj);

            //GET OPTIONS
            var options = iAttrs.ngformValidatorOptions || {};
            options = $parse(options)() || {validateOn: 'blur'}; //$parse converts string to object



            //DEFINE TYPE (string, number, date, boolean, objectId, mixed)

            //// get type from <input type="number" ...
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
            // console.log('INPUT TYPE: ' + inputType);



            //// final type
            var type = rulesObj.type || inputType;
            type = type.toLowerCase();
            // console.log('FINAL TYPE: ' + type);




            //ERROR MESSAGE (default value)
            scope.errMsg = {};


            /******************************** VALIDATION on secific EVENT *********************************/
            /** (any jquery event 'change', 'blur', 'keyup' ... https://api.jquery.com/category/events/) **/

            iElem.on(options.validateOn, function () {
                // console.log(options.validateOn);

                /*** TYPE VALIDATORS ***/
                $timeout(function () {
                    scope.errMsg[iAttrs.ngModel] = validateFact.type[type](scope, iElem, iAttrs);
                }, 800);

            });


            //onBlur checks: required
            iElem.on('blur', function () {
                $timeout(function () {

                    if (rulesObj.hasOwnProperty('required')) {
                        scope.errMsg[iAttrs.ngModel] = validateFact.required(scope, iElem, iAttrs, rulesObj);
                        // console.log(JSON.stringify(scope.errMsg, null, 2));
                    }

                }, 1300);
            });











        } //link:

    }; //directiveObj


    return directiveObj;

};

},{}],4:[function(require,module,exports){
/*global angular*/
// var stringify = require('json-stringify-safe');

module.exports = function () {
    'use strict';

    var directiveObj = {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, iElem, iAttrs) { //post-link function

            iElem.on('click', function () {
                setTimeout(function () {
                    scope.errMsg = {};
                    scope.$apply();
                    angular.element('*').removeClass('redborder');
                }, 1300);
            });

        }
    };

    return directiveObj;
};

},{}],5:[function(require,module,exports){
/*global angular*/
var validationRules = require('../lib/validationRules');

module.exports = function () {
    'use strict';

    var err = {};

    return {
        type: {

            string: function (scope, iElem, iAttrs) {

                var tf = validationRules.isString(scope[iAttrs.ngModel]);
                // console.log(tf);


                if (!tf) {
                    iElem.addClass('redborder');
                    err = 'Value must be in text format (string).';
                } else {
                    iElem.removeClass('redborder');
                    err = '';
                }

                return err;
            },

            number: function (scope, iElem, iAttrs) {

                //CORRECTOR: converting model's value to number when <input type="text"> is used
                scope[iAttrs.ngModel] = Number(scope[iAttrs.ngModel]) || scope[iAttrs.ngModel];

                var tf = validationRules.isNumber(scope[iAttrs.ngModel]);
                // console.log(tf);


                if (!tf) {
                    iElem.addClass('redborder');
                    err = 'Value must be a number.';
                } else {
                    iElem.removeClass('redborder');
                    err = '';
                }

                return err;
            },


            date: function (scope, iElem, iAttrs) {

                //CORRECTOR: converting model's value to date when <input type="text"> is used
                var dateCorrected = new Date(scope[iAttrs.ngModel]);
                dateCorrected = dateCorrected.toString();
                dateCorrected = (dateCorrected === 'Invalid Date')
                    ? false
                    : dateCorrected;
                scope[iAttrs.ngModel] = dateCorrected || scope[iAttrs.ngModel];

                var tf = validationRules.isDate(scope[iAttrs.ngModel]);

                if (!tf) {
                    iElem.addClass('redborder');
                    err = 'Value must be a valid date.';
                } else {
                    iElem.removeClass('redborder');
                    err = '';
                }

                return err;
            }
        },


        required: function (scope, iElem, iAttrs, rulesObj) {
            var tf = !!scope[iAttrs.ngModel]; //check if field is empty

            if (!tf) {
                iElem.addClass('redborder');
                err = rulesObj.required;
            } else {
                iElem.removeClass('redborder');
                err = '';
            }

            return err;
        }





    };

};

},{"../lib/validationRules":6}],6:[function(require,module,exports){
/*global angular*/
module.exports = {
    isString: function (input) {
        'use strict';
        return angular.isString(input);
    },

    isNumber: function (input) {
        'use strict';
        var tf;
        if (isNaN(input)) {
            tf = false;
        } else if (!input) { //return true if input is empty, 0 or null
            tf = true;
        } else {
            tf = angular.isNumber(input);
        }
        return tf;
    },

    isDate: function (input) {
        'use strict';
        var result = Date.parse(input);

        if (input) {
            return !!result;
        } else {
            return true; // return true if input is empty
        }
    }

};

},{}],7:[function(require,module,exports){
/*global angular, window*/

var ngFormValidator = angular.module('ngFormValidator', []);

ngFormValidator.controller('NgFormValidatorCtrl', require('./controller/ngFormValidatorCtrl'));

ngFormValidator.factory('validateFact', require('./factory/validateFact'));

ngFormValidator.directive('ngformValidator', require('./directive/ngFormValidatorDirc'));
ngFormValidator.directive('ngformValidatorReset', require('./directive/ngFormValidatorResetDirc'));





/*when used in browserify (require('angular-passport')) */
module.exports = ngFormValidator;

/*when included in html file
<script src=".../dist/js/ngFormValidator.js"></script>
*/
window.ngFormValidator = ngFormValidator;

},{"./controller/ngFormValidatorCtrl":2,"./directive/ngFormValidatorDirc":3,"./directive/ngFormValidatorResetDirc":4,"./factory/validateFact":5}]},{},[7]);
