- 通知(Advice):
    - 切面方法
- 连接点(Joinpoint):
- 切入点(Pointcut)
    - pointcut="(execution \* com.\*.service..\*.fetch(..))"
        1. 第1个星 : 任意返回值类型
        1. 第2个星 : 任意包
        1. 第3个星 : 任意类
        1. .. : 第一个点表示目录分隔，第二个点表示类
- 引入(Introduction)

### Spring AOP And Annotation

        <aop:aspectj-autoproxy />
        <context:component-scan base-package="com.xxx.Loggable">
            <context:include-filter type="annotation" expression="org.aspectj.lang.annotation.Aspect"/>
        </context:component-scan>  
        
        @Around("@annotation( loggable)")
        public Object printLog(ProceedingJoinPoint point, Loggable loggable) throws Throwable {
            try {
                result = point.proceed();
            } catch (Exception e) {            
        }

- 不能自己调用自己，必须是spring管理的对象
- Annotation需要被扫描
- aspectjrt.jar
- aspectjtools.jar
- 切面类加@Aspect,被扫描
