package com.jude.mdn.menu.pojo;

import java.util.List;

public class MenubarPojo {

	private String menuName;
	
	private String key;
	
	private List<MenubarPojo> childMenuList;

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public List<MenubarPojo> getChildMenuList() {
		return childMenuList;
	}

	public void setChildMenuList(List<MenubarPojo> childMenuList) {
		this.childMenuList = childMenuList;
	}

	@Override
	public String toString() {
		return "MenubarPojo [menuName=" + menuName + ", key=" + key + ", childMenuList=" + childMenuList + "]";
	}
	
}
