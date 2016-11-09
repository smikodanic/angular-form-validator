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

            var newValue;

            //CORRECTOR: remove empty spaces from string
            if (inputModel) {
                newValue = inputModel.replace(' ', '');
                if (inputModel.indexOf(' ') !== -1) updateScope(scope, iAttrs, newValue);
            } else {
                tf = true;
            }

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
