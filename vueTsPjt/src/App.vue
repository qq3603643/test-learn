<template>
  <div id="app">
    <title-mine
      :title="title"></title-mine>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TitleMine from '@/components/Title.vue';

@Component({
  components: {
    TitleMine
  }
})
export default class App extends Vue {
  title: string = 'typescript';
}
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
