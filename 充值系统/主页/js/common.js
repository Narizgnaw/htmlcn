/* $Id : common.js 4865 2007-01-31 14:04:10Z paulgao $ */
//LSJ
if (screen.width < 1280) {
    document.write("<link href='themes/2009jingdong/style1024.css' rel='stylesheet' type='text\/css'\/>");
}
//else {
//	document.write("<link href='themes/2009jingdong/style.css' rel='stylesheet' type='text\/css'\/>");
//}

function rtrim(s) {
    return s.replace(/(s*$)/g, "");
}
/* js删除字符串前后空格
 * xcxc 20140724
 */
function trim(str) {
    str = str.replace(/^(\s|\u00A0)+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}
/* *
 * 添加商品到购物车
 */
function addToCart(goodsId, parentId) {
    document.getElementById('btn_shop').innerHTML = '正在提交';
    document.getElementById('btn_shop').className = 'cursor_not bg_color_FF8993';
    // document.getElementById('btn_shop').href = 'javascript:void()';

    var goods = new Object();
    var spec_arr = new Array();
    var fittings_arr = new Array();
    var number = 1;
    var syongtu = '';//by xp 20150715
    var buy_url = '';
    var sdoname = '';
    var resdoname = '';
    var fqname = '';
    var fqvalue = '';
    var gname = '';//byxiaoyan 20131031
    var gvalue = '';//byxiaoyan 20131031
    var rechargemode = '';//byxiaoyan 20131031
    var rechargemodename = '';//byxiaoyan 20131031
    var ext1 = '';
    var ext2 = '';
    var ext3 = '';
    var ext4 = '';
    var formBuy = document.forms['ECS_FORMBUY'];
    var quick = 0;
    var alipayname = '';//支付宝姓名shen20140418
    var mmname = '';
    var zfbname = '';
    var goods_money = 1;
    // 检查是否有商品规格
    if (formBuy) {
        spec_arr = getSelectedAttributes(formBuy);

        if (formBuy.elements['number']) {
            number = formBuy.elements['number'].value;
            if (!number) {
                setTimeout(function () {
                    alert("充值金额 或 购买数量 不能为空");
                    document.getElementById('btn_shop').innerHTML = '立即购买';
                    document.getElementById('btn_shop').className = '';
                    document.getElementById('btn_shop').href = 'javascript:addToCart(' + goodsId + ')';
                    document.getElementById("number").focus();
                }, 500);
                return;
            } else if (parseFloat(number) == 0) {
                setTimeout(function () {
                    alert("充值金额 或 购买数量 不能为'" + number + "'");
                    document.getElementById('btn_shop').innerHTML = '立即购买';
                    document.getElementById('btn_shop').className = '';
                    document.getElementById('btn_shop').href = 'javascript:addToCart(' + goodsId + ')';
                    formBuy.elements['number'].value = '';
                    document.getElementById("number").focus();
                }, 500);
                return;
            }
        }
        if (formBuy.elements['buy_url']) {
            /*lifei*/
            buy_url = formBuy.elements['buy_url'].value;
            buy_url = buy_url.replace(/[\r\n]/g, "");
            buy_url = encodeURIComponent(buy_url);
            buy_url = rtrim(buy_url);

        }

        if (formBuy.elements['ext1']) {
            /*lifei*/
            ext1 = formBuy.elements['ext1'].value;
        }

        if (formBuy.elements['ext2']) {
            /*lifei*/
            ext2 = formBuy.elements['ext2'].value;
        }

        if (formBuy.elements['ext3']) {
            /*lifei*/
            ext3 = formBuy.elements['ext3'].value;
        }

        if (formBuy.elements['ext4']) {
            /*lifei*/
            ext4 = formBuy.elements['ext4'].value;
        }

        if (formBuy.elements['syongtu']) {
            /*lifei*/
            syongtu = formBuy.elements['syongtu'].value;
        }


        if (formBuy.elements['sdoname']) {
            /*lifei*/
            sdoname = trim(formBuy.elements['sdoname'].value);
            if (sdoname) {
                sdoname = encodeURIComponent(sdoname);
            } else {
                setTimeout(function () {
                    alert("充值账号不可为空");
                    document.getElementById('btn_shop').innerHTML = '立即购买';
                    document.getElementById('btn_shop').className = '';
                    document.getElementById('btn_shop').href = 'javascript:addToCart(' + goodsId + ')';
                    document.getElementById("sdoname").focus();
                }, 500);
                return;
            }
            //sdoname = encodeURIComponent( formBuy.elements['sdoname'].value );
            if (!sdoname) {
                setTimeout(function () {
                    alert("请输入充值账号");
                    document.getElementById('btn_shop').innerHTML = '立即购买';
                    document.getElementById('btn_shop').className = '';
                    document.getElementById('btn_shop').href = 'javascript:addToCart(' + goodsId + ')';
                    document.getElementById("sdoname").focus();
                }, 500);
                return;
            }
            //sdoname = encodeURIComponent(formBuy.elements['sdoname'].value.trim());//by xiaoyan

        }

        if (formBuy.elements['resdoname']) {
            /*lifei*/
            //resdoname = formBuy.elements['resdoname'].value;

            resdoname = encodeURIComponent(formBuy.elements['resdoname'].value);//by xiaoyan
        }

        if (formBuy.elements['fq']) {
            /*lifei*/

            fqvalue = formBuy.elements['fq'].value;//byxiaoyan
            if (fqvalue == "请选择") {
                alert("请选择分区");
                document.getElementById('btn_shop').innerHTML = '立即购买';
                document.getElementById('btn_shop').className = '';
                document.getElementById('btn_shop').href = 'javascript:addToCart(' + goodsId + ')';
                return;
            }
            fqname = formBuy.elements['fq'].options[formBuy.elements['fq'].options.selectedIndex].text;
        }
        if (formBuy.elements['game']) {
            /*xiaoyan*/

            gvalue = formBuy.elements['game'].value;//byxiaoyan
            if (gvalue == "请选择") {
                alert("请选择游戏");
                document.getElementById('btn_shop').innerHTML = '立即购买';
                document.getElementById('btn_shop').className = '';
                document.getElementById('btn_shop').href = 'javascript:addToCart(' + goodsId + ')';
                return;
            }
            gname = formBuy.elements['game'].options[formBuy.elements['game'].options.selectedIndex].text;
        }
        if (formBuy.elements['rechargemode']) {
            /*xiaoyan*/

            rechargemode = formBuy.elements['rechargemode'].value;//byxiaoyan
            if (rechargemode == "请选择") {
                alert("请选择充值方式");
                document.getElementById('btn_shop').innerHTML = '立即购买';
                document.getElementById('btn_shop').className = '';
                document.getElementById('btn_shop').href = 'javascript:addToCart(' + goodsId + ')';
                return;
            }
            rechargemodename = formBuy.elements['rechargemode'].options[formBuy.elements['rechargemode'].options.selectedIndex].text;
        }
        if (formBuy.elements['alipayname']) {
            /*20140418shen支付宝姓名*/
            alipayname = formBuy.elements['alipayname'].value;

        }
        if (formBuy.elements['mmname']) {
            mmname = formBuy.elements['mmname'].value;

        }
        if (formBuy.elements['zfbname']) {
            zfbname = formBuy.elements['zfbname'].value;

        }
        if (formBuy.elements['goods_money']) {
            goods_money = formBuy.elements['goods_money'].value;

        }

        quick = 1;
    }

    goods.quick = quick;
    goods.spec = spec_arr;
    goods.goods_id = goodsId;
    goods.number = number;
    goods.syongtu = syongtu;//by xp 20150715
    goods.buy_url = buy_url;
    /*lifei*/
    goods.sdoname = sdoname;
    /*lifei*/
    goods.resdoname = resdoname;
    /*lifei*/
    goods.fqname = fqname;
    /*lifei*/
    goods.fqvalue = fqvalue;//byxiaoyan
    goods.gvalue = gvalue;//byxiaoyan
    goods.gname = gname;//byxiaoyan
    goods.rechargemode = rechargemode;//byxiaoyan
    goods.rechargemodename = rechargemodename;//byxiaoyan
    goods.ext1 = ext1;
    /*lifei*/
    goods.ext2 = ext2;
    /*lifei*/
    goods.ext3 = ext3;
    /*lifei*/
    goods.ext4 = ext4;
    /*lifei*/
    goods.parent = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
    goods.alipayname = alipayname;
    goods.mmname = mmname;
    goods.zfbname = zfbname;
    goods.goods_money = goods_money;


    Ajax.call('flow.php?step=add_to_cart', 'goods=' + goods.toJSONString(), addToCartResponse, 'POST', 'JSON');
}

/**
 * 获得选定的商品属性
 */
function getSelectedAttributes(formBuy) {
    var spec_arr = new Array();
    var j = 0;

    for (i = 0; i < formBuy.elements.length; i++) {
        var prefix = formBuy.elements[i].name.substr(0, 5);

        if (prefix == 'spec_' && (
            ((formBuy.elements[i].type == 'radio' || formBuy.elements[i].type == 'checkbox') && formBuy.elements[i].checked) ||
            formBuy.elements[i].tagName == 'SELECT')) {
            spec_arr[j] = formBuy.elements[i].value;
            j++;
        }
    }

    return spec_arr;
}

/* *
 * 处理添加商品到购物车的反馈信息
 */
function addToCartResponse(result) {
    if (result.error > 0) {
        // 如果需要缺货登记，跳转
        if (result.error == 2) {
            if (confirm(result.message)) {
                location.href = 'user.php?act=add_booking&id=' + result.goods_id;
            }
        }
        // 没选规格，弹出属性选择框
        else if (result.error == 6) {
            openSpeDiv(result.message, result.goods_id, result.parent);
        }
        else if (result.error == 100){
			if (confirm(result.message))
			{
				 window.location.href = "/goods-1279.html";
			}
        }else {
            alert(result.message);
            document.getElementById('btn_shop').innerHTML = '立即购买';
            document.getElementById('btn_shop').className = '';
            document.getElementById('btn_shop').href = 'javascript:addToCart(' + result.goods_id + ')';
            if (result.goods_id == 1458) {
                window.location.href = "/goods-1279.html";
            }
        }
    }
    else {
        var cartInfo = document.getElementById('ECS_CARTINFO');
        var cart_url = 'flow.php?step=cart';
        if (cartInfo) {
            cartInfo.innerHTML = result.content;
        }

        if (result.one_step_buy == '1') {
            location.href = cart_url;
        }
        else {
            switch (result.confirm_type) {
                case '1' :
                    if (confirm(result.message)) location.href = cart_url;
                    break;
                case '2' :
                    if (!confirm(result.message)) location.href = cart_url;
                    break;
                case '3' :
                    location.href = cart_url;
                    break;
                default :
                    break;
            }
        }
    }
}

/* *
 * 添加商品到收藏夹
 */
function collect(goodsId) {
    Ajax.call('user.php?act=collect', 'id=' + goodsId, collectResponse, 'GET', 'JSON');
}

/* *
 * 处理收藏商品的反馈信息
 */
function collectResponse(result) {
    alert(result.message);
}

/* *
 * 处理会员登录的反馈信息
 */
function signInResponse(result) {
    toggleLoader(false);

    var done = result.substr(0, 1);
    var content = result.substr(2);

    if (done == 1) {
        document.getElementById('member-zone').innerHTML = content;
    }
    else {
        alert(content);
    }
}

/* *
 * 评论的翻页函数
 */
function gotoPage(page, id, type) {
    Ajax.call('comment.php?act=gotopage', 'page=' + page + '&id=' + id + '&type=' + type, gotoPageResponse, 'GET', 'JSON');
}

function gotoPageResponse(result) {
    document.getElementById("ECS_COMMENT").innerHTML = result.content;
}

/* *
 * 取得格式化后的价格
 * @param : float price
 */
function getFormatedPrice(price) {
    if (currencyFormat.indexOf("%s") > -1) {
        return currencyFormat.replace('%s', advFormatNumber(price, 2));
    }
    else if (currencyFormat.indexOf("%d") > -1) {
        return currencyFormat.replace('%d', advFormatNumber(price, 0));
    }
    else {
        return price;
    }
}

/* *
 * 夺宝奇兵会员出价
 */

function bid(step) {
    var price = '';
    var msg = '';
    if (step != -1) {
        var frm = document.forms['formBid'];
        price = frm.elements['price'].value;
        id = frm.elements['snatch_id'].value;
        if (price.length == 0) {
            msg += price_not_null + '\n';
        }
        else {
            var reg = /^[\.0-9]+/;
            if (!reg.test(price)) {
                msg += price_not_number + '\n';
            }
        }
    }
    else {
        price = step;
    }

    if (msg.length > 0) {
        alert(msg);
        return;
    }

    Ajax.call('snatch.php?act=bid&id=' + id, 'price=' + price, bidResponse, 'POST', 'JSON')
}

/* *
 * 夺宝奇兵会员出价反馈
 */

function bidResponse(result) {
    if (result.error == 0) {
        document.getElementById('ECS_SNATCH').innerHTML = result.content;
        if (document.forms['formBid']) {
            document.forms['formBid'].elements['price'].focus();
        }
        newPrice(); //刷新价格列表
    }
    else {
        alert(result.content);
    }
}


/* *
 * 夺宝奇兵最新出价
 */

function newPrice(id) {
    Ajax.call('snatch.php?act=new_price_list&id=' + id, '', newPriceResponse, 'GET', 'TEXT');
}

/* *
 * 夺宝奇兵最新出价反馈
 */

function newPriceResponse(result) {
    document.getElementById('ECS_PRICE_LIST').innerHTML = result;
}

/* *
 *  返回属性列表
 */
function getAttr(cat_id) {
    var tbodies = document.getElementsByTagName('tbody');
    for (i = 0; i < tbodies.length; i++) {
        if (tbodies[i].id.substr(0, 10) == 'goods_type') tbodies[i].style.display = 'none';
    }

    var type_body = 'goods_type_' + cat_id;
    try {
        document.getElementById(type_body).style.display = '';
    }
    catch (e) {
    }
}

/* *
 * 截取小数位数
 */
function advFormatNumber(value, num) // 四舍五入
{
    var a_str = formatNumber(value, num);
    var a_int = parseFloat(a_str);
    if (value.toString().length > a_str.length) {
        var b_str = value.toString().substring(a_str.length, a_str.length + 1);
        var b_int = parseFloat(b_str);
        if (b_int < 5) {
            return a_str;
        }
        else {
            var bonus_str, bonus_int;
            if (num == 0) {
                bonus_int = 1;
            }
            else {
                bonus_str = "0."
                for (var i = 1; i < num; i++)
                    bonus_str += "0";
                bonus_str += "1";
                bonus_int = parseFloat(bonus_str);
            }
            a_str = formatNumber(a_int + bonus_int, num)
        }
    }
    return a_str;
}

function formatNumber(value, num) // 直接去尾
{
    var a, b, c, i;
    a = value.toString();
    b = a.indexOf('.');
    c = a.length;
    if (num == 0) {
        if (b != -1) {
            a = a.substring(0, b);
        }
    }
    else {
        if (b == -1) {
            a = a + ".";
            for (i = 1; i <= num; i++) {
                a = a + "0";
            }
        }
        else {
            a = a.substring(0, b + num + 1);
            for (i = c; i <= b + num; i++) {
                a = a + "0";
            }
        }
    }
    return a;
}

/* *
 * 根据当前shiping_id设置当前配送的的保价费用，如果保价费用为0，则隐藏保价费用
 *
 * return       void
 */
function set_insure_status() {
    // 取得保价费用，取不到默认为0
    var shippingId = getRadioValue('shipping');
    var insure_fee = 0;
    if (shippingId > 0) {
        if (document.forms['theForm'].elements['insure_' + shippingId]) {
            insure_fee = document.forms['theForm'].elements['insure_' + shippingId].value;
        }
        // 每次取消保价选择
        if (document.forms['theForm'].elements['need_insure']) {
            document.forms['theForm'].elements['need_insure'].checked = false;
        }

        // 设置配送保价，为0隐藏
        if (document.getElementById("ecs_insure_cell")) {
            if (insure_fee > 0) {
                document.getElementById("ecs_insure_cell").style.display = '';
                setValue(document.getElementById("ecs_insure_fee_cell"), getFormatedPrice(insure_fee));
            }
            else {
                document.getElementById("ecs_insure_cell").style.display = "none";
                setValue(document.getElementById("ecs_insure_fee_cell"), '');
            }
        }
    }
}

/* *
 * 当支付方式改变时出发该事件
 * @param       pay_id      支付方式的id
 * return       void
 */
function changePayment(pay_id) {
    // 计算订单费用
    calculateOrderFee();
}

function getCoordinate(obj) {
    var pos =
        {
            "x": 0, "y": 0
        }

    pos.x = document.body.offsetLeft;
    pos.y = document.body.offsetTop;

    do
    {
        pos.x += obj.offsetLeft;
        pos.y += obj.offsetTop;

        obj = obj.offsetParent;
    }
    while (obj.tagName.toUpperCase() != 'BODY')

    return pos;
}

function showCatalog(obj) {
    var pos = getCoordinate(obj);
    var div = document.getElementById('ECS_CATALOG');

    if (div && div.style.display != 'block') {
        div.style.display = 'block';
        div.style.left = pos.x + "px";
        div.style.top = (pos.y + obj.offsetHeight - 1) + "px";
    }
}

function hideCatalog(obj) {
    var div = document.getElementById('ECS_CATALOG');

    if (div && div.style.display != 'none') div.style.display = "none";
}

function sendHashMail() {
    Ajax.call('user.php?act=send_hash_mail', '', sendHashMailResponse, 'GET', 'JSON')
}

function sendHashMailResponse(result) {
    alert(result.message);
}

/* 订单查询 */
function orderQuery() {
    var order_sn = document.forms['ecsOrderQuery']['order_sn'].value;

    var reg = /^[\.0-9]+/;
    if (order_sn.length < 10 || !reg.test(order_sn)) {
        alert(invalid_order_sn);
        return;
    }
    Ajax.call('user.php?act=order_query&order_sn=s' + order_sn, '', orderQueryResponse, 'GET', 'JSON');
}

function orderQueryResponse(result) {
    if (result.message.length > 0) {
        alert(result.message);
    }
    if (result.error == 0) {
        var div = document.getElementById('ECS_ORDER_QUERY');
        div.innerHTML = result.content;
    }
}

function display_mode(str) {
    document.getElementById('display').value = str;
    setTimeout(doSubmit, 0);
    function doSubmit() {
        document.forms['listform'].submit();
    }
}

function display_mode_wholesale(str) {
    document.getElementById('display').value = str;
    setTimeout(doSubmit, 0);
    function doSubmit() {
        document.forms['wholesale_goods'].action = "wholesale.php";
        document.forms['wholesale_goods'].submit();
    }
}

/* 修复IE6以下版本PNG图片Alpha */
function fixpng() {
    var arVersion = navigator.appVersion.split("MSIE")
    var version = parseFloat(arVersion[1])

    if ((version >= 5.5) && (document.body.filters)) {
        for (var i = 0; i < document.images.length; i++) {
            var img = document.images[i]
            var imgName = img.src.toUpperCase()
            if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
                var imgID = (img.id) ? "id='" + img.id + "' " : ""
                var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                var imgStyle = "display:inline-block;" + img.style.cssText
                if (img.align == "left") imgStyle = "float:left;" + imgStyle
                if (img.align == "right") imgStyle = "float:right;" + imgStyle
                if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
                var strNewHTML = "<span " + imgID + imgClass + imgTitle
                    + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                    + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                    + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                img.outerHTML = strNewHTML
                i = i - 1
            }
        }
    }
}

