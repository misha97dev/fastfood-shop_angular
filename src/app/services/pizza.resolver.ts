import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { EMPTY, Observable, catchError, of } from "rxjs";
// import { PizzaInterface } from "../models/pizza.interface";
import { PizzaService } from "./pizza.service";
import { ProductInterface } from "../models/product.interface";

@Injectable({
  providedIn: "root",
})
export class PizzaResolver implements Resolve<ProductInterface> {
  constructor(private pizzaService: PizzaService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductInterface> {
    return this.pizzaService.getOne(route.params?.["id"]).pipe(
      catchError(() => {
        this, this.router.navigate(["menu"]);
        return EMPTY;
      })
    );
  }
}
