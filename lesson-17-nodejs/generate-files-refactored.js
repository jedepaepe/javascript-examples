let fs = require('fs');

if (process.argv.length < 5) {
    console.log('vous devez fournir 3 noms de fichiers, par exemple');
    console.log('\tnode generate-files.js products.csv file1.csv file2.csv');
    process.exit(-1);
}

let productArray = fs.readFileSync(process.argv[2], 'utf-8').split('\r\n');

fs.writeFileSync(
    process.argv[3], 
    getFournitureArray(productArray).join('\r\n'),
    'utf-8');

fs.writeFileSync(
    process.argv[4],
    getPapeterieArray.join('\r\n'),
    'utf-8');

function getFournitureArray(productArray) {
    return productArray.filter(l => ! l.startsWith('Z'));
}

function getPapeterieArray(productArray) {
    return productArray.filter(l => ! l.startsWith('A') && ! l.startsWith('C'));
}