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
            var inputModel = scope[iAttrs.ngModel];

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
                    // console.log(JSON.stringify(scope.errMsg, null, 2));
                }, 1300);

            });











        } //link:

    }; //directiveObj


    return directiveObj;

};
