import { Request, Response } from "express";
import { ProductImageIFC, ProductRequestIFC, ProductUpdateIFC } from "../interfaces/ProductIFC";
import { ProductService } from "../services/ProductService";
import { S3StorageService } from "../services/S3StorageService";

export class ProductController {


  async index(request: Request, response: Response) {

    const product_service = new ProductService();

    const result = await product_service.index();

    return response.status(200).json(result);
  }

  async show(request: Request, response: Response) {

    const { id } = request.params;

    const product_service = new ProductService();

    const result = await product_service.show({ id })

    return response.status(200).json(result)
  }

  async create(request: Request, response: Response) {

    const image: any = request.file
    const product: ProductRequestIFC = request.body;

    const product_service = new ProductService();

    const s3_storage_service = new S3StorageService();

    const url = await s3_storage_service.execute(image)

    const result = await product_service.create({ ...product, image: url })

    return response.status(201).json(result)

  }

  async update(request: Request, response: Response) {

    const image: any = request.file
    const product: ProductUpdateIFC = request.body;
    const { id } = request.params

    const product_service = new ProductService();

    let obj = product;

    if (image) {
      const s3_storage_service = new S3StorageService();

      const url = await s3_storage_service.execute(image);

      const result = await product_service.show({ id })

      if (result instanceof Error)
        throw new Error(result.message)

      const filename = result.image.substring(result.image.indexOf(".com/") + 5)

      await s3_storage_service.delete(filename)

      obj.image = url;
    }

    const result = await product_service.update(id, { ...obj })

    return response.status(201).json(result)

  }

  async delete(request: Request, response: Response) {

    const { id } = request.params;

    const product_service = new ProductService();

    const result = await product_service.delete({ id })

    return response.status(200).json(result)
  }
}