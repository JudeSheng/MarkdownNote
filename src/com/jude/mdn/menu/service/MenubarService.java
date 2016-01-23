package com.jude.mdn.menu.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.jude.mdn.menu.pojo.MenubarPojo;
import com.jude.mdn.menu.pojo.MenubarDTO;
import com.jude.utils.StringUtil;
import com.jude.utils.file.FilePojo;
import com.jude.utils.file.FileUtil;
import com.jude.utils.file.FolderPojo;

@Service
public class MenubarService {

	public MenubarDTO getMenubar(File file) {
		MenubarDTO menubar = new MenubarDTO();
		Map<String, List<FilePojo>> notesMap = new HashMap<String, List<FilePojo>>();
		FolderPojo folder = FileUtil.getAll(file);
		MenubarPojo menu = getMenu(folder, notesMap, "");
		menubar.setMenu(menu);
		menubar.setNotesMap(notesMap);
		return menubar;
	}
	
	private MenubarPojo getMenu(FolderPojo folder, Map<String, List<FilePojo>> notesMap, String parentName) {
		List<FilePojo> files = folder.getChildFiles();
		String key = "";
		if(StringUtil.isEmpty(parentName) || "NoteFolder".equals(parentName)) {
			key = folder.getName();
		} else {
			key = parentName + "." +folder.getName();
		}
		key = key.replaceAll(" ", "");
		if(!"NoteFolder".equals(key)) {
			notesMap.put(key, files);
		}
		
		
		MenubarPojo menu = new MenubarPojo();
		List<MenubarPojo> childMenuList = new ArrayList<MenubarPojo>();
		menu.setMenuName(folder.getName());
		menu.setKey(key);
		List<FolderPojo> childs = folder.getChildFolders();
		for (int i = 0; i < childs.size(); i++) {
			childMenuList.add(getMenu(childs.get(i), notesMap, key));
		}
		menu.setChildMenuList(childMenuList);
		return menu;
	}
	
}
