package com.jude.mdn.menu.action;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.jude.mdn.menu.service.MenubarService;
import com.jude.utils.file.FileUtil;
import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@Results( { @Result(name = ActionSupport.SUCCESS, type = "json") })
public class MenuEditorAction extends ActionSupport implements ServletRequestAware {

	private static final long serialVersionUID = -6387305211921465430L;
	
	private HttpServletRequest request;
	
	private String filePath;
	
	private String type;
	
	private String newName;
	
	private String result;
	
	private String key;

	@Override
	@Action("menuEditor")
	public String execute() throws Exception {
		String rootPath = request.getSession().getServletContext().getRealPath("/");
		if("Add Menu".equalsIgnoreCase(type)) {
			if(filePath.indexOf(".") == -1) {
				result = FileUtil.createFile(rootPath + filePath)?"true":"false";
				FileUtil.createFile(FileUtil.ROOT_PATH + filePath);
				key = MenubarService.getKey(key, "");
			}
		} else if("Edit Menu".equalsIgnoreCase(type)) {
			if(newName.indexOf(".") == -1) {
				result = FileUtil.renameFile(rootPath + filePath, newName)?"true":"false";
				FileUtil.renameFile(FileUtil.ROOT_PATH + filePath, newName);
				key = MenubarService.getKey(key, "");
			}
		} else if("Delete Menu".equalsIgnoreCase(type)) {
			result = FileUtil.deleteFile(new File(rootPath + filePath))?"true":"false";
			FileUtil.deleteFile(new File(FileUtil.ROOT_PATH + filePath));
		} else if("Add Note".equalsIgnoreCase(type)) {
			if(filePath.indexOf(".") == -1) {
				filePath += ".md";
			} else {
				filePath = filePath.substring(0, filePath.indexOf(".")) + ".md";
			}
			result = FileUtil.createFile(rootPath + filePath)?"true":"false";
			FileUtil.createFile(FileUtil.ROOT_PATH + filePath);
		} else if("Edit Note".equalsIgnoreCase(type)) {
			if(newName.indexOf(".") == -1) {
				newName += ".md";
			} else {
				newName = newName.substring(0, newName.indexOf(".")) + ".md";
			}
			result = FileUtil.renameFile(rootPath + filePath, newName)?"true":"false";
			FileUtil.renameFile(FileUtil.ROOT_PATH + filePath, newName);
		} else if("Delete Note".equalsIgnoreCase(type)) {
			result = FileUtil.deleteFile(new File(rootPath + filePath))?"true":"false";
			FileUtil.deleteFile(new File(FileUtil.ROOT_PATH + filePath));
		} 
		return SUCCESS;
	}
	
	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setNewName(String newName) {
		this.newName = newName;
	}

	public String getResult() {
		return result;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

}
