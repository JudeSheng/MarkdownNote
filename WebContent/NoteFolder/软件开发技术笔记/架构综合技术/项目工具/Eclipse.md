- 设置代理
    Window.Preperences.General.Network Connections -> Manual > Proxy entries 设置host,prot
- 测试覆盖率插件 in Eclipse Marketplace
    - EclEmma Java Code Coverage
- JRE版本 **49=1.5 | 50=1.6 | 51=1.7**
    1. Window.Preperences.Java.Installed JREs
        - 项目默认运行JRE
    2. Bindpath更换JRE
        - 自定义运行JRE
    3. Window.Preperences.Java.Compiler
        - 项目编译JRE版本
    4. 项目Properties.Project Facets
        - 服务器(Tomcat)运行环境JRE版本，需要与Compiler保持一致
- eclipse分配内存大小
    - eclipse.ini : -Xms256m -Xmx1024m

^^^^^^^^^^^Exception^^^^^^^^^^^^
- Cannot open Eclipse Marketplace
    - 为Eclipse设置代理 选择Manual
^^^^^^^^^^^^^^^^^^^^^^^