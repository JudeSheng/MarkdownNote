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
