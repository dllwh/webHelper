//封装常用cookie操作
var CookieUtil = {
	get: function(name) {
		var cookieName = encodeURIComponent(name) + '=',
			cookieValue = null,
			cookieStart = document.cookie.indexOf(cookieName);
		if(cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(';', cookieStart);
			if(cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
		}
		return cookieValue;
	},
	set: function(name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + "=" +
			encodeURIComponent(value);
		if(expires instanceof Date) {
			cookieText += "; expires=" + expires.toGMTString();
		}
		if(path) {
			cookieText += "; path=" + path;
		}
		if(domain) {
			cookieText += "; domain=" + domain;
		}
		if(secure) {
			cookieText += "; secure";
		}
		document.cookie = cookieText;
	},
	unset: function(name, path, domain, secure) {
		this.set(name, "", new Date(0), path, domain, secure);
	},
	setCookie: function(name, value) { // 设置cookie
		var exp = new Date();
		var tommorrow = new Date();
		tommorrow.setDate(tommorrow.getDate() + 1);
		tommorrow.setHours(0);
		tommorrow.setMinutes(0);
		tommorrow.setSeconds(0);
		tommorrow.setMilliseconds(0);
		exp.setTime(tommorrow.getTime()); //明天0点过期
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},
	getCookie = function(name) { // 获取cookie 
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return "";
	},
	delCookie = function(name) { // 删除cookies 
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if(cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
};