function hash(string, length) {
    var length = length ? length : 32;
    var start = 0;
    var i = 0;
    var result = '';
    filllen = length - string.length % length;
    for (i = 0; i < filllen; i++) {
        string += "0";
    }
    while (start < string.length) {
        result = stringxor(result, string.substr(start, length));
        start += length;
    }
    return result;
}

function stringxor(s1, s2) {
    var s = '';
    var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var max = Math.max(s1.length, s2.length);
    for (var i = 0; i < max; i++) {
        var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
        s += hash.charAt(k % 52);
    }
    return s;
}

var evalscripts = new Array();
function evalscript(s) {
    if (s.indexOf('<script') == -1) return s;
    var p = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/ig;
    var arr = new Array();
    while (arr = p.exec(s)) appendscript(arr[1], '', arr[2], arr[3]);
    return s;
}

function $$(id) {
    return document.getElementById(id);
}

function appendscript(src, text, reload, charset) {
    var id = hash(src + text);
    if (!reload && in_array(id, evalscripts)) return;
    if (reload && $$(id)) {
        $$(id).parentNode.removeChild($$(id));
    }
    evalscripts.push(id);
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    //scriptNode.charset = charset;
    try {
        if (src) {
            scriptNode.src = src;
        }
        else if (text) {
            scriptNode.text = text;
        }
        $$('append_parent').appendChild(scriptNode);
    }
    catch (e) {
    }
}

