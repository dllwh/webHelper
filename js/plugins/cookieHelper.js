
/** 
 * 设置cookie
 */
var setCookie = function(name, value) {
	var exp = new Date();
	var tommorrow = new Date();
	tommorrow.setDate(tommorrow.getDate() + 1);
	tommorrow.setHours(0);
	tommorrow.setMinutes(0);
	tommorrow.setSeconds(0);
	tommorrow.setMilliseconds(0);
	exp.setTime(tommorrow.getTime()); //明天0点过期
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
/** 
 * 获取cookie 
 */
var getCookie = function(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return "";
}

/**
 * 删除cookies 
 */
var delCookie = function(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}