(function(Win){

	var moduleCache = {};

	function getCurrentScript()  //获取当前script的id作为唯一标识符
	{
		if(document.currentScript) return document.currentScript.id;

		var aScript = document.getElementsByTagName('script'),
			sNow;
		for(var i=-1,item;item=aScript[i+=1];)
		{
			if(item.readyState == 'interactive')
			{
				sNow = item;
				break;
			}
		}
		return sNow.id;
	};

	function require(deps, callBack)
	{
		var params = [], depCount = 0, modName,
			lenDops = deps.length;

		modName = getCurrentScript() || 'REQUIRE_MAIN';
		if(lenDops == 0)
		{
			saveModule(modName, null, callBack);
			return;
		};
		for(var i=-1,item;item=deps[i+=1];)
		{
			(function(i){
				depCount += 1;
				loadModule(deps[i], function(param){  //这里的fn在新建的script中执行(目的: 收集输出)
					params[i] = param;
					depCount -= 1;
					if(depCount == 0)
					{
						saveModule(modName, params, callBack);
					}
				})
			})(i)
		};
	};

	function getUrl(modName)
	{
		if(require.config == undefined)
			return './' + modName + 'js';
		if(require.config.hasOwnProperty(modName))
			return require.config[modName];

		return require.config.baseURL + '/' + modName + '.js';
	};

	function loadModule(modName, callBack)
	{
		if(!moduleCache.hasOwnProperty(modName))
		{
			moduleCache[modName] = {
				modName: modName,
				status: 'loading',
				exports: null,
				onload: [callBack]
			};
			var _script = document.createElement('script');
			_script.id = modName;
			_script.charset = 'utf-8';
        	_script.async = true;
        	_script.src = getUrl(modName);

           var _fs = document.getElementsByTagName('script')[0];
 	       _fs.parentNode.insertBefore(_script, _fs);

 	       return;
		}
		if(moduleCache[modName].status == 'loading')
			moduleCache[modName].onload.push(callBack);
		else
			callBack(moduleCache[modName].exports);
	};

	function saveModule(modName, params, callBack)
	{
//require主模块函数 和 单独引进定义<script>模块时执行这里
		if(!moduleCache.hasOwnProperty(modName))
		{
			moduleCache[modName] = {
				modName: modName,
				status: 'loaded',
				exports: callBack.apply(Win, params),
				onload: []
			};
			return;
		};
//当新建好script标签时 modName已经存在 执行这里
		moduleCache[modName].status = 'loaded';
		moduleCache[modName].exports = callBack ? callBack.apply(Win, params) : null;
		while(fn = moduleCache[modName].onload.shift())
			fn(moduleCache[modName].exports); //moduleCache[modName].exports 新建标签的输出 会在fn中加入最终callBack参数
	};

	Win.require = require;
	Win.define = require;
})(window)