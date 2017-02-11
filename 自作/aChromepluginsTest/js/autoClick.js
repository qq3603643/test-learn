//引入后在chrome 打开的标签页中

console.log('Hi, I am created by tangerine;');

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse)
  {
    // if (request.message == "calculate")
    //     sendResponse({result: calculate()})
    // else
    //     sendResponse({result: "不告诉你"})
    clickRun(request);
});

function clickRun(t)
{
    var sT = t.t_timeForClick,
    	aT = sT.split(/[^0-9]/g),
    	sSign = t.t_identificationForClick,
    	times = new Date(
    			aT[0], aT[1]-1, aT[2],
    			aT[3], aT[4], aT[5]
    		) * 1,
    	$btn = $(sSign),
    	timerId = null;

	timerId = setInterval(function(){
		var isClick = new Date() * 1 - times >= 0;

console.log('距离自动点击还有：' + (times - new Date() * 1)/1000 + 's');
		if(isClick)
		{
			$btn.click();
			clearInterval(timerId);
		}
	}, 666)
};
