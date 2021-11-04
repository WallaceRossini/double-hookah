import { CategoryIFC } from "../interfaces/CategoryIFC";


export class CategoryDto {
  public id: string;
  public key: string;
  public title: string;


  constructor({ id, key, title }: CategoryIFC) {
    this.id = id
    this.key = key;
    this.title = title
  }
}