function in_array(needle, haystack) {
    if (typeof needle == 'string' || typeof needle == 'number') {
        for (var i in haystack) {
            if (haystack[i] == needle) {
                return true;
            }
        }
    }
    return false;
}

var pmwinposition = new Array();

var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
function pmwin(action, param) {
    var objs = document.getElementsByTagName("OBJECT");
    if (action == 'open') {
        for (i = 0; i < objs.length; i++) {
            if (objs[i].style.visibility != 'hidden') {
                objs[i].setAttribute("oldvisibility", objs[i].style.visibility);
                objs[i].style.visibility = 'hidden';
            }
        }
        var clientWidth = document.body.clientWidth;
        var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
        var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
        var pmwidth = 800;
        var pmheight = clientHeight * 0.9;
        if (!$$('pmlayer')) {
            div = document.createElement('div');
            div.id = 'pmlayer';
            div.style.width = pmwidth + 'px';
            div.style.height = pmheight + 'px';
            div.style.left = ((clientWidth - pmwidth) / 2) + 'px';
            div.style.position = 'absolute';
            div.style.zIndex = '999';
            $$('append_parent').appendChild(div);
            $$('pmlayer').innerHTML = '<div style="width: 800px; background: #666666; margin: 5px auto; text-align: left">' +
                '<div style="width: 800px; height: ' + pmheight + 'px; padding: 1px; background: #FFFFFF; border: 1px solid #7597B8; position: relative; left: -6px; top: -3px">' +
                '<div onmousedown="pmwindrag(event, 1)" onmousemove="pmwindrag(event, 2)" onmouseup="pmwindrag(event, 3)" style="cursor: move; position: relative; left: 0px; top: 0px; width: 800px; height: 30px; margin-bottom: -30px;"></div>' +
                '<a href="###" onclick="pmwin(\'close\')"><img style="position: absolute; right: 20px; top: 15px" src="images/close.gif" title="关闭" /></a>' +
                '<iframe id="pmframe" name="pmframe" style="width:' + pmwidth + 'px;height:100%" allowTransparency="true" frameborder="0"></iframe></div></div>';
        }
        $$('pmlayer').style.display = '';
        $$('pmlayer').style.top = ((clientHeight - pmheight) / 2 + scrollTop) + 'px';
        if (!param) {
            pmframe.location = 'pm.php';
        }
        else {
            pmframe.location = 'pm.php?' + param;
        }
    }
    else if (action == 'close') {
        for (i = 0; i < objs.length; i++) {
            if (objs[i].attributes['oldvisibility']) {
                objs[i].style.visibility = objs[i].attributes['oldvisibility'].nodeValue;
                objs[i].removeAttribute('oldvisibility');
            }
        }
        hiddenobj = new Array();
        $$('pmlayer').style.display = 'none';
    }
}

