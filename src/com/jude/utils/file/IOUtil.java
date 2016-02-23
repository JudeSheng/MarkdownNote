package com.jude.utils.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class IOUtil {

	public static void writeFile(String filePath, String content) {
		FileUtil.createFile(filePath);
		try {
			OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(new File(filePath)),"UTF-8");  
			content = content.replaceAll("\n", "\r\n");
			out.write(content);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
