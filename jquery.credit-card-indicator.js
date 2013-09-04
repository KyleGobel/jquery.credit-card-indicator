(function (factory) {
if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
} else {
    // Browser globals
    factory(jQuery);
}
}(function ($) {

    $.fn.creditCardIndicator = function () {
        var referenceHolder = "<div class='placeholder'></div>"
        
        var element = "<div style='position:absolute; width:140px; height:32px; background-color:blue'></div>"
    	this.each(function() {
            var newElement = $(referenceHolder).append(element);
            var cc = newElement.children('div');
            
            var left = $(this).outerWidth() - cc.width();
            var top = cc.height() * -1;
            cc.css("left", left);
            cc.css("top", top);
            $(this).before(newElement);
            
            
            $(this).keyup(function() {
                var ph = $(this).prev();
                ph.children('div').eq(0).css('background-color', 'red');
            });
        });
        return this;
    };

}));