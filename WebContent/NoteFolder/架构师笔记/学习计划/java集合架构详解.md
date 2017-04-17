###综述
    结合框架体系应该最重要的是如何灵活利用三种接口，set,map,list,他们如何遍历，各有什么特征，怎么样去处理，这是关键，在这个基础上再去掌握 在什么场合用什么类型的接口。比如说list和set,set是无序的一个空袋子，当我们只需要放入取出，这个接口当然是最实用的，但是如果我们需要按序 取出，这个方法就不能用了，而要用到list,map接口就有个特点，它有一个特定的key值，而一个key值又对应着一个value，这个value值 中就可以存入很多的东西了，比如姓名，出生年月，性别等，而且可以指定key取出对应的value！（自写）
    如果涉及到堆栈，队列等操作，应该考虑用List，对于需要快速插入，删除元素，应该使用LinkedList，如果需要快速随机访问元素，应该使用ArrayList。
如果程序在单线程环境中，或者访问仅仅在一个线程中进行，考虑非同步的类，其效率较高，如果多个线程可能同时操作一个类，应该使用同步的类。
要特别注意对哈希表的操作，作为key的对象要正确复写equals和hashCode方法。
尽量返回接口而非实际的类型，如返回List而非ArrayList，这样如果以后需要将ArrayList换成LinkedList时，客户端代码不用改变。这就是针对抽象编程。
###系统简述：
1. 集合框架总体结构
   Java中集合类定义主要是java.util.*包下面，常用的集合在系统中定义了三大接口，这三类的区别是：
java.util.Set接口及其子类，set提供的是一个无序的集合；
java.util.List接口及其子类，List提供的是一个有序的集合；
java.util.Map接口及其子类，Map提供了一个映射（对应）关系的集合数据结构；
另外，在JDK5中新增了Queue(队列)接口及其子类，提供了基于队列的集合体系。每种集合，都可以理解为用来在内存中存放一组对象的某种”容器“---就像数组，就像前面我们自己定义的队列。
2. Set接口和List接口
Set 是最简单的一种集合，它的对象不按特定方式排序，只是简单的把对象加入集合中，就像往口袋里放东西。对集中成员的访问和操作是通过集中对象的引用进行的， 所以集中不能有重复对象；而LIst的主要特征是其对象以线性方式存储，没有特定顺序，只有一个开头和一个结尾，当然，它与根本没有顺序的集是不同的。列 表在数据结构中分别表现为：数组和向量、链表、堆栈、队列。关于实现列表的集合类，是我们日常工作中经常用到的；从类图中可以看到，Set 和List都 是继承了Collection接口的子接口，而这类集合都有自己的实现；
3. java.util.Map接口
现 实生活中，我们常会看到这样的一种集合：IP地址与主机名，身份证号与个人，系统用户用与系统用户对象等，这种一一对应的关系，就叫做映射。Java提供 了专门的集合类用来存放这种对象关系的对象，即java.util.Map接口。Map是一个接口，有多种具体的实现类，常用的有HashMap和 Hashtable类实现。Map中存入的对象是一对一对的，即每个对象和它的一个名字（键）关联在一起，Map中数据存放的结构如下图示：
Key(键或名)    Value(key对应的值)
 “userName1”    UserInfo对象1
 “userName1”    UserInfo对象1
 “userName1”    UserInfo对象1
      . . .
. . .
可以看出，Map中存放的是两种对象，一种称为key(键)，一种称为value(值)，它们在在Map中是一一对应关系，这一对对象又称做Map中的一个Entry(项)；Map中的键不能重复，但值可以重复。（借鉴蓝杰，>>>)

###详细阐述：
一、概述
    数据结构对程序设计有着深远的影响，在面向过程的C语言中，数据库结构用struct来描述，而在面向对象的编程中，数据结构是用类来描述的，并且包含有对该数据结构操作的方法。
    在Java语言中，Java语言的设计者对常用的数据结构和算法做了一些规范（接口）和实现（具体实现接口的类）。所有抽象出来的数据结构和操作（算法）统称为Java集合框架（Java Collection Framework）。
    Java程序员在具体应用时，不必考虑数据结构和算法实现细节，只需要用这些类创建出来一些对象，然后直接应用就可以了。这样就大大提高了编程效率。
