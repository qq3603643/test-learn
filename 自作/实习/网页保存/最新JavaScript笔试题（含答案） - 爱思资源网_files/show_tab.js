//复制内容自动添加版权信息

/*document.body.oncopy = function ()
{
    setTimeout(
        function ()
        {
            var text = clipboardData.getData("text");
            if (text)
            {
                text = text + "\r\n原文出自【爱思资源网】，转载请保留原文链接："+location.href;
                clipboardData.setData("text", text);
            }
        },
        100
    )
}*/

//复制内容自动添加版权信息
/* var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    if( window.ActiveXObject )
    {
        document.body.oncopy=function()
        {
            event.returnValue = false;
            var t=document.selection.createRange().text;
            var s="\r\n原文出自[爱思资源网] 转载请保留原文链接:"+location.href;
            clipboardData.setData('Text',t+'\r\n'+s);
        }
    }
    else
    {
        function addLink()
        {
            var body_element = document.getElementsByTagName('body')[0];
            var selection;
            selection = window.getSelection();
            var pagelink = "<br /> 原文出自[爱思资源网] 转载请保留原文链接:"+document.location.href;

            var copytext = selection + pagelink;
            var newdiv = document.createElement('div');
            newdiv.style.position='absolute';
            newdiv.style.left='-99999px';
            body_element.appendChild(newdiv);
            newdiv.innerHTML = copytext;
            selection.selectAllChildren(newdiv);
            window.setTimeout
            (
                function()
                {
                    body_element.removeChild(newdiv);
                },0
            );
        }
        document.oncopy = addLink;
    }
	*/
//推荐模块	
function tabs(tabTit,on,tabCon){

	$(tabCon).each(function(){

		$(this).children().eq(0).show();

	});

	$(tabTit).children().hover(function(){

		$(this).addClass(on).siblings().removeClass(on);

		var index = $(tabTit).children().index(this);

		$(tabCon).children().eq(index).show().siblings().hide();

	});

}

$(document).ready(function(){

tabs('.bt_recommend .recommend_span','on','.recommend')


});