var pmwindragstart = new Array();
function pmwindrag(e, op) {
    if (op == 1) {
        pmwindragstart = is_ie ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
        pmwindragstart[2] = parseInt($$('pmlayer').style.left);
        pmwindragstart[3] = parseInt($$('pmlayer').style.top);
        doane(e);
    }
    else if (op == 2 && pmwindragstart[0]) {
        var pmwindragnow = is_ie ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
        $$('pmlayer').style.left = (pmwindragstart[2] + pmwindragnow[0] - pmwindragstart[0]) + 'px';
        $$('pmlayer').style.top = (pmwindragstart[3] + pmwindragnow[1] - pmwindragstart[1]) + 'px';
        doane(e);
    }
    else if (op == 3) {
        pmwindragstart = [];
        doane(e);
    }
}

function doane(event) {
    e = event ? event : window.event;
    if (is_ie) {
        e.returnValue = false;
        e.cancelBubble = true;
    }
    else if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
}

/* *
 * 添加礼包到购物车
 */
function addPackageToCart(packageId) {
    var package_info = new Object();
    var number = 1;

    package_info.package_id = packageId
    package_info.number = number;

    Ajax.call('flow.php?step=add_package_to_cart', 'package_info=' + package_info.toJSONString(), addPackageToCartResponse, 'POST', 'JSON');
}

