package com.jude.mdn.menu.action;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.jude.mdn.menu.pojo.MenubarDTO;
import com.jude.mdn.menu.service.MenubarService;
import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@Results( { @Result(name = ActionSupport.SUCCESS, type = "json") })
public class FetchMenuListAction extends ActionSupport implements ServletRequestAware{

	private static final long serialVersionUID = 8098818299436930797L;
	
	private HttpServletRequest request;
	
	@Autowired
	private MenubarService service;
	
	private MenubarDTO menubar;

	@Override
	@Action("fetchMenuList")
	public String execute() throws Exception {
		String path = request.getSession().getServletContext().getRealPath("/");
		File file = new File(path + "//NoteFolder");
		menubar = service.getMenubar(file);
		return SUCCESS;
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public MenubarDTO getMenubar() {
		return menubar;
	}

}
