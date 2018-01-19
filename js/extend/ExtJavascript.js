/**
 * 扩展javsScript工具函数
 */
var dllwh = dllwh || {};
dllwh.data = dllwh.data || {}; // 用于存放临时的数据或者对象

/**
 * 全局配置
 */
var _ajaxCallback = function() {};
$.ajaxSetup({
	dataType: "json",
	cache: false,
	complete: function(XMLHttpRequest, textStatus) {
		// 通过XMLHttpRequest取得响应头，sessionstatus， 
		var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
		_ajaxCallback();
		if(sessionstatus == "timeout") {
			// 如果超时就处理 ，指定要跳转的页面(比如登陆页)

		} else if(textStatus == "timeout") { // 请求超时，请稍候重试...
		} else if(textStatus == "error") { // 错误请求，请稍候重试..."
		} else if(textStatus == "notmodified") { // 错误请求，无法完成此操作
		} else if(textStatus == "parsererror") { // 网络问题，请稍候重试...
		}
	}
});

/**
 * js获取项目根路径
 */
dllwh.getRootPath = function() {
	// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	var curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0, pos);
	// 获取带"/"的项目名，如：/uimcardprj
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	return(localhostPaht + projectName)+"";
}

/**
 * 判断是否为空 不是一个空对象，或者未定义，或者不等于空字符串
 */
dllwh.isNullOrEmpty = function(obj) {
	if((typeof(obj) == "string" && obj == "") || obj == null ||
		typeof(obj) == undefined) {
		return true;
	} else {
		return false;
	}
}

dllwh.isNotNullOrEmpty = function(obj) {
	if((typeof(obj) == "string" && obj == "") || obj == null ||
		obj == undefined) {
		return false;
	} else {
		return true;
	}
}

/** 页面跳转 */
dllwh.gotoUrl = function(href) {
	window.location.href = href;
}