二、集合框架的层次结构
Collection是集合接口
|――――Set子接口:无序，不允许重复。
|――――List子接口:有序，可以有重复元素。
区别：Collections是集合类
Set和List对比：
Set：检索元素效率低下，删除和插入效率高，插入和删除不会引起元素位置改变。
List：和数组类似，List可以动态增长，查找元素效率高，插入删除元素效率低，因为会引起其他元素位置改变。
Set和List具体子类：
Set
|――――HashSet：以哈希表的形式存放元素，插入删除速度很快。
List
|――――ArrayList：动态数组
|――――LinkedList：链表、队列、堆栈。
Array和java.util.Vector
Vector是一种老的动态数组，是线程同步的，效率很低，一般不赞成使用。
三、Iterator迭代器（接口）
    Iterator是获取集合中元素的过程，实际上帮助获取集合中的元素。
    迭代器代替了 Java Collections Framework 中的 Enumeration。迭代器与枚举有两点不同：
    迭代器允许调用方利用定义良好的语义在迭代期间从迭代器所指向的集合移除元素。
方法名称得到了改进。
    Iterator 仅有一个子接口ListIterator，是列表迭代器，允许程序员按任一方向遍历列表、迭代期间修改列表，并获得迭代器在列表中的当前位置。 ListIterator 没有当前元素；它的光标位置 始终位于调用 previous() 所返回的元素和调用 next() 所返回的元素之间。在 长度为 n 的列表中，有 n+1 个有效的索引值，从 0 到 n（包含）。
四、集合框架之外的Map接口
    Map将键映射到值的对象。一个映射不能包含重复的键；每个键最多只能映射一个值。
Map接口是Dictionary（字典）抽象类的替代品。
    Map 接 口提供三种collection 视图，允许以键集、值集合或键-值映射关系集的形式查看某个映射的内容。映射的顺序 定义为迭代器在映射 的 collection 视图中返回其元素的顺序。某些映射实现可明确保证其顺序，如 TreeMap 类；某些映射实现则不保证顺序， 如 HashMap 类。
    有两个常见的已实现的子类：
HashMap： 基于哈希表的 Map 接口的实现。此实现提供所有可选的映射操作，并允许使用 null 值和 null 键。（除了不同步和允许使用 null 之 外，HashMap 类与 Hashtable 大致相同。）此类不保证映射的顺序，特别是它不保证该顺序恒久不变。
TreeMap：它实现SortedMap 接口的基于红黑树的实现。此类保证了映射按照升序顺序排列关键字，根据使用的构造方法不同，可能会按照键的类的自然顺序 进行排序（参见 Comparable），或者按照创建时所提供的比较器进行排序。
Hashtable：此类实现一个哈希表，该哈希表将键映射到相应的值。任何非 null 对象都可以用作键或值。
五、线程安全类
    在集合框架中，有些类是线程安全的，这些都是JDK1.1中的出现的。在JDK1.2之后，就出现许许多多非线程安全的类。
    下面是这些线程安全的同步的类：
Vector：就比ArrayList多了个同步化机制（线程安全）。
Statck：堆栈类，先进后出。
Hashtable：就比HashMap多了个线程安全。
Enumeration：枚举，相当于迭代器。
    除了这些之外，其他的都是非线程安全的类和接口。
   线程安全的类其方法是同步的，每次只能一个访问。是重量级对象，效率较低。对于非线程安全的类和接口，在多线程中需要程序员自己处理线程安全问题。
