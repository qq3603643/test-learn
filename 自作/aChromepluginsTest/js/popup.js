
(function($, Win){

  var btnHelper = function()
  {

    var $btnRun = $('#t_run'),$itemsIpt = $('.textIpt'),
        $rootBd = $('body'),
        iCurrentTableId,
        helperE = {
          inteBgJs: function()
          {
            var winBackgroundPage = chrome.extension.getBackgroundPage();
            // winBackgroundPage && Win.console && console.log(winBackgroundPage);

            $('.bgContent').html('已被主人使用：' + winBackgroundPage.getCountUsed() + ' times;<br>');
            $('.bgContent').append('当前标签数：' + winBackgroundPage.getCountTabs() + ' tabs;<br>');
          },
          inteAuthorName: function()
          {
             chrome.browserAction.setBadgeText({
              text: 'Xjc'
             })
          },
          inteIpt: function()
          {
            function formatNow()
            {
              var t = new Date();

              return [t.getFullYear(), t.getMonth() + 1, t.getDate()].join('-') + ' ' + [t.getHours(), t.getMinutes() + 1, '00'].join(':');
            };
            $itemsIpt.eq(0).val(Win.localStorage.getItem('t_timeForClick') || formatNow());
            $itemsIpt.eq(1).val(Win.localStorage.getItem('t_identificationForClick') || '');
          },
          getCurrentTableId: function()
          {
            iCurrentTableId = Win.localStorage.getItem('idForCurrentTable') * 1;
            console.log(iCurrentTableId * 1);
            return iCurrentTableId * 1; //引用时必须是integer类型
          },
          IptWatch: function()
          {
            var $this = $(this),
                value = $this.val();

            if(value && $this.siblings('.required').size() > 0)
              $this.siblings('.required').remove();
          },
          IptCheck: function()
          {
            var isFulled = true;
            $.each($itemsIpt, function(){
              var $this = $(this),
                  value = $this.val();

              $this.val($.trim(value));
              if(!value)
              {
                isFulled = false;
                $this.focus();
                $this.siblings('.required').size() == 0 && $this.after('<span class="required">*必填</span>');
                return false;
              }

            })
            return isFulled;
          },
          randomString: function(len)
          {
          　　len = len || 32;
          　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
              　　maxPos = $chars.length,
              　　pwd = '',
                  i = 0;
          　　for (;i < len;) {
          　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                  i++;
          　　}
          　　return pwd;
          },
          handleSave: function()
          {
            if(!helperE.IptCheck()) return;
            var $this = $(this);
            Win.localStorage.setItem('t_timeForClick', $('#t_time').val());
            Win.localStorage.setItem('t_identificationForClick', $('#t_identification').val());

            if(!Win.localStorage.getItem(iCurrentTableId + 'isExistJsMine'))
            {
              //引入jq
                        chrome.tabs.executeScript(iCurrentTableId, {  //null 可填为tabId指定标签 为null时测试为本标签页
                            file: 'js/jquery-1.11.3.js',
                            allFrames: true,
                            runAt: 'document_start'
                        }, function(resultArray){
                          // Who Care?
                        });
            //自定义js
                        chrome.tabs.executeScript(iCurrentTableId, {
                            file: 'js/autoClick.js',
                            allFrames: true,
                            runAt: 'document_start'
                        }, function(resultArray){
                          // Who Care?
                        });

                        Win.localStorage.setItem(iCurrentTableId + 'isExistJsMine', !0);
            }
/**
*去掉chrome.tabs.query 发送不了信息了？
*向特定的tab 中的js(植入网页中的js—所有) 中发送信息
*在存在多个js注入的情况下 谁先接受到就谁来执行 且只能接受执行一次
**/
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
              console.log(tabs[0].id, iCurrentTableId);
              chrome.tabs.sendMessage(iCurrentTableId, {
                    t_timeForClick: $('#t_time').val(),
                    t_identificationForClick: $('#t_identification').val()
                  }, function(response) {
                    //回调 Who Care？
                  });
              });

          },
          getTabTitle: function()
          {
            chrome.extension.sendMessage(
              {
                purpose: 'getTitle'
              },
              function(t)
              {
                $('.hd').html(t.tabTitle);
              }
            )
          },
          inte: function()
          {
            helperE.inteBgJs();
            helperE.inteAuthorName();
            helperE.inteIpt();
            helperE.getCurrentTableId();
            helperE.getTabTitle();
          },
          run: function()
          {
            helperE.inte();
            $btnRun.on('click', helperE.handleSave);
            $itemsIpt.on('input propertychange', helperE.IptWatch);
          }
        };

    return {
      inte: helperE.run
    };
  }();

  btnHelper.inte();

})(jQuery, window)