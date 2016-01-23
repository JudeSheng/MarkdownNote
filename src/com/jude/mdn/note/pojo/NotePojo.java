package com.jude.mdn.note.pojo;

import java.util.Date;

import com.jude.utils.DateUtil;
import com.jude.utils.StringUtil;

public class NotePojo {

	private String noteName;
	
	private String location;
	
	private String lastModifiedDate;
	
	public void setLastModifiedDate(long lastModified) {
		Date lastModifiedDate = new Date(lastModified);
		String lastModifiedDateStr = StringUtil.dateToString(lastModifiedDate, DateUtil.FORMAT_DATE_TIME);
		this.lastModifiedDate = lastModifiedDateStr;
	}

	public String getNoteName() {
		return noteName;
	}

	public void setNoteName(String noteName) {
		this.noteName = noteName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(String lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	
}
