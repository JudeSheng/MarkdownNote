$(function(){
	$.fn.jdTabs = function(title, id, removeable) {
		var $tabs = $(this);
		var tabHtml = '<ul><li><a href="#' + id + '">' + title + '</a>';
		if(removeable) {
			tabHtml += '<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>';
		}
		tabHtml += '</li></ul>';
		tabHtml += '<div class="jd-tabs-panel" id="' + id + '"> No Data Avaiable </div>';
		$tabs.html(tabHtml);
		$tabs.tabs();
		return $tabs;
	};
	$.fn.jdTabs_Add = function(title, id, removeable) {
		var $tabs = $(this);
		var tabTitleHtml = '<li><a href="#' + id + '">' + title + '</a>';
		if(removeable) {
			tabTitleHtml += '<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>';
		}
		tabTitleHtml += '</li>';
		var tabHtml = '<div class="jd-tabs-panel" id="' + id + '"> No Data Avaiable </div>';
		$tabs.find('ul.ui-tabs-nav').append(tabTitleHtml);
		$tabs.append(tabHtml);
		$tabs.tabs( "refresh" );
		$('.ui-icon-close').unbind('click').click(function(){
			$item = $(this);
			var $tabsTitle = $item.parent();
			var panelId = $tabsTitle.find('a').attr('href');
			var $tabsPanel = $(panelId);
			$tabsTitle.detach();
			$tabsPanel.detach();
			$tabs.tabs( "refresh" );
		});
		return $tabs;
	};
});