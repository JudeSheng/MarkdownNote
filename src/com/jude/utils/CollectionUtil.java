package com.jude.utils;

import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;

public class CollectionUtil {
	
	public static final int SORT_TYPE_UP = 1;
	public static final int SORT_TYPE_DOWN = -1;
	
	public static Map<Double, Double> sortByValue(final Map<Double, Double> map, final int type) {
		if(map == null) {
			return null;
		}
		Map<Double, Double> sortedMap = new TreeMap<Double, Double>(new Comparator<Double>() {
			public int compare(Double a, Double b) {
				if(SORT_TYPE_UP == type) {
					return map.get(a).compareTo(map.get(b));
				} else if(SORT_TYPE_DOWN == type) {
					return map.get(b).compareTo(map.get(a));
				}
				return 0;
			}
		});
		sortedMap.putAll(map);
		return sortedMap;
	}
	
}
