interface interfaceA  {
  name: string;
  age: string;
};

function show(p: interfaceA): void {
  console.log(`My name is ${p.name}, and i am ${p.age}`);
}

/** interface 参数不能多或者少 顺序可变 用as可肆意代替interface **/
show({} as interfaceA);

/** interface 除了描述对象的外形外 还用来描述函数类型 **/
interface funcA {
  (age: number): boolean;
};

let isAdult: funcA = (age: number) => {
  return age >= 18;
};

declare function funcB(name?: string): number;
let x: number;
x = funcB();

type validate = number | string;
let n: validate = String();

/* 类型转换 */
interface Person {
  name: string;
  age: number;
};

let me = { name: 'tangerine' };
let fMe = <Person>me;
fMe.age = 24;  // 转换之后 可访问age属性

/* 数组包含多种类型值 */
let list: Array<number | string> = [1, '2'];

/* 泛型接口 */
interface getSelf<T> {
  (arg: T): T
}
let getStrSelf: getSelf<string> = str => str;

/* 泛型函数 */
function getSelf2<T>(arg: T):T {
  return arg;
}
getSelf2<string>('apple');

/* 泛型类 */
class Generics<T> {
  val: T;
  constructor(val: T) {
    this.val = val;
  };
  getVale():T {
    return this.val;
  };
}

new Generics<string>('apple').getVale();


/* typeof */
