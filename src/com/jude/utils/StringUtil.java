package com.jude.utils;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringUtil {

	public static final String SPACE = " ";
	public static final String TAB = "	";
	
	private final static int[] li_SecPosValue = { 1601, 1637, 1833, 2078, 2274,  
         2302, 2433, 2594, 2787, 3106, 3212, 3472, 3635, 3722, 3730, 3858,  
         4027, 4086, 4390, 4558, 4684, 4925, 5249, 5590 };  
	private final static String[] lc_FirstLetter = { "a", "b", "c", "d", "e",  
         "f", "g", "h", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",  
         "t", "w", "x", "y", "z" };  
	
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
	
	public  boolean isChinese(char c) {  
        Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);  
        if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS  
                || ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS  
                || ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A  
                || ub == Character.UnicodeBlock.GENERAL_PUNCTUATION  
                || ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION  
                || ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS) {  
            return true;  
        }  
        return false;  
    }  
	
	public static String chineseToUnicode(String str){  
        String result="";  
        for (int i = 0; i < str.length(); i++){  
            int chr1 = (char) str.charAt(i);  
            if(chr1>=19968&&chr1<=171941){//汉字范围 \u4e00-\u9fa5 (中文)  
                result+="\\u" + Integer.toHexString(chr1);  
            }else{  
                result+=str.charAt(i);  
            }  
        }  
        return result;  
    }  
	
	public static String decode(String in) {  
        try {  
            return decode(in.toCharArray());  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return in;  
    }  
  
	public static String chineseToPY(String str) {
		if(str == null) {
			return "";
		}
		str = str.replaceAll(" ", "");
		String tempStr = "";
		for (int i = 0; i < str.length(); i++) {
			char c = str.charAt(i);
			if (c >= 33 && c <= 126) {// ��ĸ�ͷ��ԭ����
				tempStr += String.valueOf(c);
			} else {// �ۼ�ƴ����ĸ
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
                if (in.length > off) { // �Ƿ�����һ���ַ�  
                    c = in[off++]; // ȡ����һ���ַ�  
                } else {  
                    out[outLen++] = '\\'; // ĩ�ַ�Ϊ'\'������  
                    break;  
                }  
                if (c == 'u') { // �����"\\u"  
                    int value = 0;  
                    if (in.length > off + 4) { // �ж�"\\u"����Ƿ����ĸ��ַ�  
                        boolean isUnicode = true;  
                        for (int i = 0; i < 4; i++) { // �����ĸ��ַ�  
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
                                isUnicode = false; // �ж��Ƿ�Ϊunicode��  
                            }  
                        }  
                        if (isUnicode) { // ��unicode��ת��Ϊ�ַ�  
                            out[outLen++] = (char) value;  
                        } else { // ����unicode���"\\uXXXX"���뷵��ֵ  
                            off = off - 4;  
                            out[outLen++] = '\\';  
                            out[outLen++] = 'u';  
                            out[outLen++] = in[off++];  
                        }  
                    } else { // �����ĸ��ַ����"\\u"���뷵�ؽ�����  
                        out[outLen++] = '\\';  
                        out[outLen++] = 'u';  
                        continue;  
                    }  
                } else {  
                    switch (c) { // �ж�"\\"����Ƿ�������ַ�س���tabһ���  
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
    
    /** 
     * 取得给定汉字串的首字母串,即声母串 
     * @param str 给定汉字串 
     * @return 声母串 
     */  
    public static String chineseToPYSZM(String str) {  
        if (str == null || str.trim().length() == 0) {  
            return "";  
        }  
  
        String _str = "";  
        for (int i = 0; i < str.length(); i++) {  
            _str = _str + getFirstLetter(str.substring(i, i + 1));  
        }  
  
        return _str;  
    }  
  
    /** 
     * 取得给定汉字的首字母,即声母 
     * @param chinese 给定的汉字 
     * @return 给定汉字的声母 
     */  
    public static String getFirstLetter(String chinese) {  
        if (chinese == null || chinese.trim().length() == 0) {  
            return "";  
        }  
        chinese = conversionStr(chinese, "GB2312", "ISO8859-1");  
  
        if (chinese.length() > 1) // 判断是不是汉字  
        {  
            int li_SectorCode = (int) chinese.charAt(0); // 汉字区码  
            int li_PositionCode = (int) chinese.charAt(1); // 汉字位码  
            li_SectorCode = li_SectorCode - 160;  
            li_PositionCode = li_PositionCode - 160;  
            int li_SecPosCode = li_SectorCode * 100 + li_PositionCode; // 汉字区位码  
            if (li_SecPosCode > 1600 && li_SecPosCode < 5590) {  
                for (int i = 0; i < 23; i++) {  
                    if (li_SecPosCode >= li_SecPosValue[i]  
                            && li_SecPosCode < li_SecPosValue[i + 1]) {  
                        chinese = lc_FirstLetter[i];  
                        break;  
                    }  
                }  
            } else // 非汉字字符,如图形符号或ASCII码  
            {  
                chinese = conversionStr(chinese, "ISO8859-1", "GB2312");  
                chinese = chinese.substring(0, 1);  
            }  
        }  
  
        return chinese;  
    }  
  
    /** 
     * 字符串编码转换 
     * @param str 要转换编码的字符串 
     * @param charsetName 原来的编码 
     * @param toCharsetName 转换后的编码 
     * @return 经过编码转换后的字符串 
     */  
    private static String conversionStr(String str, String charsetName,String toCharsetName) {  
        try {  
            str = new String(str.getBytes(charsetName), toCharsetName);  
        } catch (UnsupportedEncodingException e) {  
            e.printStackTrace();
        }  
        return str;  
    }  
}
