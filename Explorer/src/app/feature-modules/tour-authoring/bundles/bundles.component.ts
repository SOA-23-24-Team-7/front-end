import { Component, OnInit } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { Bundle } from '../model/bundle.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddBundleFormComponent } from '../add-bundle-form/add-bundle-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'xp-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.css']
})
export class BundlesComponent implements OnInit {

  faPlus = faPlus;

  bundles: Bundle[] = [];

  constructor(private service: TourAuthoringService, public dialogRef: MatDialog) {}

  ngOnInit(): void {
    this.getBundles();
  }

  getBundles(): void {
    this.service.getBundlesForAuthor().subscribe({
      next: (result: Bundle[]) => {
        this.bundles = result;
        console.log(this.bundles);
      }
    })
  }

  onAddClicked(): void {
    this.dialogRef.open(AddBundleFormComponent, { });
  }

  getNonDeletedBundles(): Bundle[] {
    return this.bundles.filter(b => b.status != 3);
  }

}
