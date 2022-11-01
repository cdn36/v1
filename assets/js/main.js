document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
}

// for jquery cdn
if (typeof jQuery == 'undefined') {
    alert('Unstable Internet Connetion. Kindly Try Again Later.');
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var ls = {
    data: {},
    user: {}
};

ls.alert = function (msg, typ) {
    return '<div class="alert alert-dismissible alert-' + typ + '"><button type="button" class="close" data-dismiss="alert">&#x2716;</button><p class="mb-0 text-capitalize">' + msg + '</p></div>';
};

ls.callout = function (title, msg, typ) {
    /*if(typ === 'primary') typ = '#2196f3';
    if(typ === 'warning') typ = '#ff9800';
    if(typ === 'danger') typ = '#e51c23';
    if(typ === 'success') typ = '#4caf50';
    if(typ === 'info') typ = '#9c27b0'; */

    return '<div style="padding: 20px;margin: 20px 0;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px; border-left-color: ' + typ + '" class="text-capitalize">' +
        '<h4 style="color:' + typ + ';margin-top: 0; margin-bottom: 5px; font-size: 18px;">' + title + '</h4>' +
        '<p style="margin: 0 0 10px;">' + msg + '</p>' +
        '</div>';
};
ls.__alrtmsg = null;
ls.alertMsg = function (data) {
    data.type = data.type || 'info';
    data.timeout = data.timeout || 8000;

    if (data.remove_prev) {
        $('#' + ls.__alrtmsg).remove();
    }

    var aid = 'ls-alert-msg-id-' + Math.random().toString(36).substring(2);

    if ($('.ls-alert-msg').length === 0) {
        $('body').append(
            $('<div />', {
                class: 'col-md-12 col-lg-4 ls-alert-msg',
                style: 'position: fixed;'
            })
        );
    }
    $('.ls-alert-msg').append(
        $('<div />', {
            style: 'margin-bottom: 0px',
            id: aid
        }).html('<div class="alert alert-dismissible alert-' + data.type + '" style="margin-bottom: 13px"><button type="button" class="close" data-dismiss="alert">&#x2716;</button><p class="mb-0">' + data.message + '</p></div>')
    );
    setTimeout(function () {
        $('#' + aid).fadeOut(300, function () {
            $(this).remove();
            if (data.callback) data.callback();
        });
    }, data.timeout);
};

ls.cookiesAgree = function (data) {
    data.type = data.type || 'info';
    data.timeout = data.timeout || 8000;

    if (data.remove_prev) {
        $('#' + ls.__alrtmsg).remove();
    }

    var aid = 'ls-alert-msg-id-' + Math.random().toString(36).substring(2);

    if ($('.ls-alert-msg').length === 0) {
        $('body').append(
            $('<div />', {
                class: 'col-md-12 col-lg-4 ls-alert-msg',
                style: 'position: fixed;'
            })
        );
    }
    $('.ls-alert-msg').append(
        $('<div />', {
            style: 'margin-bottom: 0px',
            id: aid
        }).html('<div class="alert alert-dismissible alert-' + data.type + '" style="margin-bottom: 13px"><button type="button" class="close" onclick="cookies_agree()" data-dismiss="alert" >&#x2716;</button><p class="mb-0">' + data.message + '</p></div>')
    );
    setTimeout(function () {
        $('#' + aid).fadeOut(300, function () {
            $(this).remove();
            if (data.callback) data.callback();
        });
    }, data.timeout);
};

ls.jsonMsg = function (m) {
    return m.replace(/(?:\r\n|\r|\n)/g, '<br />');
};

/*$('body > .container > .row > hr').last().before('<div id="google_translate_element"><a href="#!translate" onclick="ls.loadtranslate()">Translate Page</a></div>'); */

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
}

ls.loadtranslate = function () {
    jQuery.ajax({
        type: "GET",
        url: '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
        success: function () {
            $('a[href="#!translate"]').remove();
        },
        dataType: "script",
        cache: true
    });
};

