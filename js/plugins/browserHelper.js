/**
 * 获取浏览器信息:版本、语言类型 
 */
var browserInfo = {
	versions: function() { // 移动终端浏览器版本信息
		var userAgent = navigator.userAgent;
		var app = navigator.appVersion;
		return {
			// IE内核
			trident: userAgent.indexOf('Trident') > -1,
			// opera内核
			presto: userAgent.indexOf('Presto') > -1,
			// 苹果、谷歌内核
			webKit: userAgent.indexOf('AppleWebKit') > -1,
			// 火狐内核
			gecko: userAgent.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
			// 是否为移动终端
			mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/),
			// ios终端
			ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			// android终端或uc浏览器
			android: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1,
			// 是否为iPhone或者QQHD浏览器
			iPhone: userAgent.indexOf('iPhone') > -1,
			// 是否iPad
			iPad: userAgent.indexOf('iPad') > -1,
			// 是否web应该程序，没有头部与底部
			webApp: userAgent.indexOf('Safari') == -1
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

/**
 * 判断浏览器是否支持flash
 */
var flashChecker = function() {
	var hasFlash = false; //是否安装了flash
	if(document.all) {
		try {
			hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
		} catch(exception) {
			hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash']);
		}
	} else {
		if(navigator.plugins && navigator.plugins.length > 0) {
			hasFlash = Boolean(navigator.plugins["Shockwave Flash"]);
		}
	}
	return hasFlash;
};

/**
 * 是否微信 
 */
var isWeixn = function() {
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

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