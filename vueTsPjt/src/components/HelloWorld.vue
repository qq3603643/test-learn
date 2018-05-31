<template>
  <div class="hello">
    <h2>Instruction</h2>
    <p>
      hell, everyone
    </p>
    <p>my name is {{ nameFromGetter }}</p>
    <p>my another name is {{ calcname }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch
} from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

@Component({})
export default class HelloWorld extends Vue {
  @Prop({ default: 'tangerine' })
  myname: string;

  _myname: string = this.myname;
  myname2: string = this.myname;

  @Watch('myname')
  onMynameChanged(newname: string, oldname: string) {
    this.calcname = newname;
  }

  /** state 获取格式: @State (property form state) [: typfe] **/
  @State age: string;
  /** getter 获取格式: @Getter(property form getters) namespace [: type] || @Getter name: string**/
  @Getter('name') nameFromGetter: string;

  get calcname() {
    // this._data 来自 this.$options.data (options.data.call(vm, vm)
    // this.**    来自 this._data  Object.defineProperty(this, **, { get() { return this._data.** } ... })
       // 在此过程中排除了以 _/$ 开头的属性值  this._** / this.$** 只能通过this.$data|_dta[_** / $**]访问
    // this.$data 来自 Vue.prototype.$data = Object.defineProperty(Vue.prototype, '$data', { get() { return this._data } })

    /**
     * ##summary
     * this.$data 基本等价于this._data
     */
    return this.$data._myname;
  }
  set calcname(newname) {
    this.$data._myname = newname;
  }

  mounted() {
    setTimeout(() => {
      this.calcname = `X ${this.calcname}`;
    });

    console.log(this.age);
    this.setNameFromAction('tangerine');

    this.getUserInfo();
  }

  /** action 获取格式: @Action(property from actions) namespace [:type] || @Action _SET_NMAE: () => void**/
  @Action('_SET_NAME') setNameFromAction: (name: string) => void;
  async getUserInfo(): Promise<any> {
    const vm = this;

    vm.calcname = await new Promise((resolve, reject) => {
      setTimeout(resolve, 1000, 'tangerine__async');
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
