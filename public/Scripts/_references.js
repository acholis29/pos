var _info = window.navigator;
var cookusr = getCookie('_usr');
function getCookie(Name) {
    var re = new RegExp(Name + "=[^;]+", "i"); //construct RE to search for target name/value pair
    if (document.cookie.match(re)) //if cookie found
        return document.cookie.match(re)[0].split("=")[1]; //return its value
    return null;
}


function replaceBRtoNEWLINE(_str) {
    var regex = /<br\s*[\/]?>/gi
    , result = _str.replace(regex, '\n');
    return result;
}

function replaceBR(_str) {
    var regex = /<br\s*[\/]?>/gi
    //var regex = /n\s*[\/]?>/gi
    , result = _str.replace(regex, '');
    return result;
}

function postxml(url, data, result) {

    try {

    

        if (cookusr != null) {
            var prelodr = new Prelodr({
                prefixClass: "prelodr"
            });
            prelodr.in("Loading...").out(function (done) {
                var xmlhttp;
                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                    done();
                    xmlhttp = new XMLHttpRequest();
                }
                else {// code for IE6, IE5
                    done();
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        done();
                        result(parseTxtJson(xmlhttp.responseText));
                    }
                };
                xmlhttp.open("POST", url, true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.setRequestHeader("charset", "UTF-8");
                xmlhttp.send(data + '&_usr=' + cookusr);
            });


        } else {
            // window.location.href = "/login.aspx?ReturnUrl=" + location.href;
        }
    } catch (err) {
        fn_notif('error', 'Error postxml', err);
    }
}

function getxml(url, result) {
    if (cookusr != null) {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                result(xmlhttp.responseText);
            }
        };
        xmlhttp.open("GET", url , true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("charset", "UTF-8");
        xmlhttp.send();
    }
}

function postForm(query, serial, frmid, r) {
    var _serial = serial;
    var _action = query;
    var prelodr = new Prelodr({
        prefixClass: "prelodr"
    });
    prelodr.in("Processing...").out(function (done) {
        if (fn_validation(frmid) == undefined) {
            postxml(_action, _serial, function (result) {
                var res = $.parseJSON(parseTxtJson(result));
                r(res);
                done();
            });
        } else {
            done();
        }
    });
}

function parseTxtJson(str) {
    return String(str)
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/\\/g, "")
        .replace(/\"\[/g, '[')
        .replace(/\]\"/g, ']')
        .replace('"{', '{')
        .replace(':"{', '{')
        .replace('}",', '},');

}


function hrINI() {
    var m_names = new Array("Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec");
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    return curr_date + "-" + m_names[curr_month] + "-" + curr_year;
}

function ResetForm(id, stsclear) {
    var inputValues = [];
    $('#' + id + ' textarea').each(function () {
        $(this).val('');
    });
    $('#' + id + ' select').each(function () {
        $(this).val('');
    });
    $('#' + id + ' input').each(function () {
        var type = $(this).attr("type");
        var numb = $(this).attr("data-numb");
        var tdate = $(this).attr("data-date");
        var tmask = $(this).attr("mask");
        var numb1 = $(this).hasClass("reqnumb");
        var daterange = $(this).hasClass("daterange");
        

        if (stsclear != false) {
            if (type == "text") { inputValues.push($(this).val('')); }
        }
        if (stsclear != false) {
            if (type == "number") { inputValues.push($(this).val(0)); }
        }

        if (type == "password" || type == "email") { inputValues.push($(this).val('')); }
        if (type == "checkbox" || type == "radio") {
            if ($(this).attr('data-checked') !== undefined) {
                inputValues.push($(this).prop('checked', $.parseJSON($(this).attr('data-checked'))));
            } else {
                inputValues.push($(this).prop('checked', true));
            }
        }

        if (tmask != undefined) {
            $(this).mask(tmask);
            $(this).val('00:00');

        }

        if (numb >= '0') {
            var $mDec = 0;
            if ($(this).attr('mDec') != undefined) {
                $mDec = $(this).attr('mDec');
            }
            $(this).autoNumeric('init', { aSep: $(this).attr('data-numb-aSep'), mDec: $mDec });
            $(this).css({ "text-align": "right" });
            inputValues.push($(this).val(numb));
        }

        if (numb1 == true) {
            $(this).css({ "text-align": "right" });
            inputValues.push($(this).val('0'));
        }

        if (tdate == "true") {
            var $tglskr = hrINI();
            $(this).val($tglskr);
            $(this).css({ "text-align": "center" });
            $(this).datepicker({
                autoclose: true
            });
        }
        if (daterange) {
            var startdate = moment().subtract(29, 'days');
            var enddate = moment();
            $(this).daterangepicker({
                startDate: startdate,
                endDate: enddate,
                locale: { format: 'DD/MMM/YYYY' }
            });
        }
    });

}

function fn_modalError(msg) {
    fn_notif('error', 'Error',msg);

}

