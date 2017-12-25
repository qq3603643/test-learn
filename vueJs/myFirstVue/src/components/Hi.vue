<template>
	<div>
		<h4>{{ Slogan }}</h4>

		<!-- <router-link to="/hi/apple">link to apple</router-link>
		<router-link to="/hi/tangerine">link to tangerine</router-link> -->

		<span class="btn" @click='toApple'>link to apple</span>
		----
		<span class="btn" @click='toTangerine'>link to tangerine</span>

		<router-view></router-view>

		<div>
			<h5>{{ dataMove.title }}</h5>
			<ul>
				<li v-for="(item, index) in dataMove.subjects">
					{{ item.title }}-{{ item.year }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

import Vue from 'vue';
export default Vue.extend({
	data()
	{
		return {
			Slogan: 'Hi, my name is tangerine',
			dataMove: {
				title: '',
				subjects: []
			}
		}
	},
	methods:
	{
		toApple()
		{
			this.$router.push('/hi/apple')
		},
		toTangerine()
		{
			this.$router.push('/hi/tangerine')
		}
	},
	mounted()
	{
		this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
			header: {},
			emulateJSON: !0
		})
		.then(response =>
		{
			console.log(response.data)
			this.dataMove = Object.assign({}, this.dataMove, response.data)
		})
		.catch(response =>
		{
			console.log(response)
		})
	}
})
</script>

<style scoped>
	.btn
	{
		padding: 6px 10px;
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, .5);
		cursor: pointer;
	}
</style>