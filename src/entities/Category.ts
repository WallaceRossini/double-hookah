import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";


@Entity('categories')
export class Category extends BaseEntity {

  @Column()
  key:string

  @Column()
  title: string;

}