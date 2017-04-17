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

Pagedown
----------------------------
Hooks on the converter object
preConversion

Called with the Markdown source as given to the converter's makeHtml object, should return the actual to-be-converted source. Fine to chain.

converter.hooks.chain("preConversion", function (text) { return "# Converted text follows\n\n" + text; // creates a level 1 heading });
postConversion

Called with the HTML that was created from the Markdown source. The return value of this hook is the actual output that will then be returned from makeHtml. This is where getSanitizingConverter (see above) registers the tag sanitzer and balancer. Fine to chain.

converter.hooks.chain("postConversion", function (text) { return text + "<br>\n**This is not bold, because it was added after the conversion**"; });
plainLinkText

When the original Markdown contains a bare URL, it will by default be converted to a link whose link text is the URL itself. If you want a different link text, you can register a function on the hook that receives the URL as its only argument, and returns the text to be displayed. This will not change the actual URL (i.e. target of the link).

Note that the returned string will be inserted verbatim, not HTML-encoded in any way.

Okay to chain, although this may or may not make sense (after all you're receiving a URL and returning just about anything).

converter.hooks.chain("plainLinkText", function (url) { if (/^http:\/\/\w+\.stackexchange.com/i.test(url)) return "<b>A link to an awesome site!</b>"; else return "some page on the internet"; });
Notice on the following hooks

The following converter plugin hooks should be considered advanced. In order to use them, it makes sense to have a certain understanding how PageDown (or similar Markdown implementations that are based on the original Perl version) works internally. They are much more powerful than the previous ones, but it's also easier to break things with them. Documentation here is kept to a minimum; you should inspect the code around the hooks.
postNormalization

Called with the Markdown source after normalization. This includes things like converting all line endings to \n, replacing tabs with spaces, and turning whitespace-only lines into empty lines. But it also includes replacing certain characters with placeholders for internal reasons, so be sure to have a look at the actual code. This hook is fine to chain.
preBlockGamut and postBlockGamut

The above warning about understandind the inner workings of PageDown goes doubly with these two hooks. They are the most powerful ones.

Called with the text before or after creating block elements like code blocks and lists. Fine to chain. Note that this is called recursively with inner content, e.g. it's called with the full text, and then only with the content of a blockquote. The inner call will receive outdented text

If you are creating a new kind of block-level structure that can include other Markdown blocks (say, you're reimplementing block quote), you will need to run the full block gamut again on the contents of your block. For this purpose, these two plugin hooks receive a second argument, which is a function that will do just that. Be aware that from within that function, your plugin will of course be called again, so make sure you're not creating ambiguity that leads to infinite recursion.

As a contrived and simplified expample, let's say you're inventing fenced blockquotes, where blocks that are surrounded by lines with three quote characters in them are turned into block quotes. Such a thing could look like this:

converter.hooks.chain("preBlockGamut", function (text, runBlockGamut) { return text.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (whole, inner) { return "<blockquote>" + runBlockGamut(inner) + "</blockquote>\n"; }); });

The first editor in the demo page implements this.
preSpanGamut and postSpanGamut

Called with the text of a single block element before or after the span-level conversions (like bold, code spans, etc.) have been made on it. For example, you would use this if you wanted to have text between !!double exclamation points!! appear in red.
Hooks on the editor object

Remember to add all your necessary plugins before you call the editor's run() method.
onPreviewRefresh

Called with no arguments after the editor's preview has been updated. No return value is expected. Fine to chain, if you want to be notified of a refresh in several places.

editor.hooks.chain("onPreviewRefresh", function () { console.log("the preview has been updated"); });
postBlockquoteCreation

Called after the user has clicked the "Blockquote" button (or pressed Ctrl-Q) and the user's selection has been changed accordingly. This function is passed the content that would be inserted in place of the original selection, and should return the actual to-be-inserted content.

The name isn't 100% correct, as this hook is also called if a blockquote is removed using this button. Fine to chain (but probably unlikely to be used anyway).

``` editor.hooks.chain("postBlockquoteCreation", function (text) { if (!/^>/.test(text)) return text; // the blockquote button was clicked to remove a blockquote -- no change

    return text + "\n\nThe above blockquote is brought to you by PunyonDew(tm)\n\n"
});

```
insertImageDialog

When the user clicks the "add image" button, they usually get a little dialog to enter the URL of an image. If you want a different behavior (like, in the case of Stack Exchange, a dialog to upload an image), register a plugin on this hook that returns true (this tells the editor not to create its own dialog and instead wait for you). The function is called with a single argument, which is a callback that you should call with the URL of the to-be-inserted image, or null if the user cancelled.

It does not make sense to chain functions on this hook.

editor.hooks.set("insertImageDialog", function (callback) { alert("Please click okay to start scanning your brain..."); setTimeout(function () { var prompt = "We have detected that you like cats. Do you want to insert an image of a cat?"; if (confirm(prompt)) callback("http://icanhascheezburger.files.wordpress.com/2007/06/schrodingers-lolcat1.jpg") else callback(null); }, 2000); return true; // tell the editor that we'll take care of getting the image url });

Note that you cannot call the callback directly from the hook; you have to wait for the current scope to be exited. If for any reason you want to return a link immediately, you'll have to use a 0ms timeout:

editor.hooks.set("insertImageDialog", function (callback) { setTimeout(function () { callback("http://example.com/image.jpg"); }, 0); return true; }); 