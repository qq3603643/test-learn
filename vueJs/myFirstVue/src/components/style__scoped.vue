<template>
	<section>
		<styleChild-scoped></styleChild-scoped>
		<span class="span">
			parent
		</span>
	</section>
</template>
<script>
	import Vue from 'vue';
	import styleChildScoped from './styleChild__scoped';

	export default {
		data() {
			return {}
		},
		mounted() {},
		components: {
		  styleChildScoped
		}
	}

	/**
	 * 当style加上scoped时 解析为css是会加上 .span[v-data-mark] {}
	                       解析为html时       <span v-data-mark></span>
     * 使其对应
     * 子组件会继承父组件的 v-data-mark
     * <span v-data-parentMark v-data-selfMark></span>
     */
</script>
<style scoped>
	.span {
		color: red;
	}
</style>