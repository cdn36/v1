//Plagiarism Checker

$("#mycontent").focus(function () {
    countMyWords()
});
$("#mycontent").keypress(function () {
    countMyWords()
});
$("#mycontent").blur(function () {
    countMyWords();
});
$("#mycontent").click(function () {
    countMyWords()
});

searchNo = 'No result found related to your keyword...';
keyCheck = 'Site keywords field can\'t be empty!';
desCheck = 'Site dscription field can\'t be empty!';
titleCheck = 'Site title field can\'t be empty!';
capRefresh = 'Loading...';
charLeft = 'Characters left';
inputURL = 'Enter a valid URL';
inputEm = 'Input data field can\'t be empty';
capCodeWrg = 'Your image verification code is wrong!';
imageVr = 'Please verify your image verification';
emptyStr = 'Domain name field can\'t be empty!';
oopsStr = 'Oops...';
var xdEnabled = true;
var xdOption = "force";
var xdData1 = 'Adblock detected!';
var xdData2 = "<div class=\"text-center\">\n<br>\n<i style=\"color: #e74c3c; font-size: 120px;\" class=\"fa fa-frown-o\" aria-hidden=\"true\"></i>\n<p class=\"bold\">We have detected that you are using adblocking plugin in your browser.</p>\n\n<p  class=\"bold\">\nThe revenue we earn by the advertisements is used to manage this website, we request you to whitelist our website in your adblocking plugin.</p>\n<p><button onclick=\"location.reload();\" class=\"btn btn-success\">Refresh this Page</button></p>\n<br>\n</div>";

function parseHost(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
}
jQuery(document).ready(function () {
    var screenSize = window.screen.width + 'x' + window.screen.height;
    var myUrl = window.location.href;
    var myHost = window.location.hostname;
    var refUrl = document.referrer;
    var refHost = parseHost(refUrl);
    if (myHost == refHost)
        refUrl = 'Direct';

    if (xdEnabled) {
        var xdBlockEnabled = false;
        var testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsense banner_ad pub_728x90 pub_300x250';
        document.body.appendChild(testAd);
        window.setTimeout(function () {
            if (testAd.offsetHeight === 0) {
                xdBlockEnabled = true;
            }
            testAd.remove();
            if (xdBlockEnabled) {
                if (xdOption == 'link') {
                    window.location = xdData1;
                } else if (xdOption == 'close') {
                    $('#xdTitle').html(xdData1);
                    $('#xdContent').html(xdData2);
                    $('#xdBox').modal('show');
                } else if (xdOption == 'force') {
                    $('#xdClose').hide();
                    $('#xdTitle').html(xdData1);
                    $('#xdContent').html(xdData2);
                    $('#xdBox').modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                    $('#xdBox').modal('show');
                }
            }
        }, 100);
    }
});

function phraseMe(str, myData) {
    var charData = str.charAt(myData);
    var strData = myData;
    var count = 0;
    while (strData >= 0 && count < minLimit) {
        if (str.charAt(strData) == ' ' && count > 12)
            break;
        strData--; charData = str.charAt(strData) + charData;
        count++;
    }

    var strData = myData;
    var count = 0;
    while (strData < str.length && count < 60) {
        if (str.charAt(strData) == ' ' && count > 40)
            break;
        strData++;
        charData += str.charAt(strData); count++
    }
    return charData;
}

function parseArticle(content) {
    var _return = new Array();
    var arrParagrap = content.split('\n');
    for (i = 0; i < arrParagrap.length; i++) {
        var currentString = arrParagrap[i];
        if ((currentString.indexOf('.') == -1 && currentString.indexOf(',') == -1) || (currentString.indexOf('.') == currentString.length - 1 || currentString.indexOf(',') == currentString.length - 1)) {
            if (currentString.length >= 40) {
                var st = ''; var count = 0; while (count < 60) {
                    if (currentString.charAt(count) == ' ' && count > 45) break; st += currentString.charAt(count); count++
                } _return.push(st)
            }
        }
        else {
            var currentPosition = 0;
            for (j = 0; j < currentString.length; j++) {
                if (currentString.charAt(j) == '.' || currentString.charAt(j) == ',' || currentString.charAt(j) == '?') {
                    if (j < currentString.length - 5 && j - minLimit > currentPosition) {
                        currentPosition = j; _return.push(phraseMe(currentString, j))
                    }
                }
            }
        }
    }
    return _return;
}

var arrSegment = new Array();
var currentCheck = 0;
var checkOK = 0;
var authCode, myContent, myTextData;

function startTask(auth) {

    var countMe = 0;
    jQuery("#mainbox").fadeOut();
    jQuery(".percentimg").css({ "display": "block" });
    jQuery(".percentimg").show();
    jQuery(".percentimg").fadeIn();
    jQuery("#resultList").append('<thead><th>#</th><th>' + stringStr + '</th><th>' + uniqueStr + '</th></thead><tbody></tbody>');
    arrSegment = parseArticle(myContent);
    noOfLines = arrSegment.length;
    checkMe(noOfLines, arrSegment, countMe);
}

function reUsetool(){
    jQuery("#mainbox").fadeIn();
    jQuery(".percentimg").css({ "display": "none" });
    jQuery(".percentimg").hide();
    jQuery(".percentimg").fadeOut();
    jQuery("#resultList").html("");
    jQuery("#mycontent").val("");
    jQuery("#percent").html('');

    jQuery('#tryNew').addClass('hide');
    jQuery("#tryNew").fadeOut();
    return;
}

jQuery(document).ready(function () {

    myTextData = jQuery("#mycontent").val();
    myTextData = jQuery.trim(myTextData);

    if (myTextData == "")
        jQuery("#mycontent").val(placeHolderText);

    jQuery("#mycontent").focus(function () {

        if (jQuery(this).val() == placeHolderText) { jQuery(this).val(''); }
    }); jQuery("#mycontent").blur(function () { if (jQuery(this).val() == '') jQuery(this).val(placeHolderText); countMyWords(); });

    jQuery("#checkButton").click(function () {
        myContent = jQuery.trim(jQuery("#mycontent").val());

        if (jQuery("#mycontent").val() == placeHolderText) {
            sweetAlert(oopsStr, inputEm, "error");
            return false;
        } else if (myContent.length < minLimit) {
            sweetAlert(oopsStr, articleLm.replace('[limit]', minLimit), "error");
            return false;
        } else if (countMyWords() > wordsLimit) {
            sweetAlert(oopsStr, wordLm.replace('[wordsLimit]', wordsLimit), "error");
            return false;
        } else {
            startTask();
        }
    });

    jQuery("#reUsetool").click(function () {
        reUsetool();
    });
});

function unique2Color(percent) {
    if (percent < 100)
        return '#e74c3c';
    else
        return '#2ecc71';
}

function checkMe(noOfLines, arrSegment, countMe) {
    jQuery.post(axPath, { plagiarism: '1', type: apiType, data: arrSegment[countMe] }, function (data) {
        var loopCount = countMe + 1;
        if (data == '2') {
            checkOK++;
            jQuery("#resultList").append('<tr><td>' + loopCount + '</td><td class="string">' + arrSegment[countMe] + '</td><td><span class="badge bg-green"> ' + goodStr + ' </span></td></tr>');
        }
        else {
            jQuery("#resultList").append('<tr><td>' + loopCount + '</td><td class="string">' + arrSegment[countMe] + '</td><td><span class="badge bg-red"> ' + alreadyStr + ' </span></td></tr>');
        }
        var checkPoint = noOfLines - 1;
        var percentUnique = Math.round((checkOK / arrSegment.length) * 100);
        if (percentUnique > 100) {
            percentUnique = 100;
        }
        var colorUnique = unique2Color(percentUnique);
        jQuery("#percent").html('<b style="color:' + colorUnique + '">' + percentUnique + '% ' + unqStr + ' </b>');
        if (countMe == checkPoint) {
            jQuery(".percentimg").fadeOut();
            jQuery(".percentimg").css({ "display": "none" });
            jQuery(".percentimg").hide();
            jQuery('#tryNew').removeClass('hide');
            jQuery("#tryNew").fadeIn();
        }
        else {
            countMe++;
            checkMe(noOfLines, arrSegment, countMe);
        }
    });

}

function countMyWords() {
    var wordsCount = 0;
    var dataContent = $("#mycontent").val();
    dataContent = $.trim(dataContent);
    dataContent = dataContent.replace(/\s+/g, " "); dataContent = dataContent.replace(/\n /, " ");
    if (dataContent != "") {
        wordsCount = dataContent.split(' ').length;
    }
    $("#words-count").html(wordsCount);
    return wordsCount;
}

$(document).ready(function () {
    $("#max_wordsLimit").html(wordsLimit);
    countMyWords();
});