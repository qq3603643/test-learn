var cur_bd_Text,cur_bd_Desc,cur_bd_Url;

window._bd_share_config={

    common:{

        onBeforeClick:function(cmd,config){

            var new_config={

                bdText:cur_bd_Text,

                bdDesc:cur_bd_Desc,

                bdUrl:cur_bd_Url

            };

            return new_config;

        },

        "bdSnsKey": {
            "tsina": "3973504285"
        }
    },

    share:[{
        "bdSize":16
    }]

};

with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];

$(document).ready(function(){

    $('.bdsharebuttonbox a').mouseover(function(){

        cur_bd_Text=$(this).parent().attr('text');

        cur_bd_Desc=$(this).parent().attr('desc');

        cur_bd_Url=$(this).parent().attr('url');

        return false;

    });

});