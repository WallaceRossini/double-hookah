import { ProductIFC } from '../interfaces/ProductIFC'
import { CategoryDto } from './CategoryDto';
export class ProductDto {

  public id: string;
  public name: string;
  public price: number;
  public detail: string;
  public category: CategoryDto;
  public image: string;
  public weight: string;
  public brand: string;

  constructor({ id, name, price, detail, category, image, weight, brand }: ProductIFC) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.detail = detail;
    this.category = new CategoryDto(category);
    this.image = image;
    this.weight = weight;
    this.brand = brand;
  }
}