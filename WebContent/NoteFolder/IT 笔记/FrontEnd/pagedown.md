^^^^^^^^^^^^^^^^^^^^^^^^^ Pagedown learning notes ^^^^^^^^^^^^^^^^^^^^^^^

### Pagedown Links
- [Google wiki page](https://code.google.com/archive/p/pagedown/wikis/PageDown.wiki)
- [Download](http://www.bootcdn.cn/pagedown/)

### Markdown.Converter.js
 
	var converter = new Markdown.Converter();
	var result = converter.makeHtml(html);
	
### Markdown.Sanitizer.js
	过滤html标签白名单之外的标签

	var converter = new Markdown.getSanitizingConverter();
	converter.makeHtml(html)
	
Markdown.Editor.js

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

### Markdown learning notes