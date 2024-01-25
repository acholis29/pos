
var nRecs

(function ($) {
    var $descr = ''
    $.fn.extend({
        CheckBoxDB: function (options) {
            opts = $.extend({}, $.dbCheckBox.defaults, options);
            return this.each(function () {
                new $.dbCheckBox(this, opts);
            });
        }
    });

    $.dbCheckBox = function (obj, opts) {
        var $this = $(obj);
        if (opts.db_map != '') {
            var d = getDataString();

            doAjax('GET', opts.data_url, d, doBefore, doCreate, opts.complete);
        };




        function getDataString() {
            var str = '';
            $.each(opts.data, function (i, itm) {
                str += itm.name + "=" + itm.value + "&";
            });
            //remove last "&"
            str = str.substr(0, (str.length - 1));
            return str;
        };

        function doAjax(t, u, d, fnBefore, fnSuccess, fnComplete) {

            $.ajax({
                type: t,
                url: u,
                data: d,
                dataType: 'json',
                beforeSend: fnBefore, 
                complete: fnComplete,
                success: fnSuccess
            }); 
        };

        function doBefore() {
            if (opts.chk_group !== '') {
                //console.log(opts.chk_group);
            } else {
                $this.empty();
                $this.append("<div style='background: url(/images/loaders/loader1.gif) no-repeat left center; display:block; width:90%; height:20px; padding-left:20px; font-weight:bold;'> Process loading....</div>");

            }
        }

        function doCreate(data) {
            nRecs = data.length;
            if (data.error != 'true') {
                var nRows = Math.ceil(nRecs / opts.num_cols);
                var date = new Date();
                var ren = Math.floor(Math.random() * date.getFullYear());

                cnt = 0;
                var tbl = document.createElement('table');
                $(tbl).attr({ width: "100%", border: "0", class: "tblimCheckBox" });

                var tr1 = document.createElement('tr'), r = 0;
                var td1 = document.createElement('td');

                
                for (var i = 0; i < nRows; i++) {
                    if (data[cnt][opts.db_map.descr] != undefined) {
                        $descr = data[cnt][opts.db_map.descr]
                    }
                    var tr = document.createElement('tr');
                    for (var j = 0; j < opts.num_cols; j++) {
                        var td = document.createElement('td');
                        var is_checked = data[cnt][opts.db_map.val_chk];
                        if (is_checked == 0) {
                            //console.log(opts.act);
                            if (opts.act == 'new') {
                                $(td).append($('<label ><input type="checkbox" id="' + opts.cb_prefix + data[cnt][opts.db_map.id] + '" name="' + opts.cb_prefix + '" value="' + data[cnt][opts.db_map.id] + '" checked class="chk_' + ren + '" /> <span class="' + opts.cb_prefix + '" dtidx="' + data[cnt][opts.db_map.id] + '">' + data[cnt][opts.db_map.label] + '</span></label>').addClass(opts.cb_class));

                            } else {
                                $(td).append($('<label ><input type="checkbox" id="' + opts.cb_prefix + data[cnt][opts.db_map.id] + '" name="' + opts.cb_prefix + '" value="' + data[cnt][opts.db_map.id] + '" class="chk_' + ren + '" /> <span class="' + opts.cb_prefix + '" dtidx="' + data[cnt][opts.db_map.id] + '">' + data[cnt][opts.db_map.label] + '</span></label>').addClass(opts.cb_class));
                            }
                        }
                        else if (is_checked == 1) {
                            $(td).append($('<label><input  type="checkbox" id="' + opts.cb_prefix + data[cnt][opts.db_map.id] + '" name="' + opts.cb_prefix + '" value="' + data[cnt][opts.db_map.id] + '" checked class="chk_' + ren + '"/> <span class="' + opts.cb_prefix + '" dtidx="' + data[cnt][opts.db_map.id] + '">' + data[cnt][opts.db_map.label] + '</span></label>').addClass(opts.cb_class));
                            r += 1;
                        }
                        else {

                            $(td).append($('<label><input  type="checkbox" id="' + opts.cb_prefix + data[cnt][opts.db_map.id] + '" name="' + opts.cb_prefix + '" value="' + data[cnt][opts.db_map.id] + '" class="chk_' + ren + '"/> <span class="' + opts.cb_prefix + '" dtidx="' + data[cnt][opts.db_map.id] + '">' + data[cnt][opts.db_map.label] + '</span></label>').addClass(opts.cb_class));
                        }
                        cnt++;
                        $(tr).append(td);


                        if (cnt == nRecs) {
                            break;
                        }
                    }
                    $(tbl).append(tr);
                }
                //console.log(opts.chk_group);



                if (opts.chk_group != '') {
                    if (nRecs > 0) {
                        var $Divchk_group = document.createElement('div');
                        $($Divchk_group).attr({ id: opts.cb_prefix , class:'divSub_chktable chkreq', alertmsg:$descr });// + opts.chk_group
                        $('#' + opts.cb_prefix ).remove();//+ opts.chk_group
                        $($Divchk_group).append('<h4 id="h4_' + opts.cb_prefix + '">' + $descr + '</h4>');//+ opts.chk_group '</h4>');
                        $($Divchk_group).append($(tbl));
                        console.log();
                        $this.append($Divchk_group);
                    };
                } else {

                    $this.empty();
                    $this.append($(tbl));
                }



                if (opts.chk_selectall == true) {
                    var $checked = 'checked';
                    if (nRecs != r) {
                        $checked = '';
                    }

                    //$(td1).prepend($('<div style="float:left;"><label ><input type="checkbox" name="all' + opts.cb_prefix + '" id="chk_select' + ren + '" class="chk_select" ' + $checked + ' onclick="toggleChecked(this.checked, this.id, \'chk_' + ren + '\')" /><strong>Select All</strong></label></div><div style="float:right;"> <input type="text" placeholder="search" id="t_select' + ren + '" onkeyup="fn_caritext_chk(this.id)" /> </div>').addClass(opts.cb_class)).attr('colspan', nRecs);
                    $(td1).prepend($('<div style="border-bottom:dotted 1px solid #808080; "><div style="float:left;"><label ><input type="checkbox" id="chk_select' + ren + '" class="chk_select" ' + $checked + ' onclick="toggleChecked(this.checked, this.id, \'chk_' + ren + '\')" /><strong>Select All</strong></label></div><div style="float:right; padding:0px;text-align:right"> <input style="width:50%" class="t_caricheckbox"  type="text" placeholder="search" id="t_select' + ren + '" onkeyup="fn_caritext_chk(this.id)" /> </div></div>').addClass(opts.cb_class)).attr('colspan', nRecs);
                    $(tr1).prepend(td1);
                    $(tbl).prepend(tr1);
                    
                    var total_checkbox = $(tbl).find('.chk_' + ren).length;
                    var total_checked = $(tbl).find('.chk_' + ren + ':checked').length;
                    if (total_checked < total_checkbox) { $(tbl).find('#chk_select' + ren).removeAttr('checked'); }
                    if (total_checked == total_checkbox) { $(tbl).find('#chk_select' + ren).attr('checked', 'checked'); }
                    
                };

                if (opts.t_search == false) {
                    $('#t_select' + ren).hide();
                } else {
                    doSearch(tbl, opts.num_cols, ren);
                }

                if (opts.chk_addnew == true) {
                    $this.append($('<div class="row-fluid"><div class="span12" style="text-align:right; "><hr style="border-top:1px solid silver;"/><a id="a-' + opts.cb_prefix + '" class="btn btn-lime" title="Create new" ><i class="icon-plus-sign"> Create new</i></a></div></div><br/>'));
                };

                if (opts.chk_data.length > 0) {

                    for (var i = 0; i < opts.chk_data.length; i++) {
                        //$('#' + opts.cb_prefix + opts.chk_data[i]).attr('checked', 'checked');
                    };
                };
            } else {
                fn_modalError(data.msg)
            };
        };
    };

    function doSearch(tbl, coll, ren) {
        var cbsX, cbsY, cbsZ; refreshData();
        function refreshData(){
            cbsX = []; cbsY = []; cbsZ = [];
            $(tbl).find('tbody tr td').each(function () {
                cbsX.push($(this)[0].innerHTML);
                cbsY.push($(this)[0].innerText.toLowerCase());
                cbsZ.push($(this).find('input')[0].checked)
            })
        }
        $(tbl).find('tbody tr td input[type=checkbox]').live('click', function () {
            var total_checkbox = $(tbl).find('.chk_' + ren).length;
            var total_checked = $(tbl).find('.chk_' + ren + ':checked').length;
            if($(tbl).find('input[type=text]').val()==""){
                if($(this).attr('id')!='chk_select' + ren){
                    if (total_checked < total_checkbox) { $(tbl).find('#chk_select' + ren).removeAttr('checked'); }
                    if (total_checked == total_checkbox) { $(tbl).find('#chk_select' + ren).attr('checked', 'checked'); }
                }
                refreshData();
            }else{
                for(var i = 0; i < cbsY.length; i++) {
                    if (cbsY[i].trim() == $(this).parent().find('span').text().trim().toLowerCase()) {
                        cbsZ[i] = $(this)[0].checked;
                    }
                }
                var all = true;
                for(var i = 1; i < cbsZ.length; i++) { if(!cbsZ[i]){all=false;} }
                if(all){ $(tbl).find('#chk_select' + ren).attr('checked', 'checked');
                }else{ $(tbl).find('#chk_select' + ren).removeAttr('checked'); }
                cbsZ[0] = all;
            } //console.log(cbsZ);
        });
        $(tbl).find('tbody tr td input[type=text]').live('keyup', function () {
            var count = 0;
            var val = $(tbl).find('input[type=text]').val();
            $(tbl).find('tbody tr').remove();
            var addtxt = '<tr><td colspan="' + coll + '">' + cbsX[0] + '</td></tr>';
            for (var i = 1; i < cbsY.length; i++) {
                if (cbsY[i].indexOf(val.toLowerCase()) != -1) {
                    count += 1; var txt = '<td>' + cbsX[i] + '</td>';
                    if (count == 1) { txt = '<tr>' + txt; }
                    if (count == coll) { txt = txt + '</tr>'; count = 0; }
                    addtxt += txt; //console.log(count + ' : ' + txt)
                }
            } if (count != coll) { addtxt += '</tr>'; }
            $(tbl).find('tbody').append(addtxt);
            $(tbl).find('input[type=text]').val(val).focus();
            $(tbl).find('tbody tr td input[type=checkbox]').each(function () {
                for (var i = 0; i < cbsY.length; i++) {
                    if (cbsY[i].trim() == $(this).parent('label')[0].innerText.toLowerCase()) {
                        if (cbsZ[i] == true) {
                            $(this).attr('checked', 'checked')
                        } else {
                            $(this).removeAttr('checked');
                        }
                    }
                }
            }) //console.log(cbsZ);
            if(val!=""){$(tbl).find('#chk_select' + ren).parent('label').hide();}else{$(tbl).find('#chk_select' + ren).parent('label').show()}
        })
    }

    $.dbCheckBox.defaults = {
        /*data_url: '../includes/controllers/dbActionController.php',
        data: [{name: "action", value: "doGetJson"}, {name: "page", value: "music_categories"} ],
        data_map: {"id": "music_cat_id", "label" : "music_desc"},
        cb_class : 'checkbox',
        num_cols: 4*/
        data_url: '',
        data: '',
        db_map: '',
        cb_class: '',
        cb_prefix: '',
        chk_group: '',
        chk_selectall: false,
        chk_addnew: false,
        t_search: false,
        act: 'new',
        chk_data: '',
        num_cols: 4,
        complete: function () { }

    };

})(jQuery);