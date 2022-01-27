// version longue
let fs = require('fs');

if (process.argv.length < 5) {
    console.log('vous devez fournir 3 noms de fichiers, par exemple');
    console.log('\tnode generate-files.js products.csv file1.csv file2.csv');
    process.exit(-1);
}

// récupère les arguments de la ligne de commande
let productFilename = process.argv[2];
let file1Name = process.argv[3];
let file2Name = process.argv[4];

// lit le fichier
let text = fs.readFileSync(productFilename, 'utf-8');

// crée un array de lines, contenant l'entête et tous les produits
let productArray = text.split('\r\n');
// crée un array de lines avec les meubles et contenant l'entête
let furnitureArray = productArray.filter(l => ! l.startsWith('Z'));
// crée un text à partir du tableau
let furnitureText = furnitureArray.join('\r\n');
// écrit le fichier
fs.writeFileSync(file1Name, furnitureText, 'utf-8');

// idem mais pour la papeterie
let papeterieArray = productArray.filter(l => ! l.startsWith('A') && ! l.startsWith('C'));
let papeterieText = papeterieArray.join('\r\n');
fs.writeFileSync(file2Name, papeterieText, 'utf-8');

