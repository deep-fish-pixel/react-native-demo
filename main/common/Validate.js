import React, {
    Animated,
    StyleSheet,
    View,
    Text,
    Dimensions,
    AlertIOS,
    Alert,
} from 'react-native';
import ajax from './ajax';
import alertTip from './alertTip';
var window = Dimensions.get('window');
var styles = require('./../style/lib/commonStyle');
class Validate {
    constructor() {
        this.init(...arguments);
    }

    /**
     * 工厂方法
     * @param {Obect} validates 验证配置
     */
    static create(options={}) {
        return new this(options);
    }

    static messages = {
        empty: "不能为空",
        number: "只能输入0-9数字",
        alpha: "只能输入字母",
        alphanumber: "只能输入字母和数字",
        integer: "只能输入整数",
        decimal: "只能输入数字",
        email: "邮箱格式不正确",
        url: "不是有效链接",
        length: "请输入长度为&{0}的字符串",
        maxlength: "最多只能输入&{0}位",
        minlength: "至少输入&{0}位",
        mobile: "请输入正确的手机号码",
        check: "请选中我",
        mobileCheckCode: "请输入6位数字的手机校验码",
        checkCode: "请输入验证码",
        realName: "姓名格式为汉字或“•”",
        idCard: "身份证号码不正确",
        userName: "请输入正确的身份证号"
    };
    static types = {
        empty: {reg: /^[\S\s]+$/},
        minlength: {},
        maxlength: {},
        length: {},
        check: {},
        number: {
            reg: /^[0-9]+$/
        },
        alpha: {
            reg: /^[a-z]+$/i
        },
        alphanumber: {
            reg: /^[a-z0-9]+$/i
        },
        integer: {
            reg: /^\-?[0-9]+$/
        },
        decimal: {
            reg: /^\-?[0-9]*\.?[0-9]+$/
        },
        email: {
            reg: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        },
        mobile: {
            reg: /^1[3-8]\d{9}$/,
            maxlength: 11
        },
        checkCode: {
            reg: /^[a-z0-9]{4}$/i,
            maxlength: 4
        },
        mobileCheckCode: {
            reg: /^[a-z0-9]{6}$/i,
            maxlength: 6
        },
        realName: {
            reg: /^[\u4E00-\u9FA5•]+$/,
            minlength: 2,
            maxlength: 32
        },
        bankcard: {
            reg: /^[0-9\s?]{10,20}$/,
            maxlength: 19
        },
        cvv2: {
            reg: /^[0-9]{3}$/i,
            minlength: 3,
        },
        idCard: {
            reg: /^(\d{18}|\d{15}|\d{17}[xX])$/,
            maxlength: 18
        },
        userName: {
            reg: /(^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$)|(^1[0-9]{10}$)/
        }
    };
    static valideChange = "change";
    static valideBlur = "blur";
    static cache = {};

    /**
     * 构造器
     */
    init(options) {
        this.options = options;
        this.cache = {};
        options.validates = options.validates || {};
        this.initValidates();
        this.animateValue = new Animated.Value(0);
    }

    /**
     * 初始化验证信息
     */
    initValidates() {
        var options = this.options, validates = options.validates;
        this.setValidates(validates);
    }

    /**
     * 添加验证
     * @param validates {Object} 验证祥光配置信息
     */
    add(validates) {
        this.setValidates(validates);
    }

