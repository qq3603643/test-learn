/**
 * 责任链模式
 */

class Chain {
  constructor(fn) {
    this.selfFn = fn;
    this.nextSuccessor = null;
  }

  setNextSuccessor(nextSuccessor) {
    return this.nextSuccessor = nextSuccessor;
  }

  async passRequest(...args) {
    const _ret = await this.selfFn(...args);

    if (!_ret) {
      return this.nextSuccessor && this.nextSuccessor.passRequest.apply(this.nextSuccessor, args)
    }

    return _ret;
  }
}

const fn1 = () => {
  console.log('step_1');
  return false;
};

const fn2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('step_2');
      resolve(false);
    }, 1000);
  });
};

const fn3 = () => {
  console.log('over');
}

const chain = new Chain(fn1);

chain.setNextSuccessor(new Chain(fn2)).setNextSuccessor(new Chain(fn3));
chain.passRequest();
