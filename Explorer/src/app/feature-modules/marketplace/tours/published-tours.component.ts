import { Component, OnInit } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MarketplaceService } from '../marketplace.service';
import { Tour } from '../../tour-authoring/model/tour.model';

@Component({
  selector: 'xp-published-tours',
  templateUrl: './published-tours.component.html',
  styleUrls: ['./published-tours.component.css']
})

export class PublishedToursComponent implements OnInit {

  publishedTours: Tour[] = [];

  constructor(private service: MarketplaceService) {}

  ngOnInit(): void {
    this.getPublishedTours();
  }

  getPublishedTours(): void
  {
    this.service.getPublishedTours().subscribe({
      next: (result: PagedResults<Tour>) =>{
        this.publishedTours = result.results;
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }
}