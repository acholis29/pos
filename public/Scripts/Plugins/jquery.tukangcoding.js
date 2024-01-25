
(function ($) {
    $.fn.Alfabet = function (options) {
        return this.each(function () {
            $(this).empty().append(render(options.buttonClickCallback));
        });

        function render(buttonClickCallback) {
            var ar = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                                
            var $btn = $('<div class="btn-group pull-left"></div>');
            for (s in ar) {
                var $btncurrent = $('<button type="button" data-val="' + (s === '0' ? '' : ar[s]) + '" class="btn btn-info">' + ar[s] + '</button>');
                $btncurrent.click(function () { buttonClickCallback(this.getAttribute("data-val")); });
                $btncurrent.appendTo($btn);

            }
            return $btn;

        }
    };
})(jQuery);