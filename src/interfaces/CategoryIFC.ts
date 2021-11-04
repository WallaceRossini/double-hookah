

export interface CategoryIFC {
  id: string;
  key: string;
  title: string;
}

export interface CategoryCreateIFC {
  key: string;
  title: string;
}

export interface CategoryUpdateIFC {
  key?: string;
  title?: string;
}