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
                    if (!errMsg && rulesObj.hasOwnProperty('lowercase')) errMsg = validateFact.lowercase(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('uppercase')) errMsg = validateFact.uppercase(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('int')) errMsg = validateFact.int(scope, iElem, iAttrs, rulesObj);
                    if (!errMsg && rulesObj.hasOwnProperty('float')) errMsg = validateFact.float(scope, iElem, iAttrs, rulesObj);

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
