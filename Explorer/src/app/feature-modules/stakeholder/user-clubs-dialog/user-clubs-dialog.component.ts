import { Component, Inject, OnInit } from '@angular/core';
import { StakeholderService } from '../stakeholder.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Club } from '../../marketplace/model/club.model';

export interface ModalData {
  userId: number;
}
@Component({
  selector: 'xp-user-clubs-dialog',
  templateUrl: './user-clubs-dialog.component.html',
  styleUrls: ['./user-clubs-dialog.component.css']
})
export class UserClubsDialogComponent implements OnInit{
  constructor(
    private service: StakeholderService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    ) {}
  userId: number
  clubs : Club[] = []
  ngOnInit(): void {
    this.userId = this.data.userId;
    this.loadClubs()
  }
  loadClubs() {
    this.service.getClubs(this.userId).subscribe(result => {
        this.clubs = result.results;
    });
  }
  showClub(id: any){
    this.router.navigate(["/club/", id]);
    this.dialog.closeAll()
  }
  showClubs(){
    this.router.navigate(["/clubs"]);
    this.dialog.closeAll()
  }
}
