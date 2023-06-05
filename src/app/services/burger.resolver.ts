import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { EMPTY, Observable, catchError, of } from "rxjs";
// import { ProductInterface } from "../models/burger.interface";
import { BurgerService } from "./burger.service";
import { ProductInterface } from "../models/product.interface";

@Injectable({
  providedIn: "root",
})
export class BurgerResolver implements Resolve<ProductInterface> {
  constructor(private burgerService: BurgerService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductInterface> {
    return this.burgerService.getOne(route.params?.["id"]).pipe(
      catchError(() => {
        this, this.router.navigate(["menu"]);
        return EMPTY;
      })
    );
  }
}
