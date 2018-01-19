/** Jquerytextarea自动根据文本内容调整高度 */
$(function($) {
  $.fn.autoTextarea = function(options) {
    var defaults = {
      // 文本框是否自动撑高，默认：null，不自动撑高；如果自动撑高必须输入数值，该值作为文本框自动撑高的最大高度
      maxHeight : null,
      // 默认最小高度，也就是文本框最初的高度，当内容高度小于这个高度的时候，文本以这个高度显示
      minHeight : $(this).height()
    };
    var opts = $.extend({}, defaults, options);
    return $(this).each(function() {
      $(this).bind("paste cut keydown keyup focus blur", function() {
         var height, style = this.style;
         this.style.height = opts.minHeight + 'px';
         if (this.scrollHeight > opts.minHeight) {
           if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {
             height = opts.maxHeight;
             style.overflowY = 'scroll';
           } else {
             height = this.scrollHeight;
             style.overflowY = 'hidden';
           }
           style.height = height + 'px';
         }
      });
    });
  };
});

// 调用方法
$(".chackTextarea-area").autoTextarea({
    maxHeight:400,
    minHeight:100
})

/**
 * ==================================================================
 * 
 * 鼠标经过函数
 * 
 * @param options
 *            鼠标经过离开时样式
 * @param enterCallback
 *            鼠标经过回调
 * @param leaveCallback
 *            鼠标离开回调
 * 
 * ===================================================================
 */
!function($) {
	$.fn.mouseHover = function(options, enterCallback, leaveCallback) {
		var defaults = {
			className : "hover",
		}
		var options = $.extend(defaults, options);
		this.each(function() {
			var that = $(this);
			that.hover(function() {// 鼠标经过
				that.addClass(options.className);
				if (enterCallback) {
					enterCallback();
				}
			}, function() {// 鼠标离开
				that.removeClass(options.className);
				if (leaveCallback) {
					leaveCallback();
				}
			});
		});
	};
}(window.jQuery);


/**
 * ==================================================================
 * 
 * 失去焦点事件
 * 
 * @param options
 *            鼠标经过离开时样式
 * @param focusCallback
 *            获得焦点事件
 * @param blurCallback
 *            失去焦点事件
 * ==================================================================
 */

!function($) {
	$.fn.focusblur = function(options,focusCallback,blurCallback) {
		var defaults = {
			className : "focus",
		}
		var options = $.extend(defaults, options);
		this.each(function() {
			var that = $(this);
			that.focus(function() {// 获得焦点事件
				that.addClass(options.className).removeClass("inputError");
				if (focusCallback) {
					focusCallback();
				}
			});
			that.blur(function() {// 失去焦点事件
				that.removeClass(options.className);
				if (blurCallback) {
					blurCallback();
				}
			});
		});
	}
}(window.jQuery);


/**
 * ==================================================================
 * 
 * 字数限制
 * 
 * ==================================================================
 */
!function($) {
	$.fn.textarealength = function(options,minlength,maxlength){
		var defaults = {
			minlength:0,
			maxlength:140,
			errorClass:"error",
			exceed:true,			
		}
		var options = $.extend(defaults, options);
		this.each(function(){			
			var that = $(this);
			var v = that.val();
			var l = v.length;
			
			that.on("keyup",function(){
				v = that.val();
				l = v.length;				
				if (l > options.maxlength) {
					if(options.exceed){
						that.addClass(options.errorClass);
					}else{
						v = v.substring(0, options.maxlength);
						that.val(v);
						that.removeClass(options.errorClass);
					}					
				}
				else if(l<options.minlength){
					that.addClass(options.errorClass);
				}else{
					that.removeClass(options.errorClass);
				}
				// that.parent().find(".textarea-length").text(v.length);
			});		
			
		});
	}
} (window.jQuery);