/**
 * 移动端
 */

var MobileLive = {
	if(this.isIPad() || this.isIPhone() || this.isAndroid() || this.isWindowsPhone()) {
		isMobile: function() { // 是否是移动端
			return true;
		} else {
			return false;
		}
	},

	isIPad: function() { // 是否是IPAD
		return navigator.userAgent.match(/iPad/i) != null;
	},

	isIPhone: function() { // 是否是IPhone
		return navigator.userAgent.match(/iPhone/i) != null;
	},

	isAndroid: function() { // 是否是android
		return navigator.userAgent.match(/Android/i) != null;
	},

	isWindowsPhone: function() { // 是否是windowsPhone
		return navigator.userAgent.match(/Windows Phone/i) != null;
	}
}
