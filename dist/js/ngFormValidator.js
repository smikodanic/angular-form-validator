/*!
 *  v1.0.0 (https://github.com/smikodanic/angular-form-validator#readme)
 * Copyright 2014-2016 Sasa Mikodanic
 * Licensed under MIT 
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Controller: 'NgFormValidatorCtrl'
 */

module.exports = function ($scope) {
    'use strict';

    console.log('CTRL works');

};

},{}],2:[function(require,module,exports){
module.exports = function () {
    'use strict';

    return function () {

        var ngpassportForm = {
            restrict: 'E',
            replace: true,
            controller: NgFormValidatorCtrl,
            scope: {templateUrl: '='},
            templateUrl: function (tElement, tAttrs) {
                return tAttrs.templateUrl || 'formSimple.html'; //used <ngpassport-form template-url="myTemplate.html"></ngpassport-form>
            }
        };

        return ngpassportForm;
    };
};

},{}],3:[function(require,module,exports){
module.exports = function () {
    'use strict';


    return {
        mth: function (input) {

        }
    };

};

},{}],4:[function(require,module,exports){
/*global angular, window*/

var ngFormValidator = angular.module('ngFormValidator', []);

ngFormValidator.controller('NgFormValidatorCtrl', require('./controller/ngFormValidatorCtrl'));

ngFormValidator.factory('ngFormValidatorFact', require('./factory/ngFormValidatorFact'));



/* login form and logout button directives */
ngFormValidator.directive('ngformValidator', require('./directive/ngFormValidatorDirc'));



/*when used in browserify (require('angular-passport')) */
module.exports = ngFormValidator;



/*when included in html file
<script src=".../dist/js/ngFormValidator.js"></script>
*/
window.ngFormValidator = ngFormValidator;

},{"./controller/ngFormValidatorCtrl":1,"./directive/ngFormValidatorDirc":2,"./factory/ngFormValidatorFact":3}]},{},[4]);