/* *
 * 处理添加礼包到购物车的反馈信息
 */
function addPackageToCartResponse(result) {
    if (result.error > 0) {
        if (result.error == 2) {
            if (confirm(result.message)) {
                location.href = 'user.php?act=add_booking&id=' + result.goods_id;
            }
        }
        else {
            alert(result.message);
        }
    }
    else {
        var cartInfo = document.getElementById('ECS_CARTINFO');
        var cart_url = 'flow.php?step=cart';
        if (cartInfo) {
            cartInfo.innerHTML = result.content;
        }

        if (result.one_step_buy == '1') {
            location.href = cart_url;
        }
        else {
            switch (result.confirm_type) {
                case '1' :
                    if (confirm(result.message)) location.href = cart_url;
                    break;
                case '2' :
                    if (!confirm(result.message)) location.href = cart_url;
                    break;
                case '3' :
                    location.href = cart_url;
                    break;
                default :
                    break;
            }
        }
    }
}

function setSuitShow(suitId) {
    var suit = document.getElementById('suit_' + suitId);

    if (suit == null) {
        return;
    }
    if (suit.style.display == 'none') {
        suit.style.display = '';
    }
    else {
        suit.style.display = 'none';
    }
}


/* 以下四个函数为属性选择弹出框的功能函数部分 */
//检测层是否已经存在
function docEle() {
    return document.getElementById(arguments[0]) || false;
}

