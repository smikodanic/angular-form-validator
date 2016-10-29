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
        }





    };

};
