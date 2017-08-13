/**
 * 浏览器信息检测函数
 * 作者：独泪了无痕
 * 邮箱：duleilewuhen@sina.com
 */
(function ($) {
	$.browserDetecter = function (){
		var searchString = function  (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
				}
				else if (dataProp) {
					return data[i].identity;
				}
			}
		};
		
		var searchVersion= function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		};
		
		var searchEngine = function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				this.engineVersionSearchString = data[i].versionSearch
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
				}
			}
		};
		
		var searchEngineVersion= function (dataString) {
			var index = dataString.indexOf(this.engineVersionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.engineVersionSearchString.length+1));
		};
		
		
		var dataBrowser = [
			{	//360
				string: navigator.userAgent,
				subString: "360SE",
				identity: "360SE"
			},
			{	//搜狗
				string: navigator.userAgent,
				subString: "SE",
				versionSearch: "SE",
				identity: "Sogou"
			},
			{	//腾讯
				string: navigator.userAgent,
				subString: "TencentTraveler",
				versionSearch: "TencentTraveler",
				identity: "Tencent Traveler"
			},
			{	//世界之窗
				string: navigator.userAgent,
				subString: "TheWorld",
				identity: "The World"
			},
			{	//遨游
				string: navigator.userAgent,
				subString: "Maxthon",
				identity: "Maxthon"
			},
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{	// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Internet Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 	// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		];
		
		var dataEngine = [
			{
				string: navigator.userAgent,
				subString: "Trident",
				identity: "Trident",
				versionSearch: "Trident"
			},
			{
				string: navigator.userAgent,
				subString: "AppleWebKit",
				identity: "WebKit",
				versionSearch: "AppleWebKit"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Gecko",
				versionSearch: "Gecko"
			},
			{
				string: navigator.userAgent,
				subString: "WebKit",
				identity: "WebKit",
				versionSearch: "WebKit"
			},
			{
				string: navigator.userAgent,
				subString: "Presto",
				identity: "Presto",
				versionSearch: "Presto"
			}
		];
		
		var dataOS = [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				string: navigator.userAgent,
				subString: "iPhone",
				identity: "iPhone/iPod"
			},
			{
				string: navigator.userAgent,
				subString: "iPad",
				identity: "iPad"
			},
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		];
		var pluginList = {
			flash: {
				activex: "ShockwaveFlash.ShockwaveFlash",
				plugin: /flash/gim
			},
			pdf: {
				activex: "PDF.PdfCtrl",
				plugin: /adobe\s?acrobat/gim
			},
			qtime: {
				activex: "QuickTime.QuickTime",
				plugin: /quicktime/gim
			},
			wmp: {
				activex: "WMPlayer.OCX",
				plugin: /(windows\smedia)|(Microsoft)/gim
			},
			rp: {
				activex: "RealPlayer",
				plugin: /realplayer/gim
			},
			java: {
				activex: navigator.javaEnabled(),
				plugin: /java/gim
			}
		};
		
		var isSupported = function (p) {
			var r;
			if (window.ActiveXObject) {
				try {
					new ActiveXObject(pluginList[p].activex);
					r = true;
				} catch (e) {
					r = false;
				}
			} else {
				$.each(navigator.plugins, function () {
					if (this.name.match(pluginList[p].plugin)) {
						r = true;
						return false
					} else {
						r = false;
					}
				});
			}
			return r;
		};
		
		
		_browser = searchString(dataBrowser) || "unknown";
		_version = searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || "unknown";
		_OS = searchString(dataOS) || "unknown";
		_engine = searchEngine(dataEngine) || "unknown";
		_engineVersion = searchEngineVersion(navigator.userAgent) || "unknown";
		
		//双重检测IE引擎
		if (window.ActiveXObject) {
			if (_engine!= "Trident") _engine = "Trident";
			if (_engineVersion == "unknown" || parseInt(_engineVersion) <= 4) {
				if (!window.XMLHttpRequest) {
					_engineVersion = "4(IE6)";
				} else {
					if (!$.support.style) {
						_engineVersion = "4(IE7)";
					} else {
						if (!$.support.opacity) {
							_engineVersion = "4(IE8)";
						}
					}
				}
			}
		}		
		
		_flashSupport = isSupported("flash");
		_pdfSupport = isSupported("pdf");
		_quickTimeSupport = isSupported("qtime");
		_windowsMediaPlayerSupport = isSupported("wmp");
		_realplayerSupport = isSupported("rp");
		_javaSupport = isSupported("java");
		_cookieEnabled = navigator.cookieEnabled;
		_language = (navigator.language || navigator.userLanguage || navigator.systemLanguage).toLowerCase();
		_ajaxSupport = $.support.ajax;
		_opacitySupport = $.support.opacity;
		
		$.browser = {
			userAgent : navigator.userAgent,
			name : _browser,
			version : _version,
			OS : _OS,
			engine:_engine,
			engineVersion:_engineVersion,
			flashSupport : _flashSupport,
			pdfSupport : _pdfSupport,
			quickTimeSupport : _quickTimeSupport,
			windowsMediaPlayerSupport : _windowsMediaPlayerSupport,
			realplayerSupport : _realplayerSupport,
			javaSupport : _javaSupport,
			cookieEnabled : _cookieEnabled,
			language : _language,
			ajaxSupport : _ajaxSupport,
			opacitySupport : _opacitySupport
		}
	};
	$.browserDetecter();
})(jQuery);
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
			gecko: userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('KHTML') == -1,
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
 * 判断是否支持浏览器
 */
var getBrowserStatus = function() {

}

/**
 * 判断浏览器是否允许Javascript 
 * 除非特殊情况，浏览器都会支持判断浏览器是否允许Javascript
 */
var getJavascriptStatus = function() {

}

/**
 * 判断浏览器是否允许Cookies
 */
var getCookieStatus = function() {

}

/**
 * 判断浏览器是否允许弹出窗口
 */
var getPopupStatus = function() {

}

/**
 * 判断浏览器是否支持flash
 */
var getFlashStatus = function() {
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
