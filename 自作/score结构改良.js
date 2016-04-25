$(function () {
    var Scorce = {
        showScroe: function () {
            var timer = null,
                timer1 = null;

            $('.serviceTab span').mouseenter(function () {
                var _this = $(this);
                clearInterval(timer1);
                $('.score_show').hide();
                $(this).parent().find(".score_show").show();
                tracker.Popup("mouse_enter_tag", {
                    "shopid": _this.parent().parent().find('a').attr('data-id'),
                });
            })

            $('.serviceTab span').mouseleave(function () {
                var This = this;
                timer = setTimeout(function () {
                    $(This).parent().find(".score_show").hide();
                }, 200)
            })
            $('.score_show').mouseenter(function () {
                clearTimeout(timer);
            })
            $('.score_show').mouseleave(function () {
                var This = this;
                timer1 = setTimeout(function () {
                    $(This).parent().find(".score_show").hide();
                }, 200)
            })
        },
        showColor: function () {
            $.each($(".serviceTab span em[data-level]"), function (index, ele) {
                var level = $(ele).attr("data-level");
                var className;
                if (level == "优") {
                    className = "red_bg";
                } else if (level == "中") {
                    className = "green_bg";
                } else if (level == "差") {
                    className = "black_bg";
                }
                if (className) {
                    $(ele).addClass(className);
                }
            });
            $.each($(".score_show em[data-level]"), function (index, ele) {
                var level = $(ele).attr("data-level");
                var className;
                if (level == "优") {
                    className = "red";
                } else if (level == "中") {
                    className = "green";
                } else if (level == "差") {
                    className = "black";
                }
                if (className) {
                    $(ele).addClass(className);
                };
            });
        },
        insetScroe: function () {
            var dtd = $.Deferred();
            var arr = [],
                $eles = $('.goods-table .T-left');
            $.each($eles, function (i, item) {
                arr.push($(item).find('a').attr('data-id'));
            })
            $.post('/api/Store/GetStoreTag', {
                'userIds': arr.join(",")
            }, function (data) {
                data = eval('(' + data + ')');
                var $Data;

                if (data.State == 1) {
                    $Data = data.Data;
                } else {
                    return;
                };

                var dataDeal = function (value) {
                    if (value) {
                        return value * 100;
                    } else {
                        return '--';
                    }
                };

                var levelDeal = function (value) {
                    return value ? value : '--';
                };

                var dayDeal = function (value) {
                    var valueS = value.toString(),
                        len = valueS.length;
                    return len > 1 ? valueS : valueS + '.0';
                };

                $.each($Data, function (i, item) {
                    var $id = item.UserId,
                        $trans = item.LogisticsServiceJudge,
                        $shoe = item.OrderEvaluateJudge,
                        $comment = item.UserCommitJudge;

                    var html = '',
                        $div = $('<div>');
                    $div.addClass('container_score');
                    html = '<div class="serviceTab"><span>[ &nbsp;物流服务<em data-level="' + $trans.ServiceLevel + '">' + levelDeal($trans.ServiceLevel) + '</em>订单履约<em data-level="' + $shoe.ServiceLevel + '">' + levelDeal($shoe.ServiceLevel) + '</em>用户评价<em data-level="' + $comment.ServiceLevel + '">' + levelDeal($comment.ServiceLevel) + '</em>&ensp;]</span><div class="score_show"><h1>店铺动态服务评价</h1><ul><li>物流服务：<em data-level="' + $trans.ServiceLevel + '">' + levelDeal($trans.ServiceLevel) + '</em>物流到达平均时间：<em data-level="' + $trans.ServiceLevel + '">' + dayDeal($trans.LowValue) + '天-' + dayDeal($trans.HighValue) + '天</em></li><li>订单履约：<em data-level="' + $shoe.ServiceLevel + '">' + levelDeal($shoe.ServiceLevel) + '</em>支付后订单出库率：<em data-level="' + $shoe.ServiceLevel + '">' + dataDeal($shoe.LowValue) + '%-' + dataDeal($shoe.HighValue) + '%</em></li><li>用户评价：<em data-level="' + $comment.ServiceLevel + '">' + levelDeal($comment.ServiceLevel) + '</em>交易后订单好评率：<em data-level="' + $comment.ServiceLevel + '">' + dataDeal($comment.LowValue) + '%-' + dataDeal($comment.HighValue) + '%</em></li></ul></div></div>';

                    $div.html(html);
                    var $lefts = $('.goods-table').find('.T-left');
                    $.each($lefts, function (i, item) {
                        var dataId = $(item).find('a').attr('data-id');
                        if (dataId == $id) {
                            $(item).prepend($div);
                        }
                    });

                })
                dtd.resolve();
            })
            return dtd.promise();
        },
        addScore: function () {
            $.each($('.goods-table').find('.T-left'), function (index, ele) {
                var $onff = $(ele).find('.serviceTab').size();
                if (!$onff) {
                    var $div = $('<div>');
                    $div.addClass('container_score');
                    $div.html('<div class="serviceTab"><span>[ &nbsp;物流服务<em>- -</em>订单履约<em >- -</em>用户评价<em>- -</em>&ensp;]</span><div class="score_show"><h1>店铺动态服务评价</h1><ul><li>物流服务：<em>--</em>物流到达平均时间：<em>--</em></li><li>订单履约：<em>--</em>支付后订单出库率：<em>--</em></li><li>用户评价：<em>--</em>交易后订单好评率：<em>--</em></li></ul></div></div>');
                    $(ele).prepend($div);
                }
            })
        },
        main: function () {
            Scorce.insertScore().done(Scorce.addScore)
                .done(Scorce.showColor)
                .done(Scorce.showScroe);
        }
    };

    ~~ function () {
        var onff,
            timer = null;
        timer = setInterval(function () {

            onff = $('.goods-table').find('.T-left').size();
            if (onff) {
                clearInterval(timer);
                Scorce.main();
            }

        }, 200)
    }();
})