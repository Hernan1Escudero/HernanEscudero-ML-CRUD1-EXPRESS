const fs = require('fs');
const path = require('path');
const Product = require('../data/Producto');
const {readJSON,writeJSON} = require("../data/read_modify");
const { log } = require('console');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let all_products = readJSON("productsDataBase.json")
		res.render("products",{productos: all_products})
	},

	detail: (req, res) => {
		let id = parseInt(req.params.id)
		let producto_seleccionado = products.find( product => product.id == id)
		res.render("detail",{productDetail:producto_seleccionado})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		
		const newProduct = new Product(req.body)
		 newProduct.image = req.file.originalname
        const todos_los_Productos = readJSON("productsDataBase.json")
		todos_los_Productos.push(newProduct)
		writeJSON(todos_los_Productos,"productsDataBase.json")
		
        return res.send(req.file)

		//res.send("producto creado")
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = parseInt(req.params.id)
		let producto_seleccionado = products.find( product => product.id == id)
		res.render("product-edit-form",{productToEdit:producto_seleccionado})
	},
	// Update - Method to update
	update: (req, res) => {

	   const modified = products.map( producto =>{
                //console.log( producto.id == req.params.id)
			if (producto.id == req.params.id){
				
				producto.name =  req.body.name
				producto.price = req.body.price
				producto.discount = req.body.discount
                producto.description = req.body.description
				producto.category = req.body.category ? req.body.category : "none"
				//producto.image = req.file.originalname ? req.file.originalname : "none.jpg"
			}
			return producto
		})

		 console.log(modified)
		 writeJSON(modified,"productsDataBase.json")
		/*fs.writeFileSync(productsFilePath, JSON.stringify(modified, null, 3), 'utf8');
		return res.redirect('/products'); */

		 //console.log(modified)
		res.redirect("/products")

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		const productsModify = products.filter(product => product.id != req.params.id);
		fs.writeFileSync(productsFilePath, JSON.stringify(productsModify, null, 3), 'utf8');
		return res.redirect('/products');

	}
};

module.exports = controller;