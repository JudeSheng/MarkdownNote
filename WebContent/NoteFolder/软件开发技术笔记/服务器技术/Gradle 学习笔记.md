^^^^^^^^^^进度^^^^^^^^^^^^
II. Working with existing builds

3. **Installing Gradle**
4. **Using the Gradle Command-Line**
5. **The Gradle Wrapper**
6. **The Gradle Daemon**
7. Dependency Management Basics
8. Introduction to multi-project builds
9. Continuous build
10. Using the Gradle Graphical User Interface
11. The Build Environment
12. Troubleshooting
13. Embedding Gradle

III. Writing Gradle build scrip    

14. **Build Script Basics**
15. **Build Init Plugin**
16. Writing Build Scripts
17. More about Tasks
18. Working With Files
19. Using Ant from Gradle
20. The Build Lifecycle
21. Wrapper Plugin
22. Logging
23. Dependency Management
24. Multi-project Builds
25. Gradle Plugins
26. Standard Gradle plugins
27. The Project Report Plugin
28. The Build Dashboard Plugin
29. Comparing Builds
30. Publishing artifacts
31. The Maven Plugin
32. The Signing Plugin
33. Ivy Publishing (new)
34. Maven Publishing (new)
35. The Distribution Plugin
36. The Announce Plugin
37. The Build Announcements Plugin

IV. Extending the build

38. Writing Custom Task Classes
39. Writing Custom Plugins
40. The Java Gradle Plugin Development Plugin
41. Organizing Build Logic
42. Initialization Scripts
43. The Gradle TestKit

V. Building JVM projects

44. Java Quickstart
45. The Java Plugin
46. Web Application Quickstart
47. The War Plugin
48. The Ear Plugin
49. The Jetty Plugin
50. The Application Plugin
51. The Java Library Distribution Plugin
52. Groovy Quickstart
53. The Groovy Plugin
54. The Scala Plugin
55. The ANTLR Plugin
56. The Checkstyle Plugin
57. The CodeNarc Plugin
58. The FindBugs Plugin
59. The JDepend Plugin
60. The PMD Plugin
61. The JaCoCo Plugin
62. The Sonar Plugin
63. The SonarQube Runner Plugin
64. The OSGi Plugin
65. The Eclipse Plugins
66. The IDEA Plugin

VI. The Software model - Next generation Gradle builds

67. Rule based model configuration
68. Software model concepts
69. Implementing model rules in a plugin
70. Building Java Libraries
71. Building Play applications
72. Building native software
73. Extending the software model

VII. Appendix

A. Gradle Samples
B. Potential Traps
C. The Feature Lifecycle
D. Gradle Command Line
Glossary
^^^^^^^^^^^^^^^^^^^^^^

