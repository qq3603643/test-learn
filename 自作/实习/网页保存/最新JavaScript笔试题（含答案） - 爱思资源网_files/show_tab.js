//���������Զ���Ӱ�Ȩ��Ϣ

/*document.body.oncopy = function ()
{
    setTimeout(
        function ()
        {
            var text = clipboardData.getData("text");
            if (text)
            {
                text = text + "\r\nԭ�ĳ��ԡ���˼��Դ������ת���뱣��ԭ�����ӣ�"+location.href;
                clipboardData.setData("text", text);
            }
        },
        100
    )
}*/

//���������Զ���Ӱ�Ȩ��Ϣ
/* var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    if( window.ActiveXObject )
    {
        document.body.oncopy=function()
        {
            event.returnValue = false;
            var t=document.selection.createRange().text;
            var s="\r\nԭ�ĳ���[��˼��Դ��] ת���뱣��ԭ������:"+location.href;
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
            var pagelink = "<br /> ԭ�ĳ���[��˼��Դ��] ת���뱣��ԭ������:"+document.location.href;

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
//�Ƽ�ģ��	
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