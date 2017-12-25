<template>
  <div :class="classObj">
    <ul id="personItems">
      <toItem v-for="(item, index) in persons" :p="item" :key="index"></toItem>
    </ul>
    <button @click="reverseP">reverse</button>
    <form>

      <fieldset>
        <legend>input输入框</legend>
        <input type="text" v-model="textIpt" >
        <p>this is textIpt: {{ textIpt }}</p>
      </fieldset>

      <label>
        <input type="checkbox" v-model="isCheckedCheckBox">
        {{ isCheckedCheckBox }}
      </label>

      <fieldset>
        <legend>多选框</legend>
        <label>
          <input type="checkbox" value="apple" v-model="ckBoxNames">
          apple
        </label>
        <label>
          <input type="checkbox" value="tangerine" v-model="ckBoxNames">
          tangerine
        </label>
        <p>this is ckBoxNames: {{ ckBoxNames }}</p>
      </fieldset>

      <fieldset>
        <legend>radio</legend>
        <label>
          <input type="radio" value="man" v-model="sex">
          man
        </label>
        <label>
          <input type="radio" value="felman" v-model="sex">
          felman
        </label>
        <p>this is your sex: {{ sex }}</p>
      </fieldset>

      <fieldset>
        <legend>select选择列表</legend>
        <select v-model="selectValue">
          <option value="first">one</option>
          <option value="second">two</option>
        </select>
        <p>this is your selectValue: {{ selectValue }}</p>
      </fieldset>
    </form>
  </div>
</template>

<script>

  import Vue from 'vue';

  /**
   * 注册有名组件
   * props 传入的参数
   * template 自定义标签结构
   */
  Vue.component('toItem', {
    props: ['p'],
    template: '<li>{{ p.name }}</li>'
  })

  /**
   * 注册无名组建
   * 类似react的用法 美滋滋
   * 也可有名
   * const Hello = Vue.extend({})
   * export default Hello;
   */
  export default Vue.extend({
    data()
    {
      return {
        persons: [{ name: 'apple' }, { name: 'tangerine' }],
        // classObj: { 'hello': !0, 'hi': !1 }
        textIpt: 'textIpt-default',
        isCheckedCheckBox: !0,
        ckBoxNames: [],
        sex: '',
        selectValue: ''
      }
    },
    computed: {
      classObj(){
        return {
          'hello': this.persons.length == 2,
          'hi': this.persons.length != 2
        }
      }
    },
    methods: {
      reverseP(e)
      {
        this.persons.reverse();
      }
    }
  })

</script>

<style scoped>
  
</style>