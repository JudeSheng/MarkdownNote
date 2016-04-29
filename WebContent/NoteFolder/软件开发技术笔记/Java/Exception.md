^^^^^^^^^^^^ org.hibernate.HibernateException: No Session found for current thread ^^^^^^^^^^^^
- sessionFactory 
    - **org.springframework.orm.hibernate4.LocalSessionFactoryBean**
- Hibernate4 与 spring3 整合使用注解注入sessionFactory，SessionFactory的getCurrentSession并不能保证在没有当前Session的情况下会自动创建一个新的，这取决于CurrentSessionContext的实现
- 解决方案
    1. session.openSession()
    2. 用transactionManager管理session,注解@Transactional(value="transactionManager", readOnly=true)

            <bean id="transactionManager" class="org.springframework.orm.hibernate4.HibernateTransactionManager">
                <property name="sessionFactory" ref="sessionFactory">
                </property>
            </bean>

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

^^^^^^^^^^^^^^^^^^^^^^^^@Transactional不起作用^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
配置文件必须加annotation-driven，否则不解析@Transactional 

    <tx:annotation-driven />
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

^^^^^^^^^^^^^^^^^^^^^^^Injection of autowired dependencies failed; ^^^^^^^^^^^^^^^^^^^^^^^
#### nested exception is org.springframework.beans.factory.BeanCreationException: Could not autowire field:
#### expected single matching bean but found 2: 
- spring @Autowired有多个子类实现报错
- 解决方案 ：
    - 用@Resource(name="") 代替@Autowired


^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

^^^^^^^^^^^^^^^^^^^^^^^设置 -Xmx后进程实际占用内存超出 ^^^^^^^^^^^^^^^^^^^^^^^
> 进程除了JVM heap外 还有别的Native对象占用内存，Native对象不受JVM管理
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^