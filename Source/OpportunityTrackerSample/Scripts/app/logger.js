(function (exports) {
    var app = exports.app = exports.app || {};
    var logCounter = 1;
    var logger = {
        error: error,
        validationError: validationError,
        info: info,
        success: success,
        warning: warning
    };

    function error(message) {
        toastr.error(message, "log-error");
    };
    function validationError(message) {
        toastr.error(message, "log-validation-error");
    };
    function info(message) {
        toastr.info(message, "log-info");
    };
    function success(message) {
        toastr.success(message, "log-success");
    };
    function warning(message) {
        toastr.warning(message, "log-warning");
    };


//    function log(cssClass, message) {
//        var logmessage = "<div class='" + cssClass + "'>" +
//            logCounter++ + ": " + message + "</div>";
//        $("#logmessages").append(logmessage);
//    }

    app.logger = logger;

} (window));