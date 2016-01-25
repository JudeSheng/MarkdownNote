if ( window.MDN == undefined ) { MDN = {}; }
MDN.host = '/MarkdownNote';
MDN.index = function() {
	var self = this;
	this.notesbarObject = {};
	this.notesbarId = 'mdn-notesbar';
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
		self.bindClickMenu();
		$('.jd-menu-tree').find('li:eq(0)').click();
		self.bindClickNote();
	};
	this.bindClickMenu = function() {
		$('.jd-menu-tree').find('li').click(function(){
			var $item = $(this);
			var keys = [];
			var key = $item.attr('key');
			keys.push(key);
			$item.next().find('li').each(function(){
				var $child = $(this);
				keys.push($child.attr('key'));
			});
			self.makeNotebarHtml(keys);
			$('#mdn-notepad').find('[href="#' + self.notesbarId + '"]').html($item.html());
			$('#mdn-notepad').find('[href="#' + self.notesbarId + '"]').click();
		});
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
						html += '<li>' + notes[j].name + '</li>';
					}
					html += '</ul></div>';
				} else {
					html += '<ul>';
					for (var j = 0; j < notes.length; j++) {
						html += '<li>' + notes[j].name + '</li>';
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
			var index = name.lastIndexOf('.');
			var title = name.substring(0,index);
			$('#mdn-notepad').jdTabs_Add(title, 'mdn-tabs' + self.tabCount, true);
		});
	};
	
};

$(function(){
	new MDN.index().init();
});