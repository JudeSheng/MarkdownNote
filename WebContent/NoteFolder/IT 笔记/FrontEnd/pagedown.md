Pagedown learning notes
-----------------------

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
	
### Markdown.Editor.js
-  页面代码： pagedown自动找 #wmd-input/#wmd-button-bar/#wmd-preview

	<div class="wmd-panel">
	    <div id="wmd-button-bar"></div>
	    <textarea class="wmd-input" id="wmd-input">
		</textarea>
	</div>
	<div id="wmd-preview" class="wmd-panel wmd-preview"></div> 
	
- 启用代码
	
	var editor = new Markdown.Editor(self.converter);
	editor.run();

### 扩展pagedown Plugin hooks : converter.hooks.set / editor.hooks.set

- hooks.set(hookname, func)
	- 注册插件，其他所有之前注册的都将失效
- hooks.chain(hookname, func
	- 注册下一个插件，之前注册继续有效
	
### 插件列表
- preConversion

-----------------------------------------------------------------------------------------

### Markdown learning notes