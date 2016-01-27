package com.jude.utils.file;

public class FilePojo {

	private String name;
	
	private String location;
	
	private String creationTime;
	
	private String lastModifiedTime;
	
	private String owner;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(String creationTime) {
		this.creationTime = creationTime;
	}

	public String getLastModifiedTime() {
		return lastModifiedTime;
	}

	public void setLastModifiedTime(String lastModifiedTime) {
		this.lastModifiedTime = lastModifiedTime;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	@Override
	public String toString() {
		return "FilePojo [name=" + name + ", location=" + location
				+ ", creationTime=" + creationTime + ", lastModifiedTime="
				+ lastModifiedTime + ", owner=" + owner + "]";
	}

}
