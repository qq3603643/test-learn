define( [],function(){
    console.log( '你正在引用mineConsole' )
    var mineConsole = function(){
    var 
        favourite = [ 'apple','orange' ],
        name = 'tangerine',
        sex = 'man',
        mineConsole = {
        name: function(){
            console.log( name );
        },
        sex: function(){
            console.log( sex );
        },
        favourite: function(){
            while( favourite.length )console.log( favourite.shift() );
        }
    };
        return mineConsole;
        }();
    return mineConsole;
} )
