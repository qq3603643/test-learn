$(function(){
	
	var PicAction = function(){
		var $picListWrap = $('.picList'),
			$picItems = $('.picItem'),
			$mark = $('.mark'),
			
			pic = {
				config: function(obj){
					$picListWrap = $(obj.picListWrapSelector) || $picListWrap;
					$picItems = $(obj.picItemsSelector) || $picItems;
				},
				markShow: function(){
					$mark.css({
						'height': $(document).height(),
						'width': $(document).width(),
						'display': 'block',
					})
					$('body,html').addClass('banScroll');
					$mark.animate({'opacity':1}, 600);
					pic.toWindowMiddle($('.pic-loader'));
				},
				markHide: function(){
					$mark.animate({'opacity':0}, 600,function(){
						$mark.css({'display':'none'});
						$('body,html').removeClass('banScroll');
					});
				},
				toWindowMiddle: function($ele){
					var eleHeight = $ele.height(),eleWidth = $ele.width(),
						scrollTopWin = $(window).scrollTop();
					$ele.css({
						'top': ($(window).height() - eleHeight)/2 + scrollTopWin,
						'left': ($(window).width() - eleWidth)/2,
					})
				},
				picBigShow: function(){
					var _this = $(this),
						isHaveBigOfThis = function(){
							return $mark.find('img[src="'+ _this.attr('src') +'"]').size() > 0 ? !0 : !1;
						},
						startWidth = _this.width();startHeight = _this.height();
						startLeft = _this.offset().left,startTop = _this.offset().top,
						endWidth,endHeight,endLeft,endTop;

						if(!isHaveBigOfThis()){
						$('.pic-loader').show();
						var bigPic = $('<img>').addClass('bigPicItem').attr({
									'startLeft': startLeft,'startTop': startTop,src: _this.attr('src')
								});
						bigPic.get(0).onload = function(){
							$('.pic-loader').hide();
							$mark.append(bigPic);
							pic.toWindowMiddle(bigPic);

							endWidth = bigPic.width();endHeight = bigPic.height();
							endTop = bigPic.offset().top;endLeft = bigPic.offset().left;
						var scaleX = startWidth/endWidth,scaleY = startHeight/endHeight;
							bigPic.attr({
								'bigWidth': endWidth,'bigHeight': endHeight
							})
							//开始运动之前都需要把其放到小图的位置
							bigPic.css({'top':startTop+'px',
										'left':startLeft+'px',
										'width':startWidth+'px',
										'height':startHeight+'px'
										});

							bigPic.animate({'width':endWidth+'px',
											'height':endHeight+'px',
											'left':endLeft+'px',
											'top':endTop+'px'
											}, 600)
						}
						}else{
							var bigPic = $mark.find('img[src="'+ _this.attr('src') +'"]'),
								endWidth = bigPic.attr('bigWidth'),endHeight = bigPic.attr('bigHeight'),
								endTop = $(window).scrollTop() + ($(window).height()-endWidth)/2,
								endLeft =( $(window).width() - endWidth )/2;
							bigPic.attr({
								'startLeft': startLeft,'startTop': startTop
							})
							//开始运动之前都需要把其放到小图的位置
							bigPic.css({'display':'block',
										'top':startTop,
										'left':startLeft
										});
							
							bigPic.animate({'left':endLeft+'px',
											'top':endTop+'px',
											'opacity':1,
											'width':endWidth+'px',
											'height':endHeight+'px'
											}, 600);
						};
				},
				picBigHide: function(){
					var _this = $(this),
						targetTop=_this.attr('startTop'),
						targetLeft=_this.attr('startLeft'),
						targetWidth=$picItems.width(),
						targetHeight=$picItems.height();
					_this.animate({'opacity':0,
									'top':targetTop+'px',
									'left':targetLeft+'px',
									'width':targetWidth+'px',
									'height':targetHeight+'px'
								}, 600,function(){
									_this.css('display','none');
								})
				},
				run:function(){
					$picListWrap.on('touchstart','.picItem',function(){
						pic.markShow();
						pic.picBigShow.call(this);
					})
					$mark.on('touchend','.bigPicItem',function(){
						pic.markHide();
						pic.picBigHide.call(this);
					})
				}
			};

		return {
			'run': pic.run
		};

	}();

	PicAction.run();

})