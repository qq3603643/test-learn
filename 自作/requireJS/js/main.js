require( ['tool','mineConsole'],function( t,myCon ){  //function中传入的参数为前面[] 对应的js文件的返回值，值得注意的是引用该js文件时会执行该文件
    if( [] ) myCon.favourite();
    var $box = t.getElesByClass( 'box' )[0];
    console.log( t.getStyle( $box,'width' ) );
    var arr = [1,6,3,9,4,2,120];
    for( var len=arr.length,item,minArr=[];item=arr[len-=1]; )
        //item<5 && ( minArr[minArr.length]=item );//当&&后面为表达式时需要将其用括号囊括
    if( item<5 ) minArr[minArr.length]=item;
    console.log( minArr );
} )