//生成属性选择层
function openSpeDiv(message, goods_id, parent) {
    var _id = "speDiv";
    var m = "mask";
    if (docEle(_id)) document.removeChild(docEle(_id));
    if (docEle(m)) document.removeChild(docEle(m));
    //计算上卷元素值
    var scrollPos;
    if (typeof window.pageYOffset != 'undefined') {
        scrollPos = window.pageYOffset;
    }
    else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    }
    else if (typeof document.body != 'undefined') {
        scrollPos = document.body.scrollTop;
    }

    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i]) {
        sel_obj[i].style.visibility = "hidden";
        i++;
    }

    // 新激活图层
    var newDiv = document.createElement("div");
    newDiv.id = _id;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = "10000";
    newDiv.style.width = "300px";
    newDiv.style.height = "260px";
    newDiv.style.top = (parseInt(scrollPos + 200)) + "px";
    newDiv.style.left = (parseInt(document.body.offsetWidth) - 200) / 2 + "px"; // 屏幕居中
    newDiv.style.overflow = "auto";
    newDiv.style.background = "#FFF";
    newDiv.style.border = "3px solid #59B0FF";
    newDiv.style.padding = "5px";

    //生成层内内容
    newDiv.innerHTML = '<h4 style="font-size:14; margin:15 0 0 15;">' + select_spe + "</h4>";

    for (var spec = 0; spec < message.length; spec++) {
        newDiv.innerHTML += '<hr style="color: #EBEBED; height:1px;"><h6 style="text-align:left; background:#ffffff; margin-left:15px;">' + message[spec]['name'] + '</h6>';

        if (message[spec]['attr_type'] == 1) {
            for (var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++) {
                if (val_arr == 0) {
                    newDiv.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' checked /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + '</font> [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';
                }
                else {
                    newDiv.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + '</font> [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';
                }
            }
            newDiv.innerHTML += "<input type='hidden' name='spec_list' value='" + val_arr + "' />";
        }
        else {
            for (var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++) {
                newDiv.innerHTML += "<input style='margin-left:15px;' type='checkbox' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + ' [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';
            }
            newDiv.innerHTML += "<input type='hidden' name='spec_list' value='" + val_arr + "' />";
        }
    }
    newDiv.innerHTML += "<br /><center>[<a href='javascript:submit_div(" + goods_id + "," + parent + ")' class='f6' >" + btn_buy + "</a>]&nbsp;&nbsp;[<a href='javascript:cancel_div()' class='f6' >" + is_cancel + "</a>]</center>";
    document.body.appendChild(newDiv);


    // mask图层
    var newMask = document.createElement("div");
    newMask.id = m;
    newMask.style.position = "absolute";
    newMask.style.zIndex = "9999";
    newMask.style.width = document.body.scrollWidth + "px";
    newMask.style.height = document.body.scrollHeight + "px";
    newMask.style.top = "0px";
    newMask.style.left = "0px";
    newMask.style.background = "#FFF";
    newMask.style.filter = "alpha(opacity=30)";
    newMask.style.opacity = "0.40";
    document.body.appendChild(newMask);
}

