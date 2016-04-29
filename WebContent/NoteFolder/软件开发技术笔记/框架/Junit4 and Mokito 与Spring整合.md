> Junit4 和 Spring整合，用Spring IOC来管理Test Case，从而实现Test Case可利用Spring强大的事物管理等功能，实现Test Case对数据库操作回滚的功能,保持数据库的完整性。  

> Mockito能有效的mock那些测试类中的不可控的对象，比如Request和Response

### 注解的方式整合Spring ： extends AbstractTransactionalJUnit4SpringContextTests
    @ContextConfiguration(locations={
        "config/applicationContext-datasource-test.xml",
        "config/applicationContext-Freedom-test.xml",
        "classpath:applicationContext-grid.xml",
        "classpath:applicationContext-Freedom-legacy.xml"
    })

### 实现事物回滚
    @TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)

### Mockito 
- MockitoAnnotations.initMocks(this);
    - 使Mockito的注解生效，如果不用SpringTest跑test case,可以用@RunWith(MockitoJUnitRunner.class)代替
- @Mock 和 @InjectMocks
    1. @mock为一个interface提供一个虚拟的实现，成为一个mock对象。
    2. @InjectMocks将本test类中的mock（或@mock）注入到被标注的对象中去，也就是说被标注的对象中需要使用标注了mock（或@mock）的对象。但是被标注的对象不是一个mock对象
- @Spy：可用于实现部分mock
    - @Mock的对象只有在调用了Mockito.when(obj.doSomething()).thenCallRealMethod()的时候才会调用真实方法
    - 而@Spy注解的对象只有在调用了Mockito.when(obj.doSomething()).thenReturn(rtnValue)的时候才返回mock的值，但是真实方法还是会运行
    - 直接返回mock后的值而运行原方法：Mockito.doReturn(true).when(obj).doSomething();

### mock Request和Response

    protected HttpServletResponse getReponseWithPrintWriter() throws IOException {
        PrintWriter writer = org.mockito.Mockito.mock(PrintWriter.class);
        HttpServletResponse response = org.mockito.Mockito.mock(HttpServletResponse.class);
        org.mockito.Mockito.when(response.getWriter()).thenReturn(writer);
        return response;
    }

    protected HttpServletResponse getReponseWithOutputStream() throws IOException {
        ServletOutputStream outputStream = org.mockito.Mockito.mock(ServletOutputStream.class);
        HttpServletResponse response = org.mockito.Mockito.mock(HttpServletResponse.class);
        org.mockito.Mockito.when(response.getOutputStream()).thenReturn(outputStream);
        return response;
    }    

    protected HttpServletRequest getUserIdFromPortalWithMockedRequest() {
        HttpServletRequest request = org.mockito.Mockito.mock(HttpServletRequest.class);
        
        org.mockito.Mockito.when(request.getHeader("user")).thenReturn("sxq");
        return request;
    }

### 其他
- @Autowired注入Action
- System.setProperty("SERVER_ENV", "DEV");设置环境变量
