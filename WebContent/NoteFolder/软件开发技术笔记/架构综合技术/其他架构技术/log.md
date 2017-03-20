## logback

### configuration 
- scan & scanPeriod 配置文件如果发生改变，将会被重新加载，默认true，60s
- debug logback自己的日志
    
        <configuration scan="true" scanPeriod="60 seconds" debug="false">  
              <!-- 其他配置省略-->  
        </configuration>  

### logger 
- name 包或者类
- level TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，NULL代表强制执行上级的级别。
- addtivity ture(向上级传递打印信息)

        <logger name="com.aaa">
            <appender-ref ref="aa" />
        </logger>

### root 
    
        <root level="INFO">
            <appender-ref ref="stdout" />
        </root>

### appender 
- ch.qos.logback.core.ConsoleAppender
- ch.qos.logback.core.FileAppendar
- ch.qos.logback.core.rolling.RollingFileAppender

- encoder 和 layout 在作用上没有本质区别。但是自0.9.19版本之后，极力推荐使用encoder。

        <appender name="rates-request" class="ch.qos.logback.core.rolling.RollingFileAppende">
            <Encoding>UTF-8</Encoding>
            <filter class="ch.qos.logback.classic.filter.LevelFilter">
                <level>INFO</level>
                <OnMatch>ACCEPT</OnMatch>
                <OnMismatch>DENY</OnMismatch>
            </filter>
            <File>logs/xx/xx.log</File>
            <encoder>
                <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%level] %class:%method:%line- %message%n</pattern>
            </encoder>
            <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                <FileNamePattern>logs/Error.log.%d{yyyy-MM-dd}.gz</FileNamePattern>
                <maxHistory>7</maxHistory>
            </rollingPolicy>
            <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
                <FileNamePattern>logs/Error.log.%i.gz</FileNamePattern>
                <MinIndex>1</MinIndex>
                <MaxIndex>5</MaxIndex>
            </rollingPolicy>
            <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
                <MaxFileSize>10M</MaxFileSize>
            </triggeringPolicy>
        </appender>

### appender pattern
- http://blog.csdn.net/tengdazhang770960436/article/details/18036721
- %class表示print语句所在类
- %c表示Logger创建的类,%c{1}表示省略包名
- %c和%line合用会产生歧义

          %d{yyyy-MM-dd HH:mm:ss} [%level] - %msg%n
          Logger: %logger
          Class: %class
          File: %file
          Caller: %caller
          Line: %line
          Message: %m
          Method: %M
          Relative: %relative
          Thread: %thread
          Exception: %ex
          xException: %xEx
          nopException: %nopex
          rException: %rEx
          Marker: %marker
          %n

### appender filter
- 可以有多个
- LevelFilter ：指定Level
- ThresholdFilter ：Level以上
- OnMatch(符合条件)/OnMismatch(不符合条件)
    1. 返回DENY，日志将立即被抛弃不再经过其他过滤器；
    1. 返回NEUTRAL，有序列表里的下个过滤器接着处理日志；
    1. 返回ACCEPT，日志会被立即处理，不再经过剩余过滤器。

### appender rollingPolicy & triggeringPolicy
- ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy
- ch.qos.logback.core.rolling.TimeBasedRollingPolicy
- ch.qos.logback.core.rolling.FixedWindowRollingPolicy
- 两者可合用