    /**
     * 设置验证
     * @param validates {Object} 验证祥光配置信息
     */
    setValidates(validates) {
        var self = this, options = this.options, cache = this.cache,
            allTypes = this.constructor.types,
            messages = this.constructor.messages, firstName = true;
        for (var i in validates) {
            (function (i) {
                var validate = validates[i], newObj = validate,
                    types, msgs, regs, tempRegs = [], regMsgs = validate.regMsgs || [];
                newObj.types = newObj.types || "";
                types = newObj.types = newObj.types && newObj.types.split(" ");
                msgs = newObj.msgs = newObj.msgs || [];
                regs = newObj.regs = newObj.regs || [];
                var element = newObj.element = options.component.refs[i];
                //if (element.size() == 0)return;

                var maxlength = -1;
                for (var j = 0, h = types.length; j < h; j++) {//遍历types
                    var type = types[j], curType = allTypes[type], val = {};

                    if (curType.reg) {
                        tempRegs.push(curType.reg);
                        if (curType.maxlength !== undefined) maxlength = curType.maxlength;
                    }
                    else if (type == "minlength") {
                        tempRegs.push(new RegExp("^[\\s\\S]{" + (validate.minlength || 0) + "}"));
                        val = {0: validate.minlength};
                    }
                    else if (type == "maxlength") {
                        tempRegs.push(new RegExp("^[\\s\\S]{0," + (validate.maxlength || 1) + "}$"));
                        val = {0: validate.maxlength};
                        maxlength = validate.maxlength;
                    }
                    else if (type == "length") {
                        tempRegs.push(new RegExp("^[\\s\\S]{" + (validate.length || 1) + "}$"));
                        val = {0: validate.length};
                        maxlength = validate.length;
                    }
                    else if (type == "check") {
                        tempRegs.push("check");
                        val = {0: validate.check};
                    }
                    if (j >= msgs.length)msgs.push(self.replaceMessage(messages[type], val));
                }
                for (var k = 0, w = regs.length; k < w; k++) {//遍历tregs
                    var reg = regs[k], regMsg = regMsgs[k];
                    tempRegs.push(reg);
                    if (k < tempRegs.length)msgs.push(regMsg);
                }
                newObj.getValue = function () {
                    return newObj.element.props.value;
                };
                newObj.regs = tempRegs;
                newObj.method = newObj.method || self.constructor.valideChange;
                newObj.type = newObj.type || "error";
                newObj.inputName = i;
                newObj.callback = newObj.callback || function () {
                    };
                newObj.proxyCallback = function () {
                    var ret = newObj.callback.apply(newObj, arguments);
                    return ret;
                };
                newObj.topOffset = newObj.topOffset || 0;
                newObj.rightOffset = newObj.rightOffset || 0;
                newObj.bottomOffset = newObj.bottomOffset || 0;
                newObj.leftOffset = newObj.leftOffset || 0;
                newObj.blurEmptyValide = newObj.blurEmptyValide || false;
                if (newObj.remote)newObj.remote.checkEvent = newObj.remote.checkEvent || "submit";
                if (self.cache[i]) {
                    newObj = Exp.extend(self.cache[i], newObj);
                }
                else {
                    self.cache[i] = newObj;
                }

                if (firstName) {
                    self.focusOpt = newObj;
                    firstName = false;
                }
                if (newObj.method === 'blur') {
                    /*element.blur(function () {
                        setTimeout(function () {
                            if (self.valideBox) {
                                return;
                            }
                            self.handleValide(newObj, 'blur');
                        }, 150);
                    });*/
                }
            })(i);
        }
    }

    /**
     * 设置focus的操作
     * @param {Obect} opt 相关配置信息
     * @deprecate 用于首页登陆只有一个验证位置信息
     */
    setFocusOpt(opt) {
        var eventName = opt.eventName;
        if (eventName == "focus" || eventName == "keyup")this.focusOpt = opt;
    }

    /**
     * 验证元素获取焦点
     * @param {Obect} opt input验证内部详细信息
     */
    setFocus(opt) {
        //if (opt == this.focusOpt) opt.element.focus();
    }

