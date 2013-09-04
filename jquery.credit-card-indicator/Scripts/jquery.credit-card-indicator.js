(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    function showTokenIcon(firstFour, ul) {
        var icons = ul;
        //fairly accurate, might not work in EVERY case
        if (firstFour.substr(0, 1) == "4") {
            //visa card
            setActiveCard(icons.find('[data-js=visa]').eq(0));
        } else if (firstFour.substr(0, 1) == "5") {
            //mastercard
            setActiveCard(icons.find('[data-js=mastercard]').eq(0));
        } else if (firstFour.substr(0, 1) == "6") {
            //discover
            setActiveCard(icons.find('[data-js=discover]').eq(0));
        } else if (firstFour.substr(0, 1) == "3") {
            //amex
            setActiveCard(icons.find('[data-js=amex]').eq(0));
            ;
        } else {
            icons.children().each(function () {
                $(this).css('background-position', $(this).css('background-position').split(" ")[0] + ' -25px');
                $(this).css('opacity', '.4');
            });
        }
    };


    function setActiveCard(selector) {
        var backgroundPos = $(selector).css('background-position').split(" ");
        //now contains an array like ["0%", "50px"]

        $(selector).css('opacity', '1');
        $(selector).css('background-position', backgroundPos[0]+ ' 0');
        $(selector).siblings().each(function () {
            $(this).css('background-position', $(this).css('background-position').split(" ")[0] + ' -25px');
            $(this).css('opacity', '.4');
        });
    }

    $.fn.creditCardIndicator = function (leftPosition, topPosition, imageUrl) {
        if (typeof imageUrl == 'undefined')
            imageUrl = '../images/credit-card-logos.png';
        
        var referenceHolder = "<div style='position:relative; width:0; height:0' data-js='placeholder'></div>";

        var elementHtml =
            "<ul data-js='credit-card-icons' class='credit-card-icons' style='margin: 5px 0; list-style-type:none; position:absolute; width:172px; height:25px;'>"+
            "<li style='float:left; display:block; opacity:0.4; width:40px; height:25px; margin:0 3px 0 0; padding:0; border:none; background: url(" + imageUrl + ") no-repeat; background-position:-80px -25px;' data-js='visa'></li>" +
            "<li style='float:left; display:block; opacity:0.4; width:40px; height:25px; margin:0 3px 0 0; padding:0; border:none; background: url(" + imageUrl + ") no-repeat; background-position:-120px -25px;' data-js='mastercard'></li>" +
            "<li style='float:left; display:block; opacity:0.4; width:40px; height:25px; margin:0 3px 0 0; padding:0; border:none; background: url(" + imageUrl + ") no-repeat; background-position:-40px -25px;' data-js='discover'></li>" +
            "<li style='float:left; display:block; opacity:0.4; width:40px; height:25px; margin:0 3px 0 0; padding:0; border:none; background: url(" + imageUrl + ") no-repeat; background-position:-0px -25px;' data-js='amex'></li></ul>";

        this.each(function () {
            var newElement = $(referenceHolder).append(elementHtml);
            var cc = newElement.children('ul');


            cc.css("left", leftPosition);
            cc.css("top", topPosition);
            $(this).before(newElement);


            $(this).keyup(function () {
                var ph = $(this).prev();
                var ul = ph.children('ul').eq(0);


                var firstFour = $(this).val().substr(0, 4);
                showTokenIcon(firstFour, ul);
            });
        });
        return this;
    };

}));