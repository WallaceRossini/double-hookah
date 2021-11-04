import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import multer_config from "../configs/Multer";
import multer from "multer";
import { CategoryController } from "../controllers/CategoryControler";

const routes = Router();

const product_ctrl = new ProductController();
const category_ctrl = new CategoryController();
const uploads = multer(multer_config)

routes.get('/products', product_ctrl.index);
routes.get('/products/:id', product_ctrl.show);
routes.post('/products', uploads.single('image'), product_ctrl.create);
routes.patch('/products/:id', uploads.single('image'), product_ctrl.update);
routes.delete('/products/:id', product_ctrl.delete);


routes.get('/categories',category_ctrl.index);
routes.get('/categories/:id',category_ctrl.show);
routes.post('/categories',category_ctrl.create);
routes.patch('/categories/:id',category_ctrl.update);
routes.delete('/categories/:id',category_ctrl.delete);

export { routes }
