import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import multer_config from "../configs/Multer";
import multer from "multer";

const routes = Router();

const product_ctrl = new ProductController();
const uploads = multer(multer_config)

routes.get('/products', product_ctrl.index);
routes.get('/products/:id', product_ctrl.show);
routes.post('/products', uploads.single('image'), product_ctrl.create);
routes.patch('/products/:id', uploads.single('image'), product_ctrl.update);
routes.delete('/products/:id', product_ctrl.delete);

export { routes }
