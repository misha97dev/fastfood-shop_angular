import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { EMPTY, Observable, catchError, of } from "rxjs";
// import { DrinkInterface } from "../models/drink.interface";
import { DrinkService } from "./drink.service";
import { ProductInterface } from "../models/product.interface";

@Injectable({
  providedIn: "root",
})
export class DrinkResolver implements Resolve<ProductInterface> {
  constructor(private drinkService: DrinkService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductInterface> {
    return this.drinkService.getOne(route.params?.["id"]).pipe(
      catchError(() => {
        this, this.router.navigate(["menu"]);
        return EMPTY;
      })
    );
  }
}
