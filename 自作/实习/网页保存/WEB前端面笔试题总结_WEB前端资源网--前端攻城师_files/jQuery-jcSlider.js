var jcSlider = {
	
	// 默认显示
	num : 0,
	// 全局动画速度
	speed : 400,
	// 设置图片高度
	height : 326,
	// 设置图片宽度
	width : 712,
	// 数字高度
	imgHeight : 21,
	// 数字宽度
	imgWidth : 21,
	// 自动播放
	timer : null,
	
	// 私有方法
	fn : {
		
		NumList : function( list, left, top )
		{
			return "<dl class=\"imgNum\" id=\"numList\" style=\"display:none;left:"+ left +"px;top:" + top + "px;\" >" + list + "</dl>";
		},
		
		num : function( m, i )
		{
			return m-1 === i ? "<dd class=\"select\"><a>"+ m +"</a></dd>" : "<dd><a>"+ m +"</a></dd>";
		},
		
		title : function( w, h, c, t  )
		{
			return "<div id=\"sliderTitle\" style=\"display:none;width:"+ w +"px;line-height:"+ h +"px;height:" + h +"px;position:absolute;top:"+ t +"px;left:0;z-index:2;\"><div id=\"titleBg\" style=\"background:"+ c + ";width:100%;height:" + h + "px;position:absolute;top:0;left:0;z-index:0;\"></div><span style=\"padding:0 10px;font-size:14px;color:#fff;position:relative;z-index:1;\"></span></div>"
		},
		
		change : function( num, title, a, text, i, speed )
		{
			num.addClass("select").siblings().removeClass("select");
			
			title.animate( { opacity : 0 }, 0 ).text( text ).stop().animate( { opacity : 1 }, speed );
			
			a.stop().animate( { opacity : 1 }, speed ).parent().siblings().find("a").animate( { opacity : 0 }, speed );
			console.log(a.css("opacity"))
			return i ;
		},
		
		autoPlay : function( num, title, a, text, i, speed, len )
		{
			if( i < len )
			{
				i += 1;	
			}
			else
			{
				i = 0;	
			};

			this.change.call( null, num.eq( i ), title, a.eq( i ), text[ i ], i, speed );
			
			return i;
		}
	},
	
	// 调用特效方法
	init : function( o )
	{
		var $o = o,
			$a = $( "a", $o ),
			len = $a.length,
			num = [],
			
			title = [],
			
			_self = this;
		
		
		// 初始化数据 生成图片
		$.each( $a, function( i )
		{
			title.push( this.title );
			
			$( this ).css( "opacity", 0 );
			
			var img = new Image();
			
			img.src = this.getAttribute("path");
			
			img.title = this.title;
			
			img.height = _self.height;
			
			img.width = _self.width;
			
			( function( i, obj, img )
			{
				obj.appendChild( img );
				
				// 预加载图片
				img.onload = function()
				{
					if( _self.num === i )
					{
						$("#sliderTitle,#numList").find("div")
												  .css( "opacity", .5 )
												  .end()
												  .find("span")
												  .text( img.title )
												  .end()
												  .fadeTo( _self.speed, 1 );
						$( obj ).fadeTo( _self.speed, 1 );
					};
				};
				
			} )( i, this, img );
			
			num.push( _self.fn.num( i + 1, _self.num ) );
			
		} );
		
		$o.append( 
			// 创建文本显示区域
			_self.fn.title( _self.width, 44 , "#000", _self.height - 44 ) + 
			// 创建数字列表
			_self.fn.NumList(
				// 数字字符串
				num.join(""),
				// 获取left 
				_self.width - ( len*_self.imgWidth + 30 ), 
				// 获取top
				_self.height - _self.imgHeight - 10 
			)
		);
		
		// 绑定事件
		var $num = $("#numList").find("dd"),
			$title = $("#sliderTitle").find("span");
		
		$num.click( function()
		{
			var i = $( this ).index();
			_self.num = _self.fn.change( $( this ), $title, $a.eq( i ), title[ i ], i ,_self.speed );
			
		});
		
		if( len > 1 )
		{
			// 自动播放
			_self.timer = setInterval( function()
			{
				_self.num = _self.fn.autoPlay( $num, $title, $a, title, _self.num ,_self.speed, len - 1 );
				
			}, 3000 );
			
			$o.hover( function()
			{
				clearInterval( _self.timer );
			},
			function()
			{
				_self.timer = setInterval( function()
				{
					_self.num = _self.fn.autoPlay( $num, $title, $a, title, _self.num ,_self.speed, len - 1 );
					
				}, 3000 );
			});
		};

	}
	
} || jcSlider;