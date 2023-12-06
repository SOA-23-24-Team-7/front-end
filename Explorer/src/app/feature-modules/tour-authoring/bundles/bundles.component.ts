import { Component, OnInit } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { Bundle } from '../model/bundle.model';

@Component({
  selector: 'xp-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.css']
})
export class BundlesComponent implements OnInit {

  bundles: Bundle[] = [];

  constructor(private service: TourAuthoringService) {}

  ngOnInit(): void {
    this.getBundles();
  }

  getBundles(): void {
    this.service.getBundlesForAuthor().subscribe({
      next: (result: Bundle[]) => {
        this.bundles = result;
      }
    })
  }

}
