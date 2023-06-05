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
import { BurgerService } from "src/app/services/burger.service";
import { DrinkService } from "src/app/services/drink.service";
import { PizzaService } from "src/app/services/pizza.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  productTypes: string[] = ["burger", "pizza", "drink"];
  formGroup!: FormGroup;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  @ViewChild("fileInput") fileInput!: ElementRef;
  constructor(
    public dialog: MatDialog,
    private burgerService: BurgerService,
    private pizzaService: PizzaService,
    private drinkService: DrinkService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      type: new FormControl(this.productTypes[0]),
      name: new FormControl(""),
      image: new FormControl(""),
      ingredients: new FormArray([new FormControl("")]),
      price: new FormControl(""),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submitForm() {
    if (this.formGroup.value.type === this.productTypes[2]) {
      this.formGroup.removeControl("ingredients");
    }
    this.dialogRef.close(this.formGroup);
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
    if (event.target.files.length === 0) return console.log(event);
    this.imageChangedEvent = event;
    this.openDialog();
  }
}
