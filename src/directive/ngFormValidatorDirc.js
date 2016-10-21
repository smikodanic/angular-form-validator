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
