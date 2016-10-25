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
