/**
 * Crecated by JU-zi on 2016/2/1.
 */
process.stdout.write('hello world');

var a = 100;
console.log(a);

var fs = require('fs');

var data = fs.readFileSync(__dirname + '/js/ajax.js');
    console.log(data.toString());