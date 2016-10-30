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
