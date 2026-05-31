// 弹窗（证书检测页使用）
var Modal = function () {
    function generalModal(obj) {
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
        var iconClassLength = $("#generalModal").find(".icon-class").attr("class").replace(/\s*/g, "").length;
        if (iconClassLength == 17) {
            $("#generalModal").find(".modal-icon").hide();
        } else {
            $("#generalModal").find(".modal-icon").show();
        }

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
    }

    return {
        generalModal: generalModal
    };
}();

$(function () {
    $("[data-toggle='popover']").popover();
});
