import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProductInfoComponent } from "./pages/product-info/product-info.component";
import { BasketComponent } from "./pages/basket/basket.component";
import { MenuComponent } from "./pages/dir-menu/menu/menu.component";
import { BurgerResolver } from "./services/burger.resolver";
import { PizzaResolver } from "./services/pizza.resolver";
import { DrinkResolver } from "./services/drink.resolver";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "menu", component: MenuComponent },
  {
    path: "burger/:id",
    component: ProductInfoComponent,
    resolve: { data: BurgerResolver },
  },
  {
    path: "pizza/:id",
    component: ProductInfoComponent,
    resolve: { data: PizzaResolver },
  },
  {
    path: "drink/:id",
    component: ProductInfoComponent,
    resolve: { data: DrinkResolver },
  },
  { path: "basket", component: BasketComponent },
  { path: "**", redirectTo: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
