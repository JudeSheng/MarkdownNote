- Alter session set NLS_DATE_FORMAT = 'dd-Mon-yyyy hh24:mi:ss';
    - 修改当前会话的默认date格式
- Date/String 转换
http://www.cnblogs.com/reborter/archive/2008/11/28/1343195.html
- XML字符串操作
    1. extract(xmltype(snapshot_data), '/Root/ABC[@name=''def'']/@value').getNumberVal() columnName
    
            <Root subject="a">
              <ABC name="def" value="-1.64"/>
              <ABC name="ghi" value="11.99"/>
            </Root >

- replace(str,'a','b')

- cast
    1. select cast(max(updatedate) as date) from xx;