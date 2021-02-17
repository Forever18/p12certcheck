// 汉字 英文 字符统一
function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}

// 验证 只能输入字母
function verifyLetter(val) {
    var letterReg = /[^a-zA-Z]/g;
    return letterReg.test(val);
}

// 验证 特殊字符
function verifySpecialCharacters(val) {
    var specialCharactersReg = /[^u4e00-u9fa5w]/g;
    return specialCharactersReg.test(val);
}

// 验证 只支持中文、英文、数字
function verifyCharacters(val) {
    var charactersReg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
    return charactersReg.test(val);
}

// 验证 只支持字母和数字
function verifyLetterDigital(val) {
    var letterDigitalReg = /[^\w\.\/]/ig;
    return letterDigitalReg.test(val);
}

// 验证url
function verifyUrl(val) {
    var urlReg = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
    return urlReg.test(val);
}

// 验证 Bundle ID
function verifyBundle(val) {
    var bundleReg = /^[a-zA-Z][a-zA-z_0-9]{0,15}(\.[a-zA-z][a-zA-z_0-9]{0,15})/;
    return bundleReg.test(val);
}

// 增加replaceAll()
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};

// 修复js toFixed() bug
Number.prototype.toFixed = function (s) {
    changenum = (parseInt(this * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
    index = changenum.indexOf(".");
    if (index < 0 && s > 0) {
        changenum = changenum + ".";
        for (i = 0; i < s; i++) {
            changenum = changenum + "0";
        }
    } else {
        index = changenum.length - index;
        for (i = 0; i < (s - index) + 1; i++) {
            changenum = changenum + "0";
        }
    }
    return changenum;
}

// 选项卡
var tab = {
    basis: function (obj) {
        $(obj.el).click(function () {
            var i = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");

            $(obj.elTab).eq(i).show().siblings().hide();
            obj.callBack = obj.callBack || function () {};
            obj.callBack();
        });
    },
    radioRound: function (obj) {
        $(obj.el).click(function () {
            $(obj.el).removeClass("active").find(".icon").removeClass(obj.checkedClass);
            $(this).addClass("active").find(".icon").addClass(obj.checkedClass);
        });
    },
    radioTick: function (obj) {
        $(obj.el).click(function () {
            var i = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");

            if (i == 0) {
                $(obj.elHide).show();
            } else {
                $(obj.elHide).hide();
            }
        });
    }
};
/*
tab.radioTick({
    el: ".radio-tick li"
});
*/
/*
tab.radioRound({
    el: ".radio-round li",
    checkedClass: "icon-radio-checked"
});
*/

// 实时获取input的输入值并赋值给另一元素
var realTime = {
    inputText: function (obj) {
        $(obj.el).bind("input propertychange", function () {
            var thisVal = $(this).val();
            // console.log(thisVal);
            $(obj.elEdit).text(thisVal);
        });
    }
};

// 图片索引 地址赋值
var imgSrc = {
    edit: function (obj) {
        var src = $(obj.el).attr("src");
        src = src.substr(0, src.lastIndexOf("/") + 1);
        $(obj.el).attr("src", src + obj.index + "." + obj.format+"?2018");
    }
};

// 弹窗
var Modal = function() { // Modal为匿名函数执行完的返回值
    function determineModal(obj) {
        $("#determineModal").remove();
        var determineModalHtml = '<div class="modal fade ms-modal" id="determineModal" tabindex="-1" role="dialog">\n' +
            '    <div class="modal-dialog modal-sm" role="document">\n' +
            '        <div class="modal-content">\n' +
            '            <div class="modal-body">\n' +
            '                <div class="text-center">\n' +
            '                    <div class="modal-icon"><span class="icon icon-class mb5"></span></div>\n' +
            '                    <div class="color-333 bold font16 title"></div>\n' +
            '                    <div class="color-333 mt5 modal-p"></div>\n' +
            '                    <div class="mt15">\n' +
            '                        <button type="button" class="ms-btn ms-btn-primary modal-btn" data-dismiss="modal"></button>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';

        $("body").append(determineModalHtml);
        $("#determineModal").find(".icon-class").addClass(obj.iconClass);
        $("#determineModal").find(".title").text(obj.title);
        $("#determineModal").find(".modal-p").html(obj.p).css("text-align", obj.align);
        $("#determineModal").find(".modal-btn").text(obj.btnText);
        $("#determineModal").modal('show');
    };
    function templateModal(obj) {
        $("#templateModal").remove();
        var templateModalHtml = '<div class="modal fade ms-modal" id="templateModal" tabindex="-1" role="dialog">\n' +
            '    <div class="modal-dialog modal-sm" role="document">\n' +
            '        <div class="modal-content">\n' +
            '            <div class="modal-body">\n' +
            '                <div class="template-modal">\n' +
            '                    <div class="m-top">\n' +
            '                        <div class="title1"></div>\n' +
            '                        <div class="title2"></div>\n' +
            '                    </div>\n' +
            '                    <div class="modal-p"></div>\n' +
            '                    <button type="button" class="ms-btn ms-btn-primary modal-btn" data-dismiss="modal"></button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n';

        $("body").append(templateModalHtml);
        $("#templateModal").find(".m-top").css("background-image", "url(/static/default/img/" + obj.imgName +")");
        $("#templateModal").find(".title1").text(obj.title1);
        $("#templateModal").find(".title2").html(obj.title2);
        $("#templateModal").find(".modal-p").html(obj.p).css("text-align", obj.align);
        $("#templateModal").find(".modal-btn").text(obj.btnText).addClass(obj.btnClass);
        $("#templateModal").modal('show');
        $("#templateModal").find(".modal-btn").click(obj.callBack);
        if ($("#templateModal").find(".title2").text().length == 0) {
            $("#templateModal").find(".m-top").css({"padding-top": "40px"});
        }
    };
    function generalModal(obj) { // 通用弹窗
        $("#generalModal").remove();
        $(".modal-backdrop").remove();
        var generalModalHtml = '<div class="modal fade ms-modal" id="generalModal" tabindex="-1" role="dialog">\
            <div class="modal-dialog modal-sm" role="document">\
                    <div class="modal-content">\
                        <div class="modal-body">\
                            <div class="text-center">\
                                <div class="modal-icon"><span class="icon icon-class mb5"></span></div>\
                                <div class="color-333 bold font16 title"></div>\
                                <div class="color-333 modal-p"></div>\
                                <div class="">\
                                    <a href="javascript:;" class="ms-btn cancel-btn"></a>\
                                    <button type="button" class="ms-btn ms-btn-primary success-btn"></button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>';

        $("body").append(generalModalHtml).css("padding-right", 0);
        $("#generalModal").find(".icon-class").addClass(obj.iconClass);
        $("#generalModal").find(".title").text(obj.title);
        $("#generalModal").find(".modal-p").html(obj.p).css("text-align", obj.align);
        $("#generalModal").find(".success-btn").text(obj.successBtnText);
        $("#generalModal").find(".cancel-btn").text(obj.cancelBtnText);
        if (obj.backdrop) {
            $("#generalModal").modal({backdrop: 'static', keyboard: false});
        } else {
            $("#generalModal").modal("show");
        }
        $("#generalModal").find(".success-btn").click(obj.successCallback);
        $("#generalModal").find(".cancel-btn").click(obj.cancelCallback);
        var iconClassLength = $("#generalModal").find(".icon-class").attr("class").replace(/\s*/g,"").length;
        // console.log(iconClassLength);
        if (iconClassLength == 17) {
            $("#generalModal").find(".modal-icon").hide();
        } else {
            $("#generalModal").find(".modal-icon").show();
        }

        // 点击按钮是否关闭弹窗
        $("#generalModal").find(".success-btn").click(function () {
            if (obj.successBtnModal) {
                $("#generalModal").modal("hide");
            }
        });
        $("#generalModal").find(".cancel-btn").click(function () {
            if (obj.cancelBtnModal) {
                $("#generalModal").modal("hide");
            }
        });
    };
    function autoHideModal(obj) { // 自动关闭弹窗
        $(".modal-backdrop").remove();
        $("#autoHideModal").remove();
        var modalHtml = '<div class="modal fade ms-modal auto-hide-modal" id="autoHideModal" tabindex="-1" role="dialog">\
                <div class="modal-dialog modal-sm" role="document">\
                    <div class="modal-content">\
                        <div class="modal-body">\
                            <div class="text-center">\
                                <div class="auto-hide">\
                                    <span class="icon"></span>\
                                    <div class="mt5 text">obj.text</div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>';
        $("body").append(modalHtml);
        $("#autoHideModal .auto-hide .icon").addClass(obj.iconClass);
        $("#autoHideModal .auto-hide .text").html(obj.text);
        var autoHide = null;
        clearTimeout(autoHide);
        $("#autoHideModal").modal('show');
        $(".modal-backdrop").hide();
        autoHide = setTimeout(function(){
            $("#autoHideModal").modal("hide");
        }, obj.time);
        $('#autoHideModal').on('hidden.bs.modal', obj.callBack);
    };
    function deleteAppModal(obj) { // 通用弹窗
        $("#deleteAppModal").remove();
        $(".modal-backdrop").remove();
        var html = '<div class="modal fade ms-modal" id="deleteAppModal" tabindex="-1" role="dialog">\
            <div class="modal-dialog" role="document">\
                <div class="modal-content">\
                    <div class="modal-body">\
                            <div class="text-center">\
                                <div class="modal-icon"><span class="icon icon-class mb5"></span></div>\
                                    <div class="color-333 bold font16 title"></div>\
                                    <div class="color-333 modal-p"></div>\
                                    <div class="form-horizontal">\
                                        <div class="form-group">\
                                            <label class="col-sm-3 control-label">登录密码</label>\
                                            <div class="col-sm-8"><input type="password" name="pwd" class="form-control" autocomplete="new-password"></div>\
                                        </div>\
                                        <div class="form-group">\
                                            <label class="col-sm-3 control-label"></label>\
                                            <div class="col-sm-8"><span class="error fl font12 color-danger">密码错误</span></div>\
                                        </div>\
                                    </div>\
                                    <div>\
                                        <a href="javascript:;" class="ms-btn cancel-btn"></a>\
                                        <button type="button" class="ms-btn ms-btn-primary success-btn"></button>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
            </div>';

        $("body").append(html).css("padding-right", 0);
        $("#deleteAppModal").find(".icon-class").addClass(obj.iconClass);
        $("#deleteAppModal").find(".title").text(obj.title);
        $("#deleteAppModal").find(".modal-p").html(obj.p).css("text-align", obj.align);
        $("#deleteAppModal").find(".success-btn").text(obj.successBtnText);
        $("#deleteAppModal").find(".cancel-btn").text(obj.cancelBtnText);
        if (obj.backdrop) {
            $("#deleteAppModal").modal({backdrop: 'static', keyboard: false});
        } else {
            $("#deleteAppModal").modal("show");
        }
        $("#deleteAppModal").find(".success-btn").click(obj.successCallback);
        $("#deleteAppModal").find(".cancel-btn").click(obj.cancelCallback);
        var iconClassLength = $("#deleteAppModal").find(".icon-class").attr("class").replace(/\s*/g,"").length;
        // console.log(iconClassLength);
        if (iconClassLength == 17) {
            $("#deleteAppModal").find(".modal-icon").hide();
        } else {
            $("#deleteAppModal").find(".modal-icon").show();
        }

        // 点击按钮是否关闭弹窗
        $("#deleteAppModal").find(".success-btn").click(function () {
            if (obj.successBtnModal) {
                $("#deleteAppModal").modal("hide");
            }
        });
        $("#deleteAppModal").find(".cancel-btn").click(function () {
            if (obj.cancelBtnModal) {
                $("#deleteAppModal").modal("hide");
            }
        });
    };

    return {
        determineModal: determineModal, // 带确定按钮 弹窗
        templateModal: templateModal,
        generalModal: generalModal,
        autoHideModal: autoHideModal,
        deleteAppModal: deleteAppModal,

        init: function () { // 调用全部
            this.determineModal();
            this.templateModal();
            this.generalModal();
            this.autoHideModal();
            this.deleteAppModal();
        }
    }
}();

/*
Modal.generalModal({
    backdrop: true, // 点击阴影是否关闭弹窗， // true 开启； false 关闭
    iconClass: "",  // success: icon-modal-success1,  error: icon-modal-error2
    title: '',  // 弹窗标题
    p: '', // 弹窗内容
    align: 'center', // 弹窗内容排列顺序 left center right
    cancelBtnText: "取消",    // 取消按钮文字
    successBtnText: '确定',  // 确定按钮文字
    successBtnModal: false, // 点击确定按钮是否关闭弹窗 true 关闭 false 不关闭
    cancelBtnModal: true, // 点击取消按钮是否关闭弹窗 true 关闭 false 不关闭
    successCallback: function () {
    },
    cancelCallback: function () {
    }
});
*/
/*
Modal.determineModal({
    iconClass: "icon-modal-success1",  // success: icon-modal-success1,  error: icon-modal-error2
    title: '提示',
    p: '该链接为测试连接，只能下载<span class="color-danger">5</span>次。<br>建议您：<br>1、电脑登录第八区网站，<br>2、点击导航栏【发布】，<br>3、将APP上传至网站，即可获得正式下载地址。',
    align: 'left',
    btnText: '已知晓'
});
*/
/*
Modal.templateModal({
    imgName: "modal-bg-3.jpg",
    title1: '提示',
    title2: '',
    p: '建议您：<br>尽快<span class="color-danger">电脑</span>登录第八区网站，即可享受<br><span class="iconfont icon-xingxing" style="color: #fec323; font-size: 12px; margin-right: 5px;"></span>免费试用封装打包APP<br><span class="iconfont icon-xingxing" style="color: #fec323; font-size: 12px; margin-right: 5px;"></span>每天免费赠送<span class="color-danger">1000</span>次分发下载次数',
    align: 'left', // 居左 left, 居中 center, 居右 right
    btnText: '知道了',
    btnClass: "modal-btn2",
    callBack: function(){
        // location.href = "http://www.baidu.com";
    }
});
*/
/*
Modal.autoHideModal({
    iconClass: "icon-modal-success3", // success: icon-modal-success3 error: icon-modal-error3
    text: "我是谁",
    time: 3000,
    callBack: function () {
        alert(123);
    }
});
*/


var Layout = function () {
    function html5Reader(file, img) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            img.attr("src", this.result);
        };
    };

    // 上传图片 1传1
    function initUploadImg(obj) {
        $(document).on("change", obj.el, function () {
            var file = this.files[0];
            // var name = this.files[0].name; // ie9 报错 无法获取未定义或 null 引用的属性“0”
            var name = $(this).val();
            // console.log(name);
            // 判断文件类型
            var type = (name.substr(name.lastIndexOf("."))).toLowerCase();
            // console.log(type);
            var typeModal = '<div class="modal fade" id="typeModal" tabindex="-1" role="dialog">\
                         <div class="modal-dialog modal-sm" role="document">\
                            <div class="modal-content">\
                                <div class="modal-body">\
                                   <div class="text-center">\
                                        <div><span class="icon icon-modal-error2"></span></div>\
                                        <p class="color-333 mt5">您上传的图片格式不正确，请重新上传！</p>\
                                        <div class="mt15">\
                                           <button type="button" class="ms-btn ms-btn-default w90" data-dismiss="modal">确定</button>\
                                        </div>\
                                    </div>\
                               </div>\
                            </div>\
                        </div>\
                    </div>';

            if (type != ".jpg" && type != ".gif" && type != ".jpeg" && type != ".png") {
                $("#typeModal").remove();
                $("body").append(typeModal);
                $("#typeModal").modal("show");
                return false;
            }

            console.log(file.size/(1024*1024));
            if (file.size/(1024*1024) > 1) {
                Modal.generalModal({
                    backdrop: false, // 点击阴影是否关闭弹窗， // true 开启； false 关闭
                    p: '图片过大，请上传1M以内的图片', // 弹窗内容
                    align: 'center', // 弹窗内容排列顺序 left center right
                    successBtnText: '确定',  // 确定按钮文字
                    successBtnModal: true, // 点击确定按钮是否关闭弹窗 true 关闭 false 不关闭
                });
                $(this).val("");
                return false;
            }

            var eImg = $('<img />');
            $(this).next('img').remove();
            $(this).after(eImg);

            var isIE9 = navigator.userAgent.match(/MSIE 9.0/) != null;

            if (isIE9) {
                $(this).select();
                var reallocalpath = document.selection.createRange().text;

                // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
                eImg[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";

                // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
                eImg[0].src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
            } else {
                html5Reader(this.files[0], eImg); // 兼容ie10以上（含ie10）
            }

            $(this).parent().addClass('uploaded');
            obj.success();
        });
    };

    function initUploadPic() {
        $(document).on("change", ".thumbnail", function () {
            var file = this.files[0];
            // alert(123);
            // var name = this.files[0].name; // ie9 报错 无法获取未定义或 null 引用的属性“0”
            var name = $(this).val();
            console.log(name);
            // 判断文件类型
            var type = (name.substr(name.lastIndexOf("."))).toLowerCase();
            // console.log(type);
            var typeModal = '<div class="modal fade" id="typeModal" tabindex="-1" role="dialog">\
                         <div class="modal-dialog modal-sm" role="document">\
                            <div class="modal-content">\
                                <div class="modal-body">\
                                   <div class="text-center">\
                                        <div><span class="icon icon-modal-error2"></span></div>\
                                        <p class="color-333 mt5">您上传的图片格式不正确，请重新上传！</p>\
                                        <div class="mt15">\
                                           <button type="button" class="ms-btn ms-btn-default w90" data-dismiss="modal">确定</button>\
                                        </div>\
                                    </div>\
                               </div>\
                            </div>\
                        </div>\
                    </div>';

            if (type != ".jpg" && type != ".gif" && type != ".jpeg" && type != ".png") {
                $("#typeModal").remove();
                $("body").append(typeModal);
                $("#typeModal").modal("show");
                return false;
            }

            console.log(file.size/(1024*1024));
            if (file.size/(1024*1024) > 1) {
                Modal.generalModal({
                    backdrop: false, // 点击阴影是否关闭弹窗， // true 开启； false 关闭
                    p: '图片过大，请上传1M以内的图片', // 弹窗内容
                    align: 'center', // 弹窗内容排列顺序 left center right
                    successBtnText: '确定',  // 确定按钮文字
                    successBtnModal: true, // 点击确定按钮是否关闭弹窗 true 关闭 false 不关闭
                });
                $(this).val("");
                return false;
            }

            var eImg = $('<img />');
            $(this).next('img').remove();
            $(this).after(eImg);

            var isIE9 = navigator.userAgent.match(/MSIE 9.0/) != null;

            if (isIE9) {
                $(this).select();
                var reallocalpath = document.selection.createRange().text;

                // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
                eImg[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";

                // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
                eImg[0].src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
            } else {
                html5Reader(this.files[0], eImg); // 兼容ie10以上（含ie10）
            }

            $(this).parents('.upload-img').addClass('uploaded');
            $(this).parents('.uploaded-img').addClass('uploaded');
            $(this).parents('.upload-icon').addClass('uploaded');
            $(this).parents('.upload-icon-common').addClass('uploaded');
        });
    };

    // 上传图片 1传多
    function initUploadPics(obj) {
        // 检测已上传截图个数
        function checkImgLength (uploadWrap) {
            var imgLength = $(uploadWrap).find(".uploaded-img").length;
            // console.log("img: " + imgLength);
            if (imgLength >= obj.imgLength) {
                $(uploadWrap).find(".upload-img").hide();
            } else {
                $(uploadWrap).find(".upload-img").show();
            }
        };
        checkImgLength(".upload-img-more");

        // 上传应用截图
        $('.upload-img .upload').click(function () {
            $(this).val("");
        });
        $('.upload-img .upload').change(function() {
            var name = this.value; // this.files[0].name; ie报错
            // 判断文件类型
            var type = (name.substr(name.lastIndexOf("."))).toLowerCase();
            var typeModal = '<div class="modal fade" id="typeModal" tabindex="-1" role="dialog">\
                         <div class="modal-dialog modal-sm" role="document">\
                            <div class="modal-content">\
                                <div class="modal-body">\
                                   <div class="text-center">\
                                        <div><span class="icon icon-modal-error2"></span></div>\
                                        <p class="color-333 mt5">您上传的图片格式不正确，请重新上传！</p>\
                                        <div class="mt15">\
                                           <button type="button" class="ms-btn ms-btn-default w90" data-dismiss="modal">确定</button>\
                                        </div>\
                                    </div>\
                               </div>\
                            </div>\
                        </div>\
                    </div>';
            var $imgHtml = $('<div class="uploaded-img fl"><input type="file" class="thumbnail"><img /><div class="reset">更换图片</div><span class="icon icon-delete2 delete-img"></span></div>');

            if (type != ".jpg" && type !=".gif" && type != ".jpeg" && type != ".png") {
                $("#typeModal").remove();
                $("body").append(typeModal);
                $("#typeModal").modal("show");
                return false;
            }
            $(this).parents(".upload-img").before($imgHtml);

            var $uploadImg = $imgHtml.find("img");
            var isIE9 = navigator.userAgent.match(/MSIE 9.0/) != null;

            if (isIE9) {
                $(this).select();
                var reallocalpath = document.selection.createRange().text;

                // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
                $uploadImg[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";

                // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
                $uploadImg[0].src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
            } else {
                var reader = new FileReader();
                reader.readAsDataURL(this.files[0]); // $("#id").files[0]
                reader.onload = function (e) {
                    $uploadImg.attr("src", this.result);
                };
            }
            checkImgLength(".upload-img-more");
        });

        // 删除应用截图
        $(".upload-img-more").on("click", ".delete-img", function (e) {
            var $file = $(this).find(".upload");
            $(this).parents(".uploaded-img").remove();
            $file.val("");
            checkImgLength(".upload-img-more");
            e.stopPropagation();
        });
    };

    // 通知中心
    function initMsgCenter() {
        // 全选
        $(".user-center1 .message-list .list .all").click(function () {
            var $allIcon = $(this).find(".iconfont");
            var $allIcons = $(".message-list dd .list .checkbox-li .iconfont");
            var checked = $allIcon.hasClass("icon-checkbox-checked1");
            if (checked) {
                $allIcon.removeClass("icon-checkbox-checked1");
                $allIcons.removeClass("icon-checkbox-checked1");
            } else {
                $allIcon.addClass("icon-checkbox-checked1");
                $allIcons.addClass("icon-checkbox-checked1");
            }
        });

        // 单选
        $(".user-center1 .message-list dd .list .checkbox-li .iconfont").click(function () {
            var checked = $(this).hasClass("icon-checkbox-checked1");
            var ddLength = $(".message-list dl dd").length;
            var checkedLength = $(".message-list dd .checkbox-li .icon-checkbox-checked1").length + 1;
            var $allIcon = $(".message-list .list .all .iconfont");
            console.log("dd:" + ddLength);
            console.log("icon:" + checkedLength);
            if (checked) {
                $(this).removeClass("icon-checkbox-checked1");
                $allIcon.removeClass("icon-checkbox-checked1");
            } else {
                $(this).addClass("icon-checkbox-checked1");
                if (ddLength == checkedLength) {
                    $allIcon.addClass("icon-checkbox-checked1");
                } else {
                    $allIcon.removeClass("icon-checkbox-checked1");
                }
            }
        });

        // 选中已读
        $(".user-center1 .message-list dt .all-read").click(function () {
            var $allChecked = $(".user-center1 .message-list .icon-checkbox1");
            var $checked = $(".user-center1 .message-list dd .checkbox-li .icon-checkbox-checked1");
            var ids = [];
            $checked.each(function () {
                id = $(this).data('id');
                ids.push(id);
            });
            if (ids) {
                var str = ids.join(",");
                var json = {id: str};
                $.post('/notice/read', json, function (data) {
                    if (data.code == 200) {
                        $checked.parents("dd").addClass("read").find(".msg-icon").find(".iconfont").attr("class", "iconfont icon-read");
                        $allChecked.removeClass("icon-checkbox-checked1");
                    }
                }, 'JSON')
            }
        });

        // 选中删除
        $(".user-center1 .message-list dt .selected-delete").click(function () {
            var $allChecked = $(".user-center1 .message-list .icon-checkbox1");
            var $checked = $(".user-center1 .message-list dd .checkbox-li .icon-checkbox-checked1");
            var ids = [];
            $checked.each(function () {
                id = $(this).data('id');
                ids.push(id);
            });
            if (ids) {
                var str = ids.join(",");
                var json = {id: str};
                $.post('/notice/delete', json, function (data) {
                    if (data.code == 200) {
                        $checked.parents("dd").remove();
                        $allChecked.removeClass("icon-checkbox-checked1");
                        window.location.reload();
                    }
                }, 'JSON')
            }
        });
    };

    /*
        function initMsgCenter() {
            // 全选
            $(".user-center1 .message-list .list .all").click(function () {
                var $allIcon = $(this).find(".iconfont");
                var $allIcons = $(".message-list dd .list .checkbox-li .iconfont");
                var checked = $allIcon.hasClass("icon-checkbox-checked1");
                if (checked) {
                    $allIcon.removeClass("icon-checkbox-checked1");
                    $allIcons.removeClass("icon-checkbox-checked1");
                } else {
                    $allIcon.addClass("icon-checkbox-checked1");
                    $allIcons.addClass("icon-checkbox-checked1");
                }
            });

            // 单选
            $(".user-center1 .message-list dd .list .checkbox-li .iconfont").click(function () {
                var checked = $(this).hasClass("icon-checkbox-checked1");
                var ddLength = $(".message-list dl dd").length;
                var checkedLength = $(".message-list dd .checkbox-li .icon-checkbox-checked1").length + 1;
                var $allIcon = $(".message-list .list .all .iconfont");
                console.log("dd:" + ddLength);
                console.log("icon:" + checkedLength);
                if (checked) {
                    $(this).removeClass("icon-checkbox-checked1");
                    $allIcon.removeClass("icon-checkbox-checked1");
                } else {
                    $(this).addClass("icon-checkbox-checked1");
                    if (ddLength == checkedLength) {
                        $allIcon.addClass("icon-checkbox-checked1");
                    } else {
                        $allIcon.removeClass("icon-checkbox-checked1");
                    }
                }
            });

            // 选中已读
            $(".user-center1 .message-list dt .all-read").click(function () {
                var $allChecked = $(".user-center1 .message-list .icon-checkbox1");
                var $checked = $(".user-center1 .message-list dd .checkbox-li .icon-checkbox-checked1");
                $checked.parents("dd").addClass("read").find(".msg-icon").find(".iconfont").attr("class", "iconfont icon-read");
                $allChecked.removeClass("icon-checkbox-checked1");
            });

            // 选中删除
            $(".user-center1 .message-list dt .selected-delete").click(function () {
                var $allChecked = $(".user-center1 .message-list .icon-checkbox1");
                var $checked = $(".user-center1 .message-list dd .checkbox-li .icon-checkbox-checked1");
                $checked.parents("dd").remove();
                $allChecked.removeClass("icon-checkbox-checked1");
            });
        }
    */

    // 文档中心
    function initDoc() {
        $(".doc-details .details-left dt").click(function () {
            var $allDt = $(".doc-details .details-left dt");
            var $allDd = $(".doc-details .details-left dd");
            $allDt.removeClass("active");
            $allDd.stop().slideUp();
            $(this).addClass("active").next("dd").stop().slideDown();
            $("html, body").animate({"scrollTop": 0}, 600);
        });
    }

    // 工具箱
    function initToolkit() {
        // 工具箱 提取ipa包 验证输入链接是否正确
        $(".toolkit-common .ipa-top .form-control").bind("input propertychange", function () {
            var val = $(this).val();
            var valLenght = val.length;
            if (valLenght > 0 && !verifyUrl(val)) {
                $(this).parents(".form-group").addClass("form-error");
            } else {
                $(this).parents(".form-group").removeClass("form-error");
            }
        });

        // 验证 app name
        $("input[name=app]").bind("input propertychange", function () {
            var val = $(this).val();
            var valLength = val.length;
            if (valLength > 0) {
                $(this).parents(".form-group").removeClass("form-error");
            } else {
                $(this).parents(".form-group").addClass("form-error");
            }
        });

        // 验证 Bundle ID
        $("input[name=bundle]").bind("input propertychange", function () {
            var val = $(this).val();
            var valLength = val.length;
            if (!verifyBundle(val)) {
                $(this).parents(".form-group").addClass("form-error");
            } else {
                $(this).parents(".form-group").removeClass("form-error");
            }
        });

        // 验证 IPA下载地址
        $("input[name=downloadLink]").bind("input propertychange", function () {
            var val = $(this).val();
            var valLength = val.length;
            if (!verifyUrl(val)) {
                $(this).parents(".form-group").addClass("form-error");
            } else {
                $(this).parents(".form-group").removeClass("form-error");
            }
        });

        // 验证 ICON链接地址
        $("input[name=link]").bind("input propertychange", function () {
            var val = $(this).val();
            var valLength = val.length;
            if (!verifyUrl(val)) {
                $(this).parents(".form-group").addClass("form-error");
            } else {
                $(this).parents(".form-group").removeClass("form-error");
            }
        });

        $(".toolkit-new .plist-submit").click(function () {
            var appName = $("input[name=app]").val();
            var bundle = $("input[name=bundle]").val();
            var ipaLink = $("input[name=downloadLink]").val();
            var iconLink = $("input[name=link]").val();

            if (appName.length > 0) {
                $("input[name=app]").parents(".form-group").removeClass("form-error");
            } else {
                $("input[name=app]").parents(".form-group").addClass("form-error");
            }

            if (verifyBundle(bundle)) {
                $("input[name=bundle]").parents(".form-group").removeClass("form-error");
            } else {
                $("input[name=bundle]").parents(".form-group").addClass("form-error");
            }

            if (verifyUrl(ipaLink)) {
                $("input[name=downloadLink]").parents(".form-group").removeClass("form-error");
            } else {
                $("input[name=downloadLink]").parents(".form-group").addClass("form-error");
            }

            if (verifyUrl(iconLink)) {
                $("input[name=link]").parents(".form-group").removeClass("form-error");
            } else {
                $("input[name=link]").parents(".form-group").addClass("form-error");
            }

            var errorLength = $(".toolkit-new .form-error").length;
            if (errorLength == 0) {
                $("form").submit();
            }
        });

        // 验证 别名
        $("input[name=alias]").bind("input propertychange", function () {
            var val = $(this).val();
            var valLength = val.length;
            // console.log(verifyLetter(val));
            if (verifyLetter(val) || valLength == 0) {
                $(this).parents(".form-group").addClass("form-error");
            } else {
                $(this).parents(".form-group").removeClass("form-error");
            }
        });

        // 验证 密码
        $("input[name=pwd]").bind("input propertychange", function () {
            var val = $(this).val();
            var valLength = val.length;
            // console.log(verifyLetterDigital(val));
            // console.log(verifySpecialCharacters(val));
            if (verifySpecialCharacters(val) || verifyLetterDigital(val) || valLength == 0 || valLength < 6) {
                $(this).parents(".form-group").addClass("form-error");
            } else {
                $(this).parents(".form-group").removeClass("form-error");
            }
        });

        // 验证 组织名称
        $("input[name=organization]").bind("input propertychange", function () {
            var val = $(this).val();
            var valLength = val.length;
            console.log(verifyCharacters(val));
            if (verifyCharacters(val) || valLength == 0 ) {
                $(this).parents(".form-group").addClass("form-error");
            } else {
                $(this).parents(".form-group").removeClass("form-error");
            }
        });

        $(".toolkit-new .android-submit").click(function () {
            var $alias = $("input[name=alias]");
            var $pwd = $("input[name=pwd]");
            var $organization = $("input[name=organization]");

            if ($alias.val().length > 0) {
                $alias.parents(".form-group").removeClass("form-error");
            } else {
                $alias.parents(".form-group").addClass("form-error");
            }
            if ($pwd.val().length > 0) {
                $pwd.parents(".form-group").removeClass("form-error");
            } else {
                $pwd.parents(".form-group").addClass("form-error");
            }
            if ($organization.val().length > 0) {
                $organization.parents(".form-group").removeClass("form-error");
            } else {
                $organization.parents(".form-group").addClass("form-error");
            }

            var errorLength = $(".toolkit-new .form-error").length;
            if (errorLength == 0) {
                $("form").submit();
            }
        });

        // 制作图标
        $(".make-icon .tab-con img").lazyload({
            container: ".toolkit-make-icon .foreground-map .tab1 .icons-ul",
            skip_invisible: false
        });

        var palette = [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(153, 153, 153)","rgb(183, 183, 183)",
                "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(239, 239, 239)", "rgb(243, 243, 243)", "rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                "rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
                "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",
                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
        ];

        // 制作图标 背景颜色
        $("#colorPicker6").spectrum({
            color: "#157df1",//初始化颜色
            showInput: true,//显示输入
            showAlpha: true, // 透明度
            containerClassName: "full-spectrum",
            showInitial: true,//显示初始颜色,提供现在选择的颜色和初始颜色对比
            showPalette: true,//显示选择器面板
            showSelectionPalette: true,//记住选择过的颜色
            maxPaletteSize: 7,//记住选择过的颜色的最大数量
            preferredFormat: "hex",//输入框颜色格式,(hex十六进制,hex3十六进制可以的话只显示3位,hsl,rgb三原色,name英文名显示)
            hideAfterPaletteSelect: true,// 点击左侧选择颜色，面板关闭
            chooseText: "确定",
            cancelText: "取消",
            move: function (color) {//选择器右边面板移动时触发
            },
            show: function () {//选择器面板显示时触发
            },
            beforeShow: function () {//选择器面板显示之前触发,返回false时不显示
            },
            hide: function (color) {//选择器面板隐藏时触发
                updateIconBgBackground (color);
            },
            //选择器面板颜色设置
            palette: palette
        });
        function updateIconBgBackground (color) {
            $(".toolkit-make-icon .m-icon").css("background-color", color);
            $(".toolkit-make-icon .small-bg").css("background-color", color);
            return color;
        }

        // 制作图标 图标内文字
        $("#colorPicker8").spectrum({
            color: "#fff",//初始化颜色
            showInput: true,//显示输入
            showAlpha: true, // 透明度
            containerClassName: "full-spectrum",
            showInitial: true,//显示初始颜色,提供现在选择的颜色和初始颜色对比
            showPalette: true,//显示选择器面板
            showSelectionPalette: true,//记住选择过的颜色
            maxPaletteSize: 7,//记住选择过的颜色的最大数量
            preferredFormat: "hex",//输入框颜色格式,(hex十六进制,hex3十六进制可以的话只显示3位,hsl,rgb三原色,name英文名显示)
            hideAfterPaletteSelect: true,// 点击左侧选择颜色，面板关闭
            chooseText: "确定",
            cancelText: "取消",
            move: function (color) {//选择器右边面板移动时触发
            },
            show: function () {//选择器面板显示时触发
            },
            beforeShow: function () {//选择器面板显示之前触发,返回false时不显示
            },
            hide: function (color) {//选择器面板隐藏时触发
                updateIconName1 (color);
            },
            //选择器面板颜色设置
            palette: palette
        });
        function updateIconName1 (color) {
            $(".toolkit-make-icon .i-name1, .toolkit-make-icon .i-name2").css("color", color);
            return color;
        }

        // 制作图标 文字颜色
        $("#colorPicker7").spectrum({
            color: "#fff",//初始化颜色
            showInput: true,//显示输入
            showAlpha: true, // 透明度
            containerClassName: "full-spectrum",
            showInitial: true,//显示初始颜色,提供现在选择的颜色和初始颜色对比
            showPalette: true,//显示选择器面板
            showSelectionPalette: true,//记住选择过的颜色
            maxPaletteSize: 7,//记住选择过的颜色的最大数量
            preferredFormat: "hex",//输入框颜色格式,(hex十六进制,hex3十六进制可以的话只显示3位,hsl,rgb三原色,name英文名显示)
            hideAfterPaletteSelect: true,// 点击左侧选择颜色，面板关闭
            chooseText: "确定",
            cancelText: "取消",
            move: function (color) {//选择器右边面板移动时触发
            },
            show: function () {//选择器面板显示时触发
            },
            beforeShow: function () {//选择器面板显示之前触发,返回false时不显示
            },
            hide: function (color) {//选择器面板隐藏时触发
                updateIconName (color);
            },
            //选择器面板颜色设置
            palette: palette
        });
        function updateIconName (color) {
            $(".toolkit-make-icon .m-icon .m-name").css("color", color);
            return color;
        }

        // 制作图标 切换
        tab.radioTick({
            el: ".toolkit-make-icon .small-bg-list li"
        });

        $(".toolkit-make-icon .small-bg-list li").click(function () {
            var i = $(this).index();
            var url = $(".toolkit-make-icon .m-icon").css("background-image");
            url = url.substr(0, url.indexOf("png") -2);
            $(".toolkit-make-icon .m-icon").css("background-image", url + i + ".png");
            // console.log(url);
        });

        // 制作图标 选项卡
        tab.basis({
            el: ".toolkit-make-icon .foreground-map .tab li",
            elTab: ".toolkit-make-icon .foreground-map .tab-con>div"
        });

        // 制作图标 选择图标 图标预览切换
        $(".toolkit-make-icon .foreground-map .tab1 .icons-ul li").click(function () {
            // 清空文字输入框
            $(".toolkit-make-icon .foreground-map .tab2 .edit-text input[name=editText]").val("");
            // 清空app name
            $(".toolkit-make-icon .m-icon .m-name").text("");
            calcText();

            var i = $(this).index();
            imgSrc.edit({
                el: ".toolkit-make-icon .m-icon img",
                index: i,
                format: "png?2018"
            });
            $(this).attr({"data-icon": i, "class": "active"}).siblings().attr({"data-icon": "", "class": ""});
            // console.log(src);
            // console.log($img.attr("src"));
        });

        // 前景图位置 上中下
        tab.radioRound({
            el: ".prospects li",
            checkedClass: "icon-radio-checked"
        });
        $(".prospects li").click(function () {
            var dataP = $(this).attr("data-p");
            if (dataP == 0) {
                $(".toolkit-make-icon .written-content, .toolkit-make-icon .text-color").hide();
            } else {
                $(".toolkit-make-icon .written-content, .toolkit-make-icon .text-color").show();
            }
            if (dataP == 1) {
                $(".toolkit-make-icon .make-icon .i-name1").show();
            } else {
                $(".toolkit-make-icon .make-icon .i-name1").hide();
            }
            if (dataP == 2) {
                $(".toolkit-make-icon .make-icon .i-name2").show();
            } else {
                $(".toolkit-make-icon .make-icon .i-name2").hide();
            }
        });

        // 居上 居下 实时文字
        realTime.inputText({
            el: ".toolkit-make-icon .written-content input[type=text]",
            elEdit: ".toolkit-make-icon .make-icon .i-name1, .toolkit-make-icon .make-icon .i-name2"
        });

        // 居上 居下 实时文字 验证字数
        $(".toolkit-make-icon .written-content input[type=text]").bind("input propertychange", function () {
            var valLength = getByteLen($(this).val());
            if (valLength > 10) {
                $(this).parents(".form-group").addClass("form-error");
            } else {
                $(this).parents(".form-group").removeClass("form-error");
            }
        });

        // 形状选择 格式选择
        $(".toolkit-make-icon .m-icon-radio li").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
        });

        // 形状选择 切换圆角、方角
        $(".toolkit-make-icon .shape-choose li").click(function () {
            var i = $(this).index();
            if (i == 1) {
                $(".toolkit-make-icon .make-icon .m-icon").addClass("radius");
            } else {
                $(".toolkit-make-icon .make-icon .m-icon").removeClass("radius");
            }
        });

        // 图片尺寸 选择
        // 全选
        $(".toolkit-make-icon .img-size dt").click(function () {
            var checked = $(this).find(".icon-checkbox1").hasClass("icon-checkbox-checked1");
            var $dtIcon = $(this).find(".icon-checkbox1");
            var $ddIcon = $(this).parents(".img-size").find("dd").find(".icon-checkbox1");
            if (checked) {
                $dtIcon.removeClass("icon-checkbox-checked1");
                $ddIcon.removeClass("icon-checkbox-checked1");
            } else {
                $dtIcon.addClass("icon-checkbox-checked1");
                $ddIcon.addClass("icon-checkbox-checked1");
            }
        });
        // 复选
        $(".toolkit-make-icon .img-size dd").click(function () {
            var checked = $(this).find(".icon-checkbox1").hasClass("icon-checkbox-checked1");
            var $ddIcon = $(this).find(".icon-checkbox1");
            var $dtIcon = $(this).parents(".img-size").find("dt").find(".icon-checkbox1");
            var ddLength = $(".toolkit-make-icon .img-size dd").length;
            if (checked) {
                $dtIcon.removeClass("icon-checkbox-checked1");
                $ddIcon.removeClass("icon-checkbox-checked1");
            } else {
                // $dtIcon.addClass("icon-checkbox-checked1");
                $ddIcon.addClass("icon-checkbox-checked1");
            }
            var ddCheckedLength = $(".toolkit-make-icon .img-size dd .icon-checkbox-checked1").length;

            console.log(ddCheckedLength);
            console.log("dd"+ddLength);

            if (ddLength == ddCheckedLength) {
                $dtIcon.addClass("icon-checkbox-checked1");
            }

        });

        function getByteLen(val) {
            var len = 0;
            for (var i = 0; i < val.length; i++) {
                var a = val.charAt(i);
                if (a.match(/[^\x00-\xff]/ig) != null) {
                    len += 2;
                } else {
                    len += 1;
                }
            }
            return len;
        }

        // 制作图标 使用文字制作图标 个数计算
        function calcText () {
            var $input = $(".toolkit-make-icon input[name=editText]");
            var inputVal = $input.val();
            var inputValLength = getByteLen(inputVal);
            var that = $(".toolkit-make-icon .m-icon .m-name");
            var $img = $(".toolkit-make-icon .m-icon img");
            var $li = $(".toolkit-make-icon .foreground-map .tab1 ul li");
            // console.log(inputValLength);
            if (inputValLength > 0 && inputValLength <= 24) {
                that.text(inputVal);
                $input.parents(".form-group").removeClass("form-error");
                $img.hide();
                $li.attr({"class": "", "data-icon": ""});
                switch (inputVal.length) {
                    case 1:
                        that.css("font-size", "120px");
                        break;
                    case 2:
                        that.css("font-size", "60px");
                        break;
                    case 3:
                        that.css("font-size", "40px");
                        break;
                    case 4:
                        that.css("font-size", "30px");
                        break;
                    default:
                        that.css("font-size", "24px");
                }
            } else if (inputVal.length == 0) {
                that.text("");
                $input.parents(".form-group").removeClass("form-error");
                $img.show();
                $li.eq(0).attr({"class": "active", "data-icon": 0});
                imgSrc.edit({
                    el: ".toolkit-make-icon .m-icon img",
                    index: 0,
                    format: "png?2018"
                });
            } else {
                that.text("");
                $input.parents(".form-group").addClass("form-error");
                $img.hide();
                $li.attr({"class": "", "data-icon": ""});
            }
        }

        // 制作图标 实时文字
        $(".toolkit-make-icon .foreground-map .tab2 .edit-text input[name=editText]").on("input propertychange", function () {
            calcText();
        });
    }

    // 个人中心
    function initUserCenter() {
        // 上传资质
        $(".upload-qualification .review-btn").click(function () {
            var $add = $(this).parents(".upload-qualification").find(".upload-img-more");
            var imgLength = $(".upload-qualification .uploaded-img").length;
            if (imgLength > 0) {
                if ($add.hasClass("hide-action")) {
                    $add.removeClass("hide-action");
                } else {
                    $add.addClass("hide-action");
                }
            } else {
                $add.removeClass("hide-action");
            }
        });
    }

    // 封装插件
    function initEncapsulation() {
        // 基本信息 设备类型 苹果出提示
        $("#device li").click(function () {
            var device = $(this).data("device");
            if (device == 1) {
                $(this).parents("#device").addClass("form-error");
            } else {
                $(this).parents("#device").removeClass("form-error");
            }
        });
    }

    // 发布应用
    function initReleaseApp() {
        var $expired = $(".release-app2 .aside-right .app-table .app-expired");
        var expiredVisible = $expired.is(":visible");
        if (expiredVisible) {
            $expired.parents("tr").find("td").addClass("disabled");
        } else {
            $expired.parents("tr").find("td").removeClass("disabled");
        }

    }

    // 添加备注功能
    function initAddNote(obj) {
        $(".add-notes").click(function () {
            var val =  $(this).siblings("input[name=remark]").val();
            $(this).hide().siblings("input[name=remark]").show().val("").focus().val(val);
        });
        $("input[name=remark]").blur(obj.callBack);

        $("input[name=remark]").keydown(function(e){
            var pwdVal = $("input[name=pwd]").val();
            var e = e || window.event;
            if(e.keyCode == 13 || e.which == 13){
                $(this).trigger("blur");
            }
        });
    }

    return {
        initUploadPic: initUploadPic, // 上传图片 1传1
        initUploadImg: initUploadImg, // 上传图片 1传1
        initUploadPics: initUploadPics, // 上传图片 1传多
        initMsgCenter: initMsgCenter, // 通知中心
        initDoc: initDoc, //文档中心
        initToolkit: initToolkit, // 工具箱
        initUserCenter: initUserCenter, // 个人中心
        initEncapsulation: initEncapsulation, //封装
        initReleaseApp: initReleaseApp, // 发布应用
        initAddNote: initAddNote, // 添加备注功能

        init: function () {
            this.initUploadImg();
            this.initUploadPic();
            this.initMsgCenter();
            this.initUploadPics();
            this.initDoc();
            this.initToolkit();
            this.initUserCenter();
            this.initEncapsulation();
            this.initReleaseApp();
        }
    }
}();

var Upload = function () {
    function img(option) {
        var options = $.extend({max_size:1024*1024 ,prefix:'image'}, option);
        $(options.el).change(function () {
            var This = $(this);
            var $uploading = '<div class="ongoing">正在上传中...</div>'
            var file = this.files[0];
            // 判断上传文件类型
            // var name = this.files[0].name; // ie9 报错 无法获取未定义或 null 引用的属性“0”
            var name = $(this).val();
            // console.log(name);
            var type = (name.substr(name.lastIndexOf(".") + 1)).toLowerCase();
            // console.log(type);
            var typeModal = '<div class="modal fade" id="typeModal" tabindex="-1" role="dialog">\
                         <div class="modal-dialog modal-sm" role="document">\
                            <div class="modal-content">\
                                <div class="modal-body">\
                                   <div class="text-center">\
                                        <div><span class="icon icon-modal-error2"></span></div>\
                                        <p class="color-333 mt5">您上传的图片格式不正确，请重新上传！</p>\
                                        <div class="mt15">\
                                           <button type="button" class="ms-btn ms-btn-default w90" data-dismiss="modal">确定</button>\
                                        </div>\
                                    </div>\
                               </div>\
                            </div>\
                        </div>\
                    </div>';

            if (type != "jpg" && type != "gif" && type != "jpeg" && type != "png") {
                $("#typeModal").remove();
                $("body").append(typeModal);
                $("#typeModal").modal("show");
                return false;
            }
            // console.log(file.size/(1024*1024));

            if (file.size > options.max_size) {
                Modal.generalModal({
                    backdrop: false, // 点击阴影是否关闭弹窗， // true 开启； false 关闭
                    p: '图片过大，请上传1M以内的图片', // 弹窗内容
                    align: 'center', // 弹窗内容排列顺序 left center right
                    successBtnText: '确定',  // 确定按钮文字
                    successBtnModal: true, // 点击确定按钮是否关闭弹窗 true 关闭 false 不关闭
                });
                $(this).val("");
                return false;
            }

            var $img = $('<img>');
            $(this).next("img").remove();
            $(this).after($img);
            var file = this.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var content = this.result;
                $img.attr("src", content);
                This.parent().addClass("uploading").append($uploading);

                $.ajax({
                    type: 'POST',
                    url: '/source/index/ajax_profile.php?ac=imageBase64',
                    data: {
                        content: content,
                        prefix: options.prefix
                    },
                    dataType: "json",
                    success: function (res) {
                        if (res.code != 200) {
                            alert(res.msg);
                            return false;
                        }
                        $img.attr("src", '//' + res.data.domain + '/' + res.data.key);
                        // console.log('a ' + This.val());
                        This.val("").attr("data-key", res.data.key);
                        // console.log('b ' + This.val());
                        This.parent().addClass("uploaded").removeClass("uploading");
                        This.parent().find(".ongoing").remove();
                        // console.log(res);
                    }
                })
            };
        });
    };

    function isProcess() {
        return $("body .ongoing").length;
    }

    return {
        img: img,
        isProcess: isProcess
    }
}();



