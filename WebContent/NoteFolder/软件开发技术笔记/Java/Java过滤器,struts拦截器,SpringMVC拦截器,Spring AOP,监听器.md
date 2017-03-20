### 参考
- http://www.cnblogs.com/dreamroute/p/4198087.html
- http://www.cnblogs.com/wangyuyu/archive/2013/07/02/3167354.html

### web.xml

       <filter>
            <description>
            </description>
            <display-name>RatesRequestLoggerFilter</display-name>
            <filter-name>RatesRequestLoggerFilter</filter-name>
            <filter-class>com.citi.rates.common.rateslogger.RatesRequestLoggerFilter</filter-class>
        </filter>
        <filter-mapping>
            <filter-name>RatesRequestLoggerFilter</filter-name>
            <url-pattern>*.action</url-pattern>
            <servlet-name>aaa</servlet-name>
            <servlet-name>bbb</servlet-name>
        </filter-mapping>

### Filter里获取HttpServletResponse内容

Filter

    RatesHttpServletResponseWrapper wrapper = new RatesHttpServletResponseWrapper(httpServletResponse);
    chain.doFilter(request, wrapper);
    response.getWriter().write(wrapper.getResults());
    response.getWriter().flush();
    response.getWriter().close();
    
RatesHttpServletResponseWrapper     

    import java.io.CharArrayWriter;
    import java.io.IOException;
    import java.io.PrintWriter;
    
    import javax.servlet.http.HttpServletResponse;
    import javax.servlet.http.HttpServletResponseWrapper;
    
    public class RatesHttpServletResponseWrapper extends HttpServletResponseWrapper {
        
        private int httpStatus;
        
        private PrintWriter writer;
        private CharArrayWriter bufferedWriter;
        
        public RatesHttpServletResponseWrapper(HttpServletResponse response) {
            super(response);
            bufferedWriter = new CharArrayWriter();//This is the result in response
            writer = new PrintWriter(bufferedWriter);
        }
        
        public int getStatus() {
            return httpStatus;
        }
        
        public String getResults() {
            return bufferedWriter.toString();
        }
        
        /***
         * set the writer to PrintWriter
         */
        @Override
        public PrintWriter getWriter() throws IOException {
            return writer;
        }
        
        /***
         * Set the http response code
         */
        @Override
        public void setStatus(int sc) {
            httpStatus = sc;
            super.setStatus(sc);
        }
        
        /***
         * Set the http response code
         */
        @Override
        public void sendError(int sc) throws IOException {
            httpStatus = sc;
            super.sendError(sc);
        }
        
        /***
         * Set the http response code
         */
        @Override
        public void sendError(int sc, String msg) throws IOException {
            httpStatus = sc;
            super.sendError(sc, msg);
        }
        
    }
