(function (window, document) {
    "use strict";

    var _w = window, _d = document;

    var _ = {
        isObject: function (o) {
            return (o && typeof o === 'object' && !this.isArray(o));
        },
        isElement: function (o) {
            try {
                //Using W3 DOM2 (works for FF, Opera and Chrom)
                return o instanceof HTMLElement;
            }
            catch (e) {
                //Browsers not supporting W3 DOM2 don't have HTMLElement and
                //an exception is thrown and we end up here. Testing some
                //properties that all elements have. (works on IE7)
                return ((typeof o === "object") &&
                (o.nodeType === 1) && (typeof o.style === "object") &&
                (typeof o.ownerDocument === "object"));
            }
        },
        getValue: function (el) {
            if (!this.isElement(el)) {
                return;
            }
            var v;
            if (el.nodeName.toLowerCase() === 'input') {
                v = el.value;
            } else if (el.nodeName.toLowerCase() === 'select') {
                v = el.options[el.selectedIndex].value;
            }
            return v;
        },
        isArray: function (o) {
            return Array.isArray(o);
        },
        isNotEmptyArray: function (o) {
            return this.isArray(o) && o.length > 0;
        },
        getInputs: function (parent) {
            var parentElement = this.isElement(parent) ? parent : _d;
            var inputs = Array.prototype.slice.call(parentElement.getElementsByTagName('input'), 0),
                selects = Array.prototype.slice.call(parentElement.getElementsByTagName('select'), 0);
            return [].concat(inputs, selects);
        },
        getElementsByName: function (s, parent) {
            if (_d['getElementsByName'] && this.isElement(parent)) {
                return _d.getElementsByName(s);
            } else {
                var a = [];
                var els = this.getInputs(parent);
                if (this.isNotEmptyArray(els)) {
                    for (var i = 0, l = els.length; i !== l; i++) {
                        var e = els[i];
                        if (e.getAttribute('name') === s) {
                            a.push(e);
                        }
                    }
                }
                return a;
            }
        },
        getSingleElementByName: function (s, parent) {
            var els = this.getElementsByName(s, parent);
            if (els && els.length > 0) {
                return els[0];
            }
        },
        clone: function (destination) {
            return this.mixin({}, destination);
        },
        mixin: function (destination, source) {
            var target = destination || {};
            for (var prop in source) {
                if (!source.hasOwnProperty(prop)) {
                    continue;
                }
                if (this.isObject(source[prop])) {
                    target[prop] = this.mixin(target[prop], source[prop]);
                } else if (this.isArray(source[prop])) {
                    target[prop] = source[prop].concat();
                } else {
                    target[prop] = source[prop];
                }
            }
            return target;
        },
        isString: function (s) {
            return typeof s === 'string' || s instanceof String;
        },
        trim: function (s) {
            if (!this.isString(s)) {
                return '';
            }
            return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        },
        strToJSON: function (s) {
            var options = {};
            if (s) {
                s = _.trim(s);
                if (s.substring(0, 1) !== '{') {
                    s = '{' + s + '}';
                }
                try {
                    options = (new Function('return ' + s))();
                } catch (e) {
                    alert('strToJSON failed! \n ' + s);
                }
            }
            return options;
        },
        stringFormat: function (formatter, a) {
            if (this.isNotEmptyArray(a)) {
                for (var i = 0; i !== a.length; i++) {
                    var re = new RegExp('\\{' + i + '\\}', 'gm');
                    formatter = formatter.replace(re, a[i]);
                }
            }
            return formatter;
        },
        getMatches: function (s, regex, index) {
            var i = (index === undefined) ? 1 : index; // default to the first capturing group
            var matches = [], match;
            while (match = regex.exec(s)) {
                matches.push(match[i]);
            }
            return matches;
        }
    };

    var safePassword = function (value) {
        return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/
            .test(value));
    };

    var isDateTime = function (format, reObj) {
        format = format || 'yyyy-MM-dd';
        var s = function (s1, s2, s3, s4, s5) {
            s4 = s4 || 60;
            s5 = s5 || 2;
            var reVal = s3;
            if (s1 !== undefined && s1 !== '' || !isNaN(s1)) {
                reVal = s1 * 1;
            }
            if (s2 !== undefined && s2 !== '' && !isNaN(s2)) {
                reVal = s2 * 1;
            }
            return (reVal === s1 && s1.length !== s5 || reVal > s4) ? -10000 : reVal;
        };
        var input = this, o = {}, d = new Date();
        var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
        var len = f1.length, len1 = f3.length;
        if (len !== f2.length || len1 !== f4.length) {
            return false;
        }
        for (var i = 0; i < len1; i++) {
            if (f3[i] !== f4[i]) {
                return false;
            }
        }
        for (i = 0; i < len; i++) {
            o[f1[i]] = f2[i];
        }
        o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
        o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
        o.dd = s(o.dd, o.d, d.getDate(), 31);
        o.hh = s(o.hh, o.h, d.getHours(), 24);
        o.mm = s(o.mm, o.m, d.getMinutes());
        o.ss = s(o.ss, o.s, d.getSeconds());
        o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
        if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) {
            return false;
        }
        if (o.yyyy < 100) {
            o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
        }
        d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
        var reVal = (d.getFullYear() === o.yyyy && d.getMonth() + 1 === o.MM) &&
            (d.getDate() === o.dd && d.getHours() === o.hh) &&
            (d.getMinutes() === o.mm && d.getSeconds() === o.ss) &&
            (d.getMilliseconds() === o.ms);
        return reVal && reObj ? d : reVal;
    };

    var getValidatorOptions = function (el) {
        var s = el.getAttribute('data-validator-options');
        if (!s) {
            return;
        }
        return _.strToJSON(s);
    };

    var strToValidatorConfig = function (s) {
        var rex = /([^\[]+)(\[(.+)])?/g.exec(s);
        if (!rex) {
            return undefined;
        } else {
            var params = [];
            var paramStr = rex[3];
            var a = [];//base
            if (paramStr) {
                //make array
                a = paramStr.split(',');
            }
            if (a.length > 0) {
                //conver str and trim
                for (var i = 0, l = a.length; i !== l; i++) {
                    var t = $.trim(a[i]);
                    var r = /"([^"]+)"/g.exec(s);
                    if (r) {
                        t = r[1];
                    }
                    params.push(t);
                }
            }
            //console.log('name: %s, params str: %s', rex[1], paramStr);
            return {
                name: rex[1],
                params: params
            };
        }
    };

    var idCard = function (value) {
        if (value.length === 18 && 18 !== value.length) {
            return false;
        }
        var number = value.toLowerCase();
        var d, sum = 0, v = '10x98765432', w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7,
            9, 10, 5, 8, 4, 2], a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
        var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
        if (re === null || a.indexOf(re[1]) < 0) {
            return false;
        }
        if (re[2].length === 9) {
            number = number.substr(0, 6) + '19' + number.substr(6);
            d = ['19' + re[4], re[5], re[6]].join('-');
        } else {
            d = [re[9], re[10], re[11]].join('-');
        }
        if (!isDateTime.call(d, 'yyyy-MM-dd')) {
            return false;
        }
        for (var i = 0; i < 17; i++) {
            sum += number.charAt(i) * w[i];
        }
        return (re[2].length === 9 || number.charAt(17) === v.charAt(sum % 11));
    };

    function Validator(opts) {
        this.options = _.clone(this.constructor.defaults);
        this.option(opts);
    }

    Validator.defaults = {
        message: {
            required: '该输入项为必输项!',
            zip: '邮政编码不存在!',
            loginName: '登录名称只允许英文字母、数字及下划线!',
            mobile: '手机号码格式不正确!',
            safePwd: '密码由字母和数字组成，至少6位!',
            length: '无效的输入项，请输入{0}-{1}的字符!',
            equalTo: '两次输入的密码不一致!',
            number: '请输入数字!',
            idCard: '请输入正确的身份证号码!',
            email: '无效的邮箱地址!'
        },
        /**
         * 检查器列表
         */
        validType: {
            required: {
                check: function (value) {
                    var s = _.trim(value);
                    return !!(s && s.length > 0);
                }
            },
            zip: {
                check: function (value) {
                    return /^[1-9]\d{5}$/.test(value);
                }
            },
            mobile: {
                check: function (value) {
                    return /^((13[0-9])|(15[^4])|(18[0,2,3,5-9])|(17[0-8])|(147))\d{8}$/.test(value);
                }
            },
            loginName: {
                check: function (value) {
                    return /^[a-zA-Z0-9_]+$/.test(value);
                }
            },
            safePwd: {
                check: function (value, param) {
                    return safePassword(value);
                }
            },
            length: {
                /**
                 *
                 * @param value
                 * @param param 数组, 最小和最大长度
                 * @returns {boolean}
                 */
                check: function (value, param) {
                    if (param && !isNaN(param[0]) && !isNaN(param[1])) {
                        var s = $.trim(value);
                        return s.length >= param[0] && s.length <= param[1];
                    } else {
                        console.log('invalid params for length...');
                        return false;
                    }
                }
            },
            equalTo: {
                /**
                 *
                 * @param value
                 * @param param 另外一个对比元素的name
                 * @returns {boolean}
                 */
                check: function (value, param) {
                    if (!_.isNotEmptyArray(param)) {
                        console.log('param must be array...');
                        return false;
                    }
                    var els = _.getElementsByName(param[0]);
                    var s;
                    if (_.isNotEmptyArray(els)) {
                        var o = els[0];
                        s = _.getValue(o);
                    }
                    return value === s;
                }
            },
            number: {
                check: function (value) {
                    return /^\d+$/.test(value);
                }
            },
            idCard: {
                check: function (value) {
                    return idCard(value);
                }
            },
            email: {
                check: function (value) {
                    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value);
                }
            }

        }
    };

    _.mixin(Validator.prototype, {
        option: function (options) {
            _.mixin(this.options, options);
        },
        getValidType: function () {
            return this.options.validType;
        },
        /**
         *
         * @param form
         * @returns {Array} 返回错误元素的列表，列表内的每个元素是 {target: input元素 , error:{ isValid: boolean, invalidMessage: str }}
         */
        checkForm: function (form) {
            if (_.isElement(form) && form.nodeName.toLowerCase() === 'form') {
                var inputs = _.getInputs(form), errors = [];
                if (_.isNotEmptyArray(inputs)) {
                    for (var i = 0, l = inputs.length; i !== l; i++) {
                        var _input = inputs[i],
                            _name = _input.getAttribute('name'),
                            validatorOptions = getValidatorOptions(_input);
                        var isRequired = !!(validatorOptions && validatorOptions['required'] &&
                        (validatorOptions['required'] === true || _.trim(validatorOptions['required']).toLowerCase() === 'true'));
                        var err = undefined;
                        if (isRequired) {
                            var r = this.check(_name, 'required', form);
                            if (r && !r.isValid) {
                                err = r;
                            }
                        }
                        if (err === undefined && validatorOptions && validatorOptions['validType'] &&
                            _.isNotEmptyArray(validatorOptions['validType'])) {
                            for (var n = 0, m = validatorOptions['validType'].length; n !== m; n++) {
                                var rs = validatorOptions['validType'][n],
                                    validatorConfig = strToValidatorConfig(rs);
                                var _r = this.check(_name,
                                    validatorConfig.name, form, validatorConfig.params);
                                if (_r && !_r.isValid) {
                                    _r.invalidMessage = _.stringFormat(_r.invalidMessage, validatorConfig.params);
                                    err = _r;
                                    break;
                                }
                            }
                        }
                        if (err !== undefined) {
                            errors.push({
                                target: _input,
                                error: err
                            });
                        }
                    }
                }
                return errors;
            } else {
                alert('only support form element.');
            }
        },
        /**
         *
         * @param name 目标元素的name值
         * @param type 检查的类型
         * @param parentElement 目标元素的父级元素，可选，默认document。
         * @param parms 可选，传入检查的参数，视检查器而定。
         * @returns {{isValid: boolean, invalidMessage: string}}
         */
        check: function (name, type, parentElement, parms) {
            var _validator = this.getValidType()[type];
            if (!_validator) {
                alert('invalid type name:  ' + type + '\n input name: ' + name);
                return;
            }
            var val = _.getValue(_.getSingleElementByName(name, parentElement)),
                isValid = _validator.check(val, parms);
            var _self = this;
            return {
                isValid: isValid,
                invalidMessage: !isValid ? _self.options.message[type] : ''
            };
        }
    });

    _w['Validator'] = Validator;

})(window, document);