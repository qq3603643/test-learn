<template>
	<div>
		<children>
			<span> ---i am tangerine--- </span>
			<span slot="first"> ---i am setting first--- </span>
			<span> ---i am apple--- </span>
			<span slot="first"> ---i am setting first two--- </span>
		</children>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default Vue.extend({
		components: {
			children: {
				template: `<p> i am children
				             <slot name="first"><span> ---i am default first--- </span></slot>
				             <slot name="second"><span> ---i am default second--- </span></slot>
							 <slot></slot>
				           </p>`
			}
		}
	})
</script>