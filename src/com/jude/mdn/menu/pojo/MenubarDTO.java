package com.jude.mdn.menu.pojo;

import java.util.ArrayList;
import java.util.List;

import com.jude.mdn.note.pojo.NotePojo;

public class MenubarDTO {

	private String menuName;
	
	private List<NotePojo> noteList;
	
	private List<MenubarDTO> childMenuList;
	
	public MenubarDTO() {
		childMenuList = new ArrayList<MenubarDTO>();
		noteList = new ArrayList<NotePojo>(); 
	}
	
	public void addChildMenu(MenubarDTO childMenu) {
		childMenuList.add(childMenu);
	}
	
	public void addNote(NotePojo note) {
		noteList.add(note);
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public List<NotePojo> getNoteList() {
		return noteList;
	}

	public void setNoteList(List<NotePojo> noteList) {
		this.noteList = noteList;
	}

	public List<MenubarDTO> getChildMenuList() {
		return childMenuList;
	}

	public void setChildMenuList(List<MenubarDTO> childMenuList) {
		this.childMenuList = childMenuList;
	}

	@Override
	public String toString() {
		return "MenubarDTO [menuName=" + menuName + ", noteList=" + noteList
				+ ", childMenuList=" + childMenuList + "]";
	}
	
}
