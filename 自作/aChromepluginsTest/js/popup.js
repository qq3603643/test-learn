
(function($, Win){

  var btnHelper = function()
  {

    var $btnRun = $('#t_run'),$itemsIpt = $('.textIpt'),
        $rootBd = $('body'),
        helperE = {
          inteName: function()
          {
             chrome.browserAction.setBadgeText({
              text: 'Xjc'
             })
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
                  $this.val(value = value.replace(/^\s\s*|\s*\s/g, ''));
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
          handleSave: function()
          {
            if(!helperE.IptCheck()) return;
            var $this = $(this);
            Win.localStorage.setItem('t_timeForClick', $('#t_time').val());
            Win.localStorage.setItem('t_identificationForClick', $('#t_identification').val());
//引入jq
            chrome.tabs.executeScript(null, {  //null 可填为tabId指定标签 为null时测试为本标签页
                file: 'js/jquery-1.11.3.js',
                allFrames: true,
                runAt: 'document_start'
            }, function(resultArray){
            });
//自定义js
            chrome.tabs.executeScript(null, {
                file: 'js/autoClick.js',
                allFrames: true,
                runAt: 'document_start'
            }, function(resultArray){
            });

          },
          run: function()
          {
            helperE.inteName();
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