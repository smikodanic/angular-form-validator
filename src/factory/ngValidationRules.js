/*global angular*/
module.exports = function () {
    'use strict';


    return {
        isString: function (input) {
            return angular.isString(input);
        },

        isNumber: function (input) {
            var tf;
            if (isNaN(input)) {
                tf = false;
            } else {
                tf = angular.isNumber(input);
            }
            return tf;
        }
    };

};
