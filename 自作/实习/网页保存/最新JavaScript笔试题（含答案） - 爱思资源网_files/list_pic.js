var index = 0;
var slide_si;
var titles = "1,2,3,4";
var pics = "1,2,3,4";
var links = "1,2,3,4";
function auto_slide() {
    slide_si = setInterval(function () {
        index++;
        if (index > 3)
            index = 0;
        $(".photo-box .dot-icon .cur").removeClass("cur");
        $(".photo-box .dot-icon a").eq(index).addClass('cur');
        var title = $(".photo-imgs li").eq(index).find("img").attr("alt");
        $(".photo-imgs .text").html(title);
        $(".photo-imgs ul").stop().animate({ "margin-left": (-300 * index) + "px" }, 200);
    }, 3000);
}
$(function () {
    var title_list = titles.split(',');
    var pic_list = pics.split(',');
    var link_list = links.split(',');
    for (var i = 0; i < pic_list.length; i++) {
        if (i == 0) 
            $(".photo-imgs .text").html(title_list[i]);
        //$(".photo-imgs ul").append('<li><a href="' + link_list[i] + '" target="_blank"><img src="other/.com/' + pic_list[i] + '" alt="' + title_list[i] + '" style="width:300px; height:210px;" /></a></li>');
    }
    $(".photo-imgs ul").width($(".photo-imgs ul li").length * 300);
    auto_slide();
    $(".board_img").hover(function () {
        clearInterval(slide_si);
    }, function () {
        auto_slide();
    });
    $(".photo-box .dot-icon a").hover(function () {
        clearInterval(slide_si);
        $(".photo-box .dot-icon .cur").removeClass("cur");
        $(this).addClass('cur');
        index = parseInt($(this).attr("index"));
        var title = $(".photo-imgs li").eq(index).find("img").attr("alt");
        $(".photo-imgs .text").html(title);
        $(".photo-imgs ul").stop().animate({ "margin-left": (-300 * index) + "px" }, 200);

    }, function () {
        auto_slide();
    });
});