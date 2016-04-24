

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
//      return false;
        }  }


function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }


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



window.onload = function(){
    var oDiv = document.getElementById('boby');
    var oUl = document.getElementById('topRight');
    var oLi = oUl.getElementsByTagName('li')[0];
    var oF = document.getElementById('close');
    oLi.onmouseover= function(){oDiv.style.display = 'block';}  
    
    oF.onclick = function(){oDiv.style.display = 'none';
          oDiv.style.cssText = 'left: 820px;top: 30px'                 
                           }
    drag(oDiv);  //登陆窗口
   
  var oUl2 = document.getElementById('nav');
  var aUl3 = oUl2.getElementsByTagName('ul');
  var aH2 = oUl2.getElementsByTagName('h2');
  var aDiv = oUl2.getElementsByTagName('div');

    for(var i=0;i<aH2.length;i++){
        aH2[i].index = i;
        aUl3[i].index = i;
        aDiv[i].index = i;
        aH2[i].onmouseover = function(){
            var that = this.index;
            aDiv[this.index].style.display = 'block'; 
            var arrLi =  aUl3[this.index].getElementsByTagName('p');
            var iHeight = (arrLi.length)*(parseInt(getStyle(arrLi[0],'height'))+2); 
            var b = 0;
        
            clearInterval(arrLi.timer)
            arrLi.timer = setInterval(function(){
                          for(var a=0;a<arrLi.length;a++){
                            arrLi[a].style.background = '#434855';
                            arrLi[a].style.fontSize = 12 + 'px';
                          }
             
                 arrLi[b].style.background = 'brown';
                 arrLi[b].style.fontSize = 15 + 'px';
                 b++;
                 if(b==arrLi.length){clearInterval(arrLi.timer);
                                      
                                    }
            },150)
            
                        for(var c=0;c<arrLi.length;c++){
                arrLi[c].onmouseover = function(){
                     clearInterval(arrLi.timer)
                     for(var d=0;d<arrLi.length;d++){
                            arrLi[d].style.background = '#434855';
                            arrLi[d].style.fontSize = 12 + 'px';
                          }
                    this.style.background = 'brown';
                    this.style.fontSize = 15 + 'px';
                }
            }
           
            aDiv[that].style.height = 0 + 'px';
                clearInterval(aDiv[that].timer)
            aDiv[that].timer = setInterval(function(){
                
                var cur = parseInt(getStyle(aDiv[that],'height'));
                
                var speed = (iHeight -cur )/8;
                speed = Math.ceil(speed);
                if(cur == iHeight){clearInterval(aDiv[that].timer);
          
        }else{
                aDiv[that].style.height = cur + speed + 'px'; }
                
            },50)
        
        }
          aH2[i].onmouseout = function(){
               var that = this.index;
               aDiv[that].out = setTimeout(function(){
                    
                  aDiv[that].style.display = 'none';   
                } ,100)
                
         aDiv[this.index].onmouseover = function(){
         
            clearInterval(aDiv[that].out )
         }
          }
          aDiv[i].onmouseout = function(){
              
                 var that = this.index;
               aDiv[that].out = setTimeout(function(){
                    
                  aDiv[that].style.display = 'none';   
                } ,100)
          }
         
   
} //导航栏
      
   var picDiv = document.getElementById('picTab');
    var oImg =  picDiv.getElementsByTagName('img')[0];
    var aSrc = ['img/focus1.jpg','img/focus2.jpg','img/focus3.jpg','img/focus4.jpg',]
    var aSpan = picDiv.getElementsByTagName('span');
    var m=0;
    for(var i=0;i<aSpan.length;i++){
        aSpan[i].style.display = 'block';
        aSpan[i].style.top = 500 +'px';
        aSpan[i].style.left = 580 + i*44 + 'px';
    }
    oImg.src = aSrc[1];
    
    for(var i=0;i<aSpan.length;i++){
        aSpan[i].index = i;
        aSpan[i].onmouseover = function(){
            clearInterval(oImg.timer);
             var that = this.index;
            buffMove2(aSpan[that],8,{width:42,height:42,opacity:100})
            setTimeout(function(){
                oImg.src = aSrc[that];
                      
                      },300)
        }
          aSpan[i].onmouseout = function(){
             var that = this.index;
              m=that;
             buffMove2(aSpan[that],8,{width:40,height:40,opacity:30});
              abc() 
        }
    }
    
   
    function abc(){
        
   oImg.timer= setInterval(function(){
        oImg.src = aSrc[m];
        m++;m = m%(aSrc.length)
        
    },3000) } //图片轮播
    
    var oleft_ul = document.getElementById('left');
    var aleft_ul = oleft_ul.getElementsByTagName('ul');
    var aH3 = oleft_ul.getElementsByTagName('h3');
    aH3[1].style.left = 100+'px';
    aH3[0].style.background = 'red';
    aleft_ul[0].style.display = 'block';
    for(var i=0;i<aH3.length;i++){
        aH3[i].index = i;
        aH3[i].onmouseover = function(){
            for(var i=0;i<aH3.length;i++){
               aH3[i].style.background = '#464b57'; 
            }
             for(var i=0;i<aH3.length;i++){
              aleft_ul[i].style.display = 'none';
            }
            this.style.background = 'red';
            aleft_ul[this.index].style.display = 'block';
        }
    } //左边新闻
    
    var ocenter_ul = document.getElementById('center');
    var acenter_ul = ocenter_ul.getElementsByTagName('ul');
    var aaH3 = ocenter_ul.getElementsByTagName('h3');
    aaH3[1].style.right = 5+'px';
    aaH3[0].style.background = 'red';
    acenter_ul[0].style.display = 'block';
    for(var i=0;i<aaH3.length;i++){
        aaH3[i].index = i;
        aaH3[i].onmouseover = function(){
            for(var i=0;i<aaH3.length;i++){
               aaH3[i].style.background = '#464b57'; 
            }
             for(var i=0;i<aaH3.length;i++){
              acenter_ul[i].style.display = 'none';
            }
            this.style.background = 'red';
           acenter_ul[this.index].style.display = 'block';
        }
    } //中间新闻
    
}

