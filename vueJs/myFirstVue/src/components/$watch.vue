<template>
	<h2>{{ watchTit }}</h2>
</template>

<script>
	export default {
	  data() {
	      return {
	        watchTit: 'watchTit'
	      };
	    },
	    mounted() {
	      const vm = this;
	      console.log(vm);
	      vm.initWatcher();
	      vm.changeTit();
	    },
	    methods: {
	      initWatcher() {
	        const vm = this;

	        vm.$watch('watchTit', (newTit) => {
	            console.log(newTit);
            });
	      },
	      changeTit() {
	        setTimeout(() => {
	          this.watchTit = 'watchTit222';
	        }, 2000);
	      }
	    }
	}
</script>

<style></style>
