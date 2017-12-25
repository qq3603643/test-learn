<template>
	<div class="wrapper">
		<h2>some try about Vuex</h2>
		<p :style="cssObj">{{ count }}</p>
		<button @click="addOne">+</button>
		<br/>
		<input type="text" name="" placeholder="input number" v-model="inpNumber" />
		<button @click="setValue">set</button>
	</div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default Vue.extend(
{
	data()
	{
		return {
			cssObj: { display: 'inline-block', padding: '6px 10px' },
			defaultNumber: 0
		}
	},
	/**
	 ** 使用 $state 获取store数据 （ 切记后面接modules( store中自定 )中自定的属性名 ）
	 */
	// computed:{
	// 	count()
	// 	{
	// 		return this.$store.state.Count.count
	// 	}
	// },

	/**
	 ** 使用自带函数mapState获取store数据 （ 同样的后面接modules中自定的属性名 ）
	 */
	// computed:
	// {
	// 	...mapState({
	// 		count: state => state.Count.count
	// 	})
	// },
	// computed: {
	// 	...mapState('Count', [ 'count' ])
	// },

	/**
	 ** 使用getters获取store中的数据 ( getters中各个modules合并，getters需自定义 )
	 */
	// computed: {
	// 	count()
	// 	{
	// 		console.log(this.$store.getters);
	// 		return this.$store.getters.COUNT_GET
	// 	}
	// },

	/**
	 ** 使用mapGetters获取store中的数据
	 ** 建议总是使用mapGetters({ newKey: oldGetterKey })
	 */
	// computed: {
	//  ...mapGetters('Count', {
	//  	count: 'COUNT_GET'
	//  })
	// },
	computed: {
		...mapState('Count', [ 'count' ]),
		inpNumber: {
			get(){ return this.defaultNumber },
			set(newValue){ this.defaultNumber = newValue.replace(/[^\d]+/g, '') }
		}
	},
	methods:
	{
		...mapActions('Count', {
			addOne: '_ADD_COUNT',
			setSome: '_SET_COUNT'
		}),
		setValue()
		{
			this.setSome({ count: this.inpNumber })
		}
	}
})
</script>

<style scoped="">
	
</style>