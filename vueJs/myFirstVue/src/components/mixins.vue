<template>
	<section>
			<h2>{{ title }}</h2>
	</section>
</template>

<script>
  import Vue from 'vue';

  const Mixin = Vue.extend({
  	props: {},
  	data() {
  	  return {
  	  	title: 'mixins__demo'
  	  };
  	},
  	created() {
      this.title = 'mixins__demo__changedBymix';
  	},
  	mounted() {}
  });

  export default {
  	mixins: [Mixin],
  	props: {
	 name: String
  	},
  	data() {
  	  return {};
  	},
    created() {
	  this.title = 'mixins__demo__changedByComponent'
    },
    mounted() {
      console.log(this.name);
    }
  }
  /**
   * ## summary ##
   * 钩子函数中 mix 先执行于 component
   */
</script>

<style>
</style>