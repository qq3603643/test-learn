<template>
  <div id="app">
    <header>{{ title }}</header>
    <NavMine></NavMine>
    <br/>
    <br/>
    <br/>
    <h4>this is router link</h4>
    <router-link to='/hello'>link to hello</router-link>
    <router-link to='/hi'>link to hi</router-link>
    <router-link to='/vuexTest'>link to vuexTest</router-link>
    <UpdateV :visible.sync="visible"></UpdateV>

    <router-view></router-view>
  </div>
</template>

<script>

import Vue from 'vue';
import Nav from './components/nav';
import UpdateV from './components/updateVisible';

export default Vue.extend({
  name: 'App',
  data()
  {
    return { title: 'this is my first vueApp', visible: true }
  },
  methods: {
  },
  components: {
    NavMine: Nav,
    UpdateV
  }
})

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
