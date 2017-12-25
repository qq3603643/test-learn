<template>
	<form>
		<fieldset>
			<legend>inputNumber</legend>
			<input type="text" class="input" placeholder="input number" @input="inputHandler" @blur="showVal" :value="val">
		</fieldset>
	</form>
</template>

<script>
	export default {
		data() {
			return { val: '' }
		},
		methods: {
			inputHandler(e) {
				const ipt = e.currentTarget;
				const _val = ipt.value;

				if(_val == this.val)
					return;

				ipt.value = _val.replace(/\D/g, '');
				this.val = ipt.value;
			},
			showVal(e) {
				const ipt = e.currentTarget;
				const _val = ipt.value;

				console.log(_val, this.val);
			}
		},
		watch: {
			'val': {
				handler(val) {
					const _val = document.querySelector('.input').value;
					if(_val != val)
						document.querySelector('.input').value = val;
				}
			}
		},
		mounted() {
			setTimeout(() => {
				this.val = 'test';
				console.log(this.val);
			}, 2000)
		}
	}
</script>

<style>
	
</style>