import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "src/environments/environment";
import { ProductInterface } from "../models/product.interface";
// import { ProductInterface } from "../models/burger.interface";

@Injectable({
  providedIn: "root",
})
export class BurgerService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ProductInterface[]>(`${baseUrl}burger`);
  }
  getOne(id: number) {
    return this.http.get<ProductInterface>(`${baseUrl}burger/${id}`);
  }
  create(burger: ProductInterface) {
    return this.http.post<ProductInterface>(`${baseUrl}burger`, burger);
  }
  delete(id: number) {
    return this.http.delete<ProductInterface>(`${baseUrl}burger/${id}`);
  }
  update(burgerId: number, burger: ProductInterface) {
    return this.http.put<ProductInterface>(
      `${baseUrl}burger/${burgerId}`,
      burger
    );
  }
}
