import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "src/environments/environment";
import { ProductInterface } from "../models/product.interface";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  constructor(private http: HttpClient) {
    this.getAll();
  }
  addProduct(product: any) {
    return this.http.post(`${baseUrl}basket`, product);
  }
  getAll() {
    return this.http.get<ProductInterface[]>(`${baseUrl}basket`);
  }
  updateProduct(product: ProductInterface) {
    return this.http.put<ProductInterface>(
      `${baseUrl}basket/${product.id}`,
      product
    );
  }
  deleteProduct(id: number) {
    return this.http.delete<ProductInterface>(`${baseUrl}basket/${id}`);
  }
}
