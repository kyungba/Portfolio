var script = (function(){
	return {
		thumbHover : function (selector, cover) {
            var w, h, x, y, direction;
            $(selector).each(function(){
				$(this).on("mouseenter", function () {
					w = $(this).width();
					h = $(this).height();
					x = ( event.pageX - $(this).offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
						y = ( event.pageY - $(this).offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
						direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 )  % 4;

					$(this).find(cover).show();

					if(direction == 0) {
						$(this).find(cover).css({"top":-h, "left":0});
					} else if(direction == 1) {
						$(this).find(cover).css({"top":0, "left":w});
					} else if(direction == 2) {
						$(this).find(cover).css({"top":h, "left":0});
					} else {
						$(this).find(cover).css({"top":0, "left":-w});
					}

					TweenMax.to($(this).find(cover), 0.4, {top:0, left:0, ease:Power3.easeOut});
				});

				$(this).on("mouseleave", function () {
					w = $(this).width();
					h = $(this).height();
					x = ( event.pageX - $(this).offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
						y = ( event.pageY - $(this).offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
						direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 )  % 4;

					if(direction == 0) {
						TweenMax.to($(this).find(cover), 0.4, {top:-h, left:0, ease:Power3.easeOut, onComplete:function () {
								$(this).parent().find(cover).hide();
							}});
					} else if(direction == 1) {
						TweenMax.to($(this).find(cover), 0.4, {top:0, left:w, ease:Power3.easeOut, onComplete:function () {
								$(this).parent().find(cover).hide();
							}});
					} else if(direction == 2) {
						TweenMax.to($(this).find(cover), 0.4, {top:h, left:0, ease:Power3.easeOut, onComplete:function () {
								$(this).parent().find(cover).hide();
							}});
					} else {
						TweenMax.to($(this).find(cover), 0.4, {top:0, left:-w, ease:Power3.easeOut, onComplete:function () {
								$(this).parent().find(cover).hide();
							}});
					}
				})
            })
        },
		scrollEvt : function(){
			$(window).scroll(function(){
				if($(window).scrollTop() + $(window).height()/2 > $(".listDiv").offset().top){
					$(".listDiv .list").each(function(q){
						TweenMax.to($(".listDiv .list").eq(q), 0, {top:0, opacity:1, delay:q*0.15});
					});
				}
			});$(window).scroll();
		},
		resizeEvt : function(){
			
		},
		viewPop : function(){
			$(".listDiv .list").each(function(){
				$(this).click(function(){
					$(".viewPop").stop(true, true).fadeIn(300);
					$(".viewPop .titArea .tit").text($(this).find(".txtArea .tit").text())
					$(".viewPop .titArea .link").attr("href", $(this).data("href"))
					$(".viewPop .conArea").text($(this).attr("id"))
				});
			});
		},
	}
})();



$(document).ready(function(){
	script.scrollEvt();
	script.viewPop();
});


$(window).load(function(){
	script.thumbHover(".listDiv .list", ".dimd")
});