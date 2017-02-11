//运动
function doMove ( obj, attr, dir, target, endFn ) {
	
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;
	
	clearInterval( obj.timer );
	
	obj.timer = setInterval(function () {
		
		var speed = parseInt(getStyle( obj, attr )) + dir;			// 步长
		
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		
		obj.style[attr] = speed + 'px';
		
		if ( speed == target ) {
			clearInterval( obj.timer );
			
			/*
			if ( endFn ) {
				endFn();
			}
			*/
			endFn && endFn();
			
		}
		
	}, 50);
}

//得到元素的属性
function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }

//元素震动
 function shake(obj,attr,endFn){
          if(obj.onoff){return}
           obj.onoff = true;
           var pos = parseInt(getStyle(obj,attr));
           var arr = [];
           var n = 0;
          
            for(var i=20;i>0;i-=2){
                arr.push(i,-i); }
                arr.push(0); 
                clearInterval(obj.shake)
            obj.shake = setInterval(
               function(){ 
         obj.style[attr] = pos + arr[n] +'px';
                  n ++;
                  if(n == arr.length){
                      clearInterval(obj.shake);
                      endFn && endFn();
                      obj.onoff = false;
                  }
               },50)
            
        }

// 透明度渐变
  function touming(obj,dir,target,endFn){
     clearInterval(obj.timer);
     var  opacity =parseFloat(getStyle(obj,'opacity')); 
    obj.timer = setInterval(function(){
      if(target > opacity){
       var speed = dir;
      }else{
       var speed = -dir;
      }
        opacity = opacity + speed;
        obj.style.filter = 'alpha(opacity=' +opacity*100+ ')';
        obj.style.opacity = opacity;
        
        if(parseFloat(getStyle(obj,'opacity')) == target){
         clearInterval(obj.timer); 
            endFn && endFn();
      }
        
      
    },100)  }

//将一位数转化为两位数
function toTwo ( n ) {
	return ('0' + (n += '')).substr(-2);
}

//得到完整的时间
function fnTime (obj) {
	
		var myTime = new Date();
		
		// number
		var iYear = myTime.getFullYear();
		var iMonth = myTime.getMonth()+1;
		var iDate = myTime.getDate();
		var iWeek = myTime.getDay();
		var iHours = myTime.getHours();
		var iMin = myTime.getMinutes();
		var iSec = myTime.getSeconds();
		var str = '';
		
		if( iWeek === 0 ) iWeek = '星期日';
		if( iWeek === 1 ) iWeek = '星期一';
		if( iWeek === 2 ) iWeek = '星期二';
		if( iWeek === 3 ) iWeek = '星期三';
		if( iWeek === 4 ) iWeek = '星期四';
		if( iWeek === 5 ) iWeek = '星期五';
		if( iWeek === 6 ) iWeek = '星期六';
		
		str = iYear+ '年' +iMonth+'月'+iDate+'日 '+iWeek+' '+ toTwo(iHours)+' : '+ toTwo(iMin)+' : '+ toTwo(iSec);
		
		obj.innerHTML = str;
	
	}

//得到时间 时分秒
      	function getTime (obj) {
	
		var myTime = new Date();
		var iHours = myTime.getHours();
		var iMin = myTime.getMinutes();
		var iSec = myTime.getSeconds();
		var str = toTwo(iHours)+':'+toTwo(iMin)+':'+toTwo(iSec);
		
		obj.innerHTML = str;
	
        }



//完美运动框架
function startMove(obj, json, fnEnd)
{
clearInterval(obj.timer);
obj.timer=setInterval(function (){
 
var bStop=true;   
 
 
for(var attr in json) 
{
 
var cur=0;
 
if(attr=='opacity')
{
cur=Math.round(parseFloat(getStyle(obj, attr))*100); 
}
else
{
cur=parseInt(getStyle(obj, attr));
}
 
var speed=(json[attr]-cur)/6;
 
speed=speed>0?Math.ceil(speed):Math.floor(speed);
 
if(cur!=json[attr])
bStop=false;
 
if(attr=='opacity')
{
obj.style.filter='alpha(opacity:'+(cur+speed)+')';
obj.style.opacity=(cur+speed)/100;
 
}
else
{
obj.style[attr]=cur+speed+'px';
} 
 
}
 
 
if(bStop)
{
clearInterval(obj.timer);
 
if(fnEnd) fnEnd();
}
 
}, 30); 
}


