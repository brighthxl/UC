
/*返回顶部*/
function back_top(){
    //if (noGetTop) return;
    var element = $('<div class="p-getTop"><a title="返回顶部"></a></div>'),
        oDiv = element.find('a'),
        winHeight, winWidth, fn = null,doc = $(document), win= $(window);
    $('body').append(element);

    function check() {
        clearTimeout(fn);
        fn = null;
        fn = setTimeout(function() {
            var scroTop = doc.scrollTop();
            scroTop > winHeight ? element.fadeIn() : element.fadeOut();
        }, 300);
    }

    function rest() {
        winHeight = win.height();
        winWidth = win.width();
        element.css({
            'left': winWidth - (winWidth - 1020) / 2
        })
        check();
    }
    rest();
    oDiv.click(function() {
        doc.scrollTop(0)
    });
    win.scroll(check).resize(rest);
}

