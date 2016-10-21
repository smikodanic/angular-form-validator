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