//获取选择属性后，再次提交到购物车
function submit_div(goods_id, parentId) {
    var goods = new Object();
    var spec_arr = new Array();
    var fittings_arr = new Array();
    var number = 1;
    var input_arr = document.getElementsByTagName('input');
    var quick = 1;

    var spec_arr = new Array();
    var j = 0;

    for (i = 0; i < input_arr.length; i++) {
        var prefix = input_arr[i].name.substr(0, 5);

        if (prefix == 'spec_' && (
                ((input_arr[i].type == 'radio' || input_arr[i].type == 'checkbox') && input_arr[i].checked))) {
            spec_arr[j] = input_arr[i].value;
            j++;
        }
    }

    goods.quick = quick;
    goods.spec = spec_arr;
    goods.goods_id = goods_id;
    goods.number = number;
    goods.parent = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);

    Ajax.call('flow.php?step=add_to_cart', 'goods=' + goods.toJSONString(), addToCartResponse, 'POST', 'JSON');

    document.body.removeChild(docEle('speDiv'));
    document.body.removeChild(docEle('mask'));

    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i]) {
        sel_obj[i].style.visibility = "";
        i++;
    }

}

// 关闭mask和新图层
function cancel_div() {
    document.body.removeChild(docEle('speDiv'));
    document.body.removeChild(docEle('mask'));

    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i]) {
        sel_obj[i].style.visibility = "";
        i++;
    }
}

