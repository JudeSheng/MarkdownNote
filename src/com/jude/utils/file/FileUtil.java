package com.jude.utils.file;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class FileUtil {
	
	public static FolderPojo getAll(File file) {
		FolderPojo folder = new FolderPojo();
		List<FolderPojo> childFolders = new ArrayList<FolderPojo>();
		List<FilePojo> childFiles = new ArrayList<FilePojo>();
		if(file != null && file.isDirectory()) {
			folder.setName(file.getName());
			folder.setLocaltion(file.getPath());
			File childs[] = file.listFiles();
			for (int i = 0; i < childs.length; i++) {
				File child = childs[i];
				if(child.isFile()){
					FilePojo childFile = new FilePojo();
					childFile.setName(child.getName());
					childFile.setLocation(child.getPath());
					childFile.setLastModified(new Date(child.lastModified()));
					childFiles.add(childFile);
				} else if(child.isDirectory()) {
					childFolders.add(getAll(child));
				}
			}
			folder.setChildFolders(childFolders);
			folder.setChildFiles(childFiles);
		}
		return folder;
	}
}