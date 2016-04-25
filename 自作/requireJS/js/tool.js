define([],function(){
    console.log( '你正在引用tool' )
    var tool = function(){
        var eles,ele,eleArr,classRe,
            
            tool = {
                getElesByClass: function(classStr){
                    eles = document.getElementsByTagName( '*' );
                    eles = [].slice.call( eles );
                    eleArr = [];
                    while( eles.length ){
                        classRe = new RegExp( '\\b'+classStr+'\\b' );
                        ele = eles.shift();
                        classRe.test( ele.className )&&eleArr.push( ele );
                    }
                    return eleArr;
                    },
                getStyle: function(){
                    if( window.currentStyle ) return function(ele,attr){
                        return ele.currentStyle[attr];
                    }
                    return function(ele,attr){
                        return getComputedStyle(ele)[attr];
                    }
                }(),
            };
        return tool;
    }();
    return tool;
})