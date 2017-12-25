<template>
	<div>
		<h2>emit</h2>
		<p>{{ total }}</p>
		<Couter :total="total" :btnName="btnName" @ck-mg="receive"></Couter>
		<p>{{ value }}</p>
		<!-- <Iptbox :value="value" v-model="value"></Iptbox> -->
		<!-- 上下两种写法相等 -->
		<ipt-box :value="value" @input="receiveValue" @search="search"></ipt-box>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { show, show2 } from './tools.js';

	show();
	show2();

	const Couter = Vue.extend({
		template: '<div><button @click="sendMessage">{{ cBtnName }}</button></div>',
		props: ['btnName'],
		data() {
			return {
				clickTag: true
			}
		},
		computed: {
			cBtnName() {
				return this.clickTag ? this.btnName : 'Added';
			}
		},
		methods: {
			sendMessage(e) {
				this.clickTag = !this.clickTag;
				this.$emit('ck-mg', 'add');
			}
		}
	});

	const IptBox = Vue.extend({
		template: '<div><input type="text" :value="value" @input="handleInput" @keyup.enter="handleSearch"></input></div>',
		props: ['value'],
		methods: {
			handleInput(e) {
				this.$emit('input', e.currentTarget.value);
			},
			handleSearch(e) {
				this.$emit('search', e.currentTarget.value);
			}
		}
	});

	export default Vue.extend({
		data() {
			return {
				total: 0,
				btnName: 'ADD',
				value:'2222',
				number: 33
			}
		},
		methods: {
			receive(msg) {
				console.log(msg);
				this.total += 1;
			},
			receiveValue(value) {
				this.value = value;
			},
			search(value) {
				alert(value)
			}
		},
		components: {
			Couter,
			IptBox
		}
	})
</script>

<style scoped>
	
</style>