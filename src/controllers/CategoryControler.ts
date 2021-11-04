import { Request, Response } from "express";
import { CategoryCreateIFC, CategoryUpdateIFC } from "../interfaces/CategoryIFC";
import { CategoryService } from "../services/CategoryService";


export class CategoryController {

  async index(request: Request, response: Response) {

    const category_service = new CategoryService();

    const result = await category_service.index()

    return response.status(200).json(result);

  }

  async show(request: Request, response: Response) {

    const { id } = request.params;

    const category_service = new CategoryService();

    const result = await category_service.show({ id })

    return response.status(200).json(result);

  }

  async create(request: Request, response: Response) {

    const category: CategoryCreateIFC = request.body;

    const category_service = new CategoryService();

    const result = await category_service.create(category)

    if (result instanceof Error)
      throw new Error(result.message)


    return response.status(201).json(result);

  }

  async update(request: Request, response: Response) {

    const { id } = request.params;
    const category: CategoryUpdateIFC = request.body;

    const category_service = new CategoryService();

    const result = await category_service.update(id, category)

    if (result instanceof Error)
      throw new Error(result.message)

    return response.status(200).json(result);

  }

  async delete(request: Request, response: Response) {

    const { id } = request.params;

    const category_service = new CategoryService();

    const result = await category_service.delete({ id })

    if (result instanceof Error)
      throw new Error(result.message)

    return response.status(200).json(result);

  }
}