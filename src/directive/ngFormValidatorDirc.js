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
