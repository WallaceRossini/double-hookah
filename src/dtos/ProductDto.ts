import { ProductIFC } from '../interfaces/ProductIFC'
export class ProductDto {

  public id: string;
  public name: string;
  public price: number;
  public detail: string;
  public category: string;
  public image: string;
  public weight: string;
  public brand: string;

  constructor({ id, name, price, detail, category, image, weight, brand }: ProductIFC) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.detail = detail;
    this.category = category;
    this.image = image;
    this.weight = weight;
    this.brand = brand;
  }
}