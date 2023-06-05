import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { PizzaInterface } from "../models/pizza.interface";
import { baseUrl } from "src/environments/environment";
import { ProductInterface } from "../models/product.interface";

@Injectable({
  providedIn: "root",
})
export class PizzaService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ProductInterface[]>(`${baseUrl}pizza`);
  }
  getOne(id: number) {
    return this.http.get<ProductInterface>(`${baseUrl}pizza/${id}`);
  }
  create(pizza: ProductInterface) {
    return this.http.post<ProductInterface>(`${baseUrl}pizza`, pizza);
  }
  delete(id: number) {
    return this.http.delete<ProductInterface>(`${baseUrl}burger/${id}`);
  }
  update(pizzaId: number, pizza: ProductInterface) {
    return this.http.put<ProductInterface>(`${baseUrl}pizza/${pizzaId}`, pizza);
  }
}
