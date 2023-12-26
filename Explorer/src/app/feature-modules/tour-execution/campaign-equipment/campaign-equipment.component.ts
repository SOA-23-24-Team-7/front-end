import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Equipment } from '../../administration/model/equipment.model';

@Component({
  selector: 'xp-campaign-equipment',
  templateUrl: './campaign-equipment.component.html',
  styleUrls: ['./campaign-equipment.component.css']
})
export class CampaignEquipmentComponent implements OnInit {
  equipments: Equipment[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<CampaignEquipmentComponent>,
    public dialogRef: MatDialog
 ) { }
 ngOnInit(): void {
  this.equipments = this.data.dataKey
  console.log(this.equipments)
}
 onClose(): void {
  this.dialog.close();
}
}
