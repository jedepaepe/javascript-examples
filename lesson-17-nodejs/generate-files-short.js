let fs = require('fs');

if (process.argv.length < 5) {
    console.log('vous devez fournir 3 noms de fichiers, par exemple');
    console.log('\tnode generate-files.js products.csv file1.csv file2.csv');
    process.exit(-1);
}

// lit
let productArray = fs.readFileSync(process.argv[2], 'utf-8').split('\r\n');

// écrit le fichier 1
fs.writeFileSync(
    process.argv[3], 
    productArray.filter(l => ! l.startsWith('Z')).join('\r\n'),
    'utf-8');

// écrit le fichier 2
fs.writeFileSync(
    process.argv[4],
    productArray.filter(l => ! l.startsWith('A') && ! l.startsWith('C')).join('\r\n'),
    'utf-8');