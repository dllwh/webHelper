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