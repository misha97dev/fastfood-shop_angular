import { BurgerService } from "src/app/services/burger.service";
import { DrinkService } from "src/app/services/drink.service";
import { PizzaService } from "src/app/services/pizza.service";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { CropImgComponent } from "src/app/components/crop-img/crop-img.component";
@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"],
})
export class EditProductComponent implements OnInit {
  formGroup!: FormGroup;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  @ViewChild("fileInput") fileInput!: ElementRef;
  constructor(
    private burgerService: BurgerService,
    private pizzaService: PizzaService,
    private drinkService: DrinkService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      type: new FormControl(this.product.type),
      name: new FormControl(this.product.name),
      image: new FormControl(this.product.image),
      ingredients: new FormArray([]),
      price: new FormControl(this.product.price),
    });
    if (this.product.ingredients) {
      this.product.ingredients.forEach((ingredient: string) => {
        (<FormArray>this.formGroup.get("ingredients")).push(
          new FormControl(ingredient)
        );
      });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submitForm() {
    if (this.product.type === "burger") {
      return this.updateBurger();
    }
    if (this.product.type === "pizza") {
      return this.updatePizza();
    }
    if (this.product.type === "drink") {
      return this.updateDrink();
    }
  }
  updateBurger() {
    this.burgerService
      .update(this.product.id, this.formGroup.value)
      .subscribe((data) => {
        return this.dialogRef.close(data);
      });
  }
  updatePizza() {
    this.pizzaService
      .update(this.product.id, this.formGroup.value)
      .subscribe((data) => {
        return this.dialogRef.close(data);
      });
  }
  updateDrink() {
    this.formGroup.removeControl("ingredients");
    this.drinkService
      .update(this.product.id, this.formGroup.value)
      .subscribe((data) => {
        return this.dialogRef.close(data);
      });
  }
  get ingredientsForm() {
    return this.formGroup.get("ingredients") as FormArray;
  }
  removeIngredient(index: any) {
    (<FormArray>this.formGroup.get("ingredients")).removeAt(index);
  }
  addIngredient() {
    (<FormArray>this.formGroup.get("ingredients")).push(new FormControl(""));
  }
  openDialog() {
    const dialogConf = {
      enterAnimationDuration: "300ms",
      exitAnimationDuration: "300ms",
      data: this.imageChangedEvent,
    };
    const dialogRef = this.dialog.open(CropImgComponent, dialogConf);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) this.formGroup.get("image")?.setValue(data);
      this.fileInput.nativeElement.value = null;
    });
  }
  fileChangeEvent(event: any): void {
    if (event.target.files.length === 0) return;
    this.imageChangedEvent = event;
    this.openDialog();
  }
}
