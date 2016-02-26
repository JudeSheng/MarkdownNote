(function($){
	$.fn.jdMenuTree = function(menuObject, $menuHeader) {
		var $item = this;
		var menubarHtml = '<div class="jd-menu-tree">';
		var createMenu = function(menuObject) {
			for (var i = 0; i < menuObject.length; i++) {
				if(i == 0) {
					menubarHtml += '<ul>';
				}
				menubarHtml += '<li key="'+menuObject[i].key+'">' +  menuObject[i].menuName + '</li>';
				createMenu(menuObject[i].childMenuList);
				if(i == menuObject.length -1) {
					menubarHtml += '</ul>';
				}
			}
		};
		var bindClickMenu = function() {
			$('.jd-menu-tree').find('li').unbind('click').click(function(){
				var $item = $(this);
				$('.jd-menu-tree').find('li').removeClass('jd-menu-tree-click');
				$('.jd-menu-tree').find('span').removeClass('jd-menu-tree-click');
				$item.addClass('jd-menu-tree-click');
				if($item.next()[0] && $item.next()[0].localName == 'ul') {
					var isHide = $item.next().find('li').css('display')=='none'?true:false;
					if(isHide){
						$('.jd-menu-tree').find('ul').find('ul').find('li').hide();
						$item.next().find('li').slideDown();
						$item.next().find('ul').find('li').hide();
					}
					var $parentMenu = $item;
					var parentText = null;
					while(true) {
						var $parentMenuCopy = $parentMenu;
						$parentMenu = $parentMenu.parent();
						$parentMenu.slideDown();
						if($parentMenu.parent().attr('class') == 'jd-menu-tree') {
							parentText = $parentMenuCopy.html().split(' / ')[0];
							$parentMenuCopy.html(parentText);
							break;
						} else if($parentMenu.parent().parent().attr('class') == 'jd-menu-tree') {
							$parentMenu = $parentMenu.prev();
							parentText = $parentMenu.html().split(' / ')[0];
							$parentMenu.html('<span>'+parentText+'</span>' + ' / ' + '<span class="jd-menu-tree-click">' + $item.html() + '</span>');
							break;
						}
					}
				}
			});
		};
		
		if(menuObject != undefined) {
			createMenu(menuObject);
			menubarHtml += '</div>';
			$item.html(menubarHtml);
			bindClickMenu();
		}
	};
})(jQuery);
