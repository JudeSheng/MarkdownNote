package com.jude.mdn.menu.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jude.mdn.menu.pojo.MenubarDTO;
import com.jude.mdn.note.pojo.NotePojo;

@Service
public class MenubarServiceImpl {

	public List<MenubarDTO> getMenubarList() {
		List<MenubarDTO> list = new ArrayList<MenubarDTO>();
		MenubarDTO a11 = new MenubarDTO();
		a11.setMenuName("Test A11");
		MenubarDTO a1 = new MenubarDTO();
		a1.setMenuName("Test A1");
		a1.addChildMenu(a11);
		MenubarDTO a = new MenubarDTO();
		a.setMenuName("Test A");
		a.addChildMenu(a1);
		NotePojo note = new NotePojo();
		note.setNoteName("Note B");
		MenubarDTO b = new MenubarDTO();
		b.setMenuName("Test B");
		b.addNote(note);
		list.add(a);
		list.add(b);
		return list;
	}
	
}
