if ( window.MDN == undefined ) { MDN = {}; }
MDN.host = '/MarkdownNote';
MDN.index = function() {
	var self = this;
	this.notesbarObject = {};
	this.notesbarId = 'mdn-notesbar';
	this.$notesbarTab;
	this.tabCount = 1;
	this.init = function() {
		self.createMenubar();
	};
	this.createMenubar = function() {
		$.ajax({ 
			type : 'POST',
			url: MDN.host + '/fetchMenuList.action',
			dataType : 'json',
			success : function( jsonObject ) { 
				var menubar = jsonObject.menubar;
				$('#mdn-menubar').jdMenuTree(menubar.menu.childMenuList);
				self.notesbarObject = menubar.notesMap;
				self.initNotesbarTabs(menubar);
			},
			error : function( error ) {
				alert(error);
			},
			complete: function() { 
			}
		});
	};
	this.initNotesbarTabs = function(menubar) {
		var menuName = menubar.menu.childMenuList[0].menuName;
		$('#mdn-notepad').jdTabs(menuName, self.notesbarId, false);
		self.$notesbarTab = $('#mdn-notepad').find('[href="#' + self.notesbarId + '"]');
		self.$notesbarTab.parent().addClass('mdn-notesbar-tab');
		self.bindClickMenu();
		$('.jd-menu-tree').find('li:eq(0)').click();
		self.bindClickNote();
	};
	this.bindClickMenu = function() {
		$('.jd-menu-tree').find('li').click(function(){
			var $item = $(this);
			var allKeys = [];
			var key = $item.attr('key');
			allKeys.push(key);
			$item.next().find('li').each(function(){
				var $child = $(this);
				allKeys.push($child.attr('key'));
			});
			var childKeys = [];
			$item.next().children('li').each(function(){
				var $child = $(this);
				childKeys.push($child.attr('key'));
			});
			self.makeHeadMenuHtml(key, childKeys);
			self.makeNotebarHtml(allKeys);
			self.$notesbarTab.html($item.html());
			self.$notesbarTab.click();
		});
	};
	this.makeHeadMenuHtml = function(currentKey, childKeys){
		var htmlCurrent = '';
		var keys = currentKey.split('.');
		for (var i = 0; i < keys.length; i++) {
			htmlCurrent += '<span>' + keys[i] + '</span>';
			if(i != keys.length-1) {
				htmlCurrent += ' / ';
			}
		}
		$('.mdn-head-menu .menu .current').html(htmlCurrent);
		var htmlChildren = '';
		for (var i = 0; i < childKeys.length; i++) {
			var key = childKeys[i];
			var index = key.lastIndexOf('.');
			htmlChildren += '<span>' + key.substring(index+1) + '</span>';
		}
		$('.mdn-head-menu .menu .children').html(htmlChildren);
	};
	this.makeNotebarHtml =function(keys) {
		var html = '<div>';
		for (var i = 0; i < keys.length; i++) {
			var notes = self.notesbarObject[keys[i]];
			if(notes != undefined && notes.length > 0) {
				
				if(i != 0) {
					html += '<div class="mdn-notesbar-folder">';
					var keyArray = keys[i].split('.');
					html += '<div class="mdn-notesbar-titles">';
					for (var j = 0; j < keyArray.length; j++) {
						if(j != keyArray.length-1) {
							html += '<span>' + keyArray[j] + '</span><span> / </span>';
						} else {
							html += '<span class="mdn-notesbar-folder-current">' + keyArray[j] + '</span>';
						}
					}
					html += '</div>';
					html += '<ul>';
					for (var j = 0; j < notes.length; j++) {
						var location = notes[j].location;
						var index = location.indexOf('NoteFolder');
						location = location.substring(index).replace(/\\/g,'/');
						html += '<li name="' + location + '">' + notes[j].name + '</li>';
					}
					html += '</ul></div>';
				} else {
					html += '<ul>';
					for (var j = 0; j < notes.length; j++) {
						var location = notes[j].location;
						var index = location.indexOf('NoteFolder');
						location = location.substring(index).replace(/\\/g,'/');
						location = encodeURI(location);
						html += '<li name="' + location + '">' + notes[j].name + '</li>';
					}
					html += '</ul>';
				}
			}
		}
		html += '</div>';
		$('#' + self.notesbarId).html(html);
	};
	this.bindClickNote = function() {
		$('#' + self.notesbarId).find('li').unbind('click').live('click', function(){
			var $note = $(this);
			self.tabCount++;
			var name = $note.html();
			var location = $note.attr('name');
			var index = name.lastIndexOf('.');
			if(index > 0) {
				name = name.substring(0,index);
			}
			$('#mdn-notepad').jdTabs_Add(name, 'mdn-tabs' + self.tabCount, true);
			$('#mdn-tabs' + self.tabCount).jdMarkdown(location);
			$('.mdn-head-title .title').html(name);
			self.bindClickTabs();
		});
	};
	this.bindClickTabs = function() {
		$('#mdn-notepad a.ui-tabs-anchor').click(function(){
			var $item = $(this);
			if($item.attr('href') != '#'+self.notesbarId) {
				$('.mdn-head-title .title').html($item.html());
			}
		});
	};
};

$(function(){
	new MDN.index().init();
});