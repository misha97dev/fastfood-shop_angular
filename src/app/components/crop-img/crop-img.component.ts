import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ImageCroppedEvent, LoadedImage } from "ngx-image-cropper";

@Component({
  selector: "app-crop-img",
  templateUrl: "./crop-img.component.html",
  styleUrls: ["./crop-img.component.scss"],
})
export class CropImgComponent implements OnInit {
  imageChangedEvent: any = "";
  croppedImage: any = "";
  constructor(
    public dialogRef: MatDialogRef<CropImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  ngOnInit(): void {
    this.imageLoaded();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image?: LoadedImage) {}
  cropperReady() {}
  loadImageFailed() {}
  submit() {
    this.dialogRef.close(this.croppedImage);
  }
}
