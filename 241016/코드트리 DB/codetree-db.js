const fs = require('fs'); 
const [_, ...q] = fs.readFileSync('/dev/stdin').toString().split('\n');

let table = []

q.forEach((query) => {
    const [t,n,v] = query.split(" ")

    if (t === "init") {
        table = [];
    } else if (t === "insert") {
        const isExist = table.find(v2 => v2.name === n || v2.value === +v);
        if (isExist) return console.log("0");
        table.push({name: n, value: +v});
        console.log("1");
    } else if (t === "delete") {
        const index = table.findIndex(v => v.name === n);
        if (index === -1) return console.log("0");
        console.log(table[index].value);
        table = table.splice(index, 1);
        
    } else if (t === "rank") {
        if (table.length < n) return console.log("None");
        console.log(table.sort((a,b) => a.value - b.value).at(n - 1).name);
    } else if (t === "sum") {
        const rows = table.filter(v => v.value <= n);
        if (rows.length === 0) return console.log("0");
        console.log(rows.reduce((a,b) => a+b.value, 0));
    }
});