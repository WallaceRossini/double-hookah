import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import multer_config from "../configs/Multer";
import multer from "multer";

const routes = Router();

const product_ctrl = new ProductController();
const uploads = multer(multer_config)

routes.post('/products', uploads.single('image'), product_ctrl.create);

export { routes }
