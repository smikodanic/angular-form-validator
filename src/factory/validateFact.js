/*global angular*/
var validationRules = require('../lib/validationRules');

module.exports = function () {
    'use strict';

    var err = {};

    return {
        type: {

            number: function (scope, iElem, iAttrs) {

                //CORRECTOR: converting model's value to number when <input type="text"> is used
                scope[iAttrs.ngModel] = Number(scope[iAttrs.ngModel]) || scope[iAttrs.ngModel];

                var tf = validationRules.isNumber(scope[iAttrs.ngModel]);
                // console.log(tf);


                if (!tf) {
                    iElem.addClass('redborder');
                    err= 'Value must be a number.';
                } else {
                    iElem.removeClass('redborder');
                    err = '';
                }

                return err;
            }
        }

    };

};
