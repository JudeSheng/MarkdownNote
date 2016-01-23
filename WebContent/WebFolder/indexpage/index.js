if ( window.MDN == undefined ) { MDN = {}; }
MDN.host = '/MarkdownNote';
MDN.index = function() {
	var self = this;
	this.notesbar = {};
	this.init = function() {
		self.createMenubar();
		$('#mdn-notepad').tabs();
	};
	this.createMenubar = function() {
		$.ajax({ 
			type : 'POST',
			url: MDN.host + '/fetchMenuList.action',
			dataType : 'json',
			success : function( jsonObject ) { 
				$('#mdn-menubar').jdMenuTree(jsonObject.menubar.menu.childMenuList);
				self.notesbar = jsonObject.menubar.notesMap;
				self.bindClickMenu();
			},
			error : function( error ) {
				alert(error);
			},
			complete: function() { 
			}
		})
	};
	this.bindClickMenu = function() {
		$('.jd-menu-tree').find('li').click(function(){
			var $item = $(this);
			var notesHtml = self.makeNotebarHtml($item.attr('key'));
			$('#mdn-notebar').html(notesHtml);
			$('#mdn-notebar-title').find('a').html($item.html());
		});
	}
	this.makeNotebarHtml =function(key) {
		var html = '<ul>';
		var notes = self.notesbar[key];
		for (var i = 0; i < notes.length; i++) {
			html += '<li>' + notes[i].name + '</li>';
		}
		html += '</ul>';
		return html;
	}
	
};

$(function(){
	new MDN.index().init();
});