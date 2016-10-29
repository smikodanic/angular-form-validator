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
    },

    isEmail: function (input) {
        'use strict';
        var re = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$');
        // var re = /\S+@\S+\.\S+/;
        var tf = re.test(input);

        return (input)
            ? tf
            : true; // return true if input is empty

    },

    hasMin: function (input, lim) {
        'use strict';
        var tf;
        if (angular.isString(input)) { //when input is string count number of characters
            tf = (input.length >= lim);
        } else if (angular.isNumber(input)) { //when input is number then comapare two numbers
            tf = (input >= lim);
        }

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    hasMax: function (input, lim) {
        'use strict';
        var tf;
        if (angular.isString(input)) { //when input is string count number of characters
            tf = (input.length <= lim);
        } else if (angular.isNumber(input)) { //when input is number then comapare two numbers
            tf = (input <= lim);
        }

        return (input)
            ? tf
            : true; // return true if input is empty
    }

};
