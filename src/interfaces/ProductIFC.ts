import { CategoryIFC } from "./CategoryIFC";

export interface ProductID {
  id: string;
}

export interface ProductIFC {
  id?: string;
  name: string;
  price: number;
  detail: string;
  category: CategoryIFC;
  image: string;
  weight: string;
  brand: string;
}


export interface ProductRequestIFC {
  name: string;
  price: number;
  detail: string;
  category: string;
  weight: string;
  brand: string;
}

export interface ProductUpdateIFC {
  image?:string;
  name?: string;
  price?: string;
  detail?: string;
  weight?: string;
  brand?: string;
}

export interface ProductCreateIFC {
  name: string;
  price: number;
  detail: string;
  image: string;
  category: string;
  weight: string;
  brand: string;
}

export interface ProductImageIFC {
  image: any;
}