import { Request, Response } from "express";
import { ProductCreateIFC, ProductImageIFC } from "../interfaces/ProductIFC";
import { ProductService } from "../services/ProductService";
import { S3StorageService } from "../services/S3StorageService";

export class ProductController {

  async create(request: Request, response: Response) {

    const image: any = request.file
    const product: ProductCreateIFC = request.body;

    const product_service = new ProductService();

    const s3_storage_service = new S3StorageService();

    const url = await s3_storage_service.execute(image)

    const result = await product_service.create({ ...product, image: url })

    return response.status(201).json({ result })

  }
}