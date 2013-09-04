requirejs.config( {
    paths : {
        "jquery" : "jquery-2.0.3",
        "jquery-credit-card-indicator" : "jquery.credit-card-indicator"
    },
});
require(["jquery", "jquery-credit-card-indicator"], function ($) {
    $(function() {
     	$('input').creditCardIndicator();
    });
});