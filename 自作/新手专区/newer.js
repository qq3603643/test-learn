$(function () {

    //缓冲运动模型
    function move(obj, target) {
        clearInterval(obj.timer)
        obj.timer = setInterval(function () {
            var itop = parseInt(getstyle(obj, 'top'));
            var speed = (target - itop) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (itop == target) {
                clearInterval(obj.timer);
            } else {
                obj.style.top = itop + speed + 'px';
            }
        }, 20)
    }

    function getstyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
    }

    //右侧导航栏点击
    function moveTo(obj1, obj2) {
        var itop = obj2.offset().top;
        obj1.click(function () {

            $("html,body").animate({
                scrollTop: itop
            }, 500);
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            $(this).parent().find('span').css({
                'top': $(this).index() * $(this).outerHeight() + 4,
            })

        })
    };

    $.each($('#clickTo').find('li'), function (i) {
        moveTo($('#clickTo').find('li').eq(i), $('.module' + (i + 1)))
    })

    //右侧导航栏跟随滚动条
    $(window).scroll(function () {

        var itop = Math.floor(($(window).height() - $('#clickTo').outerHeight()) / 2);

        var iheight = itop + $(window).scrollTop() < $('.module1').offset().top ? $('.module1').offset().top : itop + $(window).scrollTop();

        move($('#clickTo').get(0), iheight);
        statusChange(iheight + ($('#clickTo').outerHeight() / 2));

    })

    //滚动条滚动右侧导航栏的状态变化
    function statusChange($height) {

        var $ali = $('#clickTo li');
        var change = function (index) {
            $ali.eq(index).siblings().removeClass('active');
            $ali.eq(index).addClass('active');

            $ali.eq(index).parent().find('span').css({
                'top': $ali.eq(index).index() * $ali.eq(index).outerHeight() + 4,
            })
        }　

        if ($height > $('.module1').offset().top && $height < $('.module2').offset().top) {
            change(0);
        } else if ($height > $('.module2').offset().top && $height < $('.module3').offset().top) {
            change(1);
        } else if ($height > $('.module3').offset().top) {
            change(2);
        }
    }

    //购物车数量的加减
    function count($obj) {
        var m = 0;
        $obj.on('click', '.cart_up', function () {

            m = isNaN(parseInt($(this).parent().find('.cart_count').val())) ? 0 : parseInt($(this).parent().find('.cart_count').val());
            m++;
            $(this).parent().find('.cart_count').val(m);

        })

        $obj.on('click', '.cart_low', function () {

            m = isNaN(parseInt($(this).parent().find('.cart_count').val())) ? 0 : parseInt($(this).parent().find('.cart_count').val());
            m = (m - 1) < 0 ? 0 : (m - 1);
            $(this).parent().find('.cart_count').val(m);

        })
    }

    count($('.module1'));

})
