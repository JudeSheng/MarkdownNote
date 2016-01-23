package com.jude.utils.file;

import java.util.Date;

public class FilePojo {

	private String name;
	
	private String location;
	
	private Date lastModified;

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

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	@Override
	public String toString() {
		return "FilePojo [name=" + name + ", location=" + location + ", lastModified=" + lastModified + "]";
	}
	
}
