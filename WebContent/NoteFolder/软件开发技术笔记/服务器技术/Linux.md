- grep -A/-B 10 'XXX' XX.log
    > 带上grep语句后/前 10条

- history 10
    > 察看前10条历史命令

- ./xxx.sh status
    > 察看进程状态

- chmod -R 777 folder
    > 赋权限

- free -m -o | grep 'Mem' | awk '{print $4}'
    > 查看服务器空间

- crontab -e : 
    > 进入CRON JOB VI模式

- ps -e -o 'pid,comm,args,pcpu,rsz,vsz,stime,user,uid' | grep oracle |  sort -nrk5
    > 查看进程

- ps -ef | awk '{print $2}' | xargs kill -9
    > kill进程

- :set ff=unix
    > vi 模式下将文件格式转换成unix,可以解决windows下shell脚本和Liunx格式不一样问题

- awk
    1. echo abcde | awk '{print substr($0, 0, 2)}'
    2. ps -e -o 'cmd' | awk '{print substr($0,index($0,"'$APP_HOME'"),20)}' 
    4. CURRENT_DATE=`date` ps -e -o 'rsz,cmd' | awk '{print $1, "'"$CURRENT_DATE"'"}'
        > awk引用外部变量

- nohup sh process_monitor.sh > process_monitor.out &
    > 后台持续启动脚本

-  find /xx/xx/ -name 'xx*.log'
    > 查找文件
- find /xx/xx/ -name 'xx*.log' | grep -v 'xxx' | xargs ls -l
    > find 和 ls 和用