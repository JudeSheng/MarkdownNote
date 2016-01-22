$(function(){
	$('#mdn-notepad').load("NoteFolder/test.md", function() {
		var $item = $(this);
		var html = $item.html();
		var converter = new Markdown.Converter();
		var result = converter.makeHtml(html);
		result = result.replace(/\<p\>{\<\/p\>/g, '<div class="md-title-collapse">').replace(/\<p\>}\<\/p\>/g, '</div>');
		$item.html(result);
		$('.md-title-collapse').children(':not(h1,h2,h3,h4,h5,h6)').hide();
		$('h1,h2,h3,h4,h5,h6').unbind('click').click(function(){
			var $item = $(this);
			$item.parent().children(':not(h1,h2,h3,h4,h5,h6)').slideToggle(300);
		});
	});
	
});
