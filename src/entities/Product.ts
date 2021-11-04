import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";

@Entity('products')
export class Product extends BaseEntity {

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.00 })
  price: number;

  @Column()
  detail: string;

  @JoinColumn({name:'category'})
  @ManyToOne(type => Category, category => category.key)
  category: Category;

  @Column()
  image: string;

  @Column({default: '50g', nullable: true })
  weight: string;

  @Column({ nullable: true })
  brand: string;

}