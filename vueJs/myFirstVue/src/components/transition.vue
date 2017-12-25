<template>
	<div>
		<button @click="visibilityCon">{{ status }}</button>
		<transition
		  v-on:before-enter="beforeEnter"
		  v-on:enter="enter"
		  v-on:after-enter="afterEnter"
		>
			<p v-show="show" class="info">
				{{ content }}
				<br>
				{{ content }}
			</p>
		</transition>
		<transition
		    name="move"
		>
			<p v-show="show" class="info">
				{{ content }}
				<br>
				{{ content }}
			</p>
		</transition>
	</div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
	data()
	{
		return { content: 'this is a sad story;', show: true }
	},
	computed:
	{
		status()
		{
			return this.show ? 'hide' : 'show';
		}
	},
	methods:
	{
		visibilityCon()
		{
			this.show = !this.show;
		},
		beforeEnter(el)
		{
			el.style.transition='none';
			el.style.height='0px';
			el.style.maxHeight='0px';
		},
		enter(el)
		{
			el.style.transition='max-height 1s ease';
			setTimeout(() =>
				{
					el.style.height='auto';
					el.style.maxHeight='600px';
				}, 0)
		},
		afterEnter(el)
		{
			el.style.transition='none';
		}
	}
})
</script>

<style scoped>
.info
{
	overflow: hidden;
}

/**
 * 切记 这些class是在过程中添加和删除 最终显示为去除这些class!!!!!!!
 * show  元素插入 move-enter -> 移除 move-enter -> 增加class move-enter-active move-enter-to
 * hide  增加class move-leave-active move-leave-to
 **/
/* .move-enter {
 	height: 0;
 }
 .move-enter-active {
 	transition: height 1s ease;
 }
 .move-enter-to {
 	height: 32px;
 }

 .move-leave {
 	height: 32px;
 }
 .move-leave-active {
 	transition: height .8s ease;
 }
 .move-leave-to {
 	height: 0;
 }*/

.move-enter {
	transform: scale(.5);
	opacity: 0;
}
.move-enter-active {
	transition: all 1s ease;
}
.move-enter-to {
	transform: scale(1.5);
	opacity: 1;
}

.move-leave {
	transform: scale(1.5);
	opacity: 1;
}
.move-leave-active {
	transition: all .8s ease;
}
.move-leave-to {
	transform: scale(.5);
	opacity: 0;
}

</style>