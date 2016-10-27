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
                console.log('tf ', dateCorrected, dateCorrected === 'Invalid Date', typeof dateCorrected);
                dateCorrected = (dateCorrected === 'Invalid Date')
                    ? false
                    : dateCorrected;
                scope[iAttrs.ngModel] = dateCorrected || scope[iAttrs.ngModel];
                console.log(JSON.stringify(scope[iAttrs.ngModel], null, 2));

                var tf = validationRules.isDate(scope[iAttrs.ngModel]);
                console.log(tf);


                if (!tf) {
                    iElem.addClass('redborder');
                    err = 'Value must be a valid date.';
                } else {
                    iElem.removeClass('redborder');
                    err = '';
                }

                return err;
            }
        }

    };

};