^^^^^^^^^^安装 Gradle^^^^^^^^^^^
- [Gradle 官网](http://gradle.org/)
- JDK1.6以上
- 设置Env，启用cmd gradle命令
    1. GRADLE_HOME : 不带;
    2. PATH: %GRADLE_HOME%/bin
    3. 测试 cmd : gradle -v
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
^^^^^^^^^^ Gradle HelloWorld ^^^^^^^^^^^
1. build.gradle

        task compile << {
            println 'compiling source'
        }
        
        task compileTest(dependsOn: compile) << {
            println 'compiling unit tests'
        }
        task test(dependsOn: [compile, compileTest]) << {
            println 'running unit tests'
        }
        
        task dist(dependsOn: [compile, test]) << {
            println 'building the distribution'
        }
2. cmd cd build.gradle所在目录

        gradle compile compileTest

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

^^^^^^^^^^ Gradle Command-line ^^^^^^^^^^^
- [Gradle Command-line Links](https://docs.gradle.org/current/userguide/gradle_command_line.html)
- gradle dist -x test
    - 排除test任务
- gradle test dist --continue
    - 当test失败，dist还会继续，但如果dist依赖test则不再继续
- gradle -b build2.gradle test
    - 选择build文件
- gradle -q dist
    - 输出省略任务名称
- gradle dist --profile
    - 输出任务报表 输出目录：build/reports
- gradle dependencies
    - 输出项目依赖
- gradle -m dist
    - 测试任务是否可以正常运行

### 其他
- gradle tasks --all
    - 显示任务信息
- gradle help --task taskName
    - 显示某个任务Detail信息
- gradle project
    - 显示项目信息
- gradle properties
    - 显示项目properties

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

^^^^^^^^^^ Gradle 脚本编写之： 基础篇^^^^^^^^^^^
### << 等于 doLast

### dependsOn/Lazy dependsOn
- task dist(dependsOn: test) << {}
- task dist(dependsOn: 'test') << {}

### Dynamic tasks
- gradle -q task0

        4.times { i ->
            task "task$i" << {
                println "I'm task number $i"
            }
        }
        task0.dependsOn task2, task3

- gradle -q hello

        task hello << {
            println 'Hello World'
        }
        hello.doFirst {
            println 'Hello doFirst'
        }
        hello.doLast {
            println 'Hello doLast'
        }
        hello << {
            println 'Hello Jude'
        }

### task定义 属性/方法
- Code

        task test(dependsOn:'dist'){
            ext.myName = "Jude"
            version = "1.0"
        }
        task dist << {
            setTestName('Jude Sheng')
            println test.myName + "$version"
        }        
        String setTestName(String myName) {
            test.ext.myName = myName
        }

### 默认Tasks
- defaultTasks 'dist','test'
- gradle -q

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

^^^^^^^^^^ Gradle 脚本编写之： Gradle方法^^^^^^^^^^^
- taskGraph.hasTask / taskGraph.whenReady
    - 当前执行的task中是否有某个task

            gradle.taskGraph.whenReady {taskGraph ->
                if (taskGraph.hasTask(release)) {
                    version = '1.0'
                } else {
                    version = '1.0-SNAPSHOT'
                }
            }

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


^^^^^^^^^^ Gradle 脚本编写之： API^^^^^^^^^^^
- [Gradle API]() : To be find out

### Project
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
^^^^^^^^^^ Gradle Wrapper ^^^^^^^^^^^
#### 生成wrapper文件
1. gradle wrapper
    - 生成当前gradle版本wrapper文件

            gradlew
              gradlew.bat
              gradle/wrapper/
                gradle-wrapper.jar
                gradle-wrapper.properties

2. 自定义wrapper所用gradle版本 task

        task wrapper(type: Wrapper) {
            gradleVersion = '2.11'
        }

3. 使用本地gradle zip文件代替gradle远程下载，zip包需要放在 gradle\wrapper目录下

        task wrapper(type: Wrapper) {
            distributionPath = 'gradle-2.11-all.zip'
        }

#### 使用gradlew命令代替gradle命令
- gradlew dist
    - 第一次会下载并且解压gradle zip文件至目录 C:\Users\xxxx\.gradle\wrapper，之后不会下载
    - C:\Users\xxxx\.gradle文件夹是在你安装gradle后跑第一个gradle命令自动生成
- 使用wrapper的gradle版本代替，而不会用本地gradle版本
- gradle推荐使用wrapper模式，并将生成的wrapper文件加入版本控制
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


^^^^^^^^^^ 其他 ^^^^^^^^^^^
### Daemon使用缓存解决gradle运行速度
1. 默认关闭Daemon,gradle建议Dev机子都开启Daemon
2. 开启Daemon
    - C:\Users\xxxx\\.gradle目录新建文件 gradle.properties
    - gradle.properties文件添加 **org.gradle.daemon=true**
        - 当**org.gradle.daemon=true**并且Daemon未开启时，运行gradle命令会自动开启Daemon
3. 关闭Daemon
    - gradle --stop
    - 闲置3小时的Daemon进程会自动关闭

### 支持task名字缩
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
