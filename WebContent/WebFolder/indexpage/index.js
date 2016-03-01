if ( window.MDN == undefined ) { MDN = {}; }
MDN.host = '/MarkdownNote';
MDN.index = function() {
	var self = this;
	this.notesbarObject = {};
	this.notesbarId = 'mdn-notesbar';
	this.$notesbarTab;
	this.mdHeight = $(window).height() - 210;
	this.converter = new Markdown.Converter();
	this.editor = new Markdown.Editor(self.converter);
	this.currentTabs = null;
	this.isAltDown = false;
	this.isPointDown = false;
	this.isShiftDown = false;
	this.isCtrlDown = false;
	this.isVDown = false;
	this.isMenuOver = false;
	this.isNoteOver = false;
	this.isDialogOver = false;
	this.pageX = 0;
	this.pageY = 0;
	this.imgCollapse = 'WebFolder/public-lib/jude/images/collapse.gif';
	this.imgExpand = 'WebFolder/public-lib/jude/images/expand.gif';
	this.init = function() {
		self.initNotesbarTabs();
		self.createMenubar();
		self.doMDEditor();
		$.ajaxSetup({cache:false});
	};
	this.createMenubar = function(key, _callback) {
		$.ajax({ 
			type : 'POST',
			url: MDN.host + '/fetchMenuList.action',
			dataType : 'json',
			success : function( jsonObject ) { 
				var menubar = jsonObject.menubar;
				$('#mdn-menubar').jdMenuTree(menubar.menu.childMenuList);
				self.notesbarObject = menubar.notesMap;
				self.bindClickMenu();
				self.bindClickNote();
				self.doNotesbarTabs(key);
				self.doEditorMenu();
				self.doEditorNote();
				self.bindClickEditor();
				if(_callback) {
					_callback();
				}
			},
			error : function( error ) {
				alert(error);
			},
			complete: function() { 
			}
		});
	};
	this.doNotesbarTabs = function(key) {
		if(typeof(key) == 'undefined') {
			var $initMenu = $('.jd-menu-tree').find('li:eq(0)');
			$initMenu.click();
		} else {
			var keys = key.split(".");
			for (var i = 0; i < keys.length; i++) {
				var parentKey = '';
				for (var j = 0; j < i + 1; j++) {
					parentKey += keys[j];
					if(j != i) {
						parentKey += '.';
					}
				}
				var $initMenu = $('#mdn-menubar').find('[key="'+parentKey+'"]');
				$.jdMenuTree_Click($initMenu, false);
				self.doClickMenu($initMenu);
			}
		}
	};
	this.initNotesbarTabs = function() {
		self.$tabs = $('#mdn-notepad').jdTabs('Init Tabs', self.notesbarId, false);
		self.$notesbarTab = $('#mdn-notepad').find('[href="#' + self.notesbarId + '"]');
		self.$notesbarTab.parent().addClass('mdn-notesbar-tab');
	};
	this.bindClickMenu = function() {
		$('.jd-menu-tree').find('li').click(function(){
			var $item = $(this);
			self.doClickMenu($item);
		});
	};
	this.doClickMenu = function($item) {
		var allKeys = [];
		var key = $item.attr('key');
		allKeys.push(key);
		$item.next().find('li').each(function(){
			var $child = $(this);
			allKeys.push($child.attr('key'));
		});
		self.makeHeadMenuHtml($item);
		self.bindClickHeadMenu();
		self.makeNotebarHtml(allKeys);
		self.$notesbarTab.html($item.html());
		self.$notesbarTab.click();
		
		self.$notesbarTab.click();
	};
	this.makeHeadMenuHtml = function($item, isRightClick){
		var currentKey = $item.attr('key');
		if(typeof(currentKey) == 'undefined') {
			return;
		}
		var childKeys = [];
		$item.next().children('li').each(function(){
			var $child = $(this);
			childKeys.push($child.attr('key'));
		});
		var htmlCurrent = '';
		var keys = currentKey.split('.');
		for (var i = 0; i < keys.length; i++) {
			var key = '';
			for (var j = 0; j < i + 1; j++) {
				key += keys[j];
				if(j != i) {
					key += '.';
				}
			}
			var title = $('.jd-menu-tree').find('[key="'+key+'"]').html();
			if(title.indexOf('<span>') > -1) {
				title = $('.jd-menu-tree').find('[key="'+key+'"]').find('span:first').html();
			}
			htmlCurrent += '<span key="' + key + '">' + title + '</span>';
			if(i != keys.length-1) {
				htmlCurrent += ' / ';
			} 
		}
		if(isRightClick) {
			return htmlCurrent;
		}
		$('#mdn-dialog-editor-parrent').html(htmlCurrent);
		$('.mdn-head-menu .menu .current').html(htmlCurrent);
		var htmlChildren = '';
		for (var i = 0; i < childKeys.length; i++) {
			var key = childKeys[i];
			var title = $('.jd-menu-tree').find('[key="'+ key +'"]').html();
			htmlChildren += '<span key="' + key + '">' + title + '</span>';
		}
		$('.mdn-head-menu .menu .children').html(htmlChildren);
	};
	this.bindClickHeadMenu = function() {
		$('.mdn-head-menu .menu span').unbind('click').click(function(){
			var $menu = $(this);
			var key = $menu.attr('key');
			$('.jd-menu-tree').find('[key="'+key+'"]').click();
		});
	};
	this.makeNotebarHtml =function(keys) {
		var html = '<div>';
		for (var i = 0; i < keys.length; i++) {
			var notes = self.notesbarObject[keys[i]];
			if(notes != undefined && notes.length > 0) {
				if(i == 0) {
					html += '<ul class="mdn-notesbar-current">';
					for (var j = 0; j < notes.length; j++) {
						var location = notes[j].location;
						var index = location.indexOf('NoteFolder');
						location = location.substring(index).replace(/\\/g,'/');
						location = encodeURI(location);
						html += '<li><span key="' + keys[i].replace(/\./g,'-') + "-" + j + '" name="' + location + '">' + notes[j].name + '</span></li>';
					}
					html += '</ul>';
				} else {
					html += '<div class="mdn-notesbar-folder">';
					var keyArray = keys[i].split('.');
					html += '<div class="mdn-notesbar-titles">';
					for (var j = 0; j < keyArray.length; j++) {
						var keyTitle = '';
						for (var k = 0; k < j + 1; k++) {
							keyTitle += keyArray[k] + '.';
						}
						keyTitle = keyTitle.substr(0, keyTitle.length - 1);
						var title = $('.jd-menu-tree').find('[key="'+keyTitle+'"]').html();
						if(title.indexOf('<span>') > -1) {
							title = $('.jd-menu-tree').find('[key="'+keyTitle+'"]').find('span:first').html();
						}
						if(j != keyArray.length-1) {
							html += '<span>' + title + '</span><span> / </span>';
						} else {
							html += '<span class="mdn-notesbar-folder-current">' + title + '</span>';
						}
					}
					html += '</div>';
					html += '<ul>';
					for (var j = 0; j < notes.length; j++) {
						var location = notes[j].location;
						var index = location.indexOf('NoteFolder');
						location = location.substring(index).replace(/\\/g,'/');
						html += '<li><span key="' + keys[i].replace(/\./g,'-') + "-" + j + '" name="' + location + '">' + notes[j].name + '</span></li>';
					}
					html += '</ul></div>';
				}
			}
		}
		html += '</div>';
		$('#' + self.notesbarId).html('<div class="jd-md-panel">' + html + '</div>');
		$('.jd-md-panel').css('height', self.mdHeight);
	};
	this.bindClickNote = function() {
		$('#' + self.notesbarId).find('li span').unbind('click').live('click', function(){
			var $note = $(this);
			var noteHtml = $note.html();
			var location = $note.attr('name');
			var key = $note.attr('key');
			var index = noteHtml.lastIndexOf('.');
			var name = '';
			if(index > 0) {
				name = noteHtml.substring(0,index);
			} else {
				name = noteHtml;
			}
			if($("#" + key).length > 0) {
				$('[href="#' + key + '"]').click();
			} else {
				$('#mdn-notepad').jdTabs_Add(name, key, true);
				$('[href="#' + key + '"]').attr('key',location);
				var $content = $("#" + key);
				
				$content.html('<div class="jd-md-panel"></div>');
				var $item = $content.find('.jd-md-panel');
				$.get(location.replace(/ /g, '%20'),null, function(_html) {
					$item.jdMarkdown(_html, self.converter);
					$('#mdn-notepad').find('ul.ui-tabs-nav').find('[href="#' + key + '"]').click();
					if($item.height() > self.mdHeight) {
						$item.find('.jd-md-collContent').hide();
						$item.find('img').attr('src', self.imgCollapse);
						$item.find('.jd-md-rightimg').removeClass('jd-md-up');
						$item.find('.jd-md-rightimg').addClass('jd-md-down');
						
						$item.find('.jd-md-collContent:last').show();
						$item.find('img:last').attr('src', self.imgExpand);
						$item.find('.jd-md-rightimg:last').removeClass('jd-md-down');
						$item.find('.jd-md-rightimg:last').addClass('jd-md-up');
					} else {
						$item.find('.jd-md-collContent').show();
						$item.find('img').attr('src', self.imgExpand);
						$item.find('.jd-md-rightimg').removeClass('jd-md-down');
						$item.find('.jd-md-rightimg').addClass('jd-md-up');
					}
					$item.css('height', self.mdHeight);
				}, 'text');
				
				self.bindClickTabs();
				$('.mdn-head-title .title').html(name);
			}
			
			self.createDateHtml(key);
		});
	};
	this.createDateHtml = function(key) {
		var notesbarKeyArray = key.split('-');
		var notesbarKey = '';
		var notesbarindex = 0;
		for (var i = 0; i < notesbarKeyArray.length; i++) {
			if(i == notesbarKeyArray.length - 1) {
				notesbarindex = notesbarKeyArray[i];
			} else {
				notesbarKey += notesbarKeyArray[i];
				if(i != notesbarKeyArray.length - 2) {
					notesbarKey += '.';
				}
			}
		}
		var lastModifiedTime = self.notesbarObject[notesbarKey][notesbarindex].lastModifiedTime;
		var creationTime = self.notesbarObject[notesbarKey][notesbarindex].creationTime;
		var owner = self.notesbarObject[notesbarKey][notesbarindex].owner;
		$('.mdn-head-date .date span').html('Last modified on ' + lastModifiedTime + ' . Created by ' + owner + ' on ' + creationTime);
	};
	this.bindClickTabs = function() {
		$('#mdn-notepad a.ui-tabs-anchor').click(function(){
			var $item = $(this);
			var key = $item.attr('href').substring(1);
			if(key != self.notesbarId) {
				$('.mdn-head-title .title').html($item.html());
				self.createDateHtml(key);
			}
			self.currentTabs = key;
		});
		$('.ui-icon-close').live('click', function(){
			var key = $('#mdn-notepad').find('[aria-selected="true"]').find('a').attr('href').substring(1);
			self.currentTabs = key;
		});
	};
	this.doMDEditor = function() {
		self.editor.run();
		$('textarea').keyup(function(event){
			var keyCode = event.keyCode;
			if(self.isCtrlDown && self.isVDown) {//Ctrl+V
				$('#wmd-input').val($('#wmd-input').val().replace(/\t/g,'    '));
			}
			if(keyCode == 16) {
				self.isShiftDown = false;
			} else if(keyCode == 17) {
				self.isCtrlDown = false;
			} else if(keyCode == 86) {
				self.isVDown = false;
			}
			
		});
		$('textarea').keydown(function(event){
			var $textarea = $(this);
			var keyCode = event.keyCode;
			if(keyCode == 16) {
				self.isShiftDown = true;
			} else if(keyCode == 17) {
				self.isCtrlDown = true;
			} else if(keyCode == 86) {
				self.isVDown = true;
			}
			if(keyCode == 9) {//Tab
				event.preventDefault();
				var startIndex = this.selectionStart;
				var endIndex = this.selectionEnd;
				var text = $textarea.val();
				var textSelection = text.substring(startIndex, endIndex);
				var tab = '    ';
				var isSingleLine = textSelection.indexOf('\n') == -1;
				if(!self.isShiftDown) {
					if(isSingleLine) {
						text = text.substr(0, startIndex) + tab + text.substr(endIndex);
						$textarea.val(text);
						this.selectionStart = startIndex + tab.length;
						this.selectionEnd = startIndex + tab.length;
					} else {
						textSelection = tab + textSelection.replace(/\n/g,'\n' + tab);
						text = text.substr(0, startIndex) + textSelection + text.substr(endIndex);
						$textarea.val(text);
						this.selectionStart = startIndex + tab.length;
						this.selectionEnd = startIndex + textSelection.length;
					}
					
				} else {
					if(isSingleLine) {
					} else {
						textSelection = textSelection.replace(/\n    /g,'\n');
						text = text.substr(0, startIndex - tab.length) + textSelection + text.substr(endIndex);
						$textarea.val(text);
						this.selectionStart = startIndex - tab.length;
						this.selectionEnd = startIndex - tab.length + textSelection.length;
					}
					
				}
			}
		});
		$(document).keydown(function(event){
			var keyCode = event.keyCode;
			if( keyCode == 18) {
				self.isAltDown = true;
			}
			if( keyCode == 192) {
				self.isPointDown = true;
			}
		});
		$(document).keyup(function(event){
			var keyCode = event.keyCode;
			var location = $('#mdn-notepad').find('[href="#' + self.currentTabs + '"]').attr('key');
			if(self.isPointDown && self.isAltDown){
				if($('.wmd-panel').css('display') == 'none') {
					if(self.currentTabs != self.notesbarId && self.currentTabs != null) {
						$.get(location, null, function(_html) {
							$('#wmd-input').val(_html);
							$('.wmd-panel').show();
							self.editor.refreshPreview();
							$('#wmd-preview').jdMarkdown(_html, self.converter);
							$('#wmd-preview').find('.jd-md-collContent').show();
							$('#wmd-preview').find('img').attr('src', self.imgExpand);
							$('#wmd-preview').find('.jd-md-rightimg').removeClass('jd-md-down');
							$('#wmd-preview').find('.jd-md-rightimg').addClass('jd-md-up');
						}, 'text');
					}
				} else {
					var _html = $('#wmd-input').val();
					$.ajax({ 
						type : 'POST',
						url: MDN.host + '/midifyNote.action',
						dataType : 'json',
						data: {
							filePath: decodeURI(location),
							content: _html
						},
						success : function( jsonObject ) { 
							var $item = $('#' + self.currentTabs).find('.jd-md-panel');
							$item.jdMarkdown(_html, self.converter);
							$item.find('.jd-md-collContent').show();
							$item.find('img').attr('src', self.imgExpand);
							$item.find('.jd-md-rightimg').removeClass('jd-md-down');
							$item.find('.jd-md-rightimg').addClass('jd-md-up');
							$('.wmd-panel').hide();
						},
						error : function( error ) {
							alert(error);
						},
						complete: function() { 
						}
					});
				}
			}
			if(keyCode == 18) {
				self.isAltDown = false;
			} else if(keyCode == 192) {
				self.isPointDown = false;
			}
		});
	};
		
	this.bindClickEditor = function() {
		$('#mdn-dialog-add-menu').unbind('click').click(function(){
			$('#mdn-dialog-editor-value').val('');
			$('#mdn-dialog-editor-title').html('Add Menu');
			$('#mdn-dialog-editor-title2').html('Add into : ');
			$('#mdn-dialog-editor').show();
			$('#mdn-dialog').hide();
		});
		$('#mdn-dialog-editor-menu').unbind('click').click(function(){
			var value = $('#mdn-dialog-editor-parrent span:last').html();
			$('#mdn-dialog-editor-value').val(value);
			$('#mdn-dialog-editor-title').html('Edit Menu');
			$('#mdn-dialog-editor-title2').html('Raname Menu : ');
			$('#mdn-dialog-editor').show();
			$('#mdn-dialog').hide();
		});
		$('#mdn-dialog-delete-menu').unbind('click').click(function(){
			$('#mdn-dialog-editor').find('.box').hide();
			$('#mdn-dialog-editor-title').html('Delete Menu');
			$('#mdn-dialog-editor-title2').html('Are you sure you want to Delete Menu and all the childen: ');
			$('#mdn-dialog-editor').show();
			$('#mdn-dialog').hide();
		});
		
		
		$('#mdn-dialog-add-note').unbind('click').click(function(){
			$('#mdn-dialog-editor-value').val('');
			$('#mdn-dialog-editor-title').html('Add Note');
			$('#mdn-dialog-editor-title2').html('Add into : ');
			$('#mdn-dialog-editor').show();
			$('#mdn-dialog').hide();
		});
		$('#mdn-dialog-editor-note').unbind('click').click(function(){
			var value = $('#mdn-dialog-editor-parrent span:last').html();
			$('#mdn-dialog-editor-value').val(value);
			$('#mdn-dialog-editor-title').html('Edit Note');
			$('#mdn-dialog-editor-title2').html('Raname Note : ');
			$('#mdn-dialog-editor').show();
			$('#mdn-dialog').hide();
		});
		$('#mdn-dialog-delete-note').unbind('click').click(function(){
			$('#mdn-dialog-editor').find('.box').hide();
			$('#mdn-dialog-editor-title').html('Delete Note');
			$('#mdn-dialog-editor-title2').html('Are you sure you want to Delete Note : ');
			$('#mdn-dialog-editor').show();
			$('#mdn-dialog').hide();
		});
		
		$('#mdn-dialog-editor-cancel').unbind('click').click(function(){
			$('#mdn-dialog-editor').hide();
			$('#mdn-dialog-editor').find('.box').show();
		});
		$('#mdn-dialog-editor-submit').unbind('click').click(function(){
			var type = $('#mdn-dialog-editor-title').html();
			var value = $('#mdn-dialog-editor-value').val();
			if(value == 'NoteFolder') {
				return;
			}
			var keyParent = $('#mdn-dialog-editor-parrent span:last').attr('key');
			var newName = '';
			var key = '';
			var filePath = 'NoteFolder';
			var _callback = null;
			$('#mdn-dialog-editor-parrent').find('span').each(function(){
				var $item = $(this);
				if($item.html() != 'NoteFolder') {
					filePath += '/' + $item.html();
				}
			});
			if(type == "Add Menu") {
				if(value == '' || value.indexOf(".") > -1) {
					return;
				}
				filePath += '/' + value;
				key = value;
				_callback = function(returnKey) {
					var initKey = returnKey;
					if(typeof(keyParent) != 'undefined') {
						initKey = keyParent+'.'+returnKey;
					}
					self.createMenubar(initKey);
				};
			} else if(type == "Edit Menu") {
				var originalName = $('#mdn-dialog-editor-parrent span:last').html();
				if(value == '' || value.indexOf(".") > -1 || value == originalName) {
					return;
				}
				newName = value;
				key = value;
				_callback = function(returnKey) {
					var initKey = returnKey;
					if(typeof(keyParent) != 'undefined') {
						keyParent = keyParent.substr(0, keyParent.indexOf('.'));
						if(keyParent != '') {
							initKey = keyParent + '.' + returnKey;
						}
					}
					self.createMenubar(initKey);
				};
			} else if(type == "Delete Menu") {
				_callback = function() {
					var initKey = '';
					if(typeof(keyParent) == 'undefined' || keyParent.indexOf(".") == -1) {
						self.createMenubar();
					} else {
						initKey = keyParent.substr(0, keyParent.lastIndexOf("."));
						self.createMenubar(initKey);
					}
				};
			} else if(type == "Add Note") {
				if(value == '') {
					return;
				}
				filePath += '/' + value;
				_callback = function() {
					self.createMenubar(keyParent, function(){
						var noteHtml = '';
						if(value.indexOf('.') == -1) {
							noteHtml = value + '.md';
						} else {
							noteHtml = value.substr(0, value.indexOf('.')) + '.md';
						}
						$('#mdn-notesbar').find('span').each(function(){
							var $item = $(this);
							if($item.html() == noteHtml) {
								$item.click();
								return false;
							}
						});
					});
				};
			} else if(type == "Edit Note") {
				var originalName = $('#mdn-dialog-editor-parrent span:last').html();
				if(value == '' || value == originalName) {
					return;
				}
				newName = value;
				filePath = $('#mdn-dialog-editor-parrent').find('span:last').attr('name');
				filePath = decodeURI(filePath);
				_callback = function() {
					self.createMenubar(keyParent);
				};
			} else if(type == "Delete Note") {
				filePath = $('#mdn-dialog-editor-parrent').find('span:last').attr('name');
				filePath = decodeURI(filePath);
				_callback = function() {
					self.createMenubar(keyParent);
				};
			}
			$.ajax({ 
				type : 'POST',
				url: MDN.host + '/menuEditor.action',
				data : {
					filePath : filePath,
					type : type,
					newName : newName,
					key : key
				},
				dataType : 'json',
				success : function( jsonObject ) { 
					if(jsonObject.result == 'true') {
						if(_callback) {
							_callback(jsonObject.key);
						}
					} else {
						alert('Error');
					}
				},
				error : function( error ) {
					alert(error);
				},
				complete: function() { 
					$('#mdn-dialog-editor').hide();
					$('#mdn-dialog-editor').find('.box').show();
				}
			});
		});
		
	};
	this.doEditorNote = function() {
		$('#mdn-notesbar').unbind('mousedown').live('mousedown', function(event){
			var type = event.which;
			if(type == 3 && !self.isNoteOver) {
				$('#mdn-dialog li').show();
				$('#mdn-dialog li').css('border-top','1px solid #BBB');
				$('#mdn-dialog-add-menu').hide();
				$('#mdn-dialog-editor-menu').hide();
				$('#mdn-dialog-delete-menu').hide();
				$('#mdn-dialog-editor-note').hide();
				$('#mdn-dialog-delete-note').hide();
				$('#mdn-dialog-add-note').css('border-top','none');
				$('#mdn-dialog').show();
				$('#mdn-dialog').css({ 
					top:self.pageY, 
					left:self.pageX 
				});
				$('#mdn-dialog-editor').hide();
				var htmlCurrent = $('.mdn-head-menu .menu .current').html();
				$('#mdn-dialog-editor-parrent').html(htmlCurrent);
			}
		});
		$('#mdn-notesbar').find('li span').unbind('mousedown').live('mousedown', function(event){//Right Click Note
			var type = event.which;
			if(type == 3) {
				$('#mdn-dialog li').show();
				$('#mdn-dialog li').css('border-top','1px solid #BBB');
				$('#mdn-dialog-add-menu').hide();
				$('#mdn-dialog-editor-menu').hide();
				$('#mdn-dialog-delete-menu').hide();
				$('#mdn-dialog-add-note').hide();
				$('#mdn-dialog-editor-note').css('border-top','none');
				$('#mdn-dialog').show();
				$('#mdn-dialog').css({ 
					top:self.pageY, 
					left:self.pageX 
				});
				$('#mdn-dialog-editor').hide();
				var $item = $(this);
				$('#mdn-dialog-editor-parrent').html('<span name="' + $item.attr('name') + '" key="' +  $('.mdn-head-menu .menu .current span:last').attr('key') + '">'+$item.html()+'</span>');
				$('#mdn-dialog-editor').hide(); 
			}
		});
	};
	this.doEditorMenu = function() {
		$('#mdn-menubar').unbind('mousedown').mousedown(function(event){
			var type = event.which;
			if(type == 3 && !self.isMenuOver) {
				$('#mdn-dialog li').show();
				$('#mdn-dialog li').css('border-top','1px solid #BBB');
				$('#mdn-dialog-editor-menu').hide();
				$('#mdn-dialog-delete-menu').hide();
				$('#mdn-dialog-add-note').hide();
				$('#mdn-dialog-editor-note').hide();
				$('#mdn-dialog-delete-note').hide();
				$('#mdn-dialog-add-menu').css('border-top','none');
				$('#mdn-dialog').show();
				$('#mdn-dialog').css({ 
					top:self.pageY, 
					left:self.pageX 
				});
				$('#mdn-dialog-editor').hide();
				$('#mdn-dialog-editor-parrent').html(' Root Folder: <span>NoteFolder</span>');
			}
		});
		$('#mdn-menubar').find('li').unbind('mousedown').mousedown(function(event){//Right Click Menu
			var type = event.which;
			if(type == 3) {
				$('#mdn-dialog li').show();
				$('#mdn-dialog li').css('border-top','1px solid #BBB');
				$('#mdn-dialog-editor-note').hide();
				$('#mdn-dialog-delete-note').hide();
				$('#mdn-dialog-add-menu').css('border-top','none');
				$('#mdn-dialog').show();
				$('#mdn-dialog').css({ 
					top:self.pageY, 
					left:self.pageX 
				});
				var $item = $(this);
				var currentKey = $item.find('span:last').attr('key2');
				if(typeof(currentKey) == 'undefined') {
					currentKey = $item.attr('key');
				}
				var htmlCurrent = '';
				var keys = currentKey.split('.');
				for (var i = 0; i < keys.length; i++) {
					var key = '';
					for (var j = 0; j < i + 1; j++) {
						key += keys[j];
						if(j != i) {
							key += '.';
						}
					}
					var title = $('.jd-menu-tree').find('[key="'+key+'"]').html();
					if(title.indexOf('<span>') > -1) {
						title = $('.jd-menu-tree').find('[key="'+key+'"]').find('span:first').html();
					}
					htmlCurrent += '<span key="' + key + '">' + title + '</span>';
					if(i != keys.length-1) {
						htmlCurrent += ' / ';
					} 
				}
				
				$('#mdn-dialog-editor-parrent').html(htmlCurrent);
				$('#mdn-dialog-editor').hide();
			}
		});
		
		$('#mdn-menubar').find('li').unbind('mouseover').mouseover(function(){
			self.isMenuOver = true;
		});
		$('#mdn-menubar').find('li').unbind('mouseout').mouseout(function(){
			self.isMenuOver = false;
		});
		$('#mdn-notesbar').find('li span').unbind('mouseover').live('mouseover', function(){
			self.isNoteOver = true;
		});
		$('#mdn-notesbar').find('li span').unbind('mouseout').live('mouseout', function(){
			self.isNoteOver = false;
		});
		$('#mdn-dialog').unbind('mouseover').mouseover(function(){
			self.isDialogOver = true;
		});
		$('#mdn-dialog').unbind('mouseout').mouseout(function(){
			self.isDialogOver = false;
		});
		$(document).mousedown(function(event){
			var type = event.which;
			if(type == 1 && !self.isDialogOver) {
				$('#mdn-dialog').hide();
			}
		});
		$(document).mousemove(function(event){
			self.pageX = event.pageX;
			self.pageY = event.pageY;
		});
		$('#mdn-menubar, #mdn-dialog, #mdn-notesbar').bind('contextmenu', function(event){
			event.preventDefault();
		});
	};
};

$(function(){
	new MDN.index().init();
});