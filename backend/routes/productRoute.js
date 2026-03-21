import e from "express";

import {listProduct, addProduct, removeProduct, singleProduct} from '../controllers/productController.js'


const productRouter = e.Router();

productRouter.get('/list', listProduct);
productRouter.post('/add', addProduct);
productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);