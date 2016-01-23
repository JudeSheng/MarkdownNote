package com.jude.mdn.menu.pojo;

import java.util.List;
import java.util.Map;

import com.jude.utils.file.FilePojo;

public class MenubarDTO {
	
	private MenubarPojo menu;
	
	private Map<String, List<FilePojo>> notesMap;

	public MenubarPojo getMenu() {
		return menu;
	}

	public void setMenu(MenubarPojo menu) {
		this.menu = menu;
	}

	public Map<String, List<FilePojo>> getNotesMap() {
		return notesMap;
	}

	public void setNotesMap(Map<String, List<FilePojo>> notesMap) {
		this.notesMap = notesMap;
	}

	@Override
	public String toString() {
		return "MeunbarDTO [menu=" + menu + ", notesMap=" + notesMap + "]";
	}
	
}
