/*global angular*/
module.exports = {
    isString: function (input) {
        'use strict';
        return angular.isString(input);
    },

    isNumber: function (input) {
        'use strict';
        var tf;
        if (isNaN(input)) {
            tf = false;
        } else if (!input) { //return true if input is empty, 0 or null
            tf = true;
        } else {
            tf = angular.isNumber(input);
        }
        return tf;
    },

    isDate: function (input) {
        'use strict';
        var result = Date.parse(input);

        if (input) {
            return !!result;
        } else {
            return true; // return true if input is empty
        }
    }

};
