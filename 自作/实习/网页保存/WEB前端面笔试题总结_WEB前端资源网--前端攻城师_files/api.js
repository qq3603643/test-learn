(function(){	//原型部分img
	var tuiFixed = new Function();
	tuiFixed.prototype = {
		init : function () {
			if (!this.oBox) {
				document.write("<div id='tuiFixedTemp_" + this['request']['aid'] + "'></div>");
				var tempDom = document.getElementById('tuiFixedTemp_' + this.request.aid)
					this.oBox = tempDom.parentNode;
				this.oBox.removeChild(tempDom);
			};
			//若宽度自适应，计算父容器宽度
			if (this['set']['style']['style_width'] == 0) {
				var pl = parseInt(getEyeJsStyle(this.oBox, 'paddingLeft')) || 0;
				var pr = parseInt(getEyeJsStyle(this.oBox, 'paddingRight')) || 0;
				var oWidth = parseInt(this.oBox.offsetWidth) - pl - pr;
				this['width'] = oWidth;
				var li_width = Number(this['set']['pic']['pic_width']) + 14;
				var ul_width = oWidth - 22;
				var pic_col = Math.floor(ul_width / li_width) || 1;
				//console.log (oWidth,li_width,ul_width,pic_col)
				this['style_pic_col'] = pic_col;
			} else {
				this['width'] = this['set']['style']['style_width'];
				this['style_pic_col'] = this['set']['style']['style_pic_col'];
			};
			function getEyeJsStyle(obj,styleName){
				if(obj.currentStyle){//ie
				   return obj.currentStyle[styleName];
				}else{ //ff
				   var arr=window.getComputedStyle(obj , null)[styleName];
				   return arr;
				};
			};
			//若高度自适应，计算内容高度
			if (this['set']['style']['style_length'] == 0) {
				//??
			} else {
				this['height'] = this['set']['style']['style_length'];
			};
			//分页
			this.page = 1;
			//每页数据
			if (this['set']['base']['data_type'] == 0) {
				this.perPage = this['set']['style']['style_txt_col'] * this['set']['style']['style_txt_row'];
			} else if (this['set']['base']['data_type'] == 2) {
				this.perPage = this['style_pic_col'] * this['set']['style']['style_pic_row'];
			} else {
				this.perPage = this['style_pic_col'] * this['set']['style']['style_pic_row'] + this['set']['style']['style_txt_col'] * this['set']['style']['style_txt_row'];
			};
			/***默认数据***/
			if (!this['set']['slide']) {
				this['set']['slide'] = {
					"slide_type" : "0", //切换类型 0 = 关闭 1 = 换一换 2 = 幻灯
					"change_title" : "1", //换一换 文字 0 = 未开启 1 = 开启
					"change_title_txt" : "换一换", //换一换 文字
					"change_title_size" : "12", //换一换 字体大小
					"change_title_bold" : "0", //换一换 字体粗细	0=无 1=有
					"change_title_family" : "0", //换一换 字体
					"change_title_color" : "333333", //换一换 字体颜色
					"change_icon" : "1", //换一换 图标 0 = 未开启 1 = 开启
					"change_icon_type" : "1", //换一换 标志 0 = 白色 1 = 橙色
					"change_background_color" : "0", //换一换 背景 0 = 灰色 1 = 白色透明
					"change_show_type" : "0" //换一换 形式 0 = 无动画 1 = 左右 2 = 渐隐渐现
				};
			};
			//数据总数
			this.total = this.data.length;
			//总页数
			this.maxPage = Math.floor(this.total / this.perPage);
			this.maxPage = Math.min(this.maxPage, 3);
			this.maxPage = Math.max(this.maxPage, 1);
			//创建iframe
			var iframe = document.createElement('iframe');
			iframe.setAttribute('allowTransparency', 'true');
			iframe.setAttribute('frameBorder', '0');
			iframe.setAttribute('scrolling', 'no');
			iframe.style.cssText = 'float:none;display:block;overflow:hidden;z-index:2147483646;margin:0;padding:0;border:0 none;background:none;';
			iframe.style.height = this['height'] + 'px';
			iframe.style.width = this['width'] + 'px';
			this.oBox.appendChild(iframe);
			if (/msie/i.test(navigator.userAgent)) {
				var that = this;
				try {
					iframe.contentWindow.document;
					this.o = iframe;
					//创建内容
					this.createHtml();
				} catch (e) {
					var base = document.getElementsByTagName('base');
					if (base && base.length > 0) {
						var baseTarget = {};
						for (var i=0;i<base.length;i++) {
							baseTarget[base[i]] = base[i].target;
							if (base[i].target == '_self') {
								continue;
							};
							base[i].target = '_self';
						};
					};
					
					iframe.src = 'javascript:void((function(){document.open();document.domain="' + document.domain + '";document.close()})())';
					if (!window.XMLHttpRequest) {
						setTimeout(function () {
							that.o = iframe;
							that.createHtml();
						}, 0);
					} else {
						this.o = iframe
							//创建内容
							this.createHtml();
					};
					
					if (base && base.length > 0) {
						for (var i=0;i<base.length;i++) {
							if (base[i].target != '_self') {
								continue;
							};
							base[i].target = baseTarget[base[i]];
						};
					};
				}
			} else {
				this.o = iframe
					//创建内容
					this.createHtml();
			};
			//请求
			if (!this.demo) {
				this.funcQuery();
			};

		},
		createHtml : function () {
			var that = this;
			this.oDoc = this.o.contentWindow.document;
			this.oDoc.open();
			this.oDoc.write("<!doctype html><html><head><meta charset='utf-8'><title>无标题文档</title><style type='text/css'>body,div,ul,li,em,span,a,p{padding:0;margin:0;}img{border:0 none;display:block;}em{font-weight:normal;font-style:normal;}ol,ul{list-style:none;}table{border-collapse:collapse;border-spacing:0;}.tui{overflow:hidden;border-width:1px;border-style:solid;position:relative;}.title{overflow:hidden;position:relative;}.tools_0{position:absolute;top:0;right:5px;overflow:hidden;}.tools_1{position:relative;height:30px;line-height:30px;overflow:hidden;right:5px;}.logo{float:left;}.logo a{display:block;width:18px;height:12px;overflow:hidden;text-indent:-999em;cursor:pointer;position:absolute;left:10px;top:50%;margin-top:-6px;}.logo span{float:left;padding-left:33px;}.change{height:20px;overflow:hidden;line-height:20px;display:none;position:relative;right:0;top:50%;margin-top:-10px;}.change{float:right;}.change a{height:20px;overflow:hidden;font-size:12px;float:left;color:#333;text-decoration:none;}.change a:hover{background:none;}.change,.change em,.change b,.change span,.change i{cursor:pointer;}.change em{float:left;height:20px;position:relative;z-index:2;font-style:normal;overflow:hidden;}.change b{display:block;text-indent:-999em;width:10px;height:20px;float:left;}.change span{float:left;height:20px;}.change i{float:left;height:20px;width:20px;background-repeat:no-repeat;}.change i.i_1{background-position:0 0;}.change i.i_0{background-position:0 -20px;_margin-top:-20px;}.change a.a_0 em{background:#eee;}.change a.a_0 b.b_0{background-position:0 0;_margin-top:0;}.change a.a_0 b.b_1{background-position:0 -30px;_margin-top:-30px;}.change a.a_0:hover b.b_0{background-position:0 -60px;_margin-top:-60px;}.change a.a_0:hover b.b_1{background-position:0 -90px;_margin-top:-90px;}.change a.a_0:hover em{background-color:#e1e1e1;}.change a.a_1 em{background-position:0 -240px;background-repeat:repeat-x;_filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#33FFFFFF',endColorstr='#33FFFFFF');_background:none;}.change a.a_1 b.b_0{background-position:0 -120px;_margin-top:-120px;}.change a.a_1 b.b_1{background-position:0 -150px;_margin-top:-150px;}.change a.a_1:hover b.b_0{background-position:0 -180px;_margin-top:-180px;}.change a.a_1:hover b.b_1{background-position:0 -210px;_margin-top:-210px;}.change a.a_1:hover em{background-position:0 -270px;background-repeat:repeat-x;_background:none;_filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#7FFFFFFF',endColorstr='#7FFFFFFF');}.link{float:right;display:none;}#link a,#foot a{color:#969696;font-size:12px;text-decoration:none;}#link a:hover,#foot a:hover{text-decoration:underline;}.content{overflow:hidden;margin:0 10px;}.box,.img,.txt{width:9999em;overflow:hidden;}.img ul{float:left;}.img li{float:left;overflow:hidden;margin-top:10px;display:inline;}.img li.i_0{margin-left:0;}.img img{display:block;overflow:hidden;}.img a{display:block;width:100%;}.img a em{display:block;overflow:hidden;cursor:pointer;}.img a span{display:block;overflow:hidden;padding-top:5px;cursor:pointer;}.txt{padding-top:10px;}.txt ul{float:left;}.txt li{display:inline;float:left;overflow:hidden;}.hot{overflow:hidden;margin-top:10px;}.hot ul{overflow:hidden;*zoom:1;}.hot li{float:left;word-wrap:normal;word-break:keep-all;padding-left:10px;}.foot{height:30px;line-height:30px;text-align:right;font-size:12px;}.focus{height:16px;line-height:16px;overflow:hidden;float:right;display:none;position:relative;right:0;top:50%;margin-top:-8px;}.focus li{float:left;width:16px;height:16px;text-align:center;padding-left:5px;}.focus a{display:block;width:16px;height:16px;overflow:hidden;text-decoration:none;font-size:12px;}</style></head><body><div class='tui' id='tui'><div id='title' class='title'><div class='logo' id='logo'><a href='' target='_blank' hidefocus='true' title='云推荐'>云推荐</a><span></span></div></div><div id='tools'><div id='change' class='change'><a href='javascript:;' hidefocus='true'><b class='b_0'></b><em><i></i><span></span></em><b class='b_1'></b></a></div><div id='link' class='link'><a href='' target='_blank' title='云推荐'>云推荐</a></div><ol id='focus' class='focus'></ol></div><div id='content' class='content'><div class='box' id='box'><div class='img' id='img'></div><div id='txt' class='txt'></div></div><div id='hot' class='hot'></div><div id='foot' class='foot'><a href='' target='_blank' title='云推荐'>云推荐</a></div></div></div>" + this.funcStyle() + "</body></html>");
			this.oDoc.close();
			//定义容器
			this.oTui = this.oDoc.getElementById('tui'); //外容器
			this.oTitle = this.oDoc.getElementById('title'); //标题栏
			this.oImg = this.oDoc.getElementById('img'); //图片容器
			this.oTxt = this.oDoc.getElementById('txt'); //文字容器
			this.oHot = this.oDoc.getElementById('hot'); //热词容器
			this.oFoot = this.oDoc.getElementById('foot'); //底部	链接
			this.oLink = this.oDoc.getElementById('link'); //头部 链接
			this.oChange = this.oDoc.getElementById('change'); //换一换
			this.oFocus = this.oDoc.getElementById('focus');	//轮播
			this.oContent = this.oDoc.getElementById('content'); //内容
			this.oCon = this.oDoc.getElementById('box'); //图文容器
			this.oLogo = this.oDoc.getElementById('logo'); //logo
			this.oTools = this.oDoc.getElementById('tools'); //tools
			//标题
			var ts = this.oLogo.getElementsByTagName('span')[0];
			var ta = this.oLogo.getElementsByTagName('a')[0];
			if (this['set']['txt']['txt_title_icon'] == 0 && this['set']['txt']['txt_title'] == 0) {
				this.oTitle.style.display = 'none';
				this.oTools.className = "tools_1";
			} else {
				this.oTools.className = "tools_0";
				if (this['set']['txt']['txt_title_icon'] == 1) {
					ta.href = this.tuiUrl + '?pd=logo';
					if (this['set']['logo']['logo_background_user'] != 2) {
						ta.className = 'a_' + this['set']['logo']['logo_background_user'];
					} else {
						ta.style.backgroundImage = 'url(' + this['set']['logo']['logo_background_img'] + ')';
						ta.style.backgroundPosition = '0 0';
						ta.style.backgroundRepeat = 'no-repeat';
					};
				} else {
					ts.style.paddingLeft = '10px';
					ta.style.display = 'none';
				};
				if (this['set']['txt']['txt_title'] == 1) {
					ts.innerHTML = this['set']['txt']['txt_title_txt'];
				};
			};
			//tools是否出现
			if ((this['set']['slide']['slide_type'] == 0 || this.maxPage == 1) && this['set']['logo']['logo_position'] != 1) {
				this.oTools.style.display = "none";
			} else {
				//换一换
				if (this['set']['slide']['slide_type'] != 1 || this.maxPage == 1) {
					this.oChange.style.display = "none";
				} else {
					this.oChange.style.display = "block";
					var cs = this.oChange.getElementsByTagName("span")[0]; //文字
					var ca = this.oChange.getElementsByTagName("a")[0]; //按钮背景
					var ci = this.oChange.getElementsByTagName("i")[0]; //图标
					this.oChange.title = this['set']['slide']['change_title_txt'] || '换一换';
					if (this['set']['slide']['change_title'] == 1) {
						cs.innerHTML = this['set']['slide']['change_title_txt'];
					} else {
						cs.style.display = "none";
					};
					if (this['set']['slide']['change_icon'] == 1) {
						ci.className = "i_" + this['set']['slide']['change_icon_type'];
					} else {
						ci.style.display = "none";
					};
					ca.className = "a_" + this['set']['slide']['change_background_color'];
					this.oChange.onclick = function () {
						that.funcChange();
					};
				};
				//轮播
				clearInterval(that.autoTime);
				if (this['set']['slide']['slide_type'] != 2 || this.maxPage == 1) {
					this.oFocus.style.display = "none";
				} else if (this['set']['slide']['slide_type'] == 2) {
					clearInterval(that.autoTime);
					var focusHtml = '';
					for (var i = 1;i <= this.maxPage;i++) {
						focusHtml += '<li><a href="javascript:;">'+ i +'</a></li>';
					};
					this.oFocus.innerHTML = focusHtml;
					this.oFocus.style.display = "block";
					var focusA = this.oFocus.getElementsByTagName('a');
					focusA[0].className = 'active';
					for (var i=0;i<focusA.length;i++) {
						focusA[i].index = i;
						focusA[i].onclick = function (){
							clearInterval(that.autoTime)
							showFocus(this.index);
						};
					};
					function showFocus(index,boo){
						removeAllClass();
						var node = focusA[index] || focusA[0];
						node.className = 'active';
						var page = index + 1;
						if (boo) {
							that.funcChange();
						} else {
							that.funcChange(1,page);
						};
						
					};
					function autoFocus(pages){
						clearInterval(that.autoTime);
						pages = pages || 1;
						var timer = that['set']['slide']['slide_timer'] || 5;
						timer = timer * 1000;
						that.autoTime = setInterval(
							function(){
								showFocus(pages,1);
								pages == that.maxPage ? pages = 1 : pages ++;
							},
							timer
						);
					};
					autoFocus();
					this.oDoc.onmouseout = function (){
						for (var i = 0;i < focusA.length;i++) {
							if (focusA[i].className == 'active') {
								autoFocus(i+1);
								break;
							};
						};
					};
					this.oDoc.onmouseover = function (){
						clearInterval(that.autoTime);
					};
					function removeAllClass(){
						for (var i=0;i<focusA.length;i++) {
							focusA[i].className = '';
						};
					};
				};
				//云推荐位置
				if (this['set']['logo']['logo_position'] && this['set']['logo']['logo_position'] == 1) {
					this.oFoot.style.display = "none";
					this.oLink.style.display = "block";
				} else {
					this.oFoot.style.display = "block";
					this.oLink.style.display = "none";
				};
			};
			this.oFoot.getElementsByTagName('a')[0].href = this.tuiUrl + '?pd=PowerBy';
			this.oLink.getElementsByTagName('a')[0].href = this.tuiUrl + '?pd=PowerBy';
			//内容
			for (var j = 0; j < this.maxPage; j++) {
				var dataLength = this['data'].length - this.perPage * j;
				var target = '_blank';
				if (this['set']['txt']['txt_link_target'] == 1 && !this.demo) {
					target = '_parent';
				};
				//图片容器内容
				if (this['set']['base']['data_type'] != 0) {
					//图片
					//显示图片数量
					var imgLength = Math.min(this['style_pic_col'] * this['set']['style']['style_pic_row'], dataLength);
					var trueimg = 0,
					defaultimg = 0,
					itelimg = 0,
					totalimg = 0;
					var ihtml = '';
					for (var x = 0; x < imgLength; x++) {
						var i = x + this.perPage * j;
						if (!this['data'][i]['title']) {
							continue;
						}
						if (x % this['style_pic_col'] != 0) {
							ihtml += "<li>";
						} else {
							ihtml += '<li class="i_0">';
						};
						var has_thumb = this['data'][i]['has_thumb'] || 'false';
						var is_smart_thumb = this['data'][i]['is_smart_thumb'] || 'false';
						ihtml += "<a href='" + this['data'][i]['url'] + "' target='" + target + "' title='" + this['data'][i]['title'] + "'><em><img src='" + this['imgLoad'] + "' alt='" + this['data'][i]['thumbnail'] + "' title='" + this['data'][i]['title'] + "' hidefocus='true' jsdata='" + has_thumb + "' userimg='" + this['data'][i]['algId'] + "' data-img='" + is_smart_thumb + "'></em>";
						if (this['set']['pic']['pic_summary'] == '1') {
							if (this['data'][i]['title']) {
								ihtml += "<span>" + this['data'][i]['title'] + "</span>";
							} else {
								ihtml += "<span></span>";
							};
						};
						ihtml += "</a></li>";
					};
					var imgUl = this.oDoc.createElement("ul");
					imgUl.innerHTML = ihtml;
					this.oImg.appendChild(imgUl);

					//load图片
					var Img = this.oImg.getElementsByTagName('img');

					//yahoo
					if (window.location.href.indexOf('yahoo.com') != -1) {
						this['set']['pic']['pic_scale'] = 2;
					};
					for (var i = 0; i < Img.length; i++) {
						loadImg(Img[i]);
					};
				} else {
					imgLength = 0;
					this.oImg.style.display = 'none';
				};
				//文字
				//剩余数据量
				var dataLeft = (this['data'].length - imgLength) || 0;
				//文字显示数量
				var txtLength = Math.min(this['set']['style']['style_txt_col'] * this['set']['style']['style_txt_row'], dataLeft);
				//文字容器内容
				if (this['set']['base']['data_type'] != '2' && dataLeft >= 1) {
					var thtml = '<ul>';
					for (var x = imgLength; x < imgLength + txtLength; x++) {
						var i = x + this.perPage * j;
						if (this['data'][i]['title']) {
							if (this['set']['txt']['txt_focus'] == 1) {
								thtml += "<li>&bull;&nbsp;";
							} else if (this['set']['txt']['txt_focus'] == 2) {
								thtml += "<li>▪&nbsp;";
							} else {
								thtml += "<li>";
							};
							thtml += "<a href='" + this['data'][i]['url'] + "' target='" + target + "' title='" + this['data'][i]['title'] + "' hidefocus='true'>" + this['data'][i]['title'] + "</a></li>";
						};
					};
					thtml += '</ul>';
					this.oTxt.innerHTML += thtml;
				} else {
					this.oTxt.style.display = 'none';
				};
			};
			//图片功能
			function loadImg(oBj) {
				if (Sys().ie == '6.0' || Sys().ie == '7.0') {
					var a = oBj.parentNode.parentNode;
					a.onclick = function () {
						if (that['set']['txt']['txt_link_target'] == 1 && !that.demo) {
							window.location.href = a.href;
						} else {
							window.open(a.href);
						};
						return false;
					};
				};
				tryImg(oBj, 0)
			};
			function tryImg(oBj, index) {
				var src = oBj.getAttribute('alt');
				var jsdata = oBj.getAttribute('jsdata');
				var userimg = oBj.getAttribute('userimg'); //stick
				var size = Math.max(Number(that['set']['pic']['pic_width']), Number(that['set']['pic']['pic_length']));
				var is_smart_thumb = oBj.getAttribute('data-img');
				var img = new Image();
				var ErrorNum = that.errorNum || 7;
				
				if (jsdata == 'false') {
					userimg = 'false';
				};
				
				if (userimg == 'stick' || window.location.href.indexOf('meishichina.com') != -1) {
					if (index == 1) {
						index = 2;
						src = that.errorDir + Math.ceil(Math.random() * ErrorNum) + '.jpg';
					};
				} else {
					if ((jsdata == 'false' || index >= 2) && !that.demo) {
						src = that.errorDir + Math.ceil(Math.random() * ErrorNum) + '.jpg';
					} else if (index == 0) {
						if (userimg == 'stick') {
							src = src;
						} else if (size > 96) {
							src = src + '_b';
						};
					} else if (index == 1) {
						if (size <= 96) {
							src = src + '_b';
						};
					};
				};

				img.onload = function () {
					totalimg++
					if (jsdata == 'false' || index >= 2) {
						defaultimg++;
					} else if (is_smart_thumb != 'false') {
						itelimg++;
					} else {
						trueimg++;
					};
					imgStatus();
					loadFunc(this, oBj, that['set']['pic']['pic_scale'], src);
				};
				img.onerror = img.onabort = function () {
					if (index < 2) {
						index++;
						tryImg(oBj, index);
					};
				};
				img.src = src;
			};
			function imgStatus() {
				if (totalimg == Img.length && !that.demo) {
					var url = '&' + encodeURIComponent(String.fromCharCode(1)) + '&ch=wprdsp&l=img&hid=' + that['request']['hid'] + '&trueimg=' + trueimg + '&defaultimg=' + defaultimg + '&itelimg=' + itelimg;
					questImg(url);
				};
			};
			function loadFunc(img, oBj, type, src) {
				var w = img.width;
				var h = img.height;
				var w0 = Number(that['set']['pic']['pic_width']);
				var h0 = Number(that['set']['pic']['pic_length']);
				if (!type || type == 0) {
					if (oBj) {
						oBj.style.height = h0 + 'px';
						oBj.style.width = w0 + 'px';
					};
				} else if (type == 1) {
					if (w * h0 >= w0 * h) {
						var h1 = Math.ceil(w0 * h / w);
						if (oBj) {
							oBj.style.width = w0 + 'px';
							oBj.style.height = h1 + 'px';
							oBj.style.marginTop = (h0 - h1) / 2 + 'px';
						};
					} else {
						var w1 = Math.ceil(w * h0 / h);
						if (oBj) {
							oBj.style.width = w1 + 'px';
							oBj.style.height = h0 + 'px';
							oBj.style.marginLeft = (w0 - w1) / 2 + 'px';
						};
					};
				} else if (type == 2) {
					if (w * h0 >= w0 * h) {
						var w1 = Math.ceil(w * h0 / h);
						if (oBj) {
							oBj.style.height = h0 + 'px';
							oBj.style.width = w1 + 'px';
						};
					} else {
						var h1 = Math.ceil(w0 * h / w);
						if (oBj) {
							oBj.style.width = w0 + 'px';
							oBj.style.height = h1 + 'px';
						};
					};
				};
				if (oBj)
					oBj.setAttribute('src', src);
			};
			//热词
			if (this['set']['hot']['data_hot'] != 0 && this['set']['hot']['data_hot_txt'] != '') {
				var hhtml = '<ul>';
				var hotLength = this['set']['hot']['data_hot_num'];
				var hotList = this['set']['hot']['data_hot_txt'].split(',');
				
				if (hotLength == 0) {
					hotLength = Math.max(5, hotList.length)
				};
				
				//标签热词
				var hotReco = [];
				if (typeof(aliyun_recommend_opts) == 'object' && aliyun_recommend_opts['tags']) {
					var hotRecoTmp = aliyun_recommend_opts['tags'].split(',');
					for (var i=0;i<hotRecoTmp.length;i++) {
						if (!hotRecoTmp[i]) {
							continue;
						};
						hotReco.push(hotRecoTmp[i]);
					};
				};
				//用户热词
				var hotUserNum = this['set']['hot']['data_hot_txt_user'] || 0;
				if (hotUserNum == 0) {
					hotLength = Math.min(hotLength, hotList.length + hotReco.length);
					if (hotReco[0]) {
						for (var i = 0; i < Math.min(hotReco.length,hotLength); i++) {
							hhtml += "<li><a href='" + this.searchUrl + "?kw=" + encodeURIComponent(hotReco[i]) + "&site=" + (this.request.sid || '') + "&ip=" + (this.ip || '') + "&pui=czb&cok=" + (this.Rcookie || '') + "&vr=1&hid=" + (this.request.hid || '') + "&bkt=" + (this.request.bkt || '') + "&ch=kwrdc&l=click&ft=" + this['ft'] + "&ps=" + i + "&wd=" + encodeURIComponent(hotReco[i]) + "&aid=" + this['request']['aid'] + "&sid=" + this['request']['aid'] + "' target='_blank' title='" + hotReco[i] + "' hidefocus='true'>" + hotReco[i] + "</a></li>";
						};
					};
					hotList.sort(function () {
						return 0.5 > Math.random();
					});
					for (var i = 0; i < hotLength - Math.min(hotReco.length, hotLength); i++) {
						if (hotList[i]) {
							hhtml += "<li><a href='" + this.searchUrl + "?kw=" + encodeURIComponent(hotList[i]) + "&site=" + (this.request.sid || '') + "&ip=" + (this.ip || '') + "&pui=czb&cok=" + (this.Rcookie || '') + "&vr=1&hid=" + (this.request.hid || '') + "&bkt=" + (this.request.bkt || '') + "&ch=kwrdc&l=click&ft=" + this['ft'] + "&ps=" + i + "&wd=" + encodeURIComponent(hotList[i]) + "&aid=" + this['request']['aid'] + "&sid=" + this['request']['aid'] + "' target='_blank' title='" + hotList[i] + "' hidefocus='true'>" + hotList[i] + "</a></li>";
						};
					};
				} else {
					var hotUser = [];
					var hotAgg = [];
					for (var i = 0; i < hotLength; i++) {
						if (i < hotUserNum) {
							hotUser.push(hotList[i]);
						} else {
							hotAgg.push(hotList[i])
						};
					};
					hotList = hotReco.concat(hotAgg);
					if (hotUser[0]) {
						for (var i = 0; i < Math.min(hotUser.length,hotLength); i++) {
							hhtml += "<li><a href='" + this.searchUrl + "?kw=" + encodeURIComponent(hotUser[i]) + "&site=" + (this.request.sid || '') + "&ip=" + (this.ip || '') + "&pui=czb&cok=" + (this.Rcookie || '') + "&vr=1&hid=" + (this.request.hid || '') + "&bkt=" + (this.request.bkt || '') + "&ch=kwrdc&l=click&ft=" + this['ft'] + "&ps=" + i + "&wd=" + encodeURIComponent(hotUser[i]) + "&aid=" + this['request']['aid'] + "&sid=" + this['request']['aid'] + "' target='_blank' title='" + hotUser[i] + "' hidefocus='true'>" + hotUser[i] + "</a></li>";
						};
					};
					hotList.sort(function () {
						return 0.5 > Math.random();
					});
					for (var i = 0; i < (hotLength - Math.min(hotUser.length, hotLength)); i++) {
						if (hotList[i]) {
							hhtml += "<li><a href='" + this.searchUrl + "?kw=" + encodeURIComponent(hotList[i]) + "&site=" + (this.request.sid || '') + "&ip=" + (this.ip || '') + "&pui=czb&cok=" + (this.Rcookie || '') + "&vr=1&hid=" + (this.request.hid || '') + "&bkt=" + (this.request.bkt || '') + "&ch=kwrdc&l=click&ft=" + this['ft'] + "&ps=" + i + "&wd=" + encodeURIComponent(hotList[i]) + "&aid=" + this['request']['aid'] + "&sid=" + this['request']['aid'] + "' target='_blank' title='" + hotList[i] + "' hidefocus='true'>" + hotList[i] + "</a></li>";
						};
					};
				};
				
				hhtml += '</ul>';
				this.oHot.innerHTML = hhtml;
			} else {
				this.oHot.style.display = 'none';
			};
			//边框
			if (this['set']['txt']['txt_border'] == 1) {
				this.oTxt.className += " bor";
			};
			//无间隔滚动
			if ((this['set']['slide']['change_show_type'] == 1 && this['set']['slide']['slide_type'] == 1) || (this['set']['slide']['focus_show_type'] == 1 && this['set']['slide']['slide_type'] == 2)) {
				if (this['set']['base']['data_type'] == 0) {
					var ul_0 = this.oDoc.createElement('ul');
					ul_0.innerHTML = this.oTxt.getElementsByTagName('ul')[0].innerHTML;
					this.oTxt.appendChild(ul_0);
				} else if (this['set']['base']['data_type'] == 2){
					var ul_1 = this.oDoc.createElement('ul');
					ul_1.innerHTML = this.oImg.getElementsByTagName('ul')[0].innerHTML;
					this.oImg.appendChild(ul_1);
					var img_1 = ul_1.getElementsByTagName('img');
					for (var i = 0; i < img_1.length; i++) {
						loadImg(img_1[i]);
					};
				} else if (this['set']['base']['data_type'] == 1) {
					var ul_0 = this.oDoc.createElement('ul');
					ul_0.innerHTML = this.oTxt.getElementsByTagName('ul')[0].innerHTML;
					this.oTxt.appendChild(ul_0);
					var ul_1 = this.oDoc.createElement('ul');
					ul_1.innerHTML = this.oImg.getElementsByTagName('ul')[0].innerHTML;
					this.oImg.appendChild(ul_1);
					var img_1 = ul_1.getElementsByTagName('img');
					for (var i = 0; i < img_1.length; i++) {
						loadImg(img_1[i]);
					};
				};
			};
		},
		funcChange : function (boo,page) {
			var that = this;
			var imgNode = this.oImg.getElementsByTagName("ul");
			var txtNode = this.oTxt.getElementsByTagName("ul");
			//无效果
			if ((this['set']['slide']['change_show_type'] == 0 && this['set']['slide']['slide_type'] == 1) || (this['set']['slide']['focus_show_type'] == 0 && this['set']['slide']['slide_type'] == 2)) {
				if (!boo) {
					if (this.page == this.maxPage) {
						this.page = 1;
					} else {
						this.page++;
					};
				} else {
					this.page = page;
				};
				if (this['set']['base']['data_type'] != 0) {
					for (var i = 0; i < imgNode.length; i++) {
						if (i == that.page - 1) {
							imgNode[i].style.display = 'block';
						} else {
							imgNode[i].style.display = 'none';
						};
					};
				};
				if (this['set']['base']['data_type'] != 2) {
					for (var i = 0; i < txtNode.length; i++) {
						if (i == that.page - 1) {
							txtNode[i].style.display = 'block';
						} else {
							txtNode[i].style.display = 'none';
						};
					};
				};
			};
			//左右
			if ((this['set']['slide']['change_show_type'] == 1 && this['set']['slide']['slide_type'] == 1) || (this['set']['slide']['focus_show_type'] == 1 && this['set']['slide']['slide_type'] == 2)) {
				if (!boo) {
					if (this.page - this.maxPage == 1) {
						that.oCon.style.marginLeft = 0;
						this.page = 1;
					};
					this.page ++;
				} else {
					this.page = page;
				};
				clearTimeout(that.scrollTime);
				var w = this['width'] - 22;
				var t = 0 - w * this.page + w;
				this.scrollTime = setInterval(
					function () {
						var left = parseInt(that.oCon.style.marginLeft || 0);
						var step = (t - left) / 10;
						step = step > 0 ? Math.ceil(step) : Math.floor(step);
						if (left == t) {
							clearInterval(that.scrollTime);
						} else {
							that.oCon.style.marginLeft = left + step + 'px';
						};
					}, 10
				);
			};
			//渐现
			if ((this['set']['slide']['change_show_type'] == 2 && this['set']['slide']['slide_type'] == 1) || (this['set']['slide']['focus_show_type'] == 2 && this['set']['slide']['slide_type'] == 2))  {
				if (!boo) {
					if (this.page == this.maxPage) {
						this.page = 1;
					} else {
						this.page++;
					};
				} else {
					this.page = page;
				};
				clearTimeout(that.fadeTime);
				var t = 0;
				if (this['set']['base']['data_type'] != 0) {
					for (var i = 0; i < imgNode.length; i++) {
						if (i == that.page - 1) {
							imgNode[i].style.display = 'block';
						} else {
							imgNode[i].style.display = 'none';
						};
					};
				};
				if (this['set']['base']['data_type'] != 2) {
					for (var i = 0; i < txtNode.length; i++) {
						if (i == that.page - 1) {
							txtNode[i].style.display = 'block';
						} else {
							txtNode[i].style.display = 'none';
						};
					};
				};
				var node = that.oCon;
				if (!document.documentMode && (Sys().ie == "6.0" || Sys().ie == "7.0") || Sys().ie == "8.0") {
					node = that.oContent;
				};
				this.fadeTime = setInterval(
						function () {
						if (t > 100) {
							clearInterval(that.timer);
						} else {
							setOpacity(node, t);
							t += 1;
						};

					}, 15);
				function setOpacity(elem, level) {
					if (elem.filters) {
						elem.style.filter = "alpha(opacity=" + level + ")";
						elem.style.zoom = 1;
					} else {
						elem.style.opacity = level / 100;
					};
				};
			};
			if (!this.demo) {
				var hid = this['request']['hid'];
				var bkt = this['request']['bkt'];
				var la = encodeURIComponent(String.fromCharCode(1));
				var lb = encodeURIComponent(String.fromCharCode(2));
				var url = '';
				url = '&' + la + '&ch=wprdsp&l=flush&pg='+ this.page +'&hid=' + hid + '&bkt=' + bkt;
				questImg(url);
			};
		},
		funcStyle : function () {
			//计算图片间距 MM=( W - (MW+4)*COL - 22) / (COL-1)
			var W = Number(this['width']);
			var MW = Number(this['set']['pic']['pic_width']);
			var MH = Number(this['set']['pic']['pic_length']);
			var MCOL = Number(this['style_pic_col']);
			var MROW = Number(this['set']['style']['style_pic_row']);
			var MM = Math.floor((W - MW * MCOL - 4 * MCOL - 22) / (MCOL - 1));
			//文字宽度 TW=(W - COL*20 + 18 )/COL
			var TCOL = Number(this['set']['style']['style_txt_col']);
			var TW = Math.floor((W - 22 - TCOL * 10) / TCOL);
			//热词行高
			var HLH = Number(this['set']['hot']['hot_body_margin']);
			//标题行高
			var TLH = Number(this['set']['txt']['txt_title_margin']);
			//文字行高
			var BLH = Number(this['set']['txt']['txt_body_margin'])
				//各种配置
				var style = "<style type='text/css'>";
			style += ".tui{width:" + (W - 2) + "px;height:" + (this['set']['style']['style_length'] - 2) + "px;background:#" + this['set']['style']['style_background_color'] + ";border-color:#" + this['set']['style']['style_border_color'] + ";}";
			var font_family = ['arial', 'tahoma', 'sans-serif', 'SimSun', 'SimHei', 'Microsoft YaHei'];
			var bold = 400;
			if (this['set']['txt']['txt_title_bold'] == 1) {
				bold = 700;
			};
			style += ".title {height:" + this['set']['txt']['txt_title_margin'] + "px;line-height:" + this['set']['txt']['txt_title_margin'] + "px;font-size:" + this['set']['txt']['txt_title_size'] + "px;font-weight:" + bold + ";font-family:" + font_family[this['set']['txt']['txt_title_family']] + ";color:#" + this['set']['txt']['txt_title_color'] + ";}";
			style += ".tools_0 {height:" + this['set']['txt']['txt_title_margin'] + "px;line-height:" + this['set']['txt']['txt_title_margin'] + "px;}"
			if (this["set"]["txt"]["txt_title_background"] == 1) {
				style += ".title {background:url(" + this["set"]["txt"]["txt_title_bgimage"] + ") 0 0 repeat;}";
			} else {
				style += ".title {background-color:#" + this["set"]["txt"]["txt_title_bgcolor"] + ";}";
			};
			style += ".content{width:" + (W - 22) + "px;}";
			style += ".bor{background:url(" + this.imgDir + "border.png) left top repeat-x;}";
			style += ".logo a.a_1{background:url(" + this.imgDir + "logo_pink.png) 0 0 no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=noscale,src='" + this.imgDir + "logo_pink.png');_background:none;}";
			style += ".logo a.a_0{background:url(" + this.imgDir + "logo_white.png) 0 0 no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=noscale,src='" + this.imgDir + "logo_white.png');_background:none;}";
			style += ".change b{background:url(" + this.imgDir + "change_btn.png) 0 0 no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=noscale,src='" + this.imgDir + "change_btn.png');_background:none;}";
			style += ".change i{background-image:url(" + this.imgDir + "change_ico.png);_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=noscale,src='" + this.imgDir + "change_ico.png');_background:none;_margin-right:6px;_height:40px;}";
			style += ".change a.a_1 em {background-image:url(" + this.imgDir + "change_btn.png) !important;_background-image:url(" + this.imgDir + "change_btn_8.png)}";
			var bold = 400;
			if (this['set']['slide']['change_title_bold'] == 1) {
				bold = 700;
			};
			style += ".change span {font-size:"+ this['set']['slide']['change_title_size'] +"px;color:#"+ this['set']['slide']['change_title_color'] +";font-weight:"+ bold +";font-family:" + font_family[this['set']['slide']['change_title_family']] + "}";
			style += ".img ul{width:" + (W - 22) + "px;}";
			var bold = 400;
			if (this['set']['txt']['txt_body_bold'] == 1) {
				bold = 700;
			};
			style += ".img li {width:" + (MW + 4) + "px;margin-left:" + MM + "px;font-size:" + this['set']['txt']['txt_body_size'] + "px;font-weight:" + bold + ";font-family:" + font_family[this['set']['txt']['txt_body_family']] + "}";
			style += ".img a:hover{background-color:#" + this['set']['style']['style_hover_color'] + ";}";
			style += ".img em {width:" + this['set']['pic']['pic_width'] + "px;height:" + MH + "px;}";
			if (this['set']['pic']['pic_summary_row'] == 1) {
				style += '.img a span {height:' + BLH + 'px;line-height:' + BLH + 'px;text-align:center;}';
			} else {
				style += '.img a span {height:' + BLH * 2 + 'px;line-height:' + BLH + 'px;}';
			};
			style += ".txt ul{width:" + (W - 22) + "px;}";
			style += ".txt li{width:" + TW + "px;height:" + this['set']['txt']['txt_body_margin'] + "px;line-height:" + this['set']['txt']['txt_body_margin'] + "px;font-size:" + this['set']['txt']['txt_body_size'] + "px;font-weight:" + bold + ";font-family:" + font_family[this['set']['txt']['txt_body_family']] + ";padding-right:10px;}";
			style += ".box li a:link{color:#" + this['set']['txt']['txt_default_color'] + ";}";
			style += ".box li a:visited{color:#" + this['set']['txt']['txt_clicked_color'] + ";}";
			style += ".box li a:hover{color:#" + this['set']['txt']['txt_hover_color'] + ";}";
			style += ".box li a:active{color:#" + this['set']['txt']['txt_click_color'] + ";}";
			if (this['set']['txt']['txt_default_underline'] == 0) {
				style += ".box li a:link{text-decoration:none;}";
			} else {
				style += ".box li a:link{text-decoration:underline;}";
			};
			if (this['set']['txt']['txt_clicked_underline'] == 0) {
				style += ".box li a:visited{text-decoration:none;}";
			} else {
				style += ".box li a:visited{text-decoration:underline;}";
			};
			if (this['set']['txt']['txt_hover_underline'] == 0) {
				style += ".box li a:hover{text-decoration:none;}";
			} else {
				style += ".box li a:hover{text-decoration:underline;}";
			};
			if (this['set']['txt']['txt_click_underline'] == 0) {
				style += ".box li a:active{text-decoration:none;}";
			} else {
				style += ".box li a:active{text-decoration:underline;}";
			};
			var bold = 400;
			if (this['set']['hot']['hot_body_bold'] == 1) {
				bold = 700;
			};
			style += ".hot{background-color:#" + this['set']['hot']['hot_body_background'] + ";height:" + this['set']['hot']['hot_body_margin'] + "px;line-height:" + this['set']['hot']['hot_body_margin'] + "px;font-size:" + this['set']['hot']['hot_body_size'] + "px;font-weight:" + bold + ";font-family:" + font_family[this['set']['hot']['hot_body_family']] + "}";
			style += ".hot li a:link{color:#" + this['set']['hot']['hot_default_color'] + ";}";
			style += ".hot li a:visited{color:#" + this['set']['hot']['hot_clicked_color'] + ";}";
			style += ".hot li a:hover{color:#" + this['set']['hot']['hot_hover_color'] + ";}";
			style += ".hot li a:active{color:#" + this['set']['hot']['hot_click_color'] + ";}";
			if (this['set']['hot']['hot_default_underline'] == 0) {
				style += ".hot li a:link{text-decoration:none;}";
			} else {
				style += ".hot li a:link{text-decoration:underline;}";
			};
			if (this['set']['hot']['hot_clicked_underline'] == 0) {
				style += ".hot li a:visited{text-decoration:none;}";
			} else {
				style += ".hot li a:visited{text-decoration:underline;}";
			};
			if (this['set']['hot']['hot_hover_underline'] == 0) {
				style += ".hot li a:hover{text-decoration:none;}";
			} else {
				style += ".hot li a:hover{text-decoration:underline;}";
			};
			if (this['set']['hot']['hot_click_underline'] == 0) {
				style += ".hot li a:active{text-decoration:none;}";
			} else {
				style += ".hot li a:active{text-decoration:underline;}";
			};
			if (this['set']['slide']['change_title'] == 0 || this['set']['slide']['change_title'] == '') {
				style += ".change b {display:none}#change a em {background:none;}"
			};
			style += ".focus a {color:#" + this['set']['slide']['focus_txt_color'] + ";}";
			style += ".focus a {font-family:" + font_family[this['set']['slide']['focus_txt_family']] + ";}";
			style += ".focus a {background-color:#" + this['set']['slide']['focus_hover_background'] + ";}";
			style += ".focus a.active {background-color:#" + this['set']['slide']['focus_txt_background'] + ";}";
			if (this['set']['pic']['pic_border'] == 1) {
				style += ".img a em {border:1px solid #ddd;}";
			} else {
				style += ".img a em {padding:1px;}";
			};
			if (this['style_pic_col'] == 1) {
				style += ".img li,.img li.i_0 {float:none;display:block;margin-left:auto;margin-right:auto;}";
			};
			style += '</style>';
			return (style);
		},
		funcQuery : function () {
			var that = this;
			var hid = this['request']['hid'];
			var bkt = this['request']['bkt'];
			var la = encodeURIComponent(String.fromCharCode(1));
			var lb = encodeURIComponent(String.fromCharCode(2));
			var dspsize = Math.min(this.perPage,this.data.length);
			//打开页面
			var url = '';
			url = '&' + la + '&ch=wprdsp&l=view&pg=1&hid=' + hid + '&bkt=' + bkt + '&dspsize=' + dspsize;
			//热词
			if (this['set']['hot']['data_hot'] != 0) {
				if (this['set']['hot']['data_hot_txt'] != '') {
					url += '&' + lb + '&has=true&ch=hkwrdsp&l=view&hid=' + hid + '&bkt=' + bkt;
				} else {
					url += '&' + lb + '&has=false&ch=hkwrdsp&l=view&hid=' + hid + '&bkt=' + bkt;
				};
			};
			questImg(url);

			//若不在第一屏
			var ot = getElemPos(this.o).y || 0;
			var tt;
			if (document.compatMode == 'BackCompat') {
				tt = document.body.clientHeight;
			} else {
				tt = document.documentElement.clientHeight;
			};
			var seenCount = 0;
			function seeOnce() {
				if (seenCount == 0) {
					var st = Math.max(document.body.scrollTop, document.documentElement.scrollTop, 0);
					if (tt + st > ot) {
						var url = '&' + la + '&ch=wprdsp&l=action&act=001&hid=' + hid + '&bkt=' + bkt;
						questImg(url);
						seenCount++;
					};
				};
			};
			if (ot > tt) {
				addEvent(window, 'scroll', function () {
					seeOnce();
				});
			} else {
				seeOnce();
			};

			//鼠标第一次经过
			var mouseCount = 0;
			this.o.onmouseover = function () {
				if (mouseCount == 0) {
					var url = '&' + la + '&ch=wprdsp&l=action&act=002&hid=' + hid + '&bkt=' + bkt;
					questImg(url);
					mouseCount++;
				};
			};

			//热词点击
			if (this['set']['hot']['data_hot'] != 0 && this['set']['hot']['data_hot_txt'] != '') {
				var a = this.oHot.getElementsByTagName('a');
				for (var i = 0; i < a.length; i++) {
					a[i].index = i;
					a[i].onclick = function () {
						var url = '';
						url = '&' + la + '&ch=kwrdc&l=click&ps=' + this.index + '&wd=' + encodeURIComponent(this.innerHTML) + '&hid=' + hid + '&bkt=' + bkt;
						questImg(url);
					};
				}
			};
			var jumpUrl = this.jumpUrl;
			var jumpAid = this.request.aid;
			var jumpFt = 0;
			var jumpRef = window.location.href || parent.location.href;
			//链接
			var a = this.oImg.getElementsByTagName('a');
			for (var i = 0; i < a.length; i++) {
				a[i].index = i;
				a[i].onclick = function () {
					var urltemp = '&' + la + '&ch=wprc&l=click&ps=' + this.index + '&hid=' + hid + '&bkt=' + bkt + '&isimg=1&curl=' + encodeURIComponent(this.href);
					questImg(urltemp);
					if (jumpUrl) {
						if (that['set']['txt']['txt_link_target'] == 1) {
							window.location.href = jumpUrl + '&url=' + encodeURIComponent(this.href) + '&ref=' + encodeURIComponent(jumpRef) + '&aid=' + jumpAid + '&ft=' + jumpFt;
						} else {
							window.open(jumpUrl + '&url=' + encodeURIComponent(this.href) + '&ref=' + encodeURIComponent(jumpRef) + '&aid=' + jumpAid + '&ft=' + jumpFt);
						};
						return false;
					};
				};
			};
			var a = this.oTxt.getElementsByTagName('a');
			for (var i = 0; i < a.length; i++) {
				a[i].index = i;
				a[i].onclick = function () {
					var urltemp = '&' + la + '&ch=wprc&l=click&ps=' + this.index + '&hid=' + hid + '&bkt=' + bkt + '&isimg=0&curl=' + encodeURIComponent(this.href);;
					questImg(urltemp);
					if (jumpUrl) {
						if (that['set']['txt']['txt_link_target'] == 1) {
							window.location.href = jumpUrl + '&url=' + encodeURIComponent(this.href) + '&ref=' + encodeURIComponent(jumpRef) + '&aid=' + jumpAid + '&ft=' + jumpFt;
						} else {
							window.open(jumpUrl + '&url=' + encodeURIComponent(this.href) + '&ref=' + encodeURIComponent(jumpRef) + '&aid=' + jumpAid + '&ft=' + jumpFt);
						};
						return false;
					};
				};
			};
		}
	};
	//原型结束
	function Sys() {
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
			(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
			(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
			(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
			(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
		return Sys;
	};	var tuiFixedRun = new tuiFixed();
	//*********配置参数***************************
	tuiFixedRun.oBox = document.getElementById("aliyun_cnzz_tui_1000070893");
	tuiFixedRun.demo = false;
	
	tuiFixedRun.set = {"logo":{"logo_background_user":1,"logo_background_img":"","logo_position":0},"style":{"style_length":407,"style_width":873,"style_pic_col":5,"style_pic_row":2,"style_txt_col":2,"style_txt_row":5,"style_background_color":"ffffff","style_hover_color":"ffffff","style_border_color":"ffffff"},"pic":{"pic_length":96,"pic_width":150,"pic_scale":2,"pic_summary":1,"pic_summary_row":0,"pic_border":1},"hot":{"data_hot":1,"data_hot_num":"0","data_hot_txt":"","hot_body_background":"D0CFFF","hot_body_size":"12","hot_body_bold":0,"hot_body_margin":"26","hot_body_family":0,"hot_default_color":"000000","hot_default_underline":0,"hot_hover_color":"222222","hot_hover_underline":1,"hot_click_color":"ff6600","hot_click_underline":0,"hot_clicked_color":"ff6600","hot_clicked_underline":0},"txt":{"txt_title_icon":"1","txt_title_txt":"\u70ed\u95e8\u63a8\u8350","txt_title":1,"txt_title_size":14,"txt_title_bold":"0","txt_title_margin":"31","txt_title_background":1,"txt_title_bgcolor":"ffffff","txt_title_bgimage":"http:\/\/tui.cnzz.net\/templates\/images\/fix_txt_img\/1\/title.png","txt_title_color":"222222","txt_title_family":0,"txt_body_size":12,"txt_body_bold":0,"txt_body_margin":"20","txt_body_family":0,"txt_default_color":"222222","txt_hover_color":"ff6600","txt_click_color":"222222","txt_clicked_color":"222222","txt_default_underline":"0","txt_hover_underline":"1","txt_click_underline":"0","txt_clicked_underline":"0","txt_focus":2,"txt_border":0,"txt_link_target":0},"locat":{"locat_left_right":0,"locat_float":0,"locat_mark":0,"locat_color":0,"locat_txt_color":null,"locat_txt":null,"locat_background":null,"locat_float_hide":0},"slide":{"slide_type":2,"slide_timer":5,"change_icon":1,"change_title":1,"change_title_txt":"\u6362\u4e00\u6362","change_background_color":"0","change_icon_type":1,"change_title_size":"12","change_title_bold":0,"change_title_family":"arial","change_title_color":"333333","change_show_type":0,"focus_show_type":1,"focus_txt_background":"FF8B33","focus_hover_background":"76778C","focus_txt_family":0,"focus_txt_color":"ffffff"},"search":{"search_show":0,"search_high":0,"search_high_color":null},"keywords":{"images":null,"node":null,"txt_color":null,"underline":0,"number":0,"bold":0,"italic":0,"count":0,"node_text":null},"summary":{"txt_body_size":0,"txt_body_bold":0,"txt_body_family":0,"txt_default_color":null,"txt_hover_color":null,"txt_click_color":null,"txt_clicked_color":null,"txt_default_underline":0,"txt_hover_underline":0,"txt_click_underline":0,"txt_clicked_underline":0},"wap":{"auto_show":0},"base":{"cloud_id":"10089823","r_name":"\u70ed\u95e8\u63a8\u8350","r_type":"1","r_style_id":"2","r_style_name":"\u6a59\u8272\u7b80\u7ea6\u6a2a\u7248","r_status":"1","data_type":"2","nyn_host":"0","domain_source":"","r_radius":"1","img_type":"1","cnzz_code_id":"0","sf_deploy":0,"yn_host":"0"}};
	//列表数据
	tuiFixedRun.data = [{"url":"http:\/\/w3ci.com\/plugin\/photos\/380.html","title":"jQuery\u81ea\u9002\u5e94\u56fe\u7247\u5927\u5c0f\u76f8\u518c\u4ee3\u7801","algId":"2-hot","unigramlist":"jQuery\t\u5927\u5c0f\t\u76f8\u518c\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/185F686A6B1B7A0B120024406058727A3B5A0C40","has_thumb":"true","ctr":"-0.083598","page_num":"1","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/foucs\/277.html","title":"QQ\u5546\u57cejQuery\u7126\u70b9\u56fe\u6548\u679c","algId":"2-hot","unigramlist":"jQuery\t\u5546\u57ce\t\u6548\u679c\t\u7126\u70b9\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/207956117A4F3B257B002E2C56311C2A36786C40","has_thumb":"true","ctr":"-0.083598","page_num":"1","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/HTML5CSS3\/650.html","title":"jQuery\u6eda\u52a8\u6548\u679c\u63d2\u4ef6 multiScroll.js","algId":"2-hot","unigramlist":"jQuery\tmultiScroll\t\u63d2\u4ef6\t\u6548\u679c\t\u6eda\u52a8\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/000C142C3F6C1A4F4B0007674F463622076D5F00","has_thumb":"true","ctr":"-0.083598","page_num":"1","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/foucs\/287.html","title":"\u6cd5\u5b9d\u7f51\u9996\u9875\u5927\u7126\u70b9\u56fe\u4ee3\u7801","algId":"2-hot","unigramlist":"\u6cd5\u5b9d\u7f51\t\u7126\u70b9\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/5810383151763F117B40023D166370376E070400","has_thumb":"true","ctr":"-0.083598","page_num":"1","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/soft\/205.html","title":"Photoshop\/PS CS6\u5b98\u65b9\u7b80\u4f53\u4e2d\u6587\u539f\u7248\u4e0b\u8f7d+\u7834\u89e3\u6587\u4ef632\u4f4d_WEB\u524d\u7aef\u8d44\u6e90\u7f51","algId":"2-hot","unigramlist":"Photoshop\t\u4e2d\u6587\t\u524d\u7aef\t\u6587\u4ef6\t\u7834\u89e3\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/126A64015C136F4823400C74130E14353C7A2D40","has_thumb":"true","ctr":"-0.083598","page_num":"1","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/plugin\/hide\/521.html","title":"11\u4e2a\u60ca\u4eba\u7684\u54cd\u5e94jQuery\u6ed1\u5757\u4e0b\u8f7d","algId":"2-hot","unigramlist":"jQuery\t\u54cd\u5e94\t\u60ca\u4eba\t\u6ed1\u5757\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/1D76450E1050790C6A00381A6279357D273D6200","has_thumb":"true","ctr":"-0.083598","page_num":"1","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/front\/HTML5\/220.html","title":"\u5229\u7528HTML5\u76d1\u63a7\u7f51\u7ad9\u6027\u80fd","algId":"2-hot","unigramlist":"HTML\t\u6027\u80fd\t\u76d1\u63a7\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/0D6A7B654D21611756005D45303C136A38587940","has_thumb":"true","ctr":"-0.083598","page_num":"1","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/front\/HTML5\/36.html","title":"HTML5\u5f00\u53d1-\u5728\u4f60\u7684\u6e38\u620f\u5e94\u7528\u4e2d\u52a0\u5165\u5e7f\u544a","algId":"2-hot","unigramlist":"HTML\t\u5e7f\u544a\t\u5f00\u53d1\t\u6e38\u620f\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/0A5928652C6A25600C402F3A0B4A212110153C00","has_thumb":"true","ctr":"-0.083598","page_num":"1","cluster_name":"hot_redis"},{"url":"http:\/\/video.w3ci.com\/vod-play-id-1602-sid-0-pid-1.html","title":"\u91d1\u6b63\u65e5\u9057\u4f53\u544a\u522b\u4eea\u5f0f","algId":"2-hot","unigramlist":"\u4eea\u5f0f\t\u544a\u522b\t\u9057\u4f53\t\u91d1\u6b63\u65e5\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/18700307141344002700161A490F086F21146700","has_thumb":"true","ctr":"-0.083598","page_num":"1","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/foucs\/267.html","title":"jQuery\u5927\u6c14\u6ee1\u5c4f\u7126\u70b9\u56fe","algId":"2-hot","unigramlist":"jQuery\t\u5927\u6c14\t\u5c4f#\u7126\u70b9\t\u7126\u70b9\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/566139361A55502D25406E1535716F276A2C2340","has_thumb":"true","ctr":"-0.083598","page_num":"1","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/CSS3-Media-Query\/2014\/1108\/670.html","title":"30\u4e2a\u521b\u610f\u7684\u89c6\u5dee\u6eda\u52a8(Parallax Scrolling)\u7f51\u7ad9\u8bbe\u8ba1","algId":"2-hot","unigramlist":"Parallax\tScrolling\t\u521b\u610f\t\u6eda\u52a8\t\u89c6\u5dee\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/355F60624E391B524A40466E5A11206D4C2E6D00","has_thumb":"true","ctr":"-0.083598","page_num":"2","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/lecture\/dedecms\/525.html","title":"dedecms ckeditor \u7f16\u8f91\u5668\u4e2d\u589e\u52a0\u4ee3\u7801\u8fd0\u884c\u6846 \u6700\u7b80\u5355\u65b9\u6cd5\u53ea\u9700\u4fee\u6539default.js\u6587\u4ef6","algId":"2-hot","unigramlist":"ckeditor\tdedecms\tdefault\t\u4fee\u6539\t\u6587\u4ef6\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/563557215347616D04401B075A254B7C78756F00","has_thumb":"true","ctr":"-0.083598","page_num":"2","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/nav\/239.html","title":"\u4e2d\u82f1\u6587\u5bf9\u7167\u6ed1\u52a8\u663e\u73b0jquery\u5bfc\u822a\u4ee3\u7801","algId":"2-hot","unigramlist":"jquery\t\u4e2d\u82f1\u6587\t\u5bf9\u7167\t\u663e\u73b0\t\u6ed1\u52a8\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/1A5110452471376F4B004406542A312F58110240","has_thumb":"true","ctr":"-0.083598","page_num":"2","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/plugin\/hide\/645.html","title":"\u6a2a\u5411\u6eda\u52a8\u9f20\u6807\u63d2\u4ef6Horwheel","algId":"2-hot","unigramlist":"Horwheel\t\u63d2\u4ef6\t\u6a2a\u5411\t\u6eda\u52a8\t\u9f20\u6807\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/5A4A755F654B6B2610404425553A682C58096440","has_thumb":"true","ctr":"-0.083598","page_num":"2","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/plugin\/tab\/478.html","title":"\u5206\u4eabJquery\u9f20\u6807\u60ac\u6d6e\u5207\u6362\u7684tab\u9009\u9879\u5361\u7279\u6548","algId":"2-hot","unigramlist":"Jquery\t\u5206\u4eab\t\u5207\u6362\t\u60ac\u6d6e\t\u7279\u6548\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/47375E3A031D5022080063590C6862182B576C00","has_thumb":"true","ctr":"-0.083598","page_num":"2","cluster_name":"hot_redis"},{"url":"http:\/\/video.w3ci.com\/vod-read-id-26520.html","title":"\u5438\u8840\u9b3c\u65e5\u8bb0 \u7b2c\u4e00\u5b63","algId":"2-hot","unigramlist":"\u5438\u8840\u9b3c\t\u65e5\u8bb0\t\u7b2c\u4e00\u5b63\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/195E1E471611193B46403B4D5C07733020390F00","has_thumb":"true","ctr":"-0.083598","page_num":"2","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/plugin\/foucs\/315.html","title":"\u5a31\u4e50\u9891\u90537\u680fJS\u7126\u70b9\u56fe\u4ee3\u7801","algId":"2-hot","unigramlist":"\u5a31\u4e50\t\u7126\u70b9\t\u9891\u9053\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/205B7406504E27553C407A0D0C432F467A1F4F40","has_thumb":"true","ctr":"-0.083598","page_num":"2","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/plugin\/HTML5CSS3\/648.html","title":"jquery\u5b9e\u73b0\u7f51\u6613\u90ae\u7bb1\u9875\u9762\u63d2\u4ef6fullPage.js","algId":"2-hot","unigramlist":"fullPage\tjquery\t\u63d2\u4ef6\t\u7f51\u6613\t\u90ae\u7bb1\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/792332164D2C670D204014346D01635F147F6340","has_thumb":"true","ctr":"-0.083598","page_num":"2","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/foucs\/284.html","title":"\u70b9\u51fb\u5de6\u53f3\u6eda\u52a8jQuery\u6ed1\u5757\u63d2\u4ef6","algId":"2-hot","unigramlist":"jQuery\t\u63d2\u4ef6\t\u6ed1\u5757\t\u6eda\u52a8\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/7C2B3E0D410B456049006961730C2D350E062D40","has_thumb":"true","ctr":"-0.083598","page_num":"2","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/plugin\/jq-media\/2014\/1105\/664.html","title":"\u597d\u7528\u7684jQuery\u54cd\u5e94\u6ed1\u5757","algId":"2-hot","unigramlist":"jQuery\t\u54cd\u5e94\t\u597d\u7528\t\u6ed1\u5757\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/451C63432203445865007013206640313E516A40","has_thumb":"true","ctr":"-0.083598","page_num":"2","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/plugin\/foucs\/323.html","title":"\u5e7b\u706f\u7247\u653e\u6620\u4f7f\u7528CSS sprites","algId":"2-hot","unigramlist":"sprites\t\u5e7b\u706f\u7247\t\u653e\u6620\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/16382E4A09605C59220009444F3C1D4013292B00","has_thumb":"true","ctr":"-0.083598","page_num":"3","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/foucs\/288.html","title":"\u4eff\u6dd8\u5b9d\u89c6\u9891\u7126\u70b9\u56fe(jQuery)","algId":"2-hot","unigramlist":"jQuery\t\u4eff#\u6dd8\u5b9d\t\u6dd8\u5b9d\t\u7126\u70b9\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/00723D7765447D072800086E7407401F61192400","has_thumb":"true","ctr":"-0.083598","page_num":"3","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/foucs\/240.html","title":"\u7b80\u6d01\u7684\u4e94\u5c4f\u6de1\u5165\u6de1\u51fajQuery\u7126\u70b9\u56fe\u4ee3\u7801","algId":"2-hot","unigramlist":"jQuery\t\u5c4f#\u6de1\u5165\t\u6de1\u5165\t\u6de1\u51fa\t\u7126\u70b9\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/69243D0B6E463D406F004947372C6854311E7F00","has_thumb":"true","ctr":"-0.083598","page_num":"3","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/lecture\/wenzhai\/386.html","title":"\u5e03\u5c40\u590d\u6742\u7f51\u7ad9\u7684\u54cd\u5e94\u5f0f\u8bbe\u8ba1\u6d41\u7a0b","algId":"2-hot","unigramlist":"\u54cd\u5e94\t\u5e03\u5c40\t\u6d41\u7a0b\t\u8bbe\u8ba1\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/4C637914294044476B40300F49601A0B2B7E6C00","has_thumb":"true","ctr":"-0.083598","page_num":"3","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/nav\/244.html","title":"jQuery\u6296\u52a8\u5bfc\u822a\u83dc\u5355\u6548\u679c","algId":"2-hot","unigramlist":"jQuery\t\u6296\u52a8\t\u6548\u679c\t\u83dc\u5355\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/1E1B6C3A583A072E3240760C005E32456B2B5F40","has_thumb":"true","ctr":"-0.083598","page_num":"3","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/foucs\/314.html","title":"\u53f3\u4fa7\u5e26\u7f29\u7565\u56fejQuery\u7126\u70b9\u56fe\u4ee3\u7801","algId":"2-hot","unigramlist":"jQuery\t\u53f3\u4fa7\t\u7126\u70b9\t\u7f29\u7565\u56fe\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/1E515A32517C3A0F41005D42495A5A327B4C4B00","has_thumb":"true","ctr":"-0.083598","page_num":"3","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/plugin\/foucs\/273.html","title":"jQuery\u7f51\u7ad9\u5e7b\u706f\u7247\u5207\u6362\u6548\u679c","algId":"2-hot","unigramlist":"jQuery\t\u5207\u6362\t\u5e7b\u706f\u7247\t\u6548\u679c\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/322B1D74462466567340513577117532015D1840","has_thumb":"true","ctr":"-0.083598","page_num":"3","cluster_name":"hot_redis"},{"url":"http:\/\/w3ci.com\/front\/mobile\/421.html","title":"\u79fb\u52a8\u6280\u672f \u65e0\u7ebf\u5ba2\u6237\u7aef\u6846\u67b6\u8bbe\u8ba1\uff082\uff09: \u9879\u76ee\u7ed3\u6784\u7684\u8bbe\u8ba1\uff08iOS\u7bc7\uff09","algId":"2-hot","unigramlist":"\u5ba2\u6237\u7aef\t\u6280\u672f\t\u65e0\u7ebf\t\u6846\u67b6\t\u7ed3\u6784\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/6B192D2F71752E7F0C4068062D36135565403140","has_thumb":"true","ctr":"-0.083598","page_num":"3","cluster_name":"hot_redis"},{"url":"http:\/\/video.w3ci.com\/vod-read-id-27100.html","title":"BBC\u5927\u4e0d\u5217\u98a0\u54e5\u4f26\u6bd4\u4e9a\u5e7f\u9614\u8352\u91ce\u81ea\u7531\u884c","algId":"2-hot","unigramlist":"\u4e0d\u5217\u98a0\u54e5\u4f26\u6bd4\u4e9a\t\u5e7f\u9614\t\u81ea\u7531\u884c\t\u8352\u91ce\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/65475C6972144A795C404112601B60442E1E7440","has_thumb":"true","ctr":"-0.083598","page_num":"3","cluster_name":"hot_redis"},{"url":"http:\/\/www.w3ci.com\/front\/jQuery\/544.html","title":"\u5173\u4e8e\u5f15\u7528jquery\u5e93\u6587\u4ef6\u7684\u52a0\u8f7d\u5730\u5740\u4f18\u5316\u5916\u90e8\u548c\u670d\u52a1\u5668\u5f15\u7528\u4f18\u5316","algId":"2-hot","unigramlist":"jquery\tjquery#\u5e93\t\u4f18\u5316\t\u52a0\u8f7d\t\u5916\u90e8\t","bodykey":"","pagetime":"","thumbnail":"http:\/\/recimg.cn-hangzhou.oss.aliyun-inc.com\/2B2E4843134E0F6C3B403204107B4279633B5100","has_thumb":"true","ctr":"-0.083598","page_num":"3","cluster_name":"hot_redis"}];
	//处理热词
	tuiFixedRun.set.hot.data_hot_txt = "笔试题,资源网,总结";
	//自定义热词数量
	tuiFixedRun.set.hot.data_hot_txt_user = 0;
	//图片loading
	tuiFixedRun.imgLoad = "http://img.cnzz.net/adt/cnzz_tui/vip/loading.gif";
	//错误图片
	tuiFixedRun.errorDir = "http://img.cnzz.net/adt/cnzz_tui/vip/error/error_";
	//logo 点击地址
	tuiFixedRun.tuiUrl = "http://tui.cnzz.com";
	//统计地址
	tuiFixedRun.tongjiUrl = "http://log.so.cnzz.net/stat.php?";
	tuiFixedRun.errorNum = 35;
	//搜索地址
	tuiFixedRun.searchUrl = "http://s.cnzz.net/";
	//图片路径
	tuiFixedRun.imgDir = "http://img.cnzz.net/adt/cnzz_tui/vip/";
	//ip
	tuiFixedRun.ip = "175.152.121.31";
	//cookie
	tuiFixedRun.Rcookie = "2aa63a82b9ec2b28f9ddf20e6314401a";
	//jumpUrl
    tuiFixedRun.jumpUrl = "";
    //是否米尔用户
    tuiFixedRun.isMier  = "0";
	//公用方法
	function getEyeJsStyle(oBj, styleName) {
		if (oBj.currentStyle) {
			return oBj.currentStyle[styleName];
		} else {
			return getComputedStyle(oBj, null)[styleName];
		};
	};
	function addEvent(Elem, type, handle) {
		if (Elem.addEventListener) {
			Elem.addEventListener(type, handle, false);
		} else if (Elem.attachEvent) {
			Elem.attachEvent("on" + type, handle);
		};
	};
	function getElemPos(obj) {
		var pos = {
			"top" : 0,
			"left" : 0
		};
		if (obj.offsetParent) {
			while (obj.offsetParent) {
				pos.top += obj.offsetTop;
				pos.left += obj.offsetLeft;
				obj = obj.offsetParent;
			}
		} else if (obj.x) {
			pos.left += obj.x;
		} else if (obj.x) {
			pos.top += obj.y;
		}
		return {
			x : pos.left,
			y : pos.top
		};
	};
	if (tuiFixedRun["set"]["hot"]["data_hot"]!=0 && tuiFixedRun["set"]["hot"]["data_hot_txt"]!="") {
		tuiFixedRun.ft = "block_kw";
	} else{
		tuiFixedRun.ft = "block_s";
	};
	tuiFixedRun.request = {
		"common" : tuiFixedRun.tongjiUrl+"ip="+tuiFixedRun.ip+"&pui=czb&cok="+tuiFixedRun.Rcookie+"&vr=1&aid=1000070893&sid=w3ci.com&img=" + tuiFixedRun["set"]["base"]["data_type"] + "&so=t&ft=" + tuiFixedRun.ft + "",
		"sid" : "w3ci.com",
		"aid" : "1000070893",
		"hid" : "49109efad2c8299d653152b1d253bcb3",
		"bkt" : "0",
		"so" : "t"
	};
	function questImg(url) {
		var Img = new Image();
		var d = new Date();
		Img.onload = Img.onabort = Img.onerror = function () {
			Img = null;
		};
		Img.src = tuiFixedRun.request.common + url + "&"+ encodeURIComponent(String.fromCharCode(1)) + "&oref=" + encodeURIComponent(document.referrer) + "&purl=" + encodeURIComponent(window.location.href) +"&_rnd=" + (Date.parse(d) + "." + d.getMilliseconds());
	};
	function checkData() {
		return true;
		var t = 0;		//总数
		var dt = 0;		//总需
		var r = false;	//结果
		var n = 0.6;	//良品率
		var set = tuiFixedRun.set;
		//计算总需
		if (set.base.data_type == 0) {
			dt = Number(set.style.style_txt_col) * Number(set.style.style_txt_row);
		}else if (set.base.data_type == 2) {
			dt = Number(set.style.style_pic_col) * Number(set.style.style_pic_row);
		}else {
			dt = Number(set.style.style_pic_col) * Number(set.style.style_pic_row) + Number(set.style.style_txt_col) * Number(set.style.style_txt_row);
		};
		if (tuiFixedRun.data.length < dt * n){
			return false;
		}else {
			//计算良好数据
			for (var i=0;i<tuiFixedRun.data.length;i++) {
				if (tuiFixedRun.data[i].title) {
					t++;
				};
			};
			var l = t / dt;
			l < n ? r = false : r = true;
			return r;
		};
	};
	//*********************************
	if (!tuiFixedRun.demo) {
		//运行之
		if (tuiFixedRun.data && tuiFixedRun.data[0]) {
			if (checkData()) {
				tuiFixedRun.init();
			}else {
				var url =  "&" + encodeURIComponent(String.fromCharCode(1)) + "&has=false&ch=wprdsp&l=view&good=false";
				questImg(url)
			};
		} else {
			var url =  "&" + encodeURIComponent(String.fromCharCode(1)) + "&has=false&ch=wprdsp&l=view";
			questImg(url)
		};
	};
	//*********配置参数***************************
	})();