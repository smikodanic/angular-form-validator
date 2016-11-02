/*!
 *  v1.5.1 (https://github.com/smikodanic/angular-form-validator#readme)
 * Copyright 2014-2016 Sasa Mikodanic
 * Licensed under MIT 
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Controller: 'NgFormValidatorCtrl'
 */
// var stringify = require('json-stringify-safe');


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

},{}],2:[function(require,module,exports){
/*global angular*/
// var stringify = require('json-stringify-safe');


/**
 * On JS event ('keyup', 'change', ...etc) we want to get value from input form field by using ng-model="some.var".
 * This function resolves multilevel scope object defined in ng-model="some.multilevel.scope.object".
 * It will resolve up to 5 levels.
 * @param  {Object} scope  - angular $scope object
 * @param  {Object} iAttrs - attribute object which contains HTML tag attributes
 * @return {Mixed}        - ng-model value
 */
var getInputModelValue = function (scope, iAttrs) {
    'use strict';
    var ngModelArr = iAttrs.ngModel.split('.');
    // console.log(JSON.stringify(ngModelArr, null, 2));

    var inputModel;

    switch (ngModelArr.length) {
    case 1:
        if (scope[ngModelArr[0]]) inputModel = scope[ngModelArr[0]];
        break;
    case 2:
        if (scope[ngModelArr[0]] && scope[ngModelArr[0]][ngModelArr[1]]) inputModel = scope[ngModelArr[0]][ngModelArr[1]];
        break;
    case 3:
        if (scope[ngModelArr[0]] && scope[ngModelArr[0]][ngModelArr[1]] && scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]]) inputModel = scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]];
        break;
    case 4:
        if (scope[ngModelArr[0]] && scope[ngModelArr[0]][ngModelArr[1]] && scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]] && scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]]) inputModel = scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]];
        break;
    case 5:
        if (scope[ngModelArr[0]] && scope[ngModelArr[0]][ngModelArr[1]] && scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]] && scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]] && scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]][ngModelArr[4]]) inputModel = scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]][ngModelArr[4]];
        break;
    default:
        inputModel = scope[iAttrs.ngModel];
    }


    return inputModel;
};

/**
 * Takes errMsg and puts it into scope, so we can use it to output error in HTML.
 * For example {{errMsg.users.first_name}}
 * @param  {Object} scope  - angular's $scope object
 * @param  {Object} iAttrs - attribute object which contains HTML tag attributes
 * @param  {String} errMsg - error message defined in ngform-validator="{min: ['Error message ...', 2]}"
 * @return {undefined}
 */
var outputErrorMessage = function (scope, iAttrs, errMsg) {
    'use strict';
    var ngModelArr = iAttrs.ngModel.split('.');
    // console.log(JSON.stringify(ngModelArr, null, 2));

    if (!scope.errMsg) scope.errMsg = {};

    switch (ngModelArr.length) {
    case 1:
        scope.errMsg[ngModelArr[0]] = errMsg;
        break;
    case 2:
        if (!scope.errMsg[ngModelArr[0]]) scope.errMsg[ngModelArr[0]] = {};
        scope.errMsg[ngModelArr[0]][ngModelArr[1]] = errMsg;
        break;
    case 3:
        if (!scope.errMsg[ngModelArr[0]]) scope.errMsg[ngModelArr[0]] = {};
        if (!scope.errMsg[ngModelArr[0]][ngModelArr[1]]) scope.errMsg[ngModelArr[0]][ngModelArr[1]] = {};
        scope.errMsg[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]] = errMsg;
        break;
    case 4:
        if (!scope.errMsg[ngModelArr[0]]) scope.errMsg[ngModelArr[0]] = {};
        if (!scope.errMsg[ngModelArr[0]][ngModelArr[1]]) scope.errMsg[ngModelArr[0]][ngModelArr[1]] = {};
        if (!scope.errMsg[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]]) scope.errMsg[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]] = {};
        scope.errMsg[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]] = errMsg;
        break;
    case 5:
        if (!scope.errMsg[ngModelArr[0]]) scope.errMsg[ngModelArr[0]] = {};
        if (!scope.errMsg[ngModelArr[0]][ngModelArr[1]]) scope.errMsg[ngModelArr[0]][ngModelArr[1]] = {};
        if (!scope.errMsg[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]]) scope.errMsg[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]] = {};
        if (!scope.errMsg[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]]) scope.errMsg[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]] = {};
        scope.errMsg[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]][ngModelArr[4]] = errMsg;
        break;
    default:
        scope.errMsg[ngModelArr[0]] = errMsg;
    }

};



