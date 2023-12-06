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
  nextKeyPointId: number;
  secret: string = 'Not unlocked yet'
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: KeyPoint,
    public dialog: MatDialogRef<ClickedKeyPointComponent>,
    public dialogRef: MatDialog
 ) { }
 ngOnInit(): void {
  this.keyPoint = this.data
  this.nextKeyPointId = this.keyPoint.nextKeyPointId
  this.keyPointImage = environment.imageHost + this.keyPoint.dataKey.imagePath;
  if(this.keyPoint.dataKey.id < this.nextKeyPointId){
    if(this.keyPoint.dataKey.secret.description != ''){
      this.secret = this.keyPoint.dataKey.secret.description
    }
    else{
      this.secret = 'No secret'
    }
  }
  if(this.keyPoint.dataKey.secret.description == ''){
      this.secret = 'No secret'
  }
}
 onClose(): void {
  this.dialog.close();
}
}
