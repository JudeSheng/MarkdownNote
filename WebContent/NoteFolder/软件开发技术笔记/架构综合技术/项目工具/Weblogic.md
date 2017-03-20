- 启动weblogic服务器报错java.lang.NumberFormatException: null
    1. Delete the file /servers/<server_name>/data/ldap/config/replicas.prop
    1. Alter the replicas.prop file and add ‘replica.num=0′ to it.