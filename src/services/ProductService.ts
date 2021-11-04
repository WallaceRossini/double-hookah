import { getCustomRepository, Repository } from "typeorm";
import { ProductDto } from "../dtos/ProductDto";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { ProductCreateIFC, ProductID, ProductIFC, ProductUpdateIFC } from "../interfaces/ProductIFC";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { S3StorageService } from "./S3StorageService";

export interface UpdateIFC {
  image?: string;
  name?: string;
  category: Category;
  price?: string;
  detail?: string;
  weight?: string;
  brand?: string;
}


export class ProductService {

  private product_service: Repository<Product>
  private category_service: Repository<Category>

  constructor() {
    this.product_service = getCustomRepository(ProductRepository)
    this.category_service = getCustomRepository(CategoryRepository)
  }

  async index(skip: number, take: number): Promise<ProductDto[]> {

    const products = await this.product_service.find({ skip, take, relations: ['category'], order: { name: 'ASC' } });

    const all: ProductDto[] = [];

    products.forEach(item => all.push(new ProductDto(item)));

    return all;

  }

  async show({ id }: ProductID): Promise<ProductDto | Error> {

    const exist_product = await this.product_service.findOne(id, { relations: ['category'] });

    if (!exist_product)
      return new Error('Product does not exists')

    const product = new ProductDto(exist_product);

    return product;

  }

  async create({ name, price, category, brand, detail, image, weight }: ProductCreateIFC) {

    const exist_category = await this.category_service.findOne({ id: category })

    if (!exist_category)
      throw new Error('Category does not exists')

    const product = this.product_service.create({
      name,
      price,
      category: exist_category,
      brand,
      detail,
      image,
      weight
    });

    await this.product_service.save(product);

    const result = new ProductDto(product)

    return result;

  }

  async update(id: string, request: ProductUpdateIFC, category_id?: string) {

    const exist_product = await this.product_service.findOne(id, { relations: ['category'] });

    if (!exist_product)
      return new Error('Product does not exists');

    if (category_id) {
      const exist_category = await this.category_service.findOne({ id: category_id })

      if (!exist_category)
        return new Error('Category does not exists');

      exist_product.category = exist_category
    }

    let result = Object.assign(exist_product, request)

    await this.product_service.save(result)

    const product = await this.product_service.findOne(id, { relations: ['category'] });

    const object = new ProductDto(product)

    return object;


  }

  async delete({ id }: ProductID) {

    const exist_product = await this.product_service.findOne(id, { relations: ['category'] });

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