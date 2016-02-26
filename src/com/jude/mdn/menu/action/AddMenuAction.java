package com.jude.mdn.menu.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.jude.utils.file.FileUtil;
import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@Results( { @Result(name = ActionSupport.SUCCESS, type = "json") })
public class AddMenuAction extends ActionSupport implements ServletRequestAware {

	private static final long serialVersionUID = -6387305211921465430L;
	
	private HttpServletRequest request;
	
	private String filePath;

	@Override
	@Action("addMenu")
	public String execute() throws Exception {
		String rootPath = request.getSession().getServletContext().getRealPath("/");
		FileUtil.createFile(rootPath + filePath);
		FileUtil.createFile(FileUtil.ROOT_PATH + filePath);
		return SUCCESS;
	}
	
	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	
}
