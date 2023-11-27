import { Component, OnInit } from '@angular/core';
import { Tour, TourStatus } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourCardViewComponent } from 'src/app/shared/tour-card-view/tour-card-view.component';

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { KeyPoint } from '../model/key-point.model';


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
  keyPoints: KeyPoint[] = [];

  constructor(private tourAuthoringService: TourAuthoringService) {}

  ngOnInit(): void {
    this.getTours();
  }

  getTourStatusText(status: TourStatus | undefined): string {
    if (status === undefined) {
      return 'N/A'; 
    }
    switch (status) {
      case TourStatus.Draft:
        return 'Draft';
      case TourStatus.Published:
        return 'Published';
      case TourStatus.Archived:
        return 'Archived';
      default:
        return '';
    }
  }

  onPublishClicked(tour: Tour): void{
    if(tour.id){
      this.tourAuthoringService.getKeyPoints(tour.id).subscribe({
        next: (result: KeyPoint[]) =>{
          this.keyPoints = result;

          if(this.keyPoints.length > 1 && tour.durations && tour.durations.length > 0){
            this.tourAuthoringService.publishTour(tour).subscribe({
              next: () => {
                  this.getTours();
              },
            })
          }
          else{
            alert("Tour can't be published because it does not have needed requiements!");
          }
        },
        error:(err: any) => {
          console.log(err);
        }
      })
    }
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
  onArchiveClicked(tour: Tour): void{
    this.tourAuthoringService.archiveTour(tour).subscribe({
      next: () => {
        this.getTours();
      },
    })
  }

  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;


}
