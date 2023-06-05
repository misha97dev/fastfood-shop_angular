import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
// import { BurgerInterface } from "src/app/models/burger.interface";
// import { DrinkInterface } from "src/app/models/drink.interface";
// import { PizzaInterface } from "src/app/models/pizza.interface";
import { BurgerService } from "src/app/services/burger.service";
import { DrinkService } from "src/app/services/drink.service";
import { PizzaService } from "src/app/services/pizza.service";
import { AddProductComponent } from "../add-product/add-product.component";
import { BasketService } from "src/app/services/basket.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { SnackBarComponent } from "src/app/components/snack-bar/snack-bar.component";
import { ProductInterface } from "src/app/models/product.interface";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit, OnDestroy {
  burgerArr!: ProductInterface[];
  pizzaArr!: ProductInterface[];
  drinkArr!: ProductInterface[];
  basketArr!: ProductInterface[];
  burgers: boolean = false;
  pizza: boolean = false;
  drinks: boolean = false;
  subscription!: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  constructor(
    private burgerService: BurgerService,
    private pizzaService: PizzaService,
    private drinkService: DrinkService,
    private basketService: BasketService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBurgers();
    this.getBasket();
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe;
  }

  getBurgers() {
    this.burgers = true;
    this.pizza = false;
    this.drinks = false;
    if (!this.burgerArr) {
      this.subscription = this.burgerService
        .getAll()
        .subscribe((response: ProductInterface[]) => {
          this.burgerArr = response;
        });
    }
  }
  getPizza() {
    this.burgers = false;
    this.pizza = true;
    this.drinks = false;
    if (!this.pizzaArr) {
      this.subscription = this.pizzaService
        .getAll()
        .subscribe((response: ProductInterface[]) => {
          this.pizzaArr = response;
        });
    }
  }
  getDrinks() {
    this.burgers = false;
    this.pizza = false;
    this.drinks = true;
    if (!this.drinkArr) {
      this.subscription = this.drinkService
        .getAll()
        .subscribe((response: ProductInterface[]) => {
          this.drinkArr = response;
        });
    }
  }
  getBasket() {
    this.basketService.getAll().subscribe((data: ProductInterface[]) => {
      this.basketArr = data;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      enterAnimationDuration: "300ms",
      exitAnimationDuration: "300ms",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;
      if (data.value.type === "burger") {
        this.burgerService.create(data.value).subscribe((response) => {
          this.burgerArr.push(response);
        });
      }
      if (data.value.type === "pizza") {
        this.pizzaService.create(data.value).subscribe((response) => {
          this.pizzaArr.push(response);
        });
      }
      if (data.value.type === "drink") {
        this.drinkService.create(data.value).subscribe((response) => {
          this.drinkArr.push(response);
        });
      }
    });
  }
  addToBasket(product: ProductInterface) {
    product.basketCount = 1;
    let item;
    if (this.basketArr.length > 0) {
      item = this.basketArr.find((item) => item.id === product.id);
      if (item) this.updateInBasket(item);
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }
  postToBasket(product: ProductInterface) {
    this.basketService.addProduct(product).subscribe((data: any) => {
      if (data) {
        this.basketArr.push(data);
        this.openSnackBar("Success");
      }
    });
  }
  updateInBasket(product: ProductInterface) {
    product.basketCount += 1;
    this.basketService.updateProduct(product).subscribe((data: any) => {
      if (data) this.openSnackBar("Success");
    });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }
}
