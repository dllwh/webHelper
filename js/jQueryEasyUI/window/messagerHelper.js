/**
 * Messager（消息窗口）
 * 消息窗口提供了不同的消息框风格，包含alert(警告框), confirm(确认框), prompt(提示框), progress(进度框)等。
 * 所有的消息框都是异步的。
 */

/**
 * 弹出框以及系统消息框
 * @param {Object} title 标题
 * @param {Object} msg 消息内容
 * @param {Object} isAlert 是否警告
 */
function showMsg(title, msg, isAlert) {
	if(isAlert !== undefined && isAlert) {
		$.messager.alert(title, msg);
	} else {
		$.messager.show({
			title: title,
			msg: msg,
			showType: 'show'
		});
	}
}

/**
 * 确认框 。如果不需要回调的话，callback 不用写入
 * @param {Object} title 标题
 * @param {Object} msg 消息内容
 * @param {Object} callback 回调函数
 */
function showConfirm(title, msg, callback) {
	$.messager.confirm(title, msg, function(r) {
		if(r) {
			if(jQuery.isFunction(callback))
				callback.call();
		}
	});
}

/**
 * 进度框 
 * @param {Object} isShow
 * @param {Object} title
 * @param {Object} msg
 */
var showProcess = function(isShow, title, msg) {
	if(!isShow) {
		$.messager.progress('close');
		return;
	}
	var win = $.messager.progress({
		title: title,
		msg: msg
	});
}

/**
 * 显示消息
 */
function showMsg(msg) {
	top.window.$.messager.show({
		title: '消息',
		msg: '<div style="padding-top: 10px;">' + msg || "消息内容！" + '</div>',
		timeout: 3000,
		showType: 'slide'
	});
}

/**
 * 确认消息
 */
function confirmMsg(msg, successFunc) {
	top.window.$.messager.confirm('请确认', '<div style="padding-top: 10px;">' + (msg || 'Are you confirm this?') + "</div>", function(r) {
		if(r) {
			if($.isFunction(successFunc)) {
				successFunc();
			}
		}
	});
}