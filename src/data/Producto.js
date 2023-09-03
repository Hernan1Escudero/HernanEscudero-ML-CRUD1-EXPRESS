const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const Product = function ({name,price,description,category,image,discount}) {
    this.id = products.length + 1;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.category=category;
    this.discount = discount

}
module.exports = Product