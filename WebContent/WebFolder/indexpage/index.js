if ( window.MDN == undefined ) { MDN = {}; }
MDN.host = '/MarkdownNote';
MDN.index = function() {
	var self = this;
	this.notesbarObject = {};
	this.notesbarId = 'mdn-notesbar';
	this.$notesbarTab;
	this.mdHeight = $(window).height() - 210;
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
		self.bindClickNote();
		$('.jd-menu-tree').find('li:eq(0)').click();
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
			self.bindClickHeadMenu();
			self.makeNotebarHtml(allKeys);
			self.$notesbarTab.html($item.html());
			self.$notesbarTab.click();
			
			//$('#mdn-notepad').find('.ui-icon-close').click();
			//$('.mdn-notesbar-current').find('li span').click();
			self.$notesbarTab.click();
		});
	};
	this.makeHeadMenuHtml = function(currentKey, childKeys){
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
			htmlCurrent += '<span key="' + key + '">' + keys[i] + '</span>';
			if(i != keys.length-1) {
				htmlCurrent += ' / ';
			}
		}
		$('.mdn-head-menu .menu .current').html(htmlCurrent);
		var htmlChildren = '';
		for (var i = 0; i < childKeys.length; i++) {
			var key = childKeys[i];
			var index = key.lastIndexOf('.');
			htmlChildren += '<span key="' + key + '">' + key.substring(index+1) + '</span>';
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
				$("#" + key).jdMarkdown(location, self.mdHeight, key);
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
		});
	};
};

$(function(){
	new MDN.index().init();
});