/**
 * 
 */

function newForm(url, fields, values, target, method) {
	if(target == null || target == '' || target == undefined) {
		target = "_blank";
	}
	var form = document.createElement("form");
	form.action = url;
	form.target = target;
	form.method = "method;
	document.body.appendChild(form);
	var i;
	if(fields.length == values.length) {
		for(i = 0; i < fields.length; i++) {
			var input = document.createElement("input");
			input.type = "hidden";
			input.name = fields[i];
			input.value = values[i];
			form.appendChild(input);
		}
		form.submit();
	}
}

/**
 * 功能 ：将表单的所有input都设为可编辑的
 * @param 要操作表单的id
 */
var formWritable = function(formId) {
	$("#" + formId + " input").removeAttr("readonly");
}

/**
 * 功能 ：将给定的input设为可编辑
 * @param array 数组，存放有要操作的input的id
 */
var inputWriteable = function(array) {
	for(var i = 0; i < array.length; i++) {
		$('#' + array[i]).removeAttr("readonly");
	}
}

/**
 * 功能 ：将表单的所有input都设为只读
 * @param 要操作表单的i
 */
var formReadOnle = function(formId) {
	$("#" + formId + " input").attr("readOnly", true);
}

/**
 * 功能 ：将给定的input设为只读
 * @param array 数组，存放有要操作的input的id
 */
var inputReadOnly = function(array) {
	for(var i = 0; i < array.length; i++) {
		$('#' + array[i]).attr("readOnly", true);
	}
}

/**
 * 复选框,全选及全不选 
 * @param {Object} id 复选框的id
 * @param {Object} name 复选框的name属性
 */
function checkbox(id, name) {
	//获得选中复选框的id
	var kcxx = document.getElementById(id);
	//获取将要被选中的复选框的name属性
	var djzbbm = document.getElementsByName(name);
	//循环复选的长度
	for(var i = 0; i < djzbbm.length; i++) {
		//如果当前复选框的状态为true,则把列表中的复选框选中,否则改为false(取消选中)
		if(kcxx.checked == true) {
			djzbbm[i].checked = true;
		} else {
			djzbbm[i].checked = false;
		}
	}
}