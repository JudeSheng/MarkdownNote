package com.jude.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class DateUtil {
	
	public static final String FORMAT_DATE_DEFAULT = "yyyy-MM-dd";
	public static final String FORMAT_TIME_DEFAULT = "HH:mm:ss";
	public static final String FORMAT_DATE_TIME = "yyyy-MM-dd HH:mm:ss";
	public static final String FORMAT_DATE_TIME_2 = "dd MMM yyyy HH:mm:ss";
	
	public static Date addDays(Date date, int days) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, days);
		return calendar.getTime();
	}
	
	public static Date getMinDate(List<Date> dateList) {
		Date minDate = null;
		if(dateList != null && dateList.size() > 0) {
			minDate = dateList.get(0);
			for (int i = 1; i < dateList.size(); i++) {
				if(minDate.after(dateList.get(i))) {
					minDate = dateList.get(i);
				}
			}
		}
		return minDate;
	}
	
	/**
	 * Get the Days
	 * */
	public static List<String> getDayList(String startDay, String endDay) {
		List<String> dateList = new ArrayList<String>();
		Date startDate = StringUtil.stringToDate(startDay, FORMAT_DATE_DEFAULT);
		dateList.add(startDay);
		Date endDate = StringUtil.stringToDate(endDay, FORMAT_DATE_DEFAULT);
		int days =0;
		long leftTime = endDate.getTime() - startDate.getTime();
		days = (int)(leftTime/(1000*60*60*24));
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(startDate);
		for (int i = 0; i < days; i++) {
			calendar.add(Calendar.DATE, 1);
			String dateStr = StringUtil.dateToString(calendar.getTime(), FORMAT_DATE_DEFAULT);
			dateList.add(dateStr);
		}
		return dateList;
	}
	
	public static long getTimeCost(Date sDate, Date eDate) {
		long time = eDate.getTime() - sDate.getTime();
		return time;
	}
	
	public static String dateToString(Date date, String format) {
		if(date == null) {
			return "";
		}
		SimpleDateFormat df = new SimpleDateFormat(format);
		String dateStr = df.format(date);
		return dateStr;
	}
	
	public static String dateToString(Date date, String format, Locale locale) {
		if(date == null) {
			return "";
		}
		SimpleDateFormat df = new SimpleDateFormat(format, locale);
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

}
