import { Component, OnInit } from '@angular/core';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { Bundle } from '../../tour-authoring/model/bundle.model';
import { MarketplaceService } from '../marketplace.service';

@Component({
  selector: 'xp-explore-bundles',
  templateUrl: './explore-bundles.component.html',
  styleUrls: ['./explore-bundles.component.css']
})
export class ExploreBundlesComponent implements OnInit {

  bundles: Bundle[] = [];

  constructor(private service: MarketplaceService) {}

  ngOnInit(): void {
    this.getBundles();
  }

  getBundles(): void {
    this.service.getPublishedBundles().subscribe({
      next: (result: Bundle[]) => {
        this.bundles = result;
        console.log(this.bundles);
      }
    })
  }
}
