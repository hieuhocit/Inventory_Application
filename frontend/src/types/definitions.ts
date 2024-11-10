export interface ICategory {
  id?: string;
  name: string;
  description: string;
  image: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface IItem {
  id?: string;
  category_id?: string;
  categoryId?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ITheme {
  mode: 'light' | 'dark';
}

export interface IStoreState {
  theme: ITheme;
}
