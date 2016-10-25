/*global angular, window*/

var ngFormValidator = angular.module('ngFormValidator', []);

ngFormValidator.controller('NgFormValidatorCtrl', require('./controller/ngFormValidatorCtrl'));

ngFormValidator.factory('ngValidationRules', require('./factory/ngValidationRules'));



/* login form and logout button directives */
ngFormValidator.directive('ngformValidator', require('./directive/ngFormValidatorDirc'));


//define default templates
ngFormValidator.run(function ($templateCache) {
    'use strict';
    $templateCache.put('simple.html', '<div>jednostavno</div>');
});


/*when used in browserify (require('angular-passport')) */
module.exports = ngFormValidator;



/*when included in html file
<script src=".../dist/js/ngFormValidator.js"></script>
*/
window.ngFormValidator = ngFormValidator;
