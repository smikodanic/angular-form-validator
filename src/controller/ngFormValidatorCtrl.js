/**
 * Controller: 'NgFormValidatorCtrl'
 */
// var stringify = require('json-stringify-safe');


module.exports = function ($scope, $element, $attrs, $timeout) {
    'use strict';

    // console.log(stringify($attrs, null, 2));


    $scope.mySubmit = function (evt) {
        $timeout(function () {
            $scope.errMsg.age = 'Error on age field';
            alert('SUBMITTED with error');
        }, 1300);
    };




};
