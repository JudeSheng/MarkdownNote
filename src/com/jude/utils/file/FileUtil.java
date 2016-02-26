package com.jude.utils.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileOwnerAttributeView;
import java.nio.file.attribute.UserPrincipal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import com.jude.utils.DateUtil;

public class FileUtil {
	
	public static final String ROOT_PATH = "C:/!!! - Jude Sheng/Git/MarkdownNote/WebContent/";
	
	public static String getFileOwner(File file) {
		Path path = Paths.get(file.getPath());
        FileOwnerAttributeView ownerAttributeView = Files.getFileAttributeView(path, FileOwnerAttributeView.class);
        UserPrincipal owner = null;;
		try {
			owner = ownerAttributeView.getOwner();
		} catch (IOException e) {
			e.printStackTrace();
		}
        return owner.getName();
	}
	
	public static String getCreationTime(File file) {
		String time = "";
		Path path = Paths.get(file.getPath());
		try {
			BasicFileAttributes att = Files.readAttributes(path, BasicFileAttributes.class);
			Date creationTime = new Date(att.creationTime().toMillis());
			time = DateUtil.dateToString(creationTime, DateUtil.FORMAT_DATE_TIME_2, Locale.ENGLISH);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return time;
	}
	
	public static void createFile(String filePath) {
		File file = new File(filePath);
		File parent = file.getParentFile();
		if(!parent.isDirectory()) {
			parent.mkdirs();
		} 
		if(!file.isFile() || !file.isDirectory()) {
			String name = file.getName();
			if(name.indexOf(".") > -1) {
				try {
					file.createNewFile();
				} catch (IOException e) {
					e.printStackTrace();
				}
			} else {
				file.mkdir();
			}
		}
	}
	
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
					childFile.setCreationTime(getCreationTime(child));
					childFile.setLastModifiedTime(DateUtil.dateToString(new Date(child.lastModified()), DateUtil.FORMAT_DATE_TIME_2, Locale.ENGLISH));
					childFile.setOwner(getFileOwner(child));
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