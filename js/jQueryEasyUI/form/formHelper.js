/**
 * 在表单提交时，为了防止重复提交，会显示一个进度框。提交完成时，关闭进度框并提示操作信息
 * @param {Object} id
 * @param {Object} url
 */
var submitForm = function(id, url) {
	$('#' + id).form('submit', {
		url: url,
		onSubmit: function() {
			var flag = $(this).form('validate');
			if(flag) {
				showProcess(true, '温馨提示', '正在提交数据...');
			}
			return flag
		},
		success: function(data) {
			showProcess(false);
			if(data == 1) {
				top.showMsg('温馨提示', '提交成功！');
				if(parent !== undefined) {
					if($.isFunction(window.reloadParent)) {
						reloadParent.call();
					} else {
						parent.$("#tt").datagrid('reload');
						parent.closeMyWindow();
					}
				}
			} else {
				showMsg('温馨提示', data, true);
			}
		},
		onLoadError: function() {
			showProcess(false);
			showMsg('温馨提示', '由于网络或服务器太忙，提交失败，请重试！', true);
		}
	});
}