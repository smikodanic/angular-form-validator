/*!
 *  v1.1.0 (https://github.com/smikodanic/angular-form-validator#readme)
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

            var errMsg;

            /******************************** VALIDATION on secific EVENT *********************************/

            //** on any jquery event 'change', 'blur', 'keyup' ... https://api.jquery.com/category/events/)
            iElem.on(options.validateOn, function () {

                $timeout(function () {

                    //validator synch chain
                    errMsg = validateFact.type[type](scope, iElem, iAttrs);
                    if (!errMsg && rulesObj.hasOwnProperty('email')) errMsg = validateFact.email(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('url')) errMsg = validateFact.url(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('tel')) errMsg = validateFact.tel(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('min')) errMsg = validateFact.min(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('max')) errMsg = validateFact.max(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('between')) errMsg = validateFact.between(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('emptySpaces')) errMsg = validateFact.emptySpaces(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('sameAs')) errMsg = validateFact.sameAs(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('regex')) errMsg = validateFact.regex(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('enum')) errMsg = validateFact.enum(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('price')) errMsg = validateFact.price(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('alpha')) errMsg = validateFact.alpha(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('alphanumeric')) errMsg = validateFact.alphanumeric(scope, iElem, iAttrs, rulesObj);

                    //error message to scope
                    scope.errMsg[iAttrs.ngModel] = errMsg;
                    // console.log(JSON.stringify(scope.errMsg, null, 2));

                }, 800);

            });


            //** onBlur validators
            iElem.on('blur', function () {
                $timeout(function () {
                    if (!errMsg && rulesObj.hasOwnProperty('required')) errMsg = validateFact.required(scope, iElem, iAttrs, rulesObj);

                    //error message to scope
                    scope.errMsg[iAttrs.ngModel] = errMsg;
                    // console.log(JSON.stringify(scope.errMsg, null, 2));

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


var sendError = function (iElem, tf, errorMessage) {
    'use strict';

    var err;
    if (!tf) {
        iElem.addClass('redborder');
        err = errorMessage;
    } else {
        iElem.removeClass('redborder');
        err = '';
    }

    return err;
};


module.exports = function () {
    'use strict';

    return {
        type: {

            string: function (scope, iElem, iAttrs) {
                var tf = validationRules.isString(scope[iAttrs.ngModel]);
                // console.log(tf);
                return sendError(iElem, tf, 'Value must be in text format (string).');
            },

            number: function (scope, iElem, iAttrs) {

                //CORRECTOR: converting model's value to number when <input type="text"> is used
                scope[iAttrs.ngModel] = Number(scope[iAttrs.ngModel]) || scope[iAttrs.ngModel];

                var tf = validationRules.isNumber(scope[iAttrs.ngModel]);
                // console.log(tf);
                return sendError(iElem, tf, 'Value must be number.');
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
                return sendError(iElem, tf, 'Value must be valid date.');
            }
        },


        required: function (scope, iElem, iAttrs, rulesObj) {
            var tf = !!scope[iAttrs.ngModel]; //check if field is empty
            return sendError(iElem, tf, rulesObj.required);
        },

        email: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.isEmail(scope[iAttrs.ngModel]);
            return sendError(iElem, tf, rulesObj.email);
        },

        min: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.hasMin(scope[iAttrs.ngModel], rulesObj.min[1]);
            return sendError(iElem, tf, rulesObj.min[0]);
        },

        max: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.hasMax(scope[iAttrs.ngModel], rulesObj.max[1]);
            return sendError(iElem, tf, rulesObj.max[0]);
        },

        between: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.isBetween(scope[iAttrs.ngModel], rulesObj.between[1]);
            return sendError(iElem, tf, rulesObj.between[0]);
        },

        emptySpaces: function (scope, iElem, iAttrs, rulesObj) {
            var tf = !validationRules.hasEmptySpaces(scope[iAttrs.ngModel]);

            //CORRECTOR: remove empty spaces from string
            scope[iAttrs.ngModel] = scope[iAttrs.ngModel].replace(' ', '');

            return sendError(iElem, tf, rulesObj.emptySpaces);
        },

        sameAs: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.areSame(scope[iAttrs.ngModel], scope[rulesObj.sameAs[1]]);
            return sendError(iElem, tf, rulesObj.sameAs[0]);
        },

        regex: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.regexTest(scope[iAttrs.ngModel], rulesObj.regex[1]);
            return sendError(iElem, tf, rulesObj.regex[0]);
        },

        enum: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.enumTest(scope[iAttrs.ngModel], rulesObj.enum[1]);
            return sendError(iElem, tf, rulesObj.enum[0]);
        },

        url: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.isUrl(scope[iAttrs.ngModel]);
            return sendError(iElem, tf, rulesObj.url);
        },

        price: function (scope, iElem, iAttrs, rulesObj) {
            //correct number to 2 decimal points
            scope[iAttrs.ngModel] = parseFloat(scope[iAttrs.ngModel]).toFixed(2);
        },

        tel: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.isTel(scope[iAttrs.ngModel]);
            return sendError(iElem, tf, rulesObj.tel);
        },

        alpha: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.hasAlphaOnly(scope[iAttrs.ngModel]);
            return sendError(iElem, tf, rulesObj.alpha);
        },

        alphanumeric: function (scope, iElem, iAttrs, rulesObj) {
            var tf = validationRules.hasAlphanumericOnly(scope[iAttrs.ngModel]);
            return sendError(iElem, tf, rulesObj.alphanumeric);
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
    },

    isEmail: function (input) {
        'use strict';
        var re = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$');
        // var re = /\S+@\S+\.\S+/;
        var tf = re.test(input);

        return (input)
            ? tf
            : true; // return true if input is empty

    },

    hasMin: function (input, lim) { // lim is Number
        'use strict';
        var tf;
        if (angular.isString(input)) { //when input is string count number of characters
            tf = (input.length >= lim);
        } else if (angular.isNumber(input)) { //when input is number then comapare two numbers
            tf = (input >= lim);
        }

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    hasMax: function (input, lim) { // lim is Number
        'use strict';
        var tf;
        if (angular.isString(input)) { //when input is string count number of characters
            tf = (input.length <= lim);
        } else if (angular.isNumber(input)) { //when input is number then comapare two numbers
            tf = (input <= lim);
        }

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    isBetween: function (input, betweenArr) { //betweenArr = [3, 8]
        'use strict';
        var tf;
        if (angular.isString(input)) { //when input is string count number of characters
            tf = (input.length >= betweenArr[0] && input.length <= betweenArr[1]);
        } else if (angular.isNumber(input)) { //when input is number then comapare two numbers
            tf = (input >= betweenArr[0] && input <= betweenArr[1]);
        }

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    hasEmptySpaces: function (input) {
        'use strict';
        // var tf = (input.indexOf(' ') !== -1);
        var tf = (/\s/g.test(input));

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    areSame: function (input, input2) { //compares input and input2
        'use strict';
        var tf = input === input2;

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    regexTest: function (input, regxStr) {
        'use strict';
        var regx = new RegExp(regxStr);
        var tf = (regx.test(input));

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    enumTest: function (input, enumArr) {
        'use strict';

        var enumArrFiltered = enumArr.filter(function (elem) {
            return (elem === input);
        });

        var tf = (enumArrFiltered.length !== 0);

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    isUrl: function (input) {
        'use strict';
        var re = new RegExp('(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})');
        var tf = re.test(input);

        return (input)
            ? tf
            : true; // return true if input is empty

    },

    isTel: function (input) {
        'use strict';
        var re = new RegExp('^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$', 'g');
        var tf = re.test(input);

        return (input)
            ? tf
            : true; // return true if input is empty

    },

    hasAlphaOnly: function (input) { //must have letters only (no numbers or special chars)
        'use strict';
        var re = new RegExp('^[a-zA-Z]+$');
        var tf = re.test(input);

        return (input)
            ? tf
            : true; // return true if input is empty

    },

    hasAlphanumericOnly: function (input) { //may include letters and numbers only (no special chars)
        'use strict';
        var re = new RegExp('^[a-zA-Z0-9]+$');
        var tf = re.test(input);

        return (input)
            ? tf
            : true; // return true if input is empty

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
