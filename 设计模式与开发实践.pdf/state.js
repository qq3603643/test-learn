/**
 * 状态模式
 * @实例 开关切换
 */
class FSM {
  static off = {
    click() {
      console.log('ON');
      this.currentState = FSM.on;
    }
  };
  static on = {
    click() {
      console.log('OFF');
      this.currentState = FSM.off;
    }
  };
}

class Light {
  constructor() {
    this.currentState = null;
    this.btn = null;
  }

  init() {
    this.currentState = FSM.off;
    this.btn = document.querySelector('#btn');

    this.btn.onclick = this.currentState.click.apply(this);
  }
}

/**
 * 实现二
 */
class OnState {
  constructor(light) {
    this.light = light;
  }

  click() {
    console.log('OFF');
    this.light.state = 'offState';
  }
}

class OffState {
  constructor(light) {
    this.light = light;
  }

  click() {
    console.log('ON');
    this.light.state = 'onState';
  }
}

class Light {
  constructor() {
    this.state = null;
    this.btn = null;
  }

  init() {
    this.btn = document.querySelector('#btn');
    this.state = 'offStage';
    this.offStage = new OffState(this);
    this.onState = new OffState(this);

    this.btn.onclick = this[state].click;
  }
}