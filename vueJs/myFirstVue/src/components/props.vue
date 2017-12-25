<template>
	<div>
		<h2>Props Explore</h2>
		<div>
			<p>我是父级的数据: {{ childProps }}</p>
			<p style="color: red;">我是父级的Obj数据: {{ childObjProps.name }}</p>
			<p style="color: red;">我是父级的Obj-sex数据: {{ (childObjProps.sex && childObjProps.sex.id) || 'null' }}</p>
			<child-component :words="childProps" :objWords="childObjProps"></child-component>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	const ChildComponent = Vue.extend({
		template: '<div><p>我是子组件中的数据: {{ words }}</p><p style="color: red;">我是子组件中的Obj数据: {{ objWords.name }}</p></div>',
		props: [ 'words', 'objWords' ],
		methods: {
			changeProps() {
				setTimeout(() => {
					this.words = 'newApple';
					/**
					 * 不能直接修改
					 */
				}, 1000)
			},
			changeObjProps() {
				setTimeout(() => {
					this.objWords.name = 'newApple';
					/**
					 * 不能使用this.objWords = { name: 'newApple' }
					 */
				}, 1000)
			}
		},
		mounted() {
			// this.changeProps();
			this.changeObjProps();
		}
	})

	export default {
		data() {
			return {
				childProps : 'apple',
				childObjProps: { name: 'apple' }
			}
		},
		methods: {
			changeChildProps() {
				setTimeout(() => {
					this.childProps = 'tangerine';
				}, 2000)
			},
			changeChildObjProps() {
				setTimeout(() => {
					this.childObjProps.name = 'tangerine';
					this.childObjProps.sex = { id: 'man' };
					/**
					 * this.childObjProps = { name: 'tangerine' }; 可以使用
					 */
				}, 2000)
			}
		},
		mounted() {
			// this.changeChildProps();
			this.changeChildObjProps();
		},
		components: { ChildComponent }
	}

	/**
	 * summary: 子组件中不能直接修改props的值 是对象也不行
	 * 当props为对象时 可以修改属性值且数据双向改变( 父组件中的值跟随改变 )

	 * 父级可随意修改props值 且子组件跟随改变
	 */
</script>