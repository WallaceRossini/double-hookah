import { getCustomRepository, Repository } from "typeorm";
import { CategoryDto } from "../dtos/CategoryDto";
import { Category } from "../entities/Category";
import { CategoryCreateIFC, CategoryIFC, CategoryUpdateIFC } from "../interfaces/CategoryIFC";
import { CategoryRepository } from "../repositories/CategoryRepository";

type CategoryID = {
  id: string
}

export class CategoryService {

  private category_service: Repository<Category>

  constructor() {
    this.category_service = getCustomRepository(CategoryRepository)
  }


  async index(): Promise<CategoryDto[]> {

    const categories = await this.category_service.find();

    const all: CategoryDto[] = [];

    categories.forEach(item => all.push(new CategoryDto(item)))

    return all;

  }

  async show({ id }: CategoryID): Promise<CategoryDto | Error> {

    const exist_category = await this.category_service.findOne(id);

    if (!exist_category)
      throw new Error('Category does not exists')

    const category = new CategoryDto(exist_category);

    return category;

  }

  async create({ key, title }: CategoryCreateIFC) {

    key = key.toUpperCase()

    const exist_category = await this.category_service.findOne({ key })

    if (exist_category)
      throw new Error('Category already exists');

    const obj = this.category_service.create({ key, title })

    const result = await this.category_service.save(obj);

    const category = new CategoryDto(result);

    return category;

  }

  async update(id: string, category: CategoryUpdateIFC) {

    const exist_category = await this.category_service.findOne(id);

    if (!exist_category)
      throw new Error('Category does not exists')

    const result = Object.assign(exist_category, category)

    await this.category_service.save(result);

    const obj = new CategoryDto(result);
    
    return obj

  }

  async delete({ id }: CategoryID): Promise<CategoryDto | Error> {

    const exist_category = await this.category_service.findOne(id);

    if (!exist_category)
      throw new Error('Category does not exists')

    await this.category_service.remove(exist_category);

    const category = new CategoryDto(exist_category);

    return category;

  }


}