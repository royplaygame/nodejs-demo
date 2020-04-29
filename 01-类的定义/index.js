/*
function Person(name, age, addr) {
    this.name = name;
    this.age = age;
    this.addr = addr;
}
var p=new Person('zhangsan',20,'洛阳')
console.log(p)
*/

// class javascript类的定义
class Person {
    // 类的构造方法
    constructor(name, age, addr) {
        this.name = name;
        this.age = age;
        this.addr = addr;
    }

    // 类的一般方法
    showInfo() {
        console.log("this is showInfo methods===>" + this.name)
    }
}

const p = new Person('zhangsan', 20, '洛阳');
console.log(p)
p.showInfo()

// 类的继承, 明星类
class Star extends Person {
    constructor(name, age, addr, salary) {
        super(name, age, addr); // 调用父类的构造方法
        this.salary = salary;
    }

    // 重写父类人方法
    showInfo() {
        console.log("this is showInfo methods===>" + this.name + "===>" + this.addr + "====>" + this.salary)
    }
    // javascript没有实现方法的重载,
    /*showInfo(str) {
        console.log(str);
    }*/
}

const ym = new Star('ym', 20, '洛阳', 20202020);
console.log(ym)
ym.showInfo()
ym.showInfo("good")