六、其他一些接口和类介绍
Dictionary和Hashtable类：
Dictionary提供键值映射的功能，是个抽象类。一般使用它的子类HashTable类。遍历Hashtable类要用到枚举。
Properties类
Properties 继 承于 Hashtable，Properties 类表示了一个持久的属性集。Properties 可保存在流中或从流中加载。属性列表中每个键及其对 应值都是一个字符串。一般可以通过读取properties配置文件来填充Properties对象。
七、各个接口的阐述
1.Collection接口 
Collection是最基本的集合接口，一个Collection代表一组Object，即Collection的元素（Elements）。一些 Collection允许相同的元素而另一些不行。一些能排序而另一些不行。Java SDK不提供直接继承自Collection的 类，Java SDK提供的类都是继承自Collection的“子接口”如List和Set。 
所有实现Collection接口的类都必须提供两个标准的构造函数：无参数的构造函数用于创建一个空的Collection，有一个 Collection参数的构造函数用于创建一个新的Collection，这个新的Collection与传入的Collection有相同的元素。后 一个构造函数允许用户复制一个Collection。 
如何遍历Collection中的每一个元素？不论Collection的实际类型如何，它都支持一个iterator()的方法，该方法返回一个迭代子，使用该迭代子即可逐一访问Collection中每一个元素。典型的用法如下： 
Iterator it = collection.iterator(); // 获得一个迭代子 
while(it.hasNext()) { 
Object obj = it.next(); // 得到下一个元素 
} 
由Collection接口派生的两个接口是List和Set。 
2.List接口 
List是有序的Collection，使用此接口能够精确的控制每个元素插入的位置。用户能够使用索引（元素在List中的位置，类似于数组下标）来访问List中的元素，这类似于Java的数组。 
和下面要提到的Set不同，List允许有相同的元素。 
除了具有Collection接口必备的iterator()方法外，List还提供一个listIterator()方法，返回一个 ListIterator接口，和标准的Iterator接口相比，ListIterator多了一些add()之类的方法，允许添加，删除，设定元素， 还能向前或向后遍历。 
实现List接口的常用类有LinkedList，ArrayList，Vector和Stack。 
3.LinkedList类 
LinkedList实现了List接口，允许null元素。此外LinkedList提供额外的get，remove，insert方法在 LinkedList的首部或尾部。这些操作使LinkedList可被用作堆栈（stack），队列（queue）或双向队列（deque）。 
注意LinkedList没有同步方法。如果多个线程同时访问一个List，则必须自己实现访问同步。一种解决方法是在创建List时构造一个同步的List： 
List list = Collections.synchronizedList(new LinkedList(...)); 
4.ArrayList类 
ArrayList实现了可变大小的数组。它允许所有元素，包括null。ArrayList没有同步。 
size，isEmpty，get，set方法运行时间为常数。但是add方法开销为分摊的常数，添加n个元素需要O(n)的时间。其他的方法运行时间为线性。 
每个ArrayList实例都有一个容量（Capacity），即用于存储元素的数组的大小。这个容量可随着不断添加新元素而自动增加，但是增长算法并没 有定义。当需要插入大量元素时，在插入前可以调用ensureCapacity方法来增加ArrayList的容量以提高插入效率。 
和LinkedList一样，ArrayList也是非同步的（unsynchronized）。 
5.Vector类 
Vector非常类似ArrayList，但是Vector是同步的。由Vector创建的Iterator，虽然和ArrayList创建的 Iterator是同一接口，但是，因为Vector是同步的，当一个Iterator被创建而且正在被使用，另一个线程改变了Vector的状态（例 如，添加或删除了一些元素），这时调用Iterator的方法时将抛出ConcurrentModificationException，因此必须捕获该 异常。 
6.Stack 类 
Stack继承自Vector，实现一个后进先出的堆栈。Stack提供5个额外的方法使得Vector得以被当作堆栈使用。基本的push和pop方 法，还有peek方法得到栈顶的元素，empty方法测试堆栈是否为空，search方法检测一个元素在堆栈中的位置。Stack刚创建后是空栈。 
7.Set接口 
Set是一种不包含重复的元素的Collection，即任意的两个元素e1和e2都有e1.equals(e2)=false，Set最多有一个null元素。 
很明显，Set的构造函数有一个约束条件，传入的Collection参数不能包含重复的元素。 
请注意：必须小心操作可变对象（Mutable Object）。如果一个Set中的可变元素改变了自身状态导致Object.equals(Object)=true将导致一些问题。 
8.Map接口 
请注意，Map没有继承Collection接口，Map提供key到value的映射。一个Map中不能包含相同的key，每个key只能映射一个 value。Map接口提供3种集合的视图，Map的内容可以被当作一组key集合，一组value集合，或者一组key-value映射。 
9.Hashtable类 
Hashtable继承Map接口，实现一个key-value映射的哈希表。任何非空（non-null）的对象都可作为key或者value。 
添加数据使用put(key, value)，取出数据使用get(key)，这两个基本操作的时间开销为常数。 
Hashtable 通过initial capacity和load factor两个参数调整性能。通常缺省的load factor 0.75较好地实现了时间和空间的 均衡。增大load factor可以节省空间但相应的查找时间将增大，这会影响像get和put这样的操作。 
使用Hashtable的简单示例如下，将1，2，3放到Hashtable中，他们的key分别是”one”，”two”，”three”： 
Hashtable numbers = new Hashtable(); 
numbers.put(“one”, new Integer(1)); 
numbers.put(“two”, new Integer(2)); 
numbers.put(“three”, new Integer(3)); 
要取出一个数，比如2，用相应的key： 
Integer n = (Integer)numbers.get(“two”); 
System.out.println(“two = ” + n); 
由于作为key的对象将通过计算其散列函数来确定与之对应的value的位置，因此任何作为key的对象都必须实现hashCode和equals方法。 hashCode和equals方法继承自根类Object，如果你用自定义的类当作key的话，要相当小心，按照散列函数的定义，如果两个对象相同，即 obj1.equals(obj2)=true，则它们的hashCode必须相同，但如果两个对象不同，则它们的hashCode不一定不同，如果两个 不同对象的hashCode相同，这种现象称为冲突，冲突会导致操作哈希表的时间开销增大，所以尽量定义好的hashCode()方法，能加快哈希表的操 作。 
如果相同的对象有不同的hashCode，对哈希表的操作会出现意想不到的结果（期待的get方法返回null），要避免这种问题，只需要牢记一条：要同时复写equals方法和hashCode方法，而不要只写其中一个。