module.exports = function ($parse, $timeout, validateFact) {
    'use strict';

    var directiveObj = {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, iElem, iAttrs) { //post-link function
            // console.log(stringify(iAttrs.ngModel, null, 2));


            //GET RULES (from ngform-validator="{...}" which is string)
            var rulesObj = iAttrs.ngformValidator;
            rulesObj = $parse(rulesObj)() || {type: 'string'}; //$parse converts string to object
            // console.log(rulesObj);

            //GET OPTIONS
            var options = iAttrs.ngformValidatorOptions || {};
            options = $parse(options)() || {validateOn: 'blur'}; //$parse converts string to object


            //GET CUSTOM VALIDATOR FUNCTION
            var customFunc;
            if (iAttrs.ngformValidatorCustom) {
                customFunc = eval('(' + iAttrs.ngformValidatorCustom + ')');
                // console.log(customFunc);
            }



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






            /******************************** VALIDATION on secific EVENT *********************************/
            var errMsg;


            //** on any jquery event 'change', 'blur', 'keyup' ... https://api.jquery.com/category/events/)
            iElem.on(options.validateOn, function () {

                //GET INPUT MODEL VALUE (if ng-model="age" => iAttrs.model='age')
                var inputModel = getInputModelValue(scope, iAttrs);

                $timeout(function () {

                    //validator synch chain (execute one by one)
                    errMsg = validateFact.type[type](inputModel, iElem, scope, iAttrs); //type validator is always first
                    if (!errMsg && rulesObj.hasOwnProperty('email')) errMsg = validateFact.email(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('url')) errMsg = validateFact.url(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('tel')) errMsg = validateFact.tel(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('min')) errMsg = validateFact.min(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('max')) errMsg = validateFact.max(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('between')) errMsg = validateFact.between(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('emptySpaces')) errMsg = validateFact.emptySpaces(inputModel, iElem, scope, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('sameAs')) errMsg = validateFact.sameAs(inputModel, iElem, scope, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('regex')) errMsg = validateFact.regex(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('enum')) errMsg = validateFact.enum(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('price')) errMsg = validateFact.price(inputModel, iElem, scope, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('alpha')) errMsg = validateFact.alpha(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('alphanumeric')) errMsg = validateFact.alphanumeric(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('lowercase')) errMsg = validateFact.lowercase(inputModel, iElem, scope, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('uppercase')) errMsg = validateFact.uppercase(inputModel, iElem, scope, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('ucfirst')) errMsg = validateFact.ucfirst(inputModel, iElem, scope, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('int')) errMsg = validateFact.int(inputModel, iElem, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('float')) errMsg = validateFact.float(inputModel, iElem, rulesObj);

                    if (!errMsg && iAttrs.ngformValidatorCustom) errMsg = validateFact.custom(inputModel, iElem, customFunc);

                    //error message to scope
                    // console.log(errMsg);
                    outputErrorMessage(scope, iAttrs, errMsg);

                }, 800);

            });


            //** onBlur validators
            iElem.on('blur', function () {

                //GET INPUT MODEL VALUE (if ng-model="age" => iAttrs.model='age')
                var inputModel = getInputModelValue(scope, iAttrs);

                $timeout(function () {
                    if (!errMsg && rulesObj.hasOwnProperty('required')) errMsg = validateFact.required(inputModel, iElem, rulesObj);


                    //error message to scope
                    outputErrorMessage(scope, iAttrs, errMsg);

                }, 1300);
            });


        } //link:

    }; //directiveObj


    return directiveObj;

};

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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


/**
 * Update scope value. Usually on autocorrection.
 * @param  {Object} scope  - angular $scope object
 * @param  {Object} iAttrs - attribute object which contains HTML tag attributes
 * @param  {Mixed}        - new value
 */
