import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { BurgerService } from "src/app/services/burger.service";
import { DrinkService } from "src/app/services/drink.service";
import { PizzaService } from "src/app/services/pizza.service";
import { EditProductComponent } from "../dir-menu/edit-product/edit-product.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.scss"],
})
export class ProductInfoComponent implements OnInit {
  product!: any;
  productSubscription!: Subscription;
  canEdit!: true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private burgerService: BurgerService,
    private pizzaService: PizzaService,
    private drinkService: DrinkService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.productSubscription = this.activatedRoute.data.subscribe((data) => {
      this.product = data["data"];
    });
  }
  deleteProduct() {
    if (this.product.type == "burger") {
      this.burgerService.delete(this.product.id).subscribe(() => {
        this.router.navigate(["menu"]);
      });
      return;
    }
    if (this.product.type == "pizza") {
      this.pizzaService.delete(this.product.id).subscribe(() => {
        this.router.navigate(["menu"]);
      });
      return;
    }
    if (this.product.type == "drink") {
      this.drinkService.delete(this.product.id).subscribe(() => {
        this.router.navigate(["menu"]);
      });
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      enterAnimationDuration: "300ms",
      exitAnimationDuration: "300ms",
      data: this.product,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) return (this.product = data);
      else return;
    });
  }
}
