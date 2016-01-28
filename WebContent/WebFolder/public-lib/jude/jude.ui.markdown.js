(function($){
	$.fn.jdMarkdown = function(filePath) {
		var $item = this;
		filePath = filePath.replace(/ /g, '%20');
		var headArray = ['h1','h2','h3','h4','h5','h6'];
		var imgCollapse = 'WebFolder/public-lib/jude/images/collapse.gif';
		var imgExpand = 'WebFolder/public-lib/jude/images/expand.gif';
		$item.addClass('jd-mkd-panel');
		
		//#@ Collapseable
		var createCollapseableMD = function() {
			$item.find('h1').each(function(){
				var $h1 = $(this);
				var html = $h1.html();
				if(html.substring(0,1) === '@') {
					$h1.addClass('jd-mkd-collapseable');
					$h1.html('<span class="jd-mkd-img"><img src="' + imgCollapse + '"></img></span><span>' + html.substring(1, html.length) + '</span><span class="jd-mkd-rightimg jd-mkd-down"></span>');
					var $next = $h1.next();
					while(true) {
						if($next.length <= 0) {
							break;
						}
						var tagName = $next[0].tagName;
						if(headArray.indexOf(tagName.toLowerCase()) > -1) {
							$next.before('<div class="jd-mkd-line"></div>');
							break;
						} else {
							$next.hide();
							$next = $next.next();
						}
					}
				}
			});
			
			$item.find('.jd-mkd-collapseable').unbind('click').click(function(){
				var $h1 = $(this);
				var img = $h1.find('img').attr('src');
				if(imgExpand == img) {
					$h1.find('img').attr('src', imgCollapse);
					$h1.find('.jd-mkd-rightimg').removeClass('jd-mkd-up');
					$h1.find('.jd-mkd-rightimg').addClass('jd-mkd-down');
				} else if(imgCollapse == img) {
					$h1.find('img').attr('src', imgExpand);
					$h1.find('.jd-mkd-rightimg').removeClass('jd-mkd-down');
					$h1.find('.jd-mkd-rightimg').addClass('jd-mkd-up');
				}
				var html = $h1.html();
				var $next = $h1.next();
				while(true) {
					if($next.length <= 0) {
						break;
					}
					var tagName = $next[0].tagName;
					if(headArray.indexOf(tagName.toLowerCase()) > -1 || $next.attr('class') === 'jd-mkd-line') {
						break;
					} else {
						if(imgExpand == img) {
							$next.slideUp(100);
						} else if(imgCollapse == img) {
							$next.slideDown(100);
						}
						$next = $next.next();
					}
				}
			});
		};
		// >  Block quotes
		var createBlockQuotesMD = function() {
			$item.find('p').each(function(){
				var $p = $(this);
				var html = $p.html();
				if(html.substring(0,4) == '&gt;') {
					html = html.replace(/&gt;/g, '<br>');
					$p.html('<blockquote><p>' + html + '</p></blockquote>');
				}
			});
		};
		$item.load(filePath, function() {
			var html = $item.html();
			var converter = new Markdown.Converter();
			var result = converter.makeHtml(html);
			$item.html(result);
			createCollapseableMD();
			createBlockQuotesMD();
		});
	};
})(jQuery);