function fn_validation(id) {

    var elems = document.getElementById(id).getElementsByTagName("*"), i;
    var numbers = /^[+-]?[0-9]{1,20}(?:\.[0-9]{1,20})?$/;
    //fn_enabledisble_elm(id, false);
    for (i in elems) {
        if ((" " + elems[i].className + " ").indexOf(" req ") > -1) {
            var x = elems[i].id;
            var mintext = 1;
            var tit = elems[i].placeholder;
            var nilai = $('#' + x).val();
            var msg = $('#' + x).attr('alertmsg');
            if (msg == undefined) {
                msg = 'This filed ';
            }
            if (tit == undefined) {
                tit = x;
            }

            if ($('#' + x).hasClass('mintext')) {
                mintext = $('#' + x).attr('mintext');
            }
            if ($('#' + x).hasClass('select2-container')) {
                nilai = $('#' + x + ' span').text();
            }

            if ($('#' + x).hasClass('minnumb')) {
                mintext = $('#' + x).attr('mintext');
                var inputtxt = replacekoma($('#' + x).val());
                if (inputtxt.match(numbers)) {
                    console.log(numbers);
                } else {
                    fn_notif('error', 'Valid only number', "Please input " + tit + " min " + mintext + " Number");
                    $('#' + x).focus();
                    $("#" + x).effect("pulsate");
                    return false;
                }
            }

            if (nilai.length < mintext) {
                fn_notif('error', msg + ' is required', "Please input " + tit + " min " + mintext + " character");
                $('#' + x).focus();
                $("#" + x).effect("pulsate");
                $("#s2id_" + x).effect("pulsate");
                return false;
            }
        }

        if ((" " + elems[i].className + " ").indexOf(" reqnumb ") > -1) {
            var x = elems[i].id;
            //var inputtxt = $('#' + x).val();
            var inputtxt = replacekoma($('#' + x).val());
            if (inputtxt != '') {
                if (inputtxt.match(numbers)) {
                    console.log(numbers);
                } else {
                    fn_notif('error', 'Valid only number', "Can't Input Character");
                    $('#' + x).focus();
                    $("#" + x).effect("pulsate");
                    return false;
                }
            }
        }
    }

    //------ Checking untuk check dalam div -------------------


    var $chkreq = $('#' + id + ' .chkreq');
    for (var z = 0; z < $chkreq.length; z++) {
        var $id = $('.chkreq')[z].id;
        var $chk = $("#" + $id + " :input").serializeArray();
        var $tit = $("#" + $id).attr('alertmsg');
        if ($chk.length > 0) {
            console.log('');
        } else {
            $("#" + $id).effect("shake");
            fn_notif('error', 'Request Checkbox', "Please Select " + $tit);
            return false;
        }
    }
    //------------------------------------------

}

function fn_notif(type, title, msg) {
    var opts = {
        title: title,
        text: msg,
        type: type,
        delay: 3000
    };
    $.pnotify(opts);
}

function replacekoma(_str) {
    var regex = /,\s*[\/]?/gi
    , result = _str.replace(regex, '');
    return result;
}

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

function guidx() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

function fn_jConf_delete(callback, cx) {
    $.confirm({
        icon: 'fa fa-trash',
        title: '',
        theme: 'modern',
        content: '<b>Are you sure delete this record..??</b>',
        type: 'red',
        //autoClose: 'Cancel|10000',
        //boxWidth: '600',
        buttons: {
            deleteMF: {
                text: 'Delete',
                btnClass: 'btn-danger',
                action: function () {
                    callback();
                }
            },
            Cancel: function () {
                //cx();
            }
        }
    });
}

function fn_JSONtoParam(e) {
    var $url = Object.keys(e).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(e[k]);
    }).join('&');
    return $url;
}

function formatDate(value, format) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var formatInit = ["/", "-", ".", ",", " ", "d", "M", "y", ""];
    var separator = ["/", "-", ".", ",", " "];
    var result = value;
    var v = new Date(value);
    var d = v.getDate().toString();
    var m = v.getMonth();
    var y = v.getFullYear().toString();

    if (v == 'Invalid Date') {
        // alert(v);
        console.log(v)
        return false;
    }
    window['dd'] = d;
    if (dd.length == 1) { dd = '0' + dd; }

    window['ddd'] = days[v.getDay()].substring(0, 3);
    window['dddd'] = days[v.getDay()];
    window['m'] = (m + 1);
    window['MM'] = (m.toString().length == 1 ? '0' + (m + 1) : (m + 1));
    window['MMM'] = months[m].substring(0, 3);
    window['MMMM'] = months[m];
    window['yy'] = y.substring(2, 4);
    window['yyyy'] = y;

    var valid = format.split("");
    var sts = false;
    for (var x in valid) {
        for (var y in formatInit) { if (x == y) { sts = true; break; } }
        if (sts == false) { alert("Format Date is wrong!"); break; }
    }

    if (sts) {
        var arrFormat = [];

        var temp = 0;
        var arr = format.split("");
        for (var i = 0; i < arr.length; i++) {
            if (isSeparator(arr[i])) {
                var collect = "";
                for (var j = temp; j < i; j++) {
                    collect += arr[j];
                }
                if (collect != "") { arrFormat.push(collect); }

                arrFormat.push(arr[i]); temp = (i + 1);
            }
            if (i == (arr.length - 1) && temp != i) {
                var collect = "";
                for (var j = temp; j <= i; j++) {
                    collect += arr[j];
                }
                if (collect != "") { arrFormat.push(collect); }
            }
        }
        result = "";
        for (var x in arrFormat) {
            if (isSeparator(arrFormat[x])) {
                result += arrFormat[x];
            } else {
                result += window[arrFormat[x]];
            }
        }

        function isSeparator(arrVal) {
            var sts = false;
            for (var x in separator) { if (arrVal == separator[x]) { sts = true; } }
            return sts;
        }

    }

    return result;
}

