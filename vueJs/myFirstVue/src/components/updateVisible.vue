<template>
	<section class="updateV"
	    v-show="visible">
		<button class="close" @click="clickHandler">X</button>
		$emit('update:visible')
	</section>
</template>
<script>
	export default {
		props: {
			visible: {
				required: true,
				default() {
					return true;
				}
			}
		},
		data() {
			return {};
		},
		computed: {},
		watch: {},
		mounted() {},
		methods: {
			clickHandler() {
				this.$emit('update:visible', false);
			}
		}
	}
</script>
<style>
	.updateV {
		box-shadow: 0 0 1px rgba(0, 0, 0, .6);
	}
	.close {}
</style>