
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

/**
 * 登录时对密码进行hash处理,在表单验证成功后,提交前使用
 * @param pwd_id 密码id,或密码的jquery对象
 * @param score_id 密码强度分数id,或query对象,可选
 */
function hash_pwd(pwd_id, score_id){
    var $pwd = _get_hash_pwd_obj(pwd_id),
        $score = _get_hash_pwd_obj(score_id),
        pwd_val = $.trim($pwd.val());
    if(pwd_val.length != 32 && pwd_val.length !=0){
        $pwd.val($.md5(pwd_val+'hi,pwd'));
        if($score.length){
            $score.val(calc_password_security_score(pwd_val));
        }
        return true;
    }
    return false;
}

//计算密码安全等级
function calc_password_security_score(pwd){
    var score = 0;
    if(pwd.length < 4){
        return score;
    }
    if(pwd.length >= 8){
        score++;
    }
    if(pwd.length >= 10){
        score++;
    }
    if(/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)){
        score++;
    }
    if(/[0-9]/.test(pwd)){
        score++;
    }
    if(/.[!,@,#,$,%,^,&,*,?,_,~, -,£,(,)]/.test(pwd)){
        score++;
    }
    return score;
}
function _get_hash_pwd_obj(id){
    var $obj;
    if(typeof id == 'string'){
        $obj = $('#'+id);
    }
    else if(typeof id == 'object' && id.length>0){  //a jquery obj
        $obj = id;
    }
    return $obj;
}

function hash_pwd_str(pwd) {
    if (pwd == '') return '';
    return $.md5(pwd+'hi,pwd');
}

/*
 用于脚本多语言替换的方法
*/
function L(tag) {
    if (typeof $_lang[tag] == "undefined") {
        return tag;
    }
    return $_lang[tag];
}

/*页面刷新*/
function reload_page(n){
    if(!n) n=1000;
    setTimeout(function(){location.reload();},n);
}
//换验证码
function reload_captcha(captcha_id){
	$('#'+captcha_id).attr('src','/account/captcha?r='+Math.random());
}
/*加载方法*/
!(function() {
    /*返回顶部*/
    back_top();

})();