/**
 * 自定义命名空间 订阅发布
 * 个人认为 精髓在于Event的对外接口是创建一个默认命名空间的event对象实现的
 * 1. 支持离线消息，即: 先trigger 后listen(初次有效)
 * 2. 支持自定义实例生成 (必避免key值太多相同 & 区分不同模块)
 */
const Event = function() {
  const nameSpaceCache = {};
  const _each = (arr, fn) => {
    let ret = null;
    let i = 0;
    const len = arr.length;

    while (i < len) {
      ret = fn.call(arr[i], arr[i], i);

      i += 1;
    }

    return ret;
  };
  const _listen = (key, fn, cache) => {
    if (!cache[key]) {
      cache[key] = [];
    }

    cache[key].push(fn);
  };
  const _remove = (key, fn, cache) => {
    if (!cache[key]) {
      cache[key] = [];

      return;
    }

    if (!fn) {
      return;
    }

    _each(cache[key], (_fn, i) => {
      if (_fn == fn) {
        cache[key].splice(i, 1);
      }
    });
  };
  const _trigger = (...args) => {
    const cache = args[0];
    const key = args[1];
    const _self = this;
    const stack = cache[key];

    if (!(stack && stack.length)) {
      return;
    }

    return _each(stack, (..._args) => {
	  if (_args[0].isOne) {
	  	_remove(key, _args[0], cache);
	  }
      return _args[0].apply(_self, args.splice(2));
    });
  };

  const _create = (nameSpace = 'default') => {
    const cache = {};
    let offlineStack = [];

    const ret = {
      listen(key, fn, last) {
        _listen(key, fn, cache);

        if (offlineStack == null) {
          return;
        }

        /* 第一次listen时将把离线消息清空 */
        if (last == 'last') {
          if (offlineStack.length) {
            offlineStack.pop()();
          }
        } else {
          _each(offlineStack, (...args) => {
            args[0]();
          });
        }

        offlineStack = null;
      },
      one(key, fn, last) {
      	fn.isOne = true;
        this.listen(key, fn, last);
      },
      remove(key, fn) {
        _remove(key, fn, cache);
      },
      trigger(...args) {
        args.unshift(cache);
        const fn = () => {
          return _trigger.apply(this, args);
        };

        if (offlineStack) {
    	  /* offlineStack 未listen之前才会存在 */
          return offlineStack.push(fn);
        }

        return fn();
      }
    };

    return nameSpace ? (nameSpaceCache[nameSpace] ? nameSpaceCache[nameSpace] : nameSpaceCache[nameSpace] = ret) : ret;
  };

  return {
    create: _create,
    one(key, fn, last) {
      var event = this.create();

      event.one(key, fn, last);
    },
    remove(key, fn) {
      var event = this.create();

      event.remove(key, fn);
    },
    listen(key, fn, last) {
      var event = this.create();

      event.listen(key, fn, last);
    },
    trigger(...args) {
      var event = this.create();

      event.trigger.apply(this, args);
    }
  };
}();

Event.trigger('hi', 'apple');

Event.listen('hi', (name) => {
	console.log(`hi, ${name}`);
});

Event.listen('say', (name) => {
  console.log(`i am ${name}`);
});
Event.one('say', (name) => {
  console.log(`my name is ${name}`);
})

setTimeout(() => {
  Event.trigger('say', 'tangerine');
}, 1000);

const myEvent = Event.create('myEvent');

myEvent.listen('say', (name) => {
	console.log(`i am ${name}`);
});
myEvent.trigger('say', 'orange');