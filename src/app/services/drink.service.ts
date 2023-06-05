import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { ProductInterface } from "../models/drink.interface";
import { baseUrl } from "src/environments/environment";
import { ProductInterface } from "../models/product.interface";

@Injectable({
  providedIn: "root",
})
export class DrinkService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ProductInterface[]>(`${baseUrl}drink`);
  }
  getOne(id: number) {
    return this.http.get<ProductInterface>(`${baseUrl}drink/${id}`);
  }
  create(drink: ProductInterface) {
    return this.http.post<ProductInterface>(`${baseUrl}drink`, drink);
  }
  delete(id: number) {
    return this.http.delete<ProductInterface>(`${baseUrl}burger/${id}`);
  }
  update(drinkId: number, drink: ProductInterface) {
    return this.http.put<ProductInterface>(`${baseUrl}drink/${drinkId}`, drink);
  }
}