function formatNumb(value) {
    var parts = (+value).toFixed(2).split(".");
    var num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (+parts[1] ? "." + parts[1] : "");
    return num;
}

function fn_cmbbulan(id) {
    var d = new Date();
    var n = d.getMonth() + 1;

    $('#' + id).empty;
    for (var i in $txt_bulan) {
        $('#' + id).append('<option value="' + $txt_bulan[i].value + '">' + $txt_bulan[i].title + '</option>')
    };
    $('#' + id).val(n);

}

var getDaysInMonth = function (month, year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
};


function fn_msgeography($scope, $http, act, code_country, code_prov) {
    var $param = {
        code_country: code_country,
        code_prov: code_prov
    };

    GeneralFN.ngpost($http, '/Config/MsGeography/attr/list', 'act=' + act + '&' + fn_JSONtoParam($param), function (result) {
        switch (act) {
            case "prov":
                $scope.dtprov = result;
                break;
            case "city":
                $scope.dtcity = result;
                break;
            default:
                $scope.dtcountry = result;
                break;
        }
    }, function (r_header) {
        $scope.dtheader = r_header;
    });
}


function fn_cmbselect2(idelm, id, param, val, mulitple, dt) {
    postxml('/General/cmb/' + id, fn_JSONtoParam(param), function (r) {
        var $data = $.parseJSON(r);
        $("#" + idelm).select2({
            data: $data,
            multiple: mulitple,
            allowClear: true,
            dropdownCssClass: 'bigdrop'
        });
        if (val !== undefined || val !== '') {
            // $("#" + idelm).val(val).trigger('change');
            $("#" + idelm).select2('val',val)
        }
        if (dt !== undefined) {
            dt($data);
        }
    });
}

function fn_cmbselect2data(idelm, val, mulitple, $data, callback) {
    $("#" + idelm).select2({
        data: $data,
        multiple: mulitple,
        allowClear: true
    });
    if (val !== undefined || val !== '') {
        $("#" + idelm).val(val).trigger('change');
    }
    if (callback !== undefined) {
        callback();
    }

}


function fn_cmbmarket($scope, $http, act, code_country, code_prov) {
    var $param = {
        code_country: code_country,
        code_prov: code_prov
    };

    GeneralFN.ngpost($http, '/Config/MsGeography/attr/list', 'act=' + act + '&' + fn_JSONtoParam($param), function (result) {
        switch (act) {
            case "prov":
                $scope.dtprov = result;
                break;
            case "city":
                $scope.dtcity = result;
                break;
            default:
                $scope.dtcountry = result;
                break;
        }
    }, function (r_header) {
        $scope.dtheader = r_header;
    });
}

function fn_decr(txt, callback) {
    postxml('/Config/General/encdec/', 'cmb_type=dec&t_text=' + txt, function (r) {
        var $r = $.parseJSON(r);
        callback($r);

    });
}

function fn_pager(id, rec, pagenumb, limit, callback) {

    var pagecont = parseInt(rec) / parseInt(limit);
    $("#" +id).pager({
        pagenumber: pagenumb,
        pagecount: pagecont,
        buttonClickCallback: function (number) {
            callback(number);
        }
    });
}

function toggleChecked(status, chk_hed, idbtndel) {
    var headerChk = $("#" + chk_hed);
    var itemChk = $("." + chk_hed);
    itemChk.each(function () { this.checked = headerChk[0].checked; });
    if (idbtndel !== "") { 
        if (headerChk[0].checked == false) {
            $("#" + idbtndel).hide();
        } else {
            $("#" + idbtndel).show();
        }
    }
}

function htmlspecialchars(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function htmlspecialpost(text) {
    var map = {
        '&': '%26'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function lastcode(tbl, prefix, callback) {
    console.log(prefix)
    var pref = prefix.length <= 3 ? prefix + '#' : prefix.substring(0, 3);

    postxml('/General/cmb/lastcode', 'tbl=' + tbl + '&prefix=' + htmlspecialpost(pref), function (r) {
        var sx = $.parseJSON(r)
        callback(sx[0].lastcode);
    });
};

function generateAlfabet() {
    //
}

