package com.jude.mdn.note.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.jude.utils.file.IOUtil;
import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@Results( { @Result(name = ActionSupport.SUCCESS, type = "json") })
public class MidifyNoteAction extends ActionSupport implements ServletRequestAware {

	private static final long serialVersionUID = -2077978130088920759L;
	
	private HttpServletRequest request;
	
	private String filePath;
	
	private String content;

	@Override
	@Action("midifyNote")
	public String execute() throws Exception {
		String rootPath = request.getSession().getServletContext().getRealPath("/");
		IOUtil.writeFile(rootPath + filePath, content);
		IOUtil.writeFile("C:/!!! - Jude Sheng/Git/MarkdownNote/WebContent/" + filePath, content);
		return SUCCESS;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}
	
}