//得到元素的坐标
function getPos(obj) {
		
		var pos = {left:0, top:0};
		
		while (obj) {
			pos.left += obj.offsetLeft;
			pos.top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		
		return pos;
		
	}

//通过claaname得到元素
    function getElementsByClassName(parent,tagName,clasName){
        var aEls = parent.getElementsByTagName(tagName);
        var arr = [];
        
        for(var i=0;i<aEls.length;i++){
            var aClassName = aEls[i].className.split(' ');
            for(var j=0;j<aClassName.length;j++){
                if(aClassName[j] == clasName){
                arr.push(aEls[i]);
                break;}
            }
            
        } return arr;
        
    }

 // 删除class
   function removeClass(obj,className){
        if(obj.className != ''){
            var arrClassName = obj.className.split(' ');
            var _index = abc(arrClassName,className);
    
            if(_index!=-1){
                arrClassName.splice(_index,1);
                obj.className = arrClassName;
            }
        }
          function abc(arr,v){
            for(var i=0;i<arr.length;i++){
                if(arr[i] == v){
                    return i;
                } 
            } return -1;
            }
    }
    
    //添加class
    function addClass(obj,className){
        
        if(obj.className ==''){
            obj.className = className;
              }
        else{
            var arrClassName = obj.className.split(' ');
            var _index = abc(arrClassName,className);
            
            if(_index == -1){
                obj.className += ' '+className;
            }
            
            
        }
        function abc(arr,v){
            for(var i=0;i<arr.length;i++){
                if(arr[i] == v){
                    return i;
                }  
            } return -1;
            }
    }


//拖拽
 function drag(obj){
    obj.onmousedown = function(ev){
        var ev = ev || window.event ;
        var x = ev.clientX - this.offsetLeft;
        var y = ev.clientY - this.offsetTop;
       if ( obj.setCapture ) {
			obj.setCapture();
		}  //全局捕获

      document.onmousemove = function(ev) {
			var ev = ev || window.event;
			var L = ev.clientX - x;
            var T = ev.clientY - y;
//           if(){} 可添加限制条件
			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
		}
      document.onmouseup = function(){
          document.onmousemove = document.onmouseup = null;
          if ( obj.releaseCapture ) {
				obj.releaseCapture();
			} //全局释放

      }
      return false;
        }  }

//缓冲运动
    function buffMove(obj,attr,dir,target,fnEnd){
         
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var cur = 0;
            if(attr == 'opacity'){ cur =parseInt( parseFloat(getStyle(obj,attr))*100)}
            else{cur = parseInt(getStyle(obj,attr));}
        
        var speed = (target -cur )/dir;
           speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
            
        if(cur == target){
            clearInterval(obj.timer);
            if(fnEnd) fnEnd();
        }else{
            if(attr=='opacity'){obj.style.filter = 'alpha(opacity:' + (cur+speed) + ')';    
               obj.style.opacity = (cur+speed)/100;}
            else{ obj.style[attr] = cur + speed + 'px';}
           
       }
        
        },50)
        
    }

   function buffTouming(obj,dir,target){
       clearInterval(obj.timer); 
       obj.timer = setInterval(function(){
          
       var speed = (target - obj.alpha)/dir; 
       speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
     
           if(obj.alpha == target){
               clearInterval(obj.timer);
           }else {
               obj.alpha += speed ; 
               obj.style.filter = 'alpha(opacity:' + obj.alpha + ')';    
               obj.style.opacity = obj.alpha/100;
           }
       
      } ,30)
       
       
  }



//完美缓冲
    function buffMove2(obj,dir,json,fnEnd){
         
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){  
            var stop = true;
              for(var attr in json){
                          var cur = 0;
            if(attr == 'opacity'){ cur =parseInt( parseFloat(getStyle(obj,attr))*100)}
            else{cur = parseInt(getStyle(obj,attr));}
        
        var speed = (json[attr] -cur )/dir;
           speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
            if(cur!=json[attr]){
                stop = false;
            }
            if(attr=='opacity'){obj.style.filter = 'alpha(opacity:' + (cur+speed) + ')';    
               obj.style.opacity = (cur+speed)/100;}
            else{ obj.style[attr] = cur + speed + 'px';}
        
              }
            if(stop){
              
            clearInterval(obj.timer);
            if(fnEnd) fnEnd();
        
            }
        },50)
        
    }