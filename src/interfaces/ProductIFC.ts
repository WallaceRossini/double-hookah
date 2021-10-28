export interface ProductIFC {
  name: string;
  price: number;
  detail: string;
  stars: number;
  category: string;
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