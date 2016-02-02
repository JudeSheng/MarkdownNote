(function($){
	$.fn.jdMarkdown = function(filePath, height) {
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
			var converter = new Markdown.Converter();
			var result = converter.makeHtml(_html);
			$item.html('<div class="jd-md-panel">' + result + '</div>');
			bindClickCollapseable();
			$item.find('a').attr('target', '_blank');
			if($item.find('.jd-md-panel').height() > height) {
				$item.find('.jd-md-collTitle').find('img').attr('src', imgCollapse);
				$item.find('.jd-md-collTitle').find('.jd-md-rightimg').removeClass('jd-md-up');
				$item.find('.jd-md-collTitle').find('.jd-md-rightimg').addClass('jd-md-down');
				$item.find('.jd-md-collContent').hide();
			}
			$item.find('.jd-md-panel').css('height', height);
		});
	};
})(jQuery);
