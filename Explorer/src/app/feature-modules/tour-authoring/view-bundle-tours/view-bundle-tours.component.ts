import { Component, Inject, OnInit } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bundle } from '../model/bundle.model';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../model/tour.model';
import { BundleCreation } from '../model/bundle-creation.model';
import { MarketplaceService } from '../../marketplace/marketplace.service';

@Component({
  selector: 'xp-view-bundle-tours',
  templateUrl: './view-bundle-tours.component.html',
  styleUrls: ['./view-bundle-tours.component.css']
})
export class ViewBundleToursComponent implements OnInit {

  faXmark = faXmark;

  tours: Tour[] = [];

  constructor(private service: MarketplaceService,
    public dialog: MatDialogRef<ViewBundleToursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bundle) {}

  addBundleForm: FormGroup

  ngOnInit(): void {
    this.data.bundleItems.forEach(bi => {
      this.getTour(bi.tourId);
    });
  }

  getTour(id: number): void {
    this.service.getTourById(id).subscribe({
      next: (result: Tour) => {
        const tour = result
        //console.log(tour)
        this.tours.push(tour)
        console.log(this.tours)
      }
    })
  }

  getTours(): Tour[] {
    return this.tours
  }

  onClose() : void {
    this.dialog.close();
  }

}
