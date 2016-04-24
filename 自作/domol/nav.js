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



function getscrollTop(){
    
      var scrollTop=0;  
3
    if(document.documentElement&&document.documentElement.scrollTop){  
4
        scrollTop=document.documentElement.scrollTop;  
5
    }else if(document.body){  
6
        scrollTop=document.body.scrollTop;  
7
    }  
8
    return scrollTop;
}

function getByClass(tagName,Class){
        var re = new RegExp('\\b' +Class + '\\b','')
        var aEle = document.getElementsByTagName(tagName);
        var arr = [];  
        for(var i=0;i<aEle.length;i++){
            
            var oEle = aEle[i].className;
            if(re.test(oEle)){
                
               arr.push(aEle[i]) 
            }
        }
         return arr;
    }

function getStyle ( obj, attr ) { 
    return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }

//封装函数
window.onload = function(){

var aLi = getByClass('li','word');
var aDiv = getByClass('div','list_nav');
    for(var i=0;i<aLi.length;i++){
       aLi[i].index = i;
        aLi[i].onmouseover = function(){
            var _this =this.index;
            
          
            clearTimeout(aLi[_this].timer);
 setTimeout(function(){aDiv[_this].style.display = 'block';},200)
       
 
    }
        aLi[i].onmouseout = function(){
            var _this =this.index;
            
           aLi[_this].timer =  setTimeout(function(){
                aDiv[_this].style.display = 'none';
            },200)
        }
        } //nav导航
    

      
    
    
    
        var oTop = document.getElementById('top_return');
    
    oTop.onclick = function(){
        
        var speed = 0;
      oTop.timer =  setInterval(function(){
            var iHeight = getscrollTop();
            speed =( 0 - iHeight)/8;
            speed = Math.ceil(speed);
            if(speed==0){
                clearInterval(oTop.timer);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }else{
            document.body.scrollTop = iHeight + speed ;
            document.documentElement.scrollTop = iHeight + speed ;
            }
        },50)
    }
    window.onscroll = function(){
          var scrollTop = getscrollTop();
          
        if(scrollTop> window.innerHeight/2){
            oTop.style.display = 'block';
            
        }else{
            oTop.style.display = 'none';
        }
    }  //回到顶部
    
    
var oPpt = document.getElementById('pic_ppt');
var aImg = oPpt.getElementsByTagName('img');
var aBtn = oPpt.getElementsByTagName('span');   
var uIndex = 4;
var dIndex = 3;
var m = 0;
var timer = null;
    setTimeout(function(){
           
             abc();  
          },10000)
      
        aBtn[m].style.background = '#F17534';
        aBtn[m].style.color = 'white';
        aImg[0].style.opacity = 1;    //初始化
    for(var i=0;i<aBtn.length;i++){
        aBtn[i].index = i;
        aBtn[i].onclick = function(){
            var _this = this.index;
            
             abc = null;
            clearTimeout(timer);
     for(var j=0;j<aImg.length;j++){
       
         aImg[j].style.opacity = '0';
         aImg[j].style.zIndex = dIndex;
         aBtn[j].style.background = '#272323';
         aBtn[j].style.color = '#85898B';
     }
        aImg[_this].style.zIndex = uIndex;
        aBtn[_this].style.background = '#F17534';
        aBtn[_this].style.color = 'white';
        buffMove(aImg[_this],'opacity',20,100,function(){
            m = _this;
  timer = setTimeout(function(){
            
             abc();  
          },10000)  
  
  function abc(){
     
     for(var j =0;j<aBtn.length;j++){
                aBtn[j].style.background = '#272323';
                aBtn[j].style.color = '#85898B';
            }
        aBtn[(m+1)%3].style.background = '#F17534';
        aBtn[(m+1)%3].style.color = 'white';

        buffMove(aImg[m],'opacity',40,0,function(){
            aImg[m].style.zIndex = dIndex;
            m++;
            m = m%3;
            aImg[m].style.zIndex = uIndex;
            buffMove(aImg[m],'opacity',40,100,function(){
                
                abc();
            })
        })
        

    
    }
          
        })
        }
        
    } //点击按钮
      
    function abc(){
     for(var j =0;j<aBtn.length;j++){
                aBtn[j].style.background = '#272323';
                aBtn[j].style.color = '#85898B';
            }
        aBtn[(m+1)%3].style.background = '#F17534';
        aBtn[(m+1)%3].style.color = 'white';

        buffMove(aImg[m],'opacity',40,0,function(){
            aImg[m].style.zIndex = dIndex;
            m++;
            m = m%3;
            aImg[m].style.zIndex = uIndex;
            buffMove(aImg[m],'opacity',40,100,function(){
                
                abc();
            })
        })
        

    
    }  //幻灯片
    
  var oMdiv = document.getElementById('pic_move');
  var aLi = oMdiv.getElementsByTagName('li');
  var oPrew = oMdiv.getElementsByTagName('span')[0];
  var oNext = oMdiv.getElementsByTagName('span')[1];

     
    for(var i=0;i<aLi.length;i++){
        aLi[i].style.left = 230*i + 'px';
    }
    
   oNext.onclick = function(){
       
       if(aLi[aLi.length-1].offsetLeft > 690){
           for(var i=0;i<aLi.length;i++){
               var itarget = aLi[i].offsetLeft - 230;
               buffMove(aLi[i],'left',8,itarget,function(){
                  if(aLi[aLi.length-1].offsetLeft < 690){
                       setTimeout(function(){
                           for(var j=0;j<aLi.length;j++){
                               var target = 690 - 230*j;
                               buffMove(aLi[aLi.length-1-j],'left',2,target)
    }
                       },100)
     
                       
                   } 
               })
           }
           }
       return false;
       }      

  oPrew.onclick = function(){
       
       if(aLi[0].offsetLeft < 0){
           for(var i=0;i<aLi.length;i++){
               var itarget = aLi[i].offsetLeft + 230;
               buffMove(aLi[i],'left',8,itarget,function(){
                   if(aLi[0].offsetLeft > 0){
                       setTimeout(function(){
                           for(var j=0;j<aLi.length;j++){
                               var target = 230*j;
                               buffMove(aLi[j],'left',2,target)
    }
                       },100)
     
                       
                   }
               })
           }
           }
           }
  return false;
       }
    
