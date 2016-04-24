$(function () {

    //第一屏幕
    (function () {

        //设置屏幕的高度
        resize();
        //导航变化
        menuS();
        //主屏幕的变化
        cenneM();
        //导航上的动画
        navAnimate();
        //提示信息
        changeColor();
        //侧面导航栏
        $('.btn_list').click(function () {

            YnavMove(0);
        })
        $('.Ynav .Ynav_close').click(function () {
            YnavMove(1);
        })



        function YnavMove(index) {
            if (index < 1) {
                $('.Ynav').animate({
                    left: '0px'
                }, 800, 'swing');
            } else {
                $('.Ynav').animate({
                    left: '-310px'
                }, 800, 'swing');
            }

        }

        function navAnimate() {

            var X = new TimelineMax;
            $('.menu .nav li').mouseenter(function () {
                X.clear();
                var ileft = $(this).position().left + ($(this).outerWidth() - $('.menu .nav span').outerWidth()) / 2;
                X.to('.menu .nav span', 0.5, {
                    display: 'block',
                    opacity: 1,
                    left: ileft,
                    ease: Elastic.easeOut,
                })
            })
            $('.menu .nav li').mouseleave(function () {
                X.clear();
                X.to('.menu .nav span', 0.2, {
                    opacity: 0,
                })
            })

            //3d 翻转

            Rotate3d($('.menuA'), $('.menuA .top'), $('.menuA .bottom'));

            function Rotate3d(obj, ele1, ele2) {
                obj.mouseenter(function () {
                    X.clear();

                    var itop = ele1.outerHeight();

                    X.to(ele1, 0.2, {
                        rotationX: 90,
                        top: -itop,
                        zIndex: 100,
                    }, 0)
                    X.to(ele2, 0.2, {
                        rotationX: 0,
                        top: 0,
                        zIndex: 101,
                    }, 0)
                })
                obj.mouseleave(function () {
                    X.clear();

                    var itop = ele1.outerHeight();
                    X.to(ele1, 0.2, {
                        rotationX: 0,
                        top: 0,
                        zIndex: 101,
                    }, 0)
                    X.to(ele2, 0.2, {
                        rotationX: -90,
                        top: itop,
                        zIndex: 100,
                    }, 0)
                })
            }

        }

        function cenneM() {
            var Y = new TimelineMax;
            Y.to('.Word1', 0.5, {
                opacity: 1
            }, 2);
            Y.to('.Word2', 2, {
                rotationX: 0,
                ease: Elastic.easeOut,
            }, 3);
            Y.to('.Word3', 2, {
                rotationX: 0,
                ease: Elastic.easeOut,
            }, 3.5);
            Y.to('.Word4', 2, {
                rotationX: 0,
                ease: Elastic.easeOut,
            }, 3);
            Y.to('.scene1 .light_left', 0.7, {
                rotationZ: 0,

            }, '-=2');
            Y.to('.scene1 .light_right', 0.7, {
                rotationZ: 0,

            }, '-=2');
            Y.to('.scene1 .scroll_down', 1, {
                opacity: 1,
                bottom: 20,
            }, '-=1');

        }

        $(window).resize(function () {
            resize();
        })

        function changeColor() {

            var colorA = ['black', 'red', 'green', 'yellow'];
            var m = 0;
            setInterval(function () {
                m++;
                m = m % colorA.length;
                $('.menu .notice').css('color', colorA[m]);
            }, 2000)
        }

        function menuS() {
            var ileft = $(window).width() * 3 / 100;
            var X = new TimelineMax;
            X.to('.menu', 1, {
                opacity: 0.7,
                left: 0,
            })
            X.to('.menu .notice', 0.5, {
                opacity: 1,
            })
            X.staggerTo('.menu .nav li', 0.5, {
                opacity: 1,
            }, 0.2)

        }

        //窗口大小变化导致的变化
        function resize() {
            $(document.body).css('height', '8500px')
            $('.scene').css({
                height: $(window).height(),
                top: $(window).height(),
            })
            $('.scene').eq(0).css('top', '0');
            var iheight = $(window).height();
            var iwidth = $(window).width();
            if (iheight < 550 || iwidth < 1000) {

                $('.light').css('display', 'none');
            } else {
                $('.light').css('display', 'block');
            }


            var ileft = (parseInt($(window).width()) / 1367) * 0.5;

            ileft = (ileft * 100) + '%';
            $('.menu .nav').css('left', ileft);
            if (parseInt($(window).width()) < 800) {
                $('.menu .nav li').css('display', 'none');
                $('.btn_list').css('display', 'block');
                $('.menu .logo').css('left', '50px');
                $('.MenuWrap').css({
                    'top': '0px',
                    left: '0px',
                    width: '100%',
                });
                $('.scene3 .contant').css({
                    'marginTop': '60px',
                    'width': '100%',
                    'position': 'absolute',
                });
                $('.scene3 .list_pic').css('display', 'block');
            } else {
                $('.menu .nav li').css('display', 'block');
                $('.btn_list').css('display', 'none');
                $('.menu .logo').css('left', '15px');
                $('.MenuWrap').css({
                    'top': '20px',
                    left: '3%',
                    width: '94%',
                });
                $('.scene3 .contant').css({
                    'marginTop': '80px',
                    'width': '33%',
                    'position': 'relative',
                });
                $('.scene3 .list_pic').css('display', 'none');
            }
        }

        $('.menu .notice').mouseenter(function () {
            $(this).html('点击删除提示');
            $(this).click(function () {
                $(this).remove();
            })
        })
        setTimeout(function () {
            $('.menu .notice').remove();
        }, 20000)
        $('.menu .notice').mouseleave(function () {
            $(this).html('NOTICE:鼠标上下滚动来控制页面');
        })
    })();


    //鼠标滚动切换屏幕
    (function () {

        function Mrotate() {

            var C = new TimelineMax();
            var ele1 = $('.menu');
            var ele2 = $('.menu2');
            var itop = $('.menu').outerHeight();

            C.to(ele1, 0.2, {
                rotationX: 90,
                top: -itop,
                zIndex: 100,
            }, 0)
            C.to(ele2, 0.2, {
                rotationX: 0,
                top: 0,
                zIndex: 101,
            }, 0)
            C.to(ele1, 0.2, {
                rotationX: 0,
                top: 0,
                zIndex: 101,
            }, 0.5)
            C.to(ele2, 0.2, {
                rotationX: -90,
                top: itop,
                zIndex: 100,
            }, 0.5)


        }

        function state(m) {
            var Z = new TimelineMax;
            var str = '.scene' + (m - 1);

            Z.to(str, 0.5, {
                top: 0,
                ease: Cubic.easeInOut,
            })
        }

        function stateDown(m) {
            var Z = new TimelineMax;
            var itop = $(window).height();
            var str = '.scene' + (m - 1);

            Z.to(str, 0.5, {
                top: itop,
                ease: Cubic.easeInOut,
            })
        }

        $(window).mousewheel(function (ev) {
            ev.preventDefault();
        })

        var m = 2;
        var onff = false;
        var aColor = ['green', '#A7A7A7', '#EB7159', '#4C5D60'];

        $(window).mousewheel(function (ev, direction) {
            var timer = null;
            if (onff == true) {

                return;
            };
            onff = true;

            setTimeout(function () {
                onff = false;
            }, 1000)
            if (direction < 1) { //向下滚动
                m++;

                if (m > 5) {
                    m = 5;
                    alert('last one');
                    return;
                }
                var n = m - 2;
                sceneQ();
                $('.menu .nav li').css('color', aColor[n]);
                state(m);
                Mrotate();
                if (n == 1) {

                    picTab();
                }
                if (n == 3) {
                    moveF();
                }
            } else { //向上滚动

                if (m < 3) {
                    m = 2;
                    alert('first one');
                    return;
                }
                stateDown(m);
                Mrotate();
                m--;
                var n = m - 2;
                sceneQ();
                $('.menu .nav li').css('color', aColor[n]);


            }

            function sceneQ() {
                if (n > 0) {
                    $('.sceneQ').animate({
                        right: 0,
                        opacity: 1,

                    }, 1000)
                    $('.sceneQ li').css({
                        'color': aColor[n],
                        background: 'rgba(255,255,255,0.4)'
                    });
                    $('.sceneQ li').eq(n).css({
                        'color': 'red',
                        background: 'black'
                    });
                }
                if (n <= 0) {
                    $('.sceneQ').animate({
                        right: -80,
                        opacity: 0,
                    }, 1000)
                }
            }
        })
        $('.sceneQ li').eq(0).mouseenter(function () {
            $(this).css('cursor', 'pointer');
        })
        $('.sceneQ li').eq(0).click(function () {
            var itop = $('.scene1').outerHeight();
            $('.scene').not('.scene1').animate({
                top: itop
            }, 500);
            m = 2;
            $('.sceneQ').animate({
                right: -80,
                opacity: 0,
            }, 1000);
            $('.menu .nav li').css('color', 'green');
        })
        $(window).resize(function () {
            state(m);

        })
    })()

    //第二屏幕

    function picTab() {
        $('.scene2 .btn_ground ul span').css('background', '#F2DFA9');
        $('.scene2 .btn_ground ul span').eq(0).css('background', '#FF6863');

        var P = new TimelineMax();
        P.to('.scene2 .step', 0.2, {
            zIndex: '3',
            opacity: '0',
        })
        P.to('.scene2 .wrapR img', 0.2, {
            rotationX: -90,
        })
        P.to('.scene2 .btn_ground', 0.2, {
            display: 'none',
        }, 0)
        P.to('.scene2 .step1', 2, {
            zIndex: '4',
            opacity: '1',
        }, 1)
        P.to('.scene2 .step1 .wrapR img', 2, {
            rotationX: 0,
            ease: Elastic.easeInOut,
        }, 1)
        P.to('.scene2 .btn_ground', 0.2, {
            display: 'block',
        })
    }

    $('.scene2 .btn_ground ul span').click(function () {

        var m = $(this).parent().index();
        $('.scene2 .btn_ground ul span').css('background', '#F2DFA9');
        $('.scene2 .btn_ground ul span').eq(m).css('background', '#FF6863');
        var B = new TimelineMax();
        B.to('.scene2 .step', 0.5, {
            zIndex: 3,
            opacity: 0,
        })
        B.to('.scene2 .wrapR img', 0.5, {
            rotationX: -90,
        })
        B.to($('.scene2 .step').eq(m), 2, {
            zIndex: '4',
            opacity: '1',
        }, 0.2)
        B.to($('.scene2 .step').eq(m).find('.wrapR img'), 0.5, {
            rotationX: 0,
            ease: Back.easeOut,
        }, 0.5)
    })

    $(window).resize(function () {
            if (parseInt($(window).width()) < 800) {
                $('.scene2 .wrapL').addClass('hide');

            } else {
                $('.scene2 .wrapL').removeClass('hide');

            }
        })
        //第三屏幕
    $('.scene3 .list_pic .btn_pic').click(function () {
            var m = $(this).index();
            $('.scene3 .contant').css('zIndex', '3').eq(m).css('zIndex', '4');

        })
        //第四屏幕
        //1.初始化第四屏幕
        //    function noneF() {
        //        var W = new TimelineMax;
        //        W.to('.scene4 .top_pic', 1, {
        //            top: '-210px',
        //
        //        }, 0);
        //        W.to('.scene4 .wrap .mid_pic', 1, {
        //            rotationX: 90,
        //
        //        }, 0)
        //        W.to('.scene4 .wrap .rotate1', 1, {
        //            rotationX: 90,
        //
        //        }, 0)
        //        W.to('.scene4 .wrap .line', 1, {
        //            display: 'none',
        //        }, 0)
        //        W.to('.scene4 .wrap .bot_pic', 1, {
        //            rotationX: 90,
        //        }, 0)
        //
        //        W.to('.scene4 .wrap .rota_wrap .rotate2', 1, {
        //            rotationX: 90,
        //
        //        }, 0)
        //        W.to('.scene4 .wrap .rota_wrap .rotate3', 1, {
        //            rotationX: 90,
        //
        //        }, 0)
        //    }
        //2.显示第四屏幕
    function moveF() {
        $('.scene4').css('zIndex', '10010');
        var W = new TimelineMax;
        W.to('.scene4 .top_pic', 2, {
            top: '0px',
            ease: Elastic.easeOut,
        }, 1);
        W.to('.scene4 .wrap .mid_pic', 0.5, {
            rotationX: 0,
            ease: Bounce.easeOut,
        }, 2)
        W.to('.scene4 .wrap .rotate1', 2, {
            rotationX: 0,
            ease: Elastic.easeOut,
        }, 2)
        W.to('.scene4 .wrap .line', 0.1, {
            display: 'block',
        }, 2)
        W.to('.scene4 .wrap .bot_pic', 0.5, {
            rotationX: 0,
            ease: Bounce.easeOut,

        }, 3)

        W.to('.scene4 .wrap .rota_wrap .rotate2', 2, {
            rotationX: 0,
            ease: Elastic.easeOut,
        }, 4)
        W.to('.scene4 .wrap .rota_wrap .rotate3', 2, {
            rotationX: 0,
            ease: Elastic.easeOut,
        }, 4)
    }

    Rotate3d($('.rotate1'), $('.A_rotate1'), $('.B_rotate1'));
    Rotate3d($('.rotate2'), $('.A_rotate2'), $('.B_rotate2'));
    Rotate3d($('.rotate3'), $('.A_rotate3'), $('.B_rotate3'));

    function Rotate3d(obj, ele1, ele2) {
        var X = new TimelineMax;
        obj.mouseenter(function () {
            X.clear();

            var itop = ele1.outerHeight();

            X.to(ele1, 0.2, {
                rotationX: 90,
                top: -itop,
                zIndex: 100,
            }, 0)
            X.to(ele2, 0.2, {
                rotationX: 0,
                top: 0,
                zIndex: 101,
            }, 0)
        })
        obj.mouseleave(function () {
            X.clear();

            var itop = ele1.outerHeight();
            X.to(ele1, 0.2, {
                rotationX: 0,
                top: 0,
                zIndex: 101,
            }, 0)
            X.to(ele2, 0.2, {
                rotationX: -90,
                top: itop,
                zIndex: 100,
            }, 0)
        })
    }

})
