//运行在pop里的常驻程序; 关闭pop 或者 切换浏览器标签都是引用这一个; 重启浏览器开启运行；
//当pop里面引用这里的js时 是插件弹窗出来一次运行一次；所以addListener之类的就千万不要再次返回出去；

var getCountUsed = function()
{

	var count = window.localStorage.getItem('countForBgJs') * 1 || 0;

	return  function()
	{
		window.localStorage.setItem('countForBgJs', count += 1);
		return count;
	}
}();

void function storeCurrentTableId()
{
//tabchange 监听(切换； 包括新建)
	chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
	     window.localStorage.setItem('idForCurrentTable', tabId);
	});
}();

//更多标签监听事件 http://biancheng.dnbcw.info/javascript/330955.html

void function removeSignJsMine()
{
	var aStorage = window.localStorage,
		key,
		i = 0, len = aStorage.length;

	if(len == 0)	return;
	for(;i < len;)
	{
		key = aStorage.key(i++);
		if(~key.indexOf('isExistJsMine'))
		{
			aStorage.removeItem(key);
		}
	}
}();

var getCountTabs = function()
{
	var count = 1;
//create
	chrome.tabs.onCreated.addListener(function(tab) {
		count += 1;
	});
//remove
	chrome.tabs.onRemoved.addListener(function(tab){
		count -= 1;
	});

	return function()
	{
		return count;
	}
}();

void function dealTitleMessage()
{
	var _tabTitle;
	chrome.extension.onMessage.addListener(
			function(request, sender, sendResponse)
			{
				if(request.purpose == 'setTitle')
					_tabTitle = request.tabTitle;
				else(request.purpose == 'getTitle')
					sendResponse(
							{
								tabTitle: _tabTitle
							}
						);
			}
		);
}();
