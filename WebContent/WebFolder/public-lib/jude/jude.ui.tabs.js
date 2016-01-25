$(function(){
	$.fn.jdTabs = function(title, id, removeable) {
		var $tabs = $(this);
		var tabHtml = '<ul><li><a href="#jd-tabs-' + id + '">' + title + '</a>'
		if(removeable) {
			tabHtml += '<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>';
		}
		tabHtml += '</li></ul>';
		tabHtml += '<div id="' + id + '"></div>';
		$tabs.html(tabHtml);
		$tabs.tabs();
		return $tabs;
	};
	$.fn.jdTabs_Add = function(title, id, removeable) {
		var $tabs = $(this);
		var tabTitleHtml = '<li><a href="#jd-tabs-' + id + '">' + title + '</a>';
		if(removeable) {
			tabTitleHtml += '<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>';
		}
		tabTitleHtml += '</li>';
		var tabHtml = '<div id="jd-tabs-' + id + '"></div>';
		$tabs.find('ul').append(tabTitleHtml);
		$tabs.append(tabHtml);
		$tabs.tabs( "refresh" );
		return $tabs;
	};
});