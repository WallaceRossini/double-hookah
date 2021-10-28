import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity('products')
export class Product extends BaseEntity {

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.00 })
  price: number;

  @Column()
  detail: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0.0 })
  stars: number;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column({default: '50g', nullable: true })
  weight: string;

  @Column({ nullable: true })
  brand: string;

}