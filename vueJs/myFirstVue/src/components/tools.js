const tools = {
	show() {
		console.log('show');
	}
};

export function show2() {
	console.log('show2');
}

const { show } = tools;
export { show };