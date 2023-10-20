import { Component, OnInit } from '@angular/core';
import { Tour } from '../model/tour.model';
import {TourAuthoringService} from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  tour: Tour[] = [];
  selectedTour: Tour;
  shouldRenderTourForm: boolean = false;
  shouldEdit: boolean = false;

  constructor(private tourAuthoringService: TourAuthoringService) {}

  ngOnInit(): void {
    this.getTours();
  }

  getTours(): void {
    this.tourAuthoringService.getTours().subscribe({
      next: (result: PagedResults<Tour>) =>{
        this.tour = result.results;
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }

  deleteTour(id: number): void {
    this.tourAuthoringService.deleteTour(id).subscribe({
      next: () => {
        this.getTours();
      },
    })
  }

  onEditClicked(tour: Tour): void {
    this.selectedTour = tour;
    this.shouldRenderTourForm = true;
    this.shouldEdit = true;
  }

  onAddClicked(): void {
    this.shouldEdit = false;
    this.shouldRenderTourForm = true;
  }
}
