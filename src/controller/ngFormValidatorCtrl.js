/**
 * Controller: 'NgFormValidatorCtrl'
 */
var stringify = require('json-stringify-safe');


module.exports = function ($scope, $element, $attrs) {
    'use strict';

    console.log('CTRL works');

    var attrs = JSON.parse(stringify($attrs));
    console.log(attrs);

    console.log(JSON.stringify($attrs.class, null, 2));

};
