package com.jude.mdn.menu.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@Results( { @Result(name = ActionSupport.SUCCESS, type = "json") })
public class FetchMenuListAction extends ActionSupport{

	private static final long serialVersionUID = 8098818299436930797L;

	@Override
	@Action("fetchMenuList")
	public String execute() throws Exception {
		return SUCCESS;
	}
}
