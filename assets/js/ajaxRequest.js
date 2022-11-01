function ajaxRequest(id_R, data_R) {
    var $form = $('#ls-' + id_R + '-form'),
        sbtn = $form.find('[type="submit"]'),
        udata = new FormData($form[0]);

    if (data_R.noReCAPTCHA && data_R.noReCAPTCHA != false) {

    } else {
        if ($('#g-recaptcha-response').length) {
            var mmRecaptcha = $("#g-recaptcha-response").val();
            if (mmRecaptcha === "") {
                alert('Please check the recaptcha');
                return;
            }
        }
    }

    sbtn.attr('disabled', 'disabled').html('<i class="fa fa-spinner fa-spin"></i> ' + data_R.sendingBtn);
    $.ajax({
        type: "POST", enctype: 'multipart/form-data', url: data_R.url, data: udata, processData: false, contentType: false, cache: false, timeout: 600000,
        success: function (data) {

            /* $('#errorMessage').html('<div class="alert alert-danger" role="alert">'+JSON.stringify(data, null, 2)+'</div>');
            alert("AJAX error in request: " + JSON.stringify(data, null, 2));
            return; */

            if (data.success === true) {
                sbtn.removeAttr().html(data_R.successBtn);

                if (data.url && data.name && data_R.redirect) {
                    mesDataShow = '<div onclick="window.location=\'' + data.url + '\'" >Welcome <strong><i>' + data.name + '</i></strong> ! <br> <i class="fa fa-spinner fa-spin"></i> Redirecting... <a href="' + data.url + '">click here</a> if you\'re not redirected.</div>';
                } else if (data_R.goUrl && data.name && data_R.redirect) {
                    mesDataShow = '<div onclick="window.location=\'' + data_R.goUrl + '\'" >Welcome <strong><i>' + data.name + '</i></strong> ! <br> <i class="fa fa-spinner fa-spin"></i> Redirecting... <a href="' + data_R.goUrl + '">click here</a> if you\'re not redirected.</div>';
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
                    timeout: 3000
                });
                $('#errorMessage').html('<div class="alert alert-success alert-dismissible fade show" role="alert"> ' + mesDataShow + ' <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>');
                if (typeof successForm === "function") { successForm(id_R); }

                if (data.bkData) {
                    if (typeof bkData === "function") { bkData(data.bkData); }
                }

                if (data_R.redirect && data_R.redirect === true) {
                    if (data.redirect) {
                        setTimeout(function () { window.location.href = data.redirect; }, 2000);
                    } else if (data.url) {
                        setTimeout(function () { window.location.href = data.url; }, 2000);
                    } else if (data_R.goUrl) {
                        setTimeout(function () { window.location.href = data_R.goUrl; }, 2000);
                    }
                }
                return;
            } else if (data.success === false && data.message) {
                $('#errorMessage').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"> ' + data.message + ' <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>');
                ls.alertMsg({
                    message: '<strong> ' + data.type + ' </strong><br> ' + data.message,
                    type: 'danger',
                    timeout: 6000
                });

                if (data_R.redirect && data_R.redirect === true) {
                    if (data.redirect) {
                        setTimeout(function () { window.location.href = data.redirect; }, 1000);
                    } else if (data.url) {
                        setTimeout(function () { window.location.href = data.url; }, 1000);
                    } else {
                        sbtn.removeAttr('disabled').html('Try Again');
                        if (typeof resetForm === "function") { resetForm(id_R); }
                        if (data_R.noReCAPTCHA && data_R.noReCAPTCHA != false) {

                        }else{
                            if ($('#g-recaptcha-response').length) { grecaptcha.reset(); }
                        }
                        
                    }
                } else {
                    sbtn.removeAttr('disabled').html('Try Again');
                    if (typeof resetForm === "function") { resetForm(id_R); }
                    if (data_R.noReCAPTCHA && data_R.noReCAPTCHA != false) {

                    } else {
                        if ($('#g-recaptcha-response').length) { grecaptcha.reset(); }
                    }
                }
                return;
            } else {
                sbtn.removeAttr().html('Sending Error!');
                errorMessage = '<strong>Something went wrong</strong><br> Try to refresh the Page. kindly <a target="_blank" rel="nofollow" href="' + siteUrl + '/contact">Contact Us!</a> if this continues.';
                $('#errorMessage').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"> ' + errorMessage + ' <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>');
                ls.alertMsg({
                    message: errorMessage,
                    type: 'danger',
                    timeout: 2000
                });
                return;
            }
        },
        error: function () {
            sbtn.removeAttr().html('Sending Error!');
            errorMessage = '<strong>Something went wrong</strong><br> Try to refresh the Page. kindly <a target="_blank" rel="nofollow" href="' + siteUrl + '/contact">Contact Us!</a> if this continues.';
            $('#errorMessage').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"> ' + errorMessage + ' <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>');
            ls.alertMsg({
                message: errorMessage,
                type: 'danger',
                timeout: 2000
            });
            return;
        }
    });
}