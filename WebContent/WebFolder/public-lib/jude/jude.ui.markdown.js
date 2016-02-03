(function($){
	$.fn.jdMarkdown = function(filePath, height, id) {
		var $item = this;
		filePath = filePath.replace(/ /g, '%20');
		var imgCollapse = 'WebFolder/public-lib/jude/images/collapse.gif';
		var imgExpand = 'WebFolder/public-lib/jude/images/expand.gif';
		var bindClickCollapseable = function() {
			$item.find('.jd-md-collTitle').unbind('click').click(function(){
				var $title = $(this);
				var img = $title.find('img').attr('src');
				if(imgExpand == img) {
					$title.find('img').attr('src', imgCollapse);
					$title.find('.jd-md-rightimg').removeClass('jd-md-up');
					$title.find('.jd-md-rightimg').addClass('jd-md-down');
				} else if(imgCollapse == img) {
					$title.find('img').attr('src', imgExpand);
					$title.find('.jd-md-rightimg').removeClass('jd-md-down');
					$title.find('.jd-md-rightimg').addClass('jd-md-up');
				}
				var $content = $title.parent().find('.jd-md-collContent');
				if(imgExpand == img) {
					$content.slideUp(100);
				} else if(imgCollapse == img) {
					$content.slideDown(100);
				}
			});
		};
		$item.load(filePath, function(_html) {
			var converter = new Markdown.getSanitizingConverter();
			var result = converter.makeHtml(_html);
			$item.html('<div class="jd-md-panel">' + result + '</div>');
			$('#mdn-notepad').find('ul.ui-tabs-nav').find('[href="#' + id + '"]').click();
			if($item.find('.jd-md-panel').height() > height) {
				$item.find('.jd-md-panel').css('height', height);
				$item.find('.jd-md-collContent').hide();
				$item.find('.jd-md-panelt').find('img').attr('src', imgCollapse);
				$item.find('.jd-md-panel').find('.jd-md-rightimg').removeClass('jd-md-up');
				$item.find('.jd-md-panel').find('.jd-md-rightimg').addClass('jd-md-down');
				
			} else {
				$item.find('.jd-md-panel').css('height', height);
				$item.find('.jd-md-collContent').show();
				$item.find('.jd-md-panel').find('img').attr('src', imgExpand);
				$item.find('.jd-md-panel').find('.jd-md-rightimg').removeClass('jd-md-down');
				$item.find('.jd-md-panel').find('.jd-md-rightimg').addClass('jd-md-up');
			}
			$item.find('.jd-md-panel').css('height', height);
			var editor = new Markdown.Editor(converter);
			editor.run();
			bindClickCollapseable();
			$item.find('a').attr('target', '_blank');
		});
	};
})(jQuery);