    /**
     * 进行验证匹配处理
     * @param {Obect} opt input验证内部详细信息
     * @param {String} eventName 时间名称
     * @param {Boolean} opts.hide 是否隐藏
     * @param {Boolean} opts.notRemote 是否远程校验
     */
    handleValide(opt, eventName, opts) {
        var el = opt.element, val = opt.getValue(),
            msgs = opt.msgs,
            regs = opt.regs,
            opts = opts || {};

        /*if (el.attr("disabled") || (eventName == 'blur' && val == '')) {
            this.removeValide(opt);
            return false;
        }*/
        opt.callbackFlag = "beforeValide";


        for (var i = 0, l = regs.length; i < l; i++) {
            var reg = regs[i];
            if (reg && reg.test && !reg.test(val)) {
                var hide = opt.proxyCallback(true, eventName, val);
                if (hide)opts.hide = hide;
                this.showValide(opt, msgs[i], opts);
                opt.proxyCallback(true, eventName, val, msgs[i]);
                return true;
            }
            if (reg && typeof reg == "function" && !reg(val)) {
                var hide = opt.proxyCallback(true, eventName, val);
                if (hide)opts.hide = hide;
                this.showValide(opt, msgs[i], opts);
                opt.proxyCallback(true, eventName, val, msgs[i]);
                return true;
            }
            else if (reg == "check") {
                /*if (!el.is(":checked")) {
                    var hide = opt.proxyCallback(true, eventName, val);
                    if (hide)opts.hide = hide;
                    this.showValide(opt, msgs[i], opts);
                    opt.proxyCallback(true, eventName, val, msgs[i]);
                    return true;
                }
                else {
                    this.removeValide(opt);
                    opt.proxyCallback(false, eventName, val);
                    return false;
                }*/
            }
        }
        if (i == l) {
            var ret, remote = opt.remote, self = this, temp;
            if (opt.condition) {
                ret = opt.condition(val, opt, opts);
                if (opt.type == "error" && ret) {
                    var hide = opt.proxyCallback(true, eventName, val);
                    if (hide)opts.hide = hide;
                    this.showValide(opt, ret === true || ret == "true" ? "" : ret, opts);
                    opt.proxyCallback(true, eventName, val, ret === true || ret == "true" ? "" : ret);
                    temp = true;
                }
                else if (opt.type == "success") {
                    if (ret) {
                        var hide = opt.proxyCallback(true, eventName, val);
                        if (hide)opts.hide = hide;
                        this.showValide(opt, ret === true || ret == "true" ? "" : ret, opts);
                        opt.proxyCallback(true, eventName, val, ret === true || ret == "true" ? "" : ret);
                        temp = false;
                    }
                    else {
                        this.removeValide(opt);
                        opt.proxyCallback(false, eventName, val);
                    }
                    temp = false;
                }
                if (temp)return temp;
                else if (!remote) {
                    this.removeValide(opt);
                    opt.proxyCallback(false, eventName, val);
                    return temp;
                }
            }
            if (remote && remote.checkEvent.indexOf(eventName) != -1 && !opts.notRemote) {
                remote.data = remote.data || {};
                Exp.extend(remote.data, {timestamp: new Date() - 1});
                if (remote.getData)Exp.extend(remote.data, remote.getData());
                var ajaxOpt = {
                    url: remote.url,
                    type: remote.type || "GET",
                    dataType: remote.dataType || "json",
                    data: remote.data,
                    async: false,
                    error: function () {
                    },
                    success: function (data) {
                        ret = remote.condition ? remote.condition.call(opt, data, opts) : data;
                        ;
                        msg = ret === true ? "" : ret;
                        if (opt.type == "error") {
                            if (ret) {
                                var hide = opt.proxyCallback(ret, eventName, val, msg, data);
                                if (hide)opts.hide = hide;
                                self.showValide(opt, ret === true ? "" : ret, opts);
                                opt.proxyCallback(ret, eventName, val, ret, msg, data);
                                return true;
                            }
                            else {
                                self.removeValide(opt);
                                opt.proxyCallback(false, eventName, val, msg, data);
                            }
                            return false;
                        }
                        else if (opt.type == "success") {
                            if (ret === false || ret == "false") {
                                var hide = opt.proxyCallback(false, eventName, val, msg, data);
                                if (hide)opts.hide = hide;
                                self.showValide(opt, "", opts);
                                opt.proxyCallback(false, eventName, val, msg, data);
                                return false;
                            }
                            else {
                                self.removeValide(opt);
                                opt.proxyCallback(false, eventName, val, msg, data);
                            }
                            return true;
                        }
                        else {
                            self.removeValide(opt);
                            opt.proxyCallback(false, eventName, val, msg, data);
                        }
                    }
                }
                if (remote.jsonp)ajaxOpt.jsonp = remote.jsonp;
                ajax(ajaxOpt);
                return ret;
            }
            this.removeValide(opt);
            opt.proxyCallback(false, eventName, val);
        }
        else {
            this.removeValide(opt);
            opt.proxyCallback(false, eventName, val);
            return false;
        }
    }