//by xiaoyan 
function URLencode(sStr) {
    return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F');
}

//确认余额付款
function affirm_pay(oid) {
    upTel();
    $("#paypal_btn").val('正在使用余额付款');
    $("#paypal_btn").addClass("cursor_not bg_color_FF8993");
    Ajax.call('flow.php?act=affirm_pay&order_id=' + oid, '', AffirmPayResponse, 'GET', 'JSON');
}
function AffirmPayResponse(result) {
    if (result.code == 2) {
        alert(result.msg);
        $("#paypal_btn").val('确认使用余额付款');
    }
    else if (result.code == 1) {
        alert(result.msg);
        $("#paypal_btn").val('余额付款已经成功');
        window.location.href = "user.php?act=order_detail&order_id=" + result.oid;
    }

    $("#paypal_btn").removeClass("cursor_not bg_color_FF8993");
}

//百度设备识别
function uaredirect(f) {
    try {
        var arr = getURLpara("computer");
        if (arr){
            addCookie('URLpara', 1, 0);
            return;
        }
        var pcmark = getCookie('URLpara');
        if (pcmark) {
            return;
        }
        var b = false;
        if (arguments[1]) {
            var e = window.location.host;
            var a = window.location.href;
            if (isSubdomain(arguments[1], e) == 1) {
                f = f + "/#m/" + a;
                b = true
            } else {
                if (isSubdomain(arguments[1], e) == 2) {
                    f = f + "/#m/" + a;
                    b = true
                } else {
                    f = a;
                    b = false
                }
            }
        } else {
            b = true
        }
        if (b) {
            var c = window.location.hash;
            if (!c.match("fromapp")) {
                if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))) {
                    location.replace(f)
                }
            }
        }
    } catch (d) {
    }
}
function isSubdomain(c, d) {
    this.getdomain = function (f) {
        var e = f.indexOf("://");
        if (e > 0) {
            var h = f.substr(e + 3)
        } else {
            var h = f
        }
        var g = /^www\./;
        if (g.test(h)) {
            h = h.substr(4)
        }
        return h
    };
    if (c == d) {
        return 1
    } else {
        var c = this.getdomain(c);
        var b = this.getdomain(d);
        if (c == b) {
            return 1
        } else {
            c = c.replace(".", "\\.");
            var a = new RegExp("\\." + c + "$");
            if (b.match(a)) {
                return 2
            } else {
                return 0
            }
        }
    }
};

//cookie
function addCookie(objName,objValue,objHours){//添加cookie
    var str = objName + "=" + escape(objValue);
    if(objHours > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours*3600*1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    str += "; path=/";
    document.cookie = str;
    //alert(str);
}

function getCookie(objName){//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) return unescape(temp[1]);
    }
}

function delCookie(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=a; expires=" + date.toGMTString();
}

function allCookie(){//读取所有保存的cookie字符串
    var str = document.cookie;
    // if(str == ""){
    // str = "没有保存任何cookie";
    //}
    // alert(str);
}
/*
 function $(m,n){
 return document.forms[m].elements[n].value;
 }
 */
function add_(){
    var cookie_name = $("myform","cookie_name");
    var cookie_value = $("myform","cookie_value");
    var cookie_expireHours = $("myform","cookie_expiresHours");
    addCookie(cookie_name,cookie_value,cookie_expireHours);
}

function get_(){
    var cookie_name = $("myform","cookie_name");
    var cookie_value = getCookie(cookie_name);
    // alert(cookie_value);
}

function del_(){
    var cookie_name = $("myform","cookie_name");
    delCookie(cookie_name);
    // alert("删除成功");
}

//获取URL指定参数
function getURLpara(paraname)
{
    var url=document.URL;
    var para="";
    var paraval="";
    if(url.lastIndexOf("?")>0){
        para=url.substring(url.lastIndexOf("?")+1,url.length);
        var arr=para.split("&");
        para="";
        for(var i=0;i<arr.length;i++){
            if(arr[i].split("=")[0] == paraname){
                paraval = arr[i].split("=")[1];
            }
        }
    }
    if(paraval.indexOf("#")>-1){
        paraval = paraval.substring(0,tparaval.indexOf("#"));
    }
    return paraval;
}


