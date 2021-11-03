import { getCustomRepository, Repository } from "typeorm";
import { ProductDto } from "../dtos/ProductDto";
import { Product } from "../entities/Product";
import { ProductCreateIFC, ProductID, ProductUpdateIFC } from "../interfaces/ProductIFC";
import { ProductRepository } from "../repositories/ProductRepository";
import { S3StorageService } from "./S3StorageService";

export class ProductService {

  private product_service: Repository<Product>

  constructor() {
    this.product_service = getCustomRepository(ProductRepository)
  }

  async index(): Promise<ProductDto[]> {

    const products = await this.product_service.find();

    const all: ProductDto[] = [];

    products.forEach(item => all.push(new ProductDto(item)));

    return all;

  }

  async show({ id }: ProductID): Promise<ProductDto | Error> {

    const exist_product = await this.product_service.findOne(id);

    if (!exist_product)
      return new Error('Product does not exists')

    const product = new ProductDto(exist_product);

    return product;

  }

  async create({ name, price, category, brand, detail, image, weight }: ProductCreateIFC) {

    const product = this.product_service.create({
      name,
      price,
      category,
      brand,
      detail,
      image,
      weight
    });

    await this.product_service.save(product);

    const result = new ProductDto(product)

    return result;

  }

  async update(id: string, product: any) {

    const exist_product: any = await this.product_service.findOne(id);

    if (!exist_product)
      return new Error('Product does not exists');

    for (let property in exist_product) {
      if (product[property] !== undefined) {

        if (exist_product[property] !== product[property]) {
          exist_product[property] = product[property]
        }
      }
    }

    await this.product_service.save(exist_product)

    const object = new ProductDto(exist_product)

    return object;


  }

  async delete({ id }: ProductID) {

    const exist_product = await this.product_service.findOne(id);

    if (!exist_product)
      return new Error('Product does not exists')

    const s3_storage_service = new S3StorageService();

    const filename = exist_product.image.substring(exist_product.image.indexOf(".com/") + 5)

    await s3_storage_service.delete(filename)

    await this.product_service.remove(exist_product)

    const product = new ProductDto(exist_product);

    return product;

  }

}