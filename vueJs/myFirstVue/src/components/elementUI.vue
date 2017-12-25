<template>
	<div>
		<h2>{{ title }}</h2>
		<el-row>
			<el-col :span="24">
				<div class="gray"></div>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="8">
				<div class="gray borderRadius"></div>
			</el-col>
			<el-col :span="8" :offset="2">
				<div class="gray borderRadius"></div>
			</el-col>
		</el-row>

		<el-row>
			<el-col>
				<div>
					<i class="el-icon-edit"></i>
					<el-button type="primary" icon="search">搜索</el-button>
				</div>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="8">
				默认显示颜色
			</el-col>
			<el-col :span="8" :offset="8">
				<el-button type="success">Success</el-button>
				<el-button type="primary">Primary</el-button>
				<el-button type="warning">Warning</el-button>
				<el-button type="danger">Danger</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				hover显示颜色
			</el-col>
			<el-col :span="8" :offset="8">
				<el-button :plain="true" type="success">Success</el-button>
				<el-button :plain="true" type="primary">Primary</el-button>
				<el-button :plain="true" type="warning">Warning</el-button>
				<el-button :plain="true" type="danger">Danger</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				图标按钮
			</el-col>
			<el-col :span="8" :offset="8">
				<el-button type="danger" icon="search" :loading="isSearch" @click="changeSearchStatus">Search</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				按钮组
			</el-col>
			<el-col :span="8" :offset="8">
				<el-button-group>
					<el-button type="primary" icon="arrow-left">prev</el-button>
					<el-button type="primary" icon="arrow-right">next</el-button>
				</el-button-group>
			</el-col>
		</el-row>


		<el-row :gutter="20">
			<el-col :span="8">
				radio-group
			</el-col>
			<el-col :span="16">
				<el-radio-group v-model="radioGroup" @change="radioChange">
					<el-radio label="1">radio1</el-radio>
					<el-radio label="2">radio2</el-radio>
					<el-radio label="3">radio3</el-radio>
				</el-radio-group>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="8">message</el-col>
			<el-col :span="16">
				<el-button :plain="true" type="primary" @click="showMsg('info')">default</el-button>
				<el-button :plain="true" type="success" @click="showMsg('success')">success</el-button>
				<el-button :plain="true" type="warning" @click="showMsg('warning')">warning</el-button>
				<el-button :plain="true" type="error" @click="showMsg('error')">error</el-button>
				<el-button :plain="true" type="info" @click="showMsg('info')">info</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
// import store from '../vuex/store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';



Vue.use(ElementUI);

export default Vue.extend({
	data(){
		return {
			isSearch: !1,
			radioGroup: '1',
			loadInstance: null
		}
	},
	computed: {
		...mapGetters('Ele', { title: 'TIT_GET' })
	},
	mounted()
	{
		// setTimeout(() =>
		// 	{
		// 		this.showLoadingFullScreen();
		// 	}, 1000)
		// setTimeout(() =>
		// 	{
		// 		this.rmLoading();
		// 	}, 2000)
	},
	methods: {
		...mapActions('Ele', { 'setTit': '_SET_TIT' }),
		changeSearchStatus()
		{
			this.isSearch = !this.isSearch;
		},
		radioChange()
		{
			console.log(this.radioGroup)
		},
		showLoadingFullScreen()
		{
			this.loadInstance = this.$loading({ fullscreen: !0 });
		},
		rmLoading()
		{
			this.loadInstance
				&& this.loadInstance.close();
		},
		showMsg(type = 'info')
		{
			const msgs = { success: 'success', warning: 'warning', error: 'error', info: 'info' },
				  msg  = msgs[type];

		   this.$message({ type, message: msg })
		}
	}
})

/**
 * 具有namespace的module用dispatch时在action前面加上自己的命名空间
 */
// setTimeout(() =>
// 	{
// 		console.log('actions');
// 		store.dispatch('Ele/_SET_TIT', { tit: 'newTit' })
// 	}, 2000)

</script>

<style scoped>
	.el-row
	{
		margin-bottom: 20px;
	}
	.gray
	{
		min-height: 30px;
		background: #ccc;
	}
	.borderRadius
	{
		border-radius: 4px;
	}
</style>


<!--

	####summary
		- el-row 行布局    :gutter 其下col之间的间距   ( 24等份 )
		- el-col 列布局    :span="n" :offset="n" :push="n" pull="n"   ( offset:margin-left push:left )

		- el-button        type="primary / success / warning / danger"  :loadding="boolean"
		- el-button-group
-->