    /**
     * 对元素进行验证
     * @param {String} name 元素名称
     * @param {String} eventName 时间名称
     * @param {Obect} opts 相关配置
     */
    valide(name, eventName, opts) {
        var obj, opts = opts || {};
        if (name) {
            var names = name.split(" "), obj = {}, l = names.length;
            while (l--) {
                var opt = this.cache[names[l]];
                if (!opt) continue;
                obj[names[l]] = opt;
            }
        }
        else obj = this.cache;
        var result = false, firstFlag = true;
        for (var i in obj) {
            var opt = obj[i], ret = this.handleValide(opt, eventName, {
                hide: (opts && opts.hide)
                || (opt && opt.remote && opt.remote.dataType == "jsonp")
                    ? true : false,
                notRemote: opts.notRemote
            });
            opt.eventName = eventName;
            if (ret) {
                //opt.element.focus();
                result = true;
                break;
            }
        }
        return result;
    }

    /**
     * 隐藏验证字段信息
     * @param {String} name 字段名称
     */
    hideValide(name) {
        var obj;
        if (name) {
            var names = name.split(" "), obj = {}, l = names.length;
            while (l--)obj[names[l]] = this.cache[names[l]];
        }
        else obj = this.cache;
        for (var i in obj) {
            this.removeValide(obj[i]);
        }
    }

    /**
     * 手动显示验证信息息
     * @param {String} name 名称
     * @param {String} msg 错误信息
     */
    showByMsg(name, msg) {
        var obj;
        if (name) {
            var names = name.split(" "), obj = {}, l = names.length, ms = msg.split(" "), msgs = {};
            while (l--) {
                obj[names[l]] = this.cache[names[l]];
                msgs[names[l]] = ms[l];
            }
        }
        else obj = this.cache;
        for (var i in obj) {
            this.showValide(obj[i], msgs[i], false);
        }
    }

    /**
     * 刷新验证显示信息，对已经显示的验证信息重新定位
     * @param {String} name (可选) 指定名称
     */
    refresh(name) {
        var obj;
        if (name)obj = {name: this.cache[name]};
        else obj = this.cache;
        for (var i in obj) {
            this.refreshValide(obj[i]);
        }
    }

    /**
     * 解析模板内容息
     * @param {String} msg 是否隐藏
     * @param {Object} val 值
     */
    replaceMessage(msg, val) {
        var render = template.compile(msg);
        return render(val);
    }

    /**
     * 刷新某个验证显示信息，对已经显示的验证信息重新定位
     * @param {Obect} opt input验证内部详细信息
     * @param {Boolean} hide 是否隐藏
     */
    refreshValide(opt, hide) {

    }

    /**
     * 移除验证显示信息
     * @param {Obect} opt input验证内部详细信息
     */
    removeValide(opt) {

    }

    /**
     * 显示验证信息，对已经显示的验证信息重新
     * @param {Obect} opt input验证内部详细信息
     * @param {String} msg 是否隐藏
     * @param {Boolean} opts.hide 是否隐藏
     * @param {Boolean} opts.notRemote 是否远程校验
     */
    showValide(opt, msg, opts) {
        if (opts.hide || this.valideBox) {
            return;
        }
        alertTip.notify(msg);
    }

}
module.exports = Validate;