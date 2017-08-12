/**
 * 对Date的扩展
 */

/**
 *  判断闰年 
 */
Date.prototype.isLeapYear = function() {
	return(0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)));
}

/**
 * 将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * @param {Object} formatStr
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * eg: (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 * (new Date()).Format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 
 * (new Date()).Format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 
 * (new Date()).Format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.Format = function(formatStr) {
	var o = {
		"M+": this.getMonth() + 1, // 月份
		"d+": this.getDate(), // 日
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+": this.getHours(), // 小时
		"m+": this.getMinutes(), // 分
		"s+": this.getSeconds(), // 秒
		"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		"S": this.getMilliseconds()
		// 毫秒
	};
	var week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	}
	if(/(E+)/.test(fmt)) {
		fmt = fmt
			.replace(
				RegExp.$1,
				((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" :
						"/u5468") :
					"") +
				week[this.getDay() + ""]);
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
				(("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

/**
 * 求两个时间的天数差 .绝对值，异常则返回-1；
 * 日期格式为 YYYY-MM-dd
 * @param {Object} startDate
 * @param {Object} endDate
 */
var daysBetween = function(startDate, endDate) {
	try {
		var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
		var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
		var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

		var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
		var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
		var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

		var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
		return Math.abs(cha);
	} catch() {
		return -1;
	}
}

/**
 *  把日期分割成数组  
 */
Date.prototype.toArray = function() {
	var myDate = this;
	var myArray = Array();
	myArray[0] = myDate.getFullYear();
	myArray[1] = myDate.getMonth();
	myArray[2] = myDate.getDate();
	myArray[3] = myDate.getHours();
	myArray[4] = myDate.getMinutes();
	myArray[5] = myDate.getSeconds();
	return myArray;
}

/**
 * 取得日期数据信息
 * @param {Object} interval 表示数据类型 :y 年; m月; d日; w星期 ;ww周; h时; n分; s秒;  
 */
Date.prototype.DatePart = function(interval) {
	var myDate = this;
	var partStr = '';
	var Week = ['日', '一', '二', '三', '四', '五', '六'];
	switch(interval) {
		case 'y':
			partStr = myDate.getFullYear();
			break;
		case 'm':
			partStr = myDate.getMonth() + 1;
			break;
		case 'd':
			partStr = myDate.getDate();
			break;
		case 'w':
			partStr = Week[myDate.getDay()];
			break;
		case 'ww':
			partStr = myDate.WeekNumOfYear();
			break;
		case 'h':
			partStr = myDate.getHours();
			break;
		case 'n':
			partStr = myDate.getMinutes();
			break;
		case 's':
			partStr = myDate.getSeconds();
			break;
	}
	return partStr;
}

/**
 * 取得当前日期所在月的最大天数  
 */
Date.prototype.MaxDayOfDate = function() {
	var myDate = this;
	var ary = myDate.toArray();
	var date1 = (new Date(ary[0], ary[1] + 1, 1));
	var date2 = date1.dateAdd(1, 'm', 1);
	var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd'));
	return result;
}

/**
 * 取得当前日期所在周是一年中的第几周  
 */
Date.prototype.WeekNumOfYear = function() {
	var myDate = this;
	var ary = myDate.toArray();
	var year = ary[0];
	var month = ary[1] + 1;
	var day = ary[2];
	document.write('< script language=VBScript\> \n');
	document.write('myDate = Datue('
		'+month+' - '+day+' - '+year+'
		') \n');
	document.write('result = DatePart('
		ww ', myDate) \n');
	document.write(' \n');
	return result;
}

/**
 *  取得当前日期所在周是一年中的第几周
 */
Date.prototype.WeekNumOfYear = function() {
	var myDate = this;
	var ary = myDate.toArray();
	var year = ary[0];
	var month = ary[1] + 1;
	var day = ary[2];
	document.write('< script language=VBScript\> \n');
	document.write('myDate = Datue('
		'+month+' - '+day+' - '+year+'
		') \n');
	document.write('result = DatePart('
		ww ', myDate) \n');
	document.write(' \n');
	return result;
}

/**
 * 前日期加时间
 */
var CurentTime = function() {
	var now = new Date();

	var year = now.getFullYear(); //年
	var month = now.getMonth() + 1; //月
	var day = now.getDate(); //日

	var hh = now.getHours(); //时
	var mm = now.getMinutes(); //分

	var clock = year + "-";

	if(month < 10)
		clock += "0";

	clock += month + "-";

	if(day < 10)
		clock += "0";

	clock += day + " ";

	if(hh < 10)
		clock += "0";

	clock += hh + ":";
	if(mm < 10)
		clock += '0';
	clock += mm;
	return(clock);
}