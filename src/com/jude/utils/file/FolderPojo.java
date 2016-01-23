package com.jude.utils.file;

import java.util.List;

public class FolderPojo {

	private String name;
	
	private String localtion;
	
	private List<FolderPojo> childFolders;
	
	private List<FilePojo> childFiles;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocaltion() {
		return localtion;
	}

	public void setLocaltion(String localtion) {
		this.localtion = localtion;
	}

	public List<FolderPojo> getChildFolders() {
		return childFolders;
	}

	public void setChildFolders(List<FolderPojo> childFolders) {
		this.childFolders = childFolders;
	}

	public List<FilePojo> getChildFiles() {
		return childFiles;
	}

	public void setChildFiles(List<FilePojo> childFiles) {
		this.childFiles = childFiles;
	}

	@Override
	public String toString() {
		return "FolderPojo [name=" + name + ", localtion=" + localtion + ", childFolders=" + childFolders
				+ ", childFiles=" + childFiles + "]";
	}
	
}