$(function () {
    var windowWidth = $(window).width();
    function setRem() {
        var windowWidth = $(window).width();
        if (windowWidth <= 750) {
            var fs = windowWidth / 750 * 6.25 * 100;
            $('html').css('font-size', fs + '%');   // 1rem = 100px;
        }
    };
    setRem();
    $(window).resize(setRem);

    $("[data-toggle='tooltip']").tooltip();

    $("[data-toggle='popover']").popover();

    // 返回顶部
    $(window).scroll(function () {
        var windowHeight = $(window).height();
        var scrollTop = $(document).scrollTop();
        if (scrollTop > windowHeight) {
            $(".fixed-right .go-top").css("display", "flex");
        } else {
            $(".fixed-right .go-top").hide();
        }
    });

    $(".fixed-right .go-top").click(function () {
        $("html, body").stop().animate({'scrollTop': 0}, 500);
    });

    // 手机导航
    $(".header .phone-menu").click(function () {
        $(".header .phone-shadow").stop().animate({"left": 0}, 500);
        $(".header .phone-nav-wrap").stop().animate({"left": 0}, 500);
    });

    $(".header .ms-nav .phone-user-center").click(function () {
        var $visibleDl = $(this).find("dl");
        if ($visibleDl.is(":visible")) {
            $visibleDl.stop().slideUp();
            $(this).find(".icon-arrow-down").css({"transform": "rotate(0)"});
        } else {
            $visibleDl.stop().slideDown();
            $(this).find(".icon-arrow-down").css({"transform": "rotate(-180deg)"});
        }
    });

    $(".header .phone-shadow").click(function () {
        $(this).stop().animate({"left": "-200%"}, 500);
        $(".header .phone-nav-wrap").stop().animate({"left": "-200%"}, 500);
    });

    try {
        // 日期插件
        $('#datetimepicker1,#datetimepicker2,#datetimepicker3,#datetimepicker4').datetimepicker({
            lang: 'ch',
            timepicker: false,
            format: 'Y/m/d',
        });
    } catch (e) {
        
    }

    var isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    if (isSafari) {
        $(".copy").css("top", 0);
    }

    // 价格支付选中
    $(".price-pay .common ul").on("click", "li:not('.disabled')", function () {
        $(this).addClass("active").siblings().removeClass("active");
        var i = $(this).index();
        if (i == 3) {
            $(this).parents(".common").find(".contrary-transfer").show();
        } else {
            $(this).parents(".common").find(".contrary-transfer").hide();
        }
    });

    // 我的应用 悬停显示二维码
    $(".release-app .icon-small-code").hover(function () {
        $(this).find(".qr-code").show();
    }, function () {
        $(this).find(".qr-code").hide();
    });

    // 我的应用 选择应用合并
    $('#myModal .app-list').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 我的应用 编辑设置 选项卡
    $(".release-app .app-editor .tab li").click(function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".release-app .app-editor .tab-con>div").eq(index).show().siblings().hide();
    });

    /*
    *改版完成后，将上方的删除
    *我的应用 编辑设置 选项卡
    **/
    $(".release-app2 .app-set .tab li").click(function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".release-app2 .app-set .tab-con>div").eq(index).show().siblings().hide();
    });

    // 我的应用 编辑设置 基本设置 单选
    $(".release-app .app-editor .trust li").click(function () {
        $(".release-app .app-editor .trust li").removeClass("active").find(".icon-radio").removeClass("icon-radio-checked");
        $(this).addClass("active").find(".icon-radio").addClass("icon-radio-checked");
    });

    /*
    *改版完成后，将上方的删除
    *我的应用 编辑设置 基本设置 单选
    * */
    $(".release-app2 .app-set .trust li").click(function () {
        $(".release-app2 .app-set .trust li").removeClass("active").find(".icon-radio").removeClass("icon-radio-checked");
        $(this).addClass("active").find(".icon-radio").addClass("icon-radio-checked");
    });

    // 下载安装方式
    $(".release-app2 .app-set .senior .download-way li").click(function () {
        var i = $(this).index();
        if (i == 1) {
            $(this).parents(".form-group").next(".form-group").show();
        } else {
            $(this).parents(".form-group").next(".form-group").hide();
        }

        $(".release-app2 .app-set .download-way li").removeClass("active").find(".icon-radio").removeClass("icon-radio-checked");
        $(this).addClass("active").find(".icon-radio").addClass("icon-radio-checked");
    });

    // 推广页 封装 选项卡
    $(".feature-plugin .f-list li").hover(function () {
        var i = $(this).index();
        $(".feature-plugin .f-list li").find(".icon-arrow-top2").hide();
        $(this).find(".icon-arrow-top2").show();
        $(".feature-tab").find("img").eq(i).css("display", "block").siblings().hide();
    }, function () {
    });

    // 推广页 封装 选项卡
    $('.good-case .g-con .tab-list li').hover(function () {
        var i = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".good-case .tab-con ul").eq(i).show().siblings().hide();
    }, function () {
    });

    // 个人中心 2版 选项卡
    $(".user-center1 .account-management>ul li").click(function () {
        var i = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".user-center1 .account-management .tab>div").eq(i).show().siblings().hide();
    });

    // 个人中心 2版 消息接收
    $(".user-center1 .msg ol li").click(function () {
        $(this).parents("ol").find("li").removeClass("active").find(".icon").removeClass("icon-radio-checked");
        $(this).addClass("active").find(".icon").addClass("icon-radio-checked");
    });

    // 个人中心 2版 发票地址 复选框选择
    $(".user-center1 .invoice-management .table .icon-checkbox1").click(function () {
        var that = $(".user-center1 .invoice-management .table .icon-checkbox1");
        that.removeClass("icon-checkbox-checked1");
        $(this).addClass("icon-checkbox-checked1");
    });

    /*
    * 个人中心 2版 发票地址 设为默认
    * 第一个为默认地址
    * */
    $(".user-center1 .invoice-management table tr").eq(1).find(".set-default").text("默认地址");
    $(".user-center1 .invoice-management table .set-default").click(function () {
        $(".user-center1 .invoice-management table .set-default").text("设为默认");
        var that = $(this).parents("table").find("tr").first();
        $(this).text("默认地址").parents("tr").insertAfter(that);
        $(".user-center1 .invoice-management .set-default")
    });

    // 复制弹窗
    function autoCopyHideModal(obj1, time) {
        $('#copyModal').remove();
        var html = '<div class="modal fade ms-modal auto-hide-modal" id="copyModal" tabindex="-1" role="dialog">\
                        <div class="modal-dialog modal-sm" role="document">\
                            <div class="modal-content">\
                                <div class="modal-body">\
                                    <div class="text-center">\
                                        <div class="auto-hide">\
                                            <div>复制成功</div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';

        $("body").append(html);
        var autoHide = null;
        clearTimeout(autoHide);
        $(obj1).modal('show');
        $(".modal-backdrop").hide();
        autoHide = setTimeout(function () {
            $(obj1).modal("hide");
        }, time);
    };

    // // 复制功能
    // var clipboard = new ClipboardJS('.copy');
    // clipboard.on('success', function (e) {
    //     autoCopyHideModal("#copyModal", 2000);
    //     e.clearSelection();
    // });
    // clipboard.on('error', function (e) {
    //     console.log("复制失败!");
    // });

    // 显示隐藏密码
    $(".account-management .pwd .pwd-toggle").click(function () {
        var inputPwd = $(this).siblings("input[name=pwd]");
        var pwdAttr = inputPwd.attr("type");
        if (pwdAttr == "password") {
            inputPwd.attr("type", "text");
            $(this).addClass("icon-eye").removeClass("icon-eye-no");
        } else {
            inputPwd.attr("type", "password");
            $(this).addClass("icon-eye-no").removeClass("icon-eye");
        }
    });

    // 价格页 tab选项卡
    $(".price-tab ul li").click(function () {
        var i = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".price-con>div").eq(i).show().siblings().hide();
    });
	
    $(".new-price-tab ul li").click(function () {
        var i = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".new-price-con>div").eq(i).show().siblings().hide();
    });
    // 大包入口 侧栏高度
    // 大包、小包入口 左侧栏 高度、margin-bottom: 15px
    $(".big-bag-upload").prev(".aside-left").css("margin-bottom", "15px").innerHeight("380px");
    $(".small-bag-upload").prev(".aside-left").css("margin-bottom", "15px").innerHeight("380px");

    // 列表 APP iOS 安卓版本下拉切换
    $(document).click(function () {
        $(".app-system-select").find("ul").hide();
    });

    $(".app-system-select").click(function (e) {
        var $ul = $(this).find("ul");
        var ulVisible = $ul.is(":visible");
        if (ulVisible) {
            $ul.hide();
        } else {
            $ul.show();
        }
        e.stopPropagation();
    });

    $(".app-system-select ul li").click(function () {
        var thisText = $(this).text();
        $(this).addClass("active").siblings().removeClass("active");
        $(this).parents(".app-system-select").find(".text").text(thisText);
    });

    $(".table-list-wrap .app-table .tr-disabled td").addClass("td-disabled").append('<div class="mask"></div>');

    // 封装、签名、分发详情页 未实名认证 悬停popover
    $(".app-details .details-bottom .icon-prompt").hover(function () {
        $(".popover1").show();
    }, function () {
        $(".popover1").hide();
    });
    $(".app-details .details-bottom .icon-prompt1").hover(function () {
        $(this).find(".popover1").show();
    }, function () {
        $(this).find(".popover1").hide();
    });

    // 制作图标ie提示
    //测试mime
    function _mime(option, value) {
        var mimeTypes = navigator.mimeTypes;
        for (var mt in mimeTypes) {
            if (mimeTypes[mt][option] == value) {
                return true;
            }
        }
        return false;
    }

    var UA = navigator.userAgent;
    // IE
    // UA.indexOf("MSIE") != -1; // ie10以上已不再支持
    var isIE = window.ActiveXObject || "ActiveXObject" in window;
    // Firefox
    var isFirefox = UA.indexOf('Firefox') != -1;
    // Chrome
    var isChrome = UA.indexOf("Chrome") != -1;

    //application/vnd.chromium.remoting-viewer 可能为360特有
    var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");

    // 360极速模式
    if (isChrome && is360) {
        // $(".ie-prompt-360").show();
    }
    // 制作图标ie提示
    if (isIE) {
        $(".ie-prompt").show();
    }

    // 配置插件 引导页删除上传图片
    // 删除应用截图
    $(".plugin-guide .upload-img .icon-delete2").on("click", function (e) {
        $(this).siblings("input").val("");
        $(this).siblings("img").remove();
        $(this).parents(".upload-img").removeClass("uploaded");
        $('.upload-screenshots .thumbnail-s').val("");
        e.stopPropagation();
        e.preventDefault();
    });

    /********************************************************************/

    // 去除文本里所有br换行
    function removeBr(obj) {
        $(obj).each(function () {
            var thisTexts = $(this).html();
            if (thisTexts != null) {
                thisTexts = thisTexts.replaceAll('<br>', '');
                $(this).html(thisTexts);
            }
        })
    };

    // 兼容平板
    if (windowWidth <= 768) {
        removeBr(".index-banner .banner-con h2");
        removeBr(".publicity li");
        removeBr(".toolkit li p");
        removeBr(".index-common .con p");
        removeBr(".promote-thumbnail p");
        removeBr(".ms-thumbnail .ms-caption p");
        removeBr(".ms-thumbnail .ms-caption .tit");
    }

    // 兼容手机
    function phoneFun() {
        var windowWidth = $(window).width();
        if (windowWidth <= 750) {
            $(".service_content li").attr("style", "");

            $(".login-in .login-user").click(function (e) {
                var visible = $(this).find("dl").is(":visible");
                if (visible) {
                    $(this).find("dl").hide();
                } else {
                    $(this).find("dl").show();
                }
                e.stopPropagation();
            });

            $("div").not(".login-in .login-user").click(function () {
                $(".login-in .login-user dl").hide();
            });
        }
    };
    phoneFun();
});