var updateScope = function (scope, iAttrs, newValue) {
    'use strict';
    var ngModelArr = iAttrs.ngModel.split('.');
    // console.log(JSON.stringify(ngModelArr, null, 2));


    switch (ngModelArr.length) {
    case 1:
        scope.$apply(function () {scope[ngModelArr[0]] = newValue;});
        break;
    case 2:
        scope.$apply(function () {scope[ngModelArr[0]][ngModelArr[1]] = newValue;});
        break;
    case 3:
        scope.$apply(function () {scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]] = newValue;});
        break;
    case 4:
        scope.$apply(function () {scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]] = newValue;});
        break;
    case 5:
        scope.$apply(function () {scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]][ngModelArr[4]] = newValue;});
        break;
    default:
        scope.$apply(function () {scope[iAttrs.ngModel] = newValue;});
    }

};


module.exports = function () {
    'use strict';

    return {
        type: {

            string: function (inputModel, iElem) {
                var tf = validationRules.isString(inputModel);
                return sendError(iElem, tf, 'Value must be in text format (string).');
            },

            number: function (inputModel, iElem, scope, iAttrs) {

                //TODO CORRECTOR: converting model's value to number when <input type="text"> is used
                if (iElem.attr('type') !== 'number') iElem.attr('type', 'number');
                var newVal = Number(inputModel) || inputModel;

                var tf = validationRules.isNumber(newVal);

                return sendError(iElem, tf, 'Value must be number.');
            },


            date: function (inputModel, iElem, scope, iAttrs) {

                //CORRECTOR: converting model's value to date when <input type="text"> is used
                var dateCorrected = new Date(inputModel);
                dateCorrected = dateCorrected.toString();
                dateCorrected = (dateCorrected === 'Invalid Date')
                    ? false
                    : dateCorrected;
                var newValue = dateCorrected || inputModel;

                updateScope(scope, iAttrs, newValue);

                var tf = validationRules.isDate(inputModel);
                // console.log(dateCorrected);
                return sendError(iElem, tf, 'Value must be valid date.');
            }
        },


        required: function (inputModel, iElem, rulesObj) {
            var tf = !!inputModel; //check if field is empty
            return sendError(iElem, tf, rulesObj.required);
        },

        email: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.isEmail(inputModel);
            return sendError(iElem, tf, rulesObj.email);
        },

        min: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.hasMin(inputModel, rulesObj.min[1]);
            return sendError(iElem, tf, rulesObj.min[0]);
        },

        max: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.hasMax(inputModel, rulesObj.max[1]);
            return sendError(iElem, tf, rulesObj.max[0]);
        },

        between: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.isBetween(inputModel, rulesObj.between[1]);
            return sendError(iElem, tf, rulesObj.between[0]);
        },

        emptySpaces: function (inputModel, iElem, scope, iAttrs, rulesObj) {
            var tf = !validationRules.hasEmptySpaces(inputModel);

            //CORRECTOR: remove empty spaces from string
            var newValue = inputModel.replace(' ', '');
            if (inputModel.indexOf(' ') !== -1) updateScope(scope, iAttrs, newValue);

            return sendError(iElem, tf, rulesObj.emptySpaces);
        },

        sameAs: function (inputModel, iElem, scope, rulesObj) {
            var ngModelArr = rulesObj.sameAs[1].split('.');

            var input2;
            switch (ngModelArr.length) {
            case 1:
                input2 = scope[ngModelArr[0]];
                break;
            case 2:
                input2 = scope[ngModelArr[0]][ngModelArr[1]];
                break;
            case 3:
                input2 = scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]];
                break;
            case 4:
                input2 = scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]];
                break;
            case 5:
                input2 = scope[ngModelArr[0]][ngModelArr[1]][ngModelArr[2]][ngModelArr[3]][ngModelArr[4]];
                break;
            default:
                input2 = scope[ngModelArr[0]];
            }

            var tf = validationRules.areSame(inputModel, input2);
            return sendError(iElem, tf, rulesObj.sameAs[0]);
        },

        regex: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.regexTest(inputModel, rulesObj.regex[1]);
            return sendError(iElem, tf, rulesObj.regex[0]);
        },

        enum: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.enumTest(inputModel, rulesObj.enum[1]);
            return sendError(iElem, tf, rulesObj.enum[0]);
        },

        url: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.isUrl(inputModel);
            return sendError(iElem, tf, rulesObj.url);
        },

        price: function (inputModel, iElem, scope, iAttrs, rulesObj) {
            //correct number to 2 decimal points
            var newValue = parseFloat(inputModel).toFixed(2);
            updateScope(scope, iAttrs, newValue);
        },

        tel: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.isTel(inputModel);
            return sendError(iElem, tf, rulesObj.tel);
        },

        alpha: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.hasAlphaOnly(inputModel);
            return sendError(iElem, tf, rulesObj.alpha);
        },

        alphanumeric: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.hasAlphanumericOnly(inputModel);
            return sendError(iElem, tf, rulesObj.alphanumeric);
        },

        lowercase: function (inputModel, iElem, scope, iAttrs, rulesObj) {
            var tf = validationRules.allLowercase(inputModel);

            //CORRECTOR: lowercase input
            if (!tf) {
                setTimeout(function () {
                    var newValue = inputModel.toLowerCase();
                    updateScope(scope, iAttrs, newValue);
                }, 600);
            }

            return sendError(iElem, tf, rulesObj.lowercase);
        },

        uppercase: function (inputModel, iElem, scope, iAttrs, rulesObj) {
            var tf = validationRules.allUppercase(inputModel);

            //CORRECTOR: uppercase input
            if (!tf) {
                setTimeout(function () {
                    var newValue = inputModel.toUpperCase();
                    updateScope(scope, iAttrs, newValue);
                }, 600);
            }

            return sendError(iElem, tf, rulesObj.uppercase);
        },

        ucfirst: function (inputModel, iElem, scope, iAttrs, rulesObj) {
            var tf = (inputModel[0].toUpperCase() === inputModel[0]);

            //CORRECTOR: capitalize first letter in a string
            if (!tf) {
                setTimeout(function () {
                    var newValue = inputModel.charAt(0).toUpperCase() + inputModel.slice(1);
                    updateScope(scope, iAttrs, newValue);
                }, 600);
            }

            return sendError(iElem, tf, rulesObj.ucfirst);
        },

        int: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.isInteger(inputModel);
            return sendError(iElem, tf, rulesObj.int);
        },

        float: function (inputModel, iElem, rulesObj) {
            var tf = validationRules.isFloat(inputModel);
            return sendError(iElem, tf, rulesObj.float);
        },


        /* custom validator*/
        custom: function (inputModel, iElem, customFunc) {

            var errMsg = customFunc(inputModel);
            var tf = !errMsg;

            return sendError(iElem, tf, errMsg);
        }







    };

};

},{"../lib/validationRules":5}],5:[function(require,module,exports){
/**
 * IMPORTANT!!!
 *     All methods must return true or false only.
 */


/*global angular*/
module.exports = {
    isString: function (input) {
        'use strict';
        var tf = angular.isString(input);

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    isNumber: function (input) {
        'use strict';
        var tf = angular.isNumber(input);

        return (input)
            ? tf
            : true; // return true if input is empty
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
        // console.log(typeof input);
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
        // console.log(input, ' - ', input2);
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

    },

    allLowercase: function (input) { //may include letters and numbers only (no special chars)
        'use strict';
        var inputLowered = input.toLowerCase();
        var tf = (inputLowered === input);

        return (input)
            ? tf
            : true; // return true if input is empty

    },

    allUppercase: function (input) { //may include letters and numbers only (no special chars)
        'use strict';
        var inputUppered = input.toUpperCase();
        var tf = (inputUppered === input);

        return (input)
            ? tf
            : true; // return true if input is empty

    },

    isInteger: function (input) {
        'use strict';
        var tf = Number.isInteger(input);

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    isFloat: function (input) {
        'use strict';
        var tf = (input % 1 !== 0);

        return (input)
            ? tf
            : true; // return true if input is empty
    }




};

},{}],6:[function(require,module,exports){
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

},{"./controller/ngFormValidatorCtrl":1,"./directive/ngFormValidatorDirc":2,"./directive/ngFormValidatorResetDirc":3,"./factory/validateFact":4}]},{},[6]);
