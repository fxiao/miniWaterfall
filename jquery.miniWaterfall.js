/* 小动态瀑布流
 * nano from https://github.com/trix/nano.git
 *
 * 返回 json 的结构:
 * {
 *    "photos": {
 *      "total": 60, 
 *      "photo": [{
 *          "name": "heyun51@gmail.com",
 *          "price": "359.00",
 *          "id": 1796,
 *          "quantity": 0
 *      }],
 *      "perpage": 10, 
 *      "page": 4, 
 *      "pages": 6
 *    },
 *    "stat": "ok"
 * }
 * */
;(function($) {
    $.fn.extend({
        miniWaterfall: function(options) {
            // 默认值
            settings = $.extend({
                url: window.location.href,
                row: 4, // 瀑布流的列数
                row_id: "waterfall_id_",
                row_class: "waterfall_class",
                tpl_id: "#tpl",
                loading_id: "#loading",
                init_load: true, // 页面显示就加载一页
                page: 1, // 从几页开始
                perpage: 10, // 每页显示的数量
                load_button: "#load_button", // 点击加载按钮
                distance: 200, // 距离底部多少时加载
                msg_waterfull: '#msg_waterfull' // 当没有数据时显示
            }, options);

            var div_html = "";
            var divs = new Array();
            for(i=1; i<=settings.row; i++) {
                div_html += '<div id="' + settings.row_id + i + '" class="' + settings.row_class + '"></div>';
                divs.push("#" + settings.row_id + i);
            }
            $(this).append(div_html); // 生成列
            $(this).after('<div id="page" style="display: none" data-current_p="0"  data-page="' + settings.page + '" data-perpage="' + settings.perpage + '"></div>');
            $(settings.msg_waterfull).hide();

            // 每个块的插入
            function waterfall_put(json) {
                var div_hg = new Array();
                $.each(divs, function(i, n) {
                    div_hg.push({"hg": $(n).outerHeight(), "id": n});
                });

                // 按从低到高 排序 div_hg
                div_hg.sort(function(a, b) {
                    return a.hg - b.hg;
                });

                $.each(json, function(i, n) {
                    $(div_hg[i%settings.row].id).append($(settings.tpl_id).nano(n));
                });
            }


            function data_load() {
                var page = $('#page').attr('data-page');
                var perpage = $('#page').attr('data-perpage');
                var current_p = $('#page').attr('data-current_p');

                if(page != current_p) {
                    $(settings.loading_id).show();
                    $('#page').attr('data-current_p', page);
                    $.getJSON(settings.url, {"page": page, "perpage": perpage}, function(d) {
                        if (d.stat !== 'ok') {
                            alert('load data error!');
                            $(settings.loading_id).hide();
                            return;
                        }
                        if (d.photos.total == 0){
                          $(settings.msg_waterfull).show();
                        }
                        $(settings.msg_waterfull).hide();
                        waterfall_put(d.photos.photo);

                        page++;
                        if(page <= d.photos.pages) {
                            $('#page').attr('data-page', page);
                        }
                        $(settings.loading_id).hide();
                    });
                } else {
                    $(settings.load_button).hide();
                }
            }

            if(settings.init_load) {
                data_load();
            }

            $(settings.load_button).click(function() {
                data_load();
            });

            $(window).scroll(function(){
                if ($(document).height() - $(this).scrollTop() - $(this).height()<settings.distance) {
                    data_load();
                }
            });
        },
        nano: function(data) {
            return $(this).html().replace(/\{([\w\.]*)\}/g, function(str, key) {
                var keys = key.split("."), v = data[keys.shift()];
                for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
                return (typeof v !== "undefined" && v !== null) ? v : "";
            });
        }
    });
})(jQuery);
