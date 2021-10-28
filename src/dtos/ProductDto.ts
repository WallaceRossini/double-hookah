import { ProductCreateIFC } from '../interfaces/ProductIFC'
export class ProductDto {

  public name: string;
  public price: number;
  public detail: string;
  public category: string;
  public image: string;
  public weight: string;
  public brand: string;

  constructor({ name, price, detail, category, image, weight, brand }: ProductCreateIFC) {
    this.name = name
    this.price = price
    this.detail = detail
    this.category = category
    this.image = image
    this.weight = weight
    this.brand = brand
  }
}