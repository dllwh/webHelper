/**
 * 1.支持HTML5和Flash 2.支持传入视频源地址(mp4或m3u8播放) 3.支持连播 4.支持播放器一些简单事件
 */

var myVideo = document.getElementById("myVideo");
var isVideoCanPlay = false; // 是否允许播放
var isAutoPlay = false; // 是否支持自动播放
var isAllowFullScreen = false; // 是否支持自动播放
var isFullScreen = false; // 是否全屏播放
var totalTime = 0; // 视频的时间长度,秒数
var maxDurationTime = ""; // 视频的时间长度;时:分:秒
var clientWidth = 0;
var clientHeight = 0;

/**
 * 定时任务
 */
// 控制条
var controllerBarTask;
// 处理iPhone在退出全屏播放后视频播放暂时
var iPhoneTask;

setInterval(function() {
	if(myVideo.paused && isVideoCanPlay) {

	}
}, 200);

/**
 * 在很多情况下，触摸事件和鼠标事件会同时被触发（目的是让没有对触摸设备优化的代码仍然可以在触摸设备上正常工作）。如果你使用了触摸事件，可以调用
 * event.preventDefault() 来阻止鼠标事件被触发。
 */
myVideo.addEventListener("contextmenu", function(event) {
	event.preventDefault();
	event.stopPropagation();
});

// 记录信息
var initInfo = function() {
	clientWidth = document.documentElement.clientWidth ||
		document.body.clientWidth;
	clientHeight = document.documentElement.clientHeight ||
		document.body.clientHeigth;

}

/**
 * 播放
 */
// 准备播放
myVideo.addEventListener('waiting', function() {

});

/** 浏览器根据当前网络状况去判断是否已经加载了足够的媒体片断而支撑基本的播放 */
myVideo.addEventListener("canplaythrough", function() {

});

/**
 * 正在播放中
 */

// 获取到元数据:获取视频的长度
myVideo.addEventListener("loadedmetadata", function() {
	// 视频总时长
	totalTime = this.duration;
	maxDurationTime = getFormatTime(totalTime);
});

// 视频播放事件，隐藏播放按钮，下方控制条渐渐隐藏 ,视频开始播放
myVideo.addEventListener("play", function() {
	controllerBarTask = setTimeout(function() {

	}, 3400);
});

// 视频播放中事件:当前播放时间变化
myVideo.addEventListener("timeupdate", function() {
	// 获取当前播放时间(当前播放的位置)
	var currPlayTime = this.currentTime;
	// 更新进度条
	var percentage = 100 * currPlayTime / totalTime;
	// 显示进度条
	// 显示当前播放进度时间
});

// 跳跃播放进度条
var updateBar = function(e) {
	var event = e || window.event;
	myVideo.currentTime = (event.offsetX / this.offsetWidth) * totalTime;
}

// 视频手势右滑动事件
myVideo.addEventListener("swiperight", function(event) {
	console.log('swiperight');
	if(isFullScreen) {
		setVolume(0.2)
	} else {
		setCurrentTime(5);
	}
});

// 视频手势左滑动事件
myVideo.addEventListener("swipeleft", function(event) {
	console.log('swipeleft');
	if(isFullScreen) {
		setVolume(-0.2);
	}
	eles {
		setCurrentTime(-5);
	}
});

// 视频手势上滑动事件
myVideo.addEventListener("swipeup", function(event) {
	console.log('swipeup');
	if(isFullScreen) {
		setCurrentTime(-5)
	} else {
		setVolume(0.2);
	}
});

// 视频手势下滑动事件
myVideo.addEventListener("swipedown", function(event) {
	console.log('swipedown');
	if(isFullScreen) {
		setCurrentTime(5);
	} else {
		setVolume(-0.2);
	}
});

// 跳转视频进度.单位:秒
var setCurrentTime = function(t) {
	myVideo.currentTime += t;
}
// 设置音量大.单位:百分比 如 0.1
var setVolume = function(t) {
	myVideo.volume += t;
}

/**
 * 全屏播放 ios端：去除video标签webkit-playsinline属性即可，因为ios对h5的video标签支持还是比较不错的
 * 初始化时，记录mini时的样式，全屏时，通过修改视频宽度为屏幕高度，视频高度修改为视频宽度，再利用5+的屏幕旋转，设置全屏，隐藏状态栏
 */

// 进入全屏
var enterFullScreenFun = function() {
	if(!isFullScreen) {
		if($.isFunction(myVideo.webkitEnterFullscreen)) {
			myVideo.webkitEnterFullscreen();
			isFullScreen = true;
		} else if($.isFunction(myVideo.mozRequestFullScreen)) {
			myVideo.mozRequestFullScreen();
			isFullScreen = true;
		} else if($.isFunction(myVideo.requestFullscreen)) {
			myVideo.requestFullscreen();
			isFullScreen = true;
		} else {
			isFullScreen = false;
		}
	}

}

// 退出全屏
var exitFullScreenFun = function() {
	if(isFullScreen) {
		if($.isFunction(myVideo.webkitCancelFullScreen)) {
			myVideo.webkitCancelFullScreen();
		} else if($.isFunction(myVideo.mozCancelFullScreen)) {
			myVideo.mozCancelFullScreen();
		} else if($.isFunction(myVideo.exitFullscreen)) {
			myVideo.exitFullscreen();
		}
		isFullScreen = false;
	}
}

/**
 * 暂停 or 停止(在播放当中按暂停或者视频播放完毕时)
 */

// 在暂停的时候,显示出播放按钮,下方控制条显示
myVideo.addEventListener("pause", function() {
	if(myVideo.paused || myVideo.ended) { // 暂停时点击就播放
		if(myVideo.ended) { // 如果播放完毕，就重头开始播放
			setCurrentTime(0);
		}
		videoPlayStart();
	} else { // 播放时点击就暂停
		videoPlayPause();
	}
	clearTimeout(controllerBarTask);
});

// 解决在Opera、Safari和IE 10中,媒体播放完毕,媒体也不会暂停(结束)
myVideo.addEventListener("ended", function() {
	videoPlayComplete();
});

/** 视频播放 */
var videoPlayStart = function() {

};

/** 视频暂停 */
var videoPlayPause = function() {

};

/** 视频结束 */
var videoPlayComplete = function() {

};

/** 时间格式化 */
var getFormatTime = function(time) {
	var h = parseInt(time / 3600);
	var m = parseInt(time % 3600 / 60)
	var s = parseInt(time % 60);
	h = h < 10 ? "0" + h : h;
	m = m < 10 ? "0" + m : m;
	s = s < 10 ? "0" + s : s;
};