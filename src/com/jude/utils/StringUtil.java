package com.jude.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringUtil {

	public static final String SPACE = " ";
	public static final String TAB = "	";
	
	public static String dateToString(Date date, String format) {
		if(date == null) {
			return "";
		}
		SimpleDateFormat df = new SimpleDateFormat(format);
		String dateStr = df.format(date);
		return dateStr;
	}
	
	public static Date stringToDate(String dateStr, String format) {
		Date date = null;
		SimpleDateFormat df = new SimpleDateFormat(format);
		try {
			date = df.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	public static boolean isEmpty(String str) {
		if(str == null || "".equals(str)) {
			return true;
		}
		return false;
	}
	
	public static String decode(String in) {  
        try {  
            return decode(in.toCharArray());  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return in;  
    }  
  
	public static String covtChineseToPY(String str) {
		if(str == null) {
			return "";
		}
		str = str.replaceAll(" ", "");
		String tempStr = "";
		for (int i = 0; i < str.length(); i++) {
			char c = str.charAt(i);
			if (c >= 33 && c <= 126) {// 字母和符号原样保留
				tempStr += String.valueOf(c);
			} else {// 累加拼音声母
				tempStr += getPYChar(String.valueOf(c));
			}
		}
		return tempStr;
	}
	
	private static String getPYChar(String c) {
		byte[] array = new byte[2];
		array = String.valueOf(c).getBytes();
		int i = (short) (array[0] - '\0' + 256) * 256 + ((short) (array[1] - '\0' + 256));
		if (i < 0xB0A1)
			return "*";
		if (i < 0xB0C5)
			return "a";
		if (i < 0xB2C1)
			return "b";
		if (i < 0xB4EE)
			return "c";
		if (i < 0xB6EA)
			return "d";
		if (i < 0xB7A2)
			return "e";
		if (i < 0xB8C1)
			return "f";
		if (i < 0xB9FE)
			return "g";
		if (i < 0xBBF7)
			return "h";
		if (i < 0xBFA6)
			return "j";
		if (i < 0xC0AC)
			return "k";
		if (i < 0xC2E8)
			return "l";
		if (i < 0xC4C3)
			return "m";
		if (i < 0xC5B6)
			return "n";
		if (i < 0xC5BE)
			return "o";
		if (i < 0xC6DA)
			return "p";
		if (i < 0xC8BB)
			return "q";
		if (i < 0xC8F6)
			return "r";
		if (i < 0xCBFA)
			return "s";
		if (i < 0xCDDA)
			return "t";
		if (i < 0xCEF4)
			return "w";
		if (i < 0xD1B9)
			return "x";
		if (i < 0xD4D1)
			return "y";
		if (i < 0xD7FA)
			return "z";
		return "*";
	}
	
    private static String decode(char[] in) throws Exception {  
        int off = 0;  
        char c;  
        char[] out = new char[in.length];  
        int outLen = 0;  
        while (off < in.length) {  
            c = in[off++];  
            if (c == '\\') {  
                if (in.length > off) { // 是否有下一个字符  
                    c = in[off++]; // 取出下一个字符  
                } else {  
                    out[outLen++] = '\\'; // 末字符为'\'，返回  
                    break;  
                }  
                if (c == 'u') { // 如果是"\\u"  
                    int value = 0;  
                    if (in.length > off + 4) { // 判断"\\u"后边是否有四个字符  
                        boolean isUnicode = true;  
                        for (int i = 0; i < 4; i++) { // 遍历四个字符  
                            c = in[off++];  
                            switch (c) {  
                            case '0':  
                            case '1':  
                            case '2':  
                            case '3':  
                            case '4':  
                            case '5':  
                            case '6':  
                            case '7':  
                            case '8':  
                            case '9':  
                                value = (value << 4) + c - '0';  
                                break;  
                            case 'a':  
                            case 'b':  
                            case 'c':  
                            case 'd':  
                            case 'e':  
                            case 'f':  
                                value = (value << 4) + 10 + c - 'a';  
                                break;  
                            case 'A':  
                            case 'B':  
                            case 'C':  
                            case 'D':  
                            case 'E':  
                            case 'F':  
                                value = (value << 4) + 10 + c - 'A';  
                                break;  
                            default:  
                                isUnicode = false; // 判断是否为unicode码  
                            }  
                        }  
                        if (isUnicode) { // 是unicode码转换为字符  
                            out[outLen++] = (char) value;  
                        } else { // 不是unicode码把"\\uXXXX"填入返回值  
                            off = off - 4;  
                            out[outLen++] = '\\';  
                            out[outLen++] = 'u';  
                            out[outLen++] = in[off++];  
                        }  
                    } else { // 不够四个字符则把"\\u"放入返回结果并继续  
                        out[outLen++] = '\\';  
                        out[outLen++] = 'u';  
                        continue;  
                    }  
                } else {  
                    switch (c) { // 判断"\\"后边是否接特殊字符，回车，tab一类的  
                    case 't':  
                        c = '\t';  
                        out[outLen++] = c;  
                        break;  
                    case 'r':  
                        c = '\r';  
                        out[outLen++] = c;  
                        break;  
                    case 'n':  
                        c = '\n';  
                        out[outLen++] = c;  
                        break;  
                    case 'f':  
                        c = '\f';  
                        out[outLen++] = c;  
                        break;  
                    default:  
                        out[outLen++] = '\\';  
                        out[outLen++] = c;  
                        break;  
                    }  
                }  
            } else {  
                out[outLen++] = (char) c;  
            }  
        }  
        return new String(out, 0, outLen);  
    } 
}
