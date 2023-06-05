import { Component, OnInit } from "@angular/core";
import { ProductInterface } from "src/app/models/product.interface";
import { BasketService } from "src/app/services/basket.service";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"],
})
export class BasketComponent implements OnInit {
  basketArr: ProductInterface[] = [];
  constructor(private basketService: BasketService) {}
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.basketService.getAll().subscribe((data) => {
      if (data) this.basketArr = data;
    });
  }
  increaseCount(product: ProductInterface) {
    product.basketCount += 1;
    this.updateInBasket(product);
  }
  decreaseCount(product: ProductInterface) {
    if (product.basketCount === 1) return this.delete(product);
    product.basketCount -= 1;
    this.updateInBasket(product);
  }
  updateInBasket(product: ProductInterface) {
    this.basketService.updateProduct(product).subscribe((data: any) => {});
  }
  delete(product: ProductInterface) {
    this.basketService.deleteProduct(product.id).subscribe((data) => {
      let i = this.basketArr.indexOf(product);
      this.basketArr.splice(i, 1);
    });
  }
}
