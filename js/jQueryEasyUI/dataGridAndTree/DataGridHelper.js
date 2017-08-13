/**
 * 清除选择纪录
 * @param {Object} id
 * @param {Object} hideCheckBox  表头隐藏Checkbox
 */
var clearSelections = function(id, hideCheckBox) {
	if(hideCheckBox !== undefined && hideCheckBox) {
		// 隐藏表头的checkbox
		$('#' + id).parent().find("div .datagrid-header-check")
			.children("input[type='checkbox']").eq(0).attr("style",
				"display:none;");
	}

	// 清除选择纪录
	$('#' + id).datagrid('clearSelections');
}