<template>
	<div class="nav-wrapper">
		<h2>{{ nav.tit }}</h2>
		<ul class="navItems">
			<li class="item" v-for="(item, index) in navs">{{ index }}-{{ item }}</li>
		</ul>
	</div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
	data()
	{
		return {
			navs: [ 'first', 'second', 'third' ],
			nav: { tit: 'test' }
		}
	},
	watch: {
		'nav': {
			handler(nav) {
				if (nav) {
					console.log('change obj');
				}
			}
		},
		'nav.tit': {
			handler(tit) {
				if(tit) {
					console.log('change obj attr');
				}
			}
		}
	},
	methods: {
		changeNav() {
			setTimeout(() => {
				// this.nav = { tit: 'test23333' };
				this.nav.tit = 'test23333';

				/**
				 * 修改对象 触发watch 对象 和 watch obj-attr
				 * 修改attr 触发只触发watch obj-attr
				 */
			}, 2000);
		}
	},
	mounted() {
		this.changeNav();
	}
});
</script>

<style
	   scoped>
.nav-wrapper
{
	float: left;
}
</style>