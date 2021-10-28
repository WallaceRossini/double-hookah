import { getCustomRepository, Repository } from "typeorm";
import { ProductDto } from "../dtos/ProductDto";
import { Product } from "../entities/Product";
import { ProductCreateIFC } from "../interfaces/ProductIFC";
import { ProductRepository } from "../repositories/ProductRepository";

export class ProductService {

  private product_service: Repository<Product>

  constructor() {
    this.product_service = getCustomRepository(ProductRepository)
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
}