(function($){
	$.fn.jdMarkdown = function(filePath) {
		var $item = this;
		filePath = filePath.replace(/ /g, '%20');
		var imgCollapse = 'WebFolder/public-lib/jude/images/collapse.gif';
		var imgExpand = 'WebFolder/public-lib/jude/images/expand.gif';
		$item.addClass('jd-md-panel');
		var bindClickCollapseable = function() {
			$item.find('.jd-md-collContent').hide();
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
			$item.html(result);
			bindClickCollapseable();
		});
	};
})(jQuery);
