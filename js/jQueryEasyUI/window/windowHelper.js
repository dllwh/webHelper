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