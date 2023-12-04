import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { KeyPoint } from '../../tour-authoring/model/key-point.model';
import { environment } from 'src/env/environment';
@Component({
  selector: 'xp-secret-popup',
  templateUrl: './secret-popup.component.html',
  styleUrls: ['./secret-popup.component.css']
})
export class SecretPopupComponent implements OnInit{
  secret: string = ''
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<SecretPopupComponent>,
    public dialogRef: MatDialog
 ) { }
 ngOnInit(): void {
  this.secret = this.data.dataKey
}
 onClose(): void {
  this.dialog.close();
}
}
