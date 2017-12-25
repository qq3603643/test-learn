<template>
	<div>
		<h2>{{ tit }}</h2>
		<my-header>
			<p slot="class">class</p>
			<p slot="href">href</p>
			<p slot="content">hello word</p>
		</my-header>
		<update-v :visible.sync="visibleSync.visible"></update-v>
	</div>
</template>

<script>
import Vue from 'vue';
import updateV from './updateVisible';

const myHeader2 = Vue.extend({
	props: {
		level: {
			type: Number,
			required: true,
			default() {
				return 1;
			}
		}
	},
	render(h) {
		return h(`h${this.level}`, {}, this.$slots.default);
	}
});

/**
 * render(creatElement)
 * createElement(tagName, attr, content)
 */
Vue.component('myHeader', {
	data()
	{
		return {
			description: 'test'
		}
	},
	methods: {
		getNodeText(nodes)
		{
			const _get = (node) =>
			{
				if(!node.children || !node.children.length)
					return node.text || '';

				return node.children.reduce((res, child) =>
				{
					return res + _get(child);
				}, node.text || '');
			}

			return [].reduce.call(nodes, (res, node) =>
			{
				return res + _get(node);
			}, new String);
		},
		getAllSlotText()
		{
			return Object.keys(this.$slots).reduce((res, key) =>
			{
				return res + this.getNodeText(this.$slots[key]);
			}, new String)
		},
		trim(str)
		{
			return str.replace(/^\s\s*/, '').replace(/\s*\s$/, '');
		}
	},
	render(createElement)
	{
		return createElement(
			'div',
			{},
			[
				createElement('a',
					{
						class: { [this.getNodeText(this.$slots.class)]: true },
						attrs: { href: this.getNodeText(this.$slots.href) }
					},
					this.getNodeText(this.$slots.content)),
				this.description
			]
			)
	}
})

export default Vue.extend({
	data()
	{
		return {
			tit: 'renderFunction',
			visibleSync: {
				visible: true
			}
		}
	},
	components: {
		updateV
	}
})
</script>