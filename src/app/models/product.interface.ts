export interface ProductInterface {
  id: number;
  type: string;
  name: string;
  image?: string;
  price: number;
  ingredients?: string[];
  basketCount: number;
}
