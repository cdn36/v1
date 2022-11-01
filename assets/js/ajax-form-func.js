function ajaxFormFunc(formId, ajaxReqData) {
    //ajaxReqData
    var $form = $('#' + formId),
        sbtn = $form.find('[type="submit"]'),
        udata = new FormData($form[0]);

    if ($('#g-recaptcha-response').length) {
        var mmRecaptcha = $("#g-recaptcha-response").val();
        if (mmRecaptcha === "") {
            alert('Please check the recaptcha');
            return;
        }
    }

    sbtn.attr('disabled', 'disabled').html('<i class="fa fa-spinner fa-spin"></i> ' + ajaxReqData.sendingBtn);
    $.ajax({
        type: "POST", enctype: 'multipart/form-data', url: ajaxReqData.siteUrl + ajaxReqData.url, data: udata, processData: false, contentType: false, cache: false, timeout: 600000,
        success: function (data) {

            /* $('#errorMessage').html('<div class="alert alert-danger" role="alert">'+JSON.stringify(data, null, 2)+'</div>');
            alert("AJAX error in request: " + JSON.stringify(data, null, 2));
            return; */

            if (data.success === true) {
                sbtn.removeAttr().html(ajaxReqData.successBtn);

                if (data.url && data.name) {
                    mesDataShow = '<div onclick="window.location=\'' + ajaxReqData.siteUrl + data.url + '\'" >Welcome <strong><i>' + data.name + '</i></strong> ! <br> <i class="fa fa-spinner fa-spin"></i> Redirecting... <a href="' + ajaxReqData.siteUrl + data.url + '">click here</a> if you\'re not redirected.</div>';
                } else if (ajaxReqData.goUrl && data.name) {
                    mesDataShow = '<div onclick="window.location=\'' + ajaxReqData.siteUrl + ajaxReqData.goUrl + '\'" >Welcome <strong><i>' + data.name + '</i></strong> ! <br> <i class="fa fa-spinner fa-spin"></i> Redirecting... <a href="' + ajaxReqData.siteUrl + ajaxReqData.goUrl + '">click here</a> if you\'re not redirected.</div>';
                } else if (data.name && data.message) {
                    mesDataShow = '<div>Thank You... <strong><i>' + data.name + '</i></strong>, ' + data.message + '</div>';
                } else if (data.type && data.message) {
                    mesDataShow = '<strong> ' + data.type + ' </strong><br> ' + data.message;
                } else if (data.message) {
                    mesDataShow = data.message;
                }
                ls.alertMsg({
                    message: mesDataShow,
                    type: 'success',
                    timeout: 1500
                });
                $('#errorMessage').html('<div class="alert alert-success" role="alert">' + mesDataShow + '</div>');

                if (data.redirect) {
                    setTimeout(function () { window.location.href = ajaxReqData.siteUrl + data.redirect; }, 2000);
                } else if (data.url) {
                    setTimeout(function () { window.location.href = ajaxReqData.siteUrl + data.url; }, 2000);
                } else if (ajaxReqData.goUrl) {
                    setTimeout(function () { window.location.href = ajaxReqData.siteUrl + ajaxReqData.goUrl; }, 2000);
                }

            } else if (data.success === false) {
                $('#errorMessage').html('<div class="alert alert-danger" role="alert">' + data.message + '</div>');
                ls.alertMsg({
                    message: '<strong> ' + data.type + ' </strong><br> ' + data.message,
                    type: 'danger',
                    timeout: 1500
                });
                if (data.redirect) {
                    setTimeout(function () { window.location.href = ajaxReqData.siteUrl + data.redirect; }, 1000);
                } else if (data.url) {
                    setTimeout(function () { window.location.href = ajaxReqData.siteUrl + data.url; }, 1000);
                } else {
                    sbtn.removeAttr('disabled').html('Try Again');
                    if (typeof resetForm === "function") { resetForm(); }
                    if ($('#g-recaptcha-response').length) { grecaptcha.reset(); }
                }
                return;
            } else {
                sbtn.removeAttr().html('Sending Error!');
                errorMessage = '<strong>Something went wrong</strong><br> Try to refresh the Page. kindly <a target="_blank" rel="nofollow" href="' + ajaxReqData.siteUrl + '/contact">Contact Us!</a> if this continues.';
                $('#errorMessage').html('<div class="alert alert-danger" role="alert">' + errorMessage + '</div>');
                ls.alertMsg({
                    message: errorMessage,
                    type: 'danger',
                    timeout: 1500
                });
                return;
            }
        },
        error: function (e) {
            sbtn.removeAttr().html('Sending Error!');
            errorMessage = '<strong>Something went wrong</strong><br> Try to refresh the Page. kindly <a target="_blank" rel="nofollow" href="' + ajaxReqData.siteUrl + '/contact">Contact Us!</a> if this continues.';
            $('#errorMessage').html('<div class="alert alert-danger" role="alert">' + errorMessage + '</div>');
            ls.alertMsg({
                message: errorMessage,
                type: 'danger',
                timeout: 1500
            });
            return;
        }
    });
}