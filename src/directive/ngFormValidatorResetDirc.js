/*global angular*/
// var stringify = require('json-stringify-safe');

module.exports = function () {
    'use strict';

    var directiveObj = {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, iElem, iAttrs) { //post-link function

            iElem.on('click', function () {
                setTimeout(function () {
                    scope.errMsg = {};
                    scope.$apply();
                    angular.element('*').removeClass('redborder');
                }, 1300);
            });

        }
    };

    return directiveObj;
};
