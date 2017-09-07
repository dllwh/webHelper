/**
 * Window（窗口）
 * 窗口控件是一个浮动和可拖拽的面板可以用作应用程序窗口。
 * 默认情况下,窗口可以移动,调整大小和关闭。
 * 它的内容也可以被定义为静态html或要么通过ajax动态加载。
 */

/**
 *  打开窗口
 * @param {Object} id
 * @param {Object} title
 */
var openMyWindow = function(id, title) {
	$('#' + id).window({
		title: title,
		modal: true, // 否将窗体显示为模式化窗口
		minimizable: false, //否显示最小化按钮
		maximizable: false, //否显示最大化按钮
		shadow: false, //如果设置为true，在窗体显示的时候显示阴影
		cache: false, // 是否可以关闭窗口
		closed: false, // 是否可以关闭窗口
		collapsible: false, //是否显示可折叠按钮
		resizable: false, //是否能够改变窗口大小
		loadingMessage: '正在加载数据，请稍等片刻......'
	});
}
/**
 * 显示窗口
 * @param {Object} id
 * @param {Object} title
 * @param {Object} href
 * @param {Object} width
 * @param {Object} height
 * @param {Object} modal
 * @param {Object} minimizable
 * @param {Object} maximizable
 */
var showMyWindow = function(id, title, href, width, height, modal, minimizable, maximizable) {
	$('#' + id).window({
		title: title,
		width: width === undefined ? 600 : width,
		height: height === undefined ? 400 : height,
		content: '<iframe scrolling="yes" frameborder="0"  src="' + href + '" style="width:100%;height:98%;"></iframe>',
		modal: modal === undefined ? true : modal,
		minimizable: minimizable === undefined ? false : minimizable,
		maximizable: maximizable === undefined ? false : maximizable,
		shadow: false,
		cache: false,
		closed: false,
		collapsible: false,
		resizable: false,
		loadingMessage: '正在加载数据，请稍等片刻......'
	});
}

/**
 * 关闭窗口
 * @param {Object} id
 */
var closeMyWindow = function(id) {
	$('#' + id).window('close');
}

/**
 * 打开弹出窗
 * @param title		标题
 * @param url		iframe地址
 * @param options	可选参数
 */
function openWindow(title, url, options) {
	options = options || {};
	if(options.size && options.size.indexOf("x") >= 0) {
		options.width = options.size.split("x")[0];
		options.height = options.size.split("x")[1];
	}
	$("#dialogWindow iframe").attr("src", url);
	$("#dialogWindow").window({
		closed: false,
		modal: true,
		title: title || '增加',
		width: options.width || 700,
		height: options.height || 450,
		onClose: function() {
			$("#dialogWindow iframe").removeAttr("src");
			//关闭popup
			try {
				$("#popupWindow").window("close");
			} catch(err) {
				//没有弹层
			}

		}
	});
	$("#dialogWindow").window("center");
}

/**
 * 打开一个弹层，用于选择一些信息（如城市等）
 * @param ipt	需要弹层的input或其它元素
 * @param title	弹层标题
 * @param url	页面ulr
 * @param options	其它参数（参考easyui-window）
 */
function openPopup(ipt, title, url, options) {
	ipt = $(ipt);
	popup.ipt = ipt;
	var os1 = $("#dialogWindow").offset();
	var os2 = ipt.offset();

	if(!url || popup.currUrl != url) {
		$("#popupWindow iframe").attr("src", url);
	}
	if(!options) {
		options = {};
	}
	options.title = title || "popup";
	options.top = os1.top + os2.top + ipt.outerHeight();
	options.left = os1.left + os2.left;
	options.onClose = function() {
		//回调关闭事件
		if(top.window.popup.close) {
			top.window.popup.close();
		}
	}
	//回调显示事件
	if(top.window.popup.show) {
		top.window.popup.show();
	}
	$("#popupWindow").window(options);
	popup.currUrl = url;
}


/**
 * 关闭弹层
 **/
function closePopup() {
	$("#popupWindow").window("close");
}

/**
 * 关闭弹出窗口
 */
function closeWindow() {
    $("#dialogWindow").window("close");
}