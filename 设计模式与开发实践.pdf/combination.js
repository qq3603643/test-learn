/**
 * 文件夹与文件
 */

 class Folder {
 	constructor(name) {
 		this.name = name;
 		this.children = [];
 		this.parent = null;
 	}

 	add(child) {
 		this.children.push(child);
 		child.parent = this;
 	}

 	scan() {
 		console.log(`scan Folder: ${this.name}`);
 		this.children.forEach(function(child) {
 			child.scan();
 		});
 	}

 	remove() {
 		if (!this.parent) {
 			throw new Error('No Parent');
 		}

 		const _self = this;
 		if (this.parent && this.parent.children
 			&& this.parent.children.length) {
 			this.parent.children.forEach(function(child, index) {
 				if (child == _self) {
 					console.log(`remove ${_self.name}`);
 					_self.parent.children.splice(index, 1);
 				}
 			});
 		}
 	}
 }

 class File {
 	constructor(name) {
 		this.name = name;
 		this.parent = null;
 	}

 	add() {
 		throw new Error('file cant add child');
 	}

 	scan() {
 		console.log(`scan File: ${this.name}`);
 	}

 	remove() {
 		if (!this.parent) {
 			throw new Error('No Parent');
 		}
 		console.log(`parent: ${this.parent}`);
 		const _self = this;
 		if (this.parent && this.parent.children
 			&& this.parent.children.length) {
 			this.parent.children.forEach(function(child, index) {
 				if (child == _self) {
 					console.log(`remove ${_self.name}`);
 					_self.parent.children.splice(index, 1);
 				}
 			});
 		}
 	}
 }

 const folder__1 = new Folder('folder__1');
 const folder__2 = new Folder('folder__2');
 const file__1 = new File('file__1');
 const file__2 = new File('file__2');

 folder__1.add(folder__2);
 folder__1.add(file__1);
 folder__2.add(file__2);

 folder__1.scan();
 folder__2.remove();

 folder__1.scan();