//currency
function currencyCh(cname, cvalue) {
    var d = new Date(), exdays = 365;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    window.location.reload();
}
//
function cookies_agree() {
    var d = new Date(), exdays = 365, cname = 'cookies_agree', cvalue = true;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//new 3 design
function is_InstagramUrlValid(url) {
    if (url.match(/instagram\.com\/p\/([^\/]*)/i)) {
        return true;
    } else if (url.match(/instagram\.com\/([^\/]*)\/p\/([^\/]*)/i)) {
        return true;
    } else if (url.match(/instagram\.com\/tv\/([^\/]*)/i)) {
        return true;
    } else if (url.match(/instagram\.com\/([^\/]*)\/tv\/([^\/]*)/i)) {
        return true;
    } else if (url.match(/instagram\.com\/reel\/([^\/]*)/i)) {
        return true;
    } else if (url.match(/instagram\.com\/([^\/]*)\/reel\/([^\/]*)/i)) {
        return true;
    } else {
        return false;
    }
}

function is_InstagramUsernameValid(username) {
    if (username.match('^([A-Za-z0-9._](?:(?:[A-Za-z0-9._]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9._]))?)$')) {
        return true;
    } else {
        return false;
    }
}

function is_EmailValid(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}

function is_UsernameValid(username) {
    if (username.match('^([A-Za-z0-9._](?:(?:[A-Za-z0-9._]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9._]))?)$')) {
        return true;
    } else {
        return false;
    }
}

function is_mobileNoValid(number) {
    var regex = /^([+]{ 1}[0 - 9]{ 5, 15 })+$/;
    if (!regex.test(number)) {
        return false;
    } else {
        return true;
    }
}

function is_TiktokUrlValid(url) {
    if (url.match(/vm\.tiktok\.com\/([^\/]*)/i)) {
        return true;
    } else if (url.match(/vt\.tiktok\.com\/([^\/]*)/i)) {
        return true;
    } else if (url.match(/www\.tiktok\.com\/@([^\/]*)\/video\/([^\/]*)/i)) {
        return true;
    } else if (url.match(/m\.tiktok\.com\/v\/([^\/]*)\.([^\/]*)/i)) {
        return true;
    } else {
        return false;
    }
}

function bhimchatShare(url, windowName) {
    newwindow = window.open('https://www.bhimchat.com/sharer?url=' + url, windowName, 'height=600,width=800');
    if (window.focus) {
        newwindow.focus();
    }
    return false;
}

function generatePass(len) {
    var length = (len) ? (len) : (10);
    var string = "abcdefghijklmnopqrstuvwxyz";
    var numeric = '0123456789';
    var punctuation = '!@#$%&*()_+~|}{[]\:;?></-=';
    var password = "";
    var character = "";
    var crunch = true;
    while (password.length < length) {
        entity1 = Math.ceil(string.length * Math.random() * Math.random());
        entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
        hold = string.charAt(entity1);
        hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
        character += hold;
        character += numeric.charAt(entity2);
        character += punctuation.charAt(entity3);
        password = character;
    }
    password = password.split('').sort(function () { return 0.5 - Math.random() }).join('');
    return password.substr(0, len);
}

function timeAgo(val) {
    val = 0 | parseInt(Date.now() / 1000) - val;
    var unit, length = {
        second: 60, minute: 60, hour: 24, day: 7, week: 4.35,
        month: 12, year: 10000
    }, result;

    for (unit in length) {
        result = val % length[unit];
        if (!(val = 0 | val / length[unit]))
            return result + ' ' + (result - 1 ? unit + 's' : unit) + ' Ago';
    }
}


function isValid_ipaddress(ip) {
    var ipReg = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/ig;

    if (ip.match(ipReg)) {
        return true;
    } else {
        return false;
    }
}

function isPurchaseCode(str) {
    var patt = new RegExp("(.*)-(.*)-(.*)-(.*)-(.*)");
    var res = patt.test(str);
    if (res) {
        return true;
    }
    return false;
}

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

function setMyCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Create the function.
var htmlspecialchars = function(string) {
  
  // Our finalized string will start out as a copy of the initial string.
  var escapedString = string;

  // For each of the special characters,
  var len = htmlspecialchars.specialchars.length;
  for (var x = 0; x < len; x++) {

    // Replace all instances of the special character with its entity.
    escapedString = escapedString.replace(
      new RegExp(htmlspecialchars.specialchars[x][0], 'g'),
      htmlspecialchars.specialchars[x][1]
    );
  }

  // Return the escaped string.
  return escapedString;
};

// A collection of special characters and their entities.
htmlspecialchars.specialchars = [
  [ '&', '&amp;' ],
  [ '<', '&lt;' ],
  [ '>', '&gt;' ],
  [ '"', '&quot;' ]
];

// Create the function.
var htmlspecialchars_decode = function(string) {
  
  // Our finalized string will start out as a copy of the initial string.
  var unescapedString = string;

  // For each of the special characters,
  var len = htmlspecialchars_decode.specialchars.length;
  for (var x = 0; x < len; x++) {

    // Replace all instances of the entity with the special character.
    unescapedString = unescapedString.replace(
      new RegExp(htmlspecialchars_decode.specialchars[x][1], 'g'),
      htmlspecialchars_decode.specialchars[x][0]
    );
  }

  // Return the unescaped string.
  return unescapedString;
};

htmlspecialchars_decode.specialchars = [
  [ '"', '&quot;' ],
  [ '>', '&gt;' ],
  [ '<', '&lt;' ],
  [ '&', '&amp;' ]
];