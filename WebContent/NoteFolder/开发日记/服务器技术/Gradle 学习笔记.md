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
- gradle dist -x test
    - 排除test任务
- gradle test dist --continue
    - 当test失败，dist还会继续，但如果dist依赖test则不再继续
- gradle -b build2.gradle test
    - 选择build文件

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


^^^^^^^^^^ 其他 ^^^^^^^^^^^
- 支持task名字缩写
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
