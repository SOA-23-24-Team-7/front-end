import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { KeyPoint } from '../../tour-authoring/model/key-point.model';
import { environment } from 'src/env/environment';
@Component({
  selector: 'xp-clicked-key-point',
  templateUrl: './clicked-key-point.component.html',
  styleUrls: ['./clicked-key-point.component.css']
})
export class ClickedKeyPointComponent implements OnInit{
  keyPoint: any
  keyPointImage: string
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: KeyPoint,
    public dialog: MatDialogRef<ClickedKeyPointComponent>,
    public dialogRef: MatDialog
 ) { }
 ngOnInit(): void {
  this.keyPoint = this.data
  this.keyPointImage = environment.imageHost + this.keyPoint.dataKey.imagePath;
  console.log(this.keyPointImage)
}
 onClose(): void {
  this.dialog.close();
}
}
