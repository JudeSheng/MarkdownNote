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
    - C:\Users\xxxx\.gradle目录新建文件 gradle.properties
    - gradle.properties文件添加 **org.gradle.daemon=true**
    - 当**org.gradle.daemon=true**并且Daemon未开启时，运行gradle命令会自动开启Daemon
3. 关闭Daemon
    - gradle --stop
    - 闲置3小时的Daemon进程会自动关闭

### 支持task名字缩
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
