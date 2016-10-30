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

    hasMin: function (input, lim) { // lim is Number
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

    hasMax: function (input, lim) { // lim is Number
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
    },

    isBetween: function (input, betweenArr) { //betweenArr = [3, 8]
        'use strict';
        var tf;
        if (angular.isString(input)) { //when input is string count number of characters
            tf = (input.length >= betweenArr[0] && input.length <= betweenArr[1]);
        } else if (angular.isNumber(input)) { //when input is number then comapare two numbers
            tf = (input >= betweenArr[0] && input <= betweenArr[1]);
        }

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    hasEmptySpaces: function (input) {
        'use strict';
        // var tf = (input.indexOf(' ') !== -1);
        var tf = (/\s/g.test(input));

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    areSame: function (input, input2) { //compares input and input2
        'use strict';
        var tf = input === input2;

        return (input)
            ? tf
            : true; // return true if input is empty
    },

    regexTest: function (input, regxStr) {
        'use strict';
        var regx = new RegExp(regxStr);
        var tf = (regx.test(input));

        return (input)
            ? tf
            : true; // return true if input is empty
    }





};
