/**
 * 扩展于jQuery.validate Form表单验证
 */
// 以下为修改jQuery Validation插件兼容Bootstrap的方法，
$.validator.setDefaults({
	errorElement : 'span', //用什么标签标记错误，默认是 label，可以改成 em。
	errorClass : 'help-block',   //指定错误提示的 css 类名，可以自定义错误提示的样式。
	success:"valid",
	highlight : function(element) {//可以给未通过验证的元素加效果、闪烁等。
		$(element).closest('.form-group').removeClass('has-success').addClass('has-error has-feedback');
	},
	success : function(label) {//要验证的元素通过验证后的动作
		var el=label.closest('.form-group').find("input");
		el.next().remove();//与errorPlacement相似
		el.after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
		label.closest('.form-group').removeClass('has-error').addClass("has-feedback has-success");
		label.remove();
	},
	errorPlacement : function(error, element) {//跟一个函数，可以自定义错误放到哪里
		element.next().remove();//删除显示图标
		element.after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
		element.closest('.form-group').append(error);//显示错误消息提示
	},
	submitHandler : function(form) {
	}
});

$(document).ready(function() {
	// 匹配密码，以字母开头，长度在6-12之间，必须包含数字和特殊字符。
	jQuery.validator.addMethod("isPwd", function(value, element) {
		var str = value;
		if (str.length < 6 || str.length > 18)
			return false;
		if (!/^[a-zA-Z]/.test(str))
			return false;
		if (!/[0-9]/.test(str))
			return fasle;
		return this.optional(element) || /[^A-Za-z0-9]/.test(str);
	}, "以字母开头，长度在6-12之间，必须包含数字和特殊字符。");

	// 邮政编码验证
	jQuery.validator.addMethod("isZipCode", function(value, element) {
		var tel = /^[0-9]{6}$/;
		return this.optional(element) || (tel.test(value));
	}, "请正确填写您的邮政编码");

	// 判断字符是否是中文字符
	jQuery.validator.addMethod("isChina", function(value, element) {
		var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
		return this.optional(element) || (patrn.exec(value));
	}, "只允许填入中文字符 ");

	// 字符验证
	jQuery.validator.addMethod("stringCheck", function(value, element) {
		return this.optional(element) || /^[u0391-uFFE5w]+$/.test(value);
	}, "只能包括中文字、英文字母、数字和下划线");

	// 字母数字
	jQuery.validator.addMethod("isNumber", function(value, element) {
		return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
	}, "只能包括英文字母和数字");

	// 只能输入英文
	jQuery.validator.addMethod("isEnglish", function(value, element) {
		var chrnum = /^([a-zA-Z]+)$/;
		return this.optional(element) || (chrnum.test(value));
	}, "只能输入字母");
});