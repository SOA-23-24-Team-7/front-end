import { Component, Inject, OnInit } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bundle } from '../model/bundle.model';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../model/tour.model';

@Component({
  selector: 'xp-add-bundle-form',
  templateUrl: './add-bundle-form.component.html',
  styleUrls: ['./add-bundle-form.component.css']
})
export class AddBundleFormComponent implements OnInit {

  faXmark = faXmark;

  tours: Tour[] = [];

  constructor(private service: TourAuthoringService,
    public dialog: MatDialogRef<AddBundleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  public bundle: Bundle = {
    name: "",
    price: 0,
    bundleItems: []
  }

  addBundleForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
  });

  ngOnInit(): void {
    this.getToursForAuthor();
  }

  getToursForAuthor(): void {
    this.service.getTours().subscribe({
      next: (result: PagedResults<Tour>) => {
        this.tours = result.results;
      }
    })
  }

  submit():void{
    
  }

  onClose() : void {
    this.dialog.close();
  }
}
