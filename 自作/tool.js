define([],()=>{
	const _=(()=>{

		const Doc=[document],
			  undefine=void 0,
			  //数组扁平化
			  arrBP=(arr)=>{
					let out=[];
					let a=(arr)=>{
						for(let item of arr){
							if(Object.prototype.toString.call(item).toLowerCase().includes('array')){
								a(item);
							}else {
								out.push(item);
							}
						}
					};
					a(arr);
					return out;	
				},
				//获取样式
				getStyle=(obj,attr)=>{
					return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
				},
				//添加事件
				addEvent=(()=>{
					return Doc[0].attachEvent ? (obj, event, fn)=>{
							obj.attachEvent('on' + event, function (ev) {

								if(!Object.prototype.toString.call(fn).includes('Array'))
									fn=[fn];
						        fn.forEach(fn=>{
									fn.apply(obj,[ev])
								})
						    })
						} : (obj, event, fn)=>{
							obj.addEventListener(event, function (ev) {
								
								if(!Object.prototype.toString.call(fn).includes('Array'))
									fn=[fn];
								fn.forEach(fn=>{
									fn.apply(obj,[ev])
								})
						    });
						}
				})(),
				//动画
				animate=(ele,targetJson,timers)=>{
					return new Promise((resolve,reject)=>{

					let start=new Date()*1;
					let starJson={};
					for(let key of Object.keys(targetJson)){
						if(key=='opacity'){
							starJson[key]=Math.round(getStyle(ele, 'opacity') * 100);
						}else{
							starJson[key]=parseInt(getStyle(ele, key));
						}
					}

					clearInterval(ele.timer);
					ele.timer=setInterval(()=>{

						let now=new Date()*1;
						let pass=Math.min(now-start,timers),value=pass/timers;

						for(let key of Object.keys(targetJson)){
							let nowTarget=starJson[key]+(targetJson[key]-starJson[key])*value;
							if(key=='opacity'){
								ele.style.opacity=nowTarget/100;
								ele.style.filter = 'alpha(opacity=' + value + ')';
							}else{
								ele.style[key]=nowTarget+'px';
							}
						}

						if(value==1){
							clearInterval(ele.timer);
							resolve();
						}
					},13)

					})
				},
		      tools={

		      	ID(id,parent=Doc){

		      		return parent.map(item=>{
		      			return item.querySelector(`#${id}`);
		      		})
		      	},

		      	CLASS(classStr,parent=Doc){
		      		
		      		let result=parent.map(item=>{
		      			return Array.from(item.querySelectorAll(`.${classStr}`));
		      		})
		      		return arrBP(result);
		      	},

		      	Q(selector,parent=Doc){

		      		if(selector.nodeType==1) return [selector];
		      		let result=parent.map(item=>{
		      			return Array.from(item.querySelectorAll(selector));
		      		}) 
		      		return arrBP(result);
		      	},

		      	Parent(eles,str){

		      		let ele=eles[0];
		      		if(!str) return ele.parentNode;
		      		let Id=str.startsWith('#'),
		      			find=(ele,str,onff)=>{
		      				let findEle,tagname;
		      				while(ele.parentNode){
		      					if(onff){
		      						str=str.replace(/^[\#|\.]/,'');
		      						if(ele.parentNode.id==str) findEle=ele.parentNode;
		      					}else{
		      						if(str.startsWith('.')){
		      						str=str.replace(/^[\#|\.]/,'');
		      						let re=new RegExp('\\b'+str+'\\b');
		      						if(re.test(ele.parentNode.className)) findEle=ele.parentNode;}else{
		      							if(ele.parentNode.tagName){tagname=ele.parentNode.tagName.toLowerCase()}else{
		      								tagname='';
		      							}
		      							if(tagname==str) findEle=ele.parentNode;
		      						}
		      					}
		      					ele=ele.parentNode;
		      				}

		      				return findEle;
		      			};
	      			return [find(ele,str,Id)];
		      	},

		      	Off(eles,event){

		      		eles.forEach(item=>{

		      			if(item[event+'Fns'] && item[event+'Fns'].length)
		      				item[event+'Fns'].length=0;
		      		})
		      	},

		      	On(eles,event,fn){

		      		eles.forEach(item=>{

		      			if(!item[event+'Fns']){
		      				item[event+'Fns']=[fn];
		      				addEvent(item,event,item[event+'Fns']);
		      				return false;
		      			}
		      			item[event+'Fns'].push(fn);
		      		})
		      	},

		      	Click(eles,fn){

		      		eles.forEach(item=>{
		      			if(!item.clickFns){
		      				item.clickFns=[fn];
		      				addEvent(item,'click',item.clickFns);
		      				return false;
	      				}
	      				item.clickFns.push(fn);
		      		})
		      	},

		      	Hover(eles,fn1,fn2){
//完美诠释js单线程的特点
		      		eles.forEach(item=>{
		      			addEvent(item,'mouseover',e=>{

		      				clearTimeout(item.outTimer);
		      				item.overTimer=setTimeout(()=>{
		      					fn1.apply(item,[e]);
		      				},0)
		      			})
		      			addEvent(item,'mouseout',e=>{

		      				setTimeout(()=>{
		      					clearTimeout(item.overTimer);
		      				}, 0)
		      				item.outTimer=setTimeout(()=>{
		      					fn2.apply(item,[e]);
		      				}, 0)
		      			})
		      		})
		      	},

		      	Css(eles,json){

		      		if(Object.prototype.toString.call(json).toLowerCase().includes('string')){
		      			return getStyle(eles[0],json);
		      		}
		      		eles.forEach(item=>{
		      			for(let key of Object.keys(json)){
		      				item.style[key]=json[key];
		      			}
		      		})
		      	},

		      	AddClass(eles,classStr){

		      		eles.forEach(item=>{
		      			item.className+=' '+classStr;
		      		})
		      	},

		      	RemoveClass(eles,classStr){

		      		let re=new RegExp('\\b'+classStr+'\\b','g');
		      		eles.forEach(item=>{
		      			item.className=item.className.replace(re,'');
		      		})
		      	},

		      	GetPos(eles){

		      		let ele=eles[0],
		      			L=0,T=0;

	      			if(ele){
	      				L+=ele.offsetLeft;
	      				T+=ele.offsetTop;
	      				ele=ele.offsetParent;
	      			}
	      			return {
	      				'left': L,'top': T
	      			}
		      	},

		      	Attr(eles,json){

		      		if(!Object.prototype.toString.call(json).toLowerCase().includes('string')){
		      			eles.forEach(item=>{
		      				for(let key of Object.keys(json)){
		      					item.setAttribute(key,json[key]);
		      				}
		      			})
		      		}else{
		      			return eles[0].getAttribute(json);
		      		}
		      	},

		      	RemoveAttr(eles,attr){

		      		if(!attr) return false;
		      		if(Object.prototype.toString.call(attr).toLowerCase().includes('string')){
		      			eles.forEach(item=>{
		      				item.removeAttribute(attr);
		      			})
		      		}
		      		if(Object.prototype.toString.call(attr).toLowerCase().includes('array')){
		      			eles.forEach(item=>{
		      				attr.forEach(at=>{
		      					item.removeAttribute(at);
		      				})
		      			})
		      		}
		      	},

		      	Append(eles,Html){

		      		if(Object.prototype.toString.call(Html).toLowerCase().includes('string')){
		      			let tepDiv=document.createElement('div');
		      			tepDiv.innerHTML=Html;
		      			let nodes=tepDiv.childNodes,tepFragment=document.createDocumentFragment();

		      			Array.from(nodes).forEach(item=>{
		      				tepFragment.appendChild(item.cloneNode(!0));
		      			})
		      			eles.forEach(item=>{
		      				item.appendChild(tepFragment.cloneNode(!0));
		      			})
		      			tepDiv=null;nodes=null;tepFragment=null;
		      		}else{
		      			eles.forEach(item=>{
		      				item.appendChild(Html.cloneNode(!0));
		      			})
		      		}
		      	},

		      	Prepend(eles,Html){

		      		let prepend=(ele,Html)=>{
		      			let firstCh=ele.children[0];
		      			if(firstCh){
		      				ele.insertBefore(Html,firstCh);
		      				return;
		      			}
		      			ele.appendChild(Html);
		      		}

		      		if(Object.prototype.toString.call(Html).toLowerCase().includes('string')){
		      			let tepDiv=document.createElement('div');
		      			tepDiv.innerHTML=Html;
		      			let nodes=tepDiv.childNodes,tepFragment=document.createDocumentFragment();

		      			Array.from(nodes).forEach(item=>{
		      				tepFragment.appendChild(item.cloneNode(!0));
		      			})
		      			eles.forEach(item=>{
		      				prepend(item,tepFragment.cloneNode(!0));
		      			})
		      			tepDiv=null;nodes=null;tepFragment=null;
		      		}else{
		      			eles.forEach(item=>{
		      				prepend(item,Html.cloneNode(!0));
		      			})
		      		}
		      	},

		      	Animate(eles,targetJson,timers){

		      		return new Promise((resolve)=>{
		      			eles.forEach(item=>{
						   animate(item,targetJson,timers).then(resolve);
			      		})
		      		})
		      		
		      	},

		      	Ajax({type="POST",url="",data={},async=!0}={}){

		      		let xhr=null,params=[];
		      		type=type.toUpperCase();
		      		return new Promise((resolve,reject)=>{
		      			xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); 
		      			if(type=='GET'&&Object.keys(data).length){
			      			for(let key of Object.keys(data)){
			      				params[params.length]=`${key}=${data[key]}`;
			      			}
			      			url += (url.includes('?') ? '&' : '?') + params.join('&');
			      			data=null;
		      			}
		      			if(type=='POST'){
		      				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		      			}
		      			xhr.onreadystatechange=()=>{
		      				_onStateChange(xhr);
		      			};
		      			xhr.open(type,url,async);
		      			xhr.send(data);
		      			function _onStateChange(xhr){
		      				if(xhr.readyState==4&&xhr.status>=200&&xhr.status<300){
		      					resolve(xhr.responseText);
		      					return xhr;
		      				}
		      				reject(xhr);
		      		   };
		      		})
		      	},
		      	
		      };

        return tools;
	})()
	
	// export default _;  //相当于return出去
	return _;
})