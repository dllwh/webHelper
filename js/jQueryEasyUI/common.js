var subPage = {}; //用于弹窗，如增删改查页面
var popup = {}; //用于弹层

$(function() {
	//去掉加载页面时，遮挡的div
	$("body").css("visibility", "visible");
})

/**
 * 全局ajax事件处理
 */
$(window).ajaxError(function(handler) {
	showWarnMsg("操作失败，服务器出现错误！");
});

/**
 * 显示警告消息
 */
function showWarnMsg(msg) {
	top.window.$.messager.show({
		title: '错误消息',
		msg: '<div class="messager-icon messager-warning"></div><div style="padding-top: 10px;">' + (msg || "消息内容！") + "</div>",
		timeout: 3000,
		showType: 'slide'
	});
}