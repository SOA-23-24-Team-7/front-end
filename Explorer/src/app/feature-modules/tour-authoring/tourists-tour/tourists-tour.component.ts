import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TourAuthoringService } from '../tour-authoring.service';
import { Tour, TourStatus } from '../model/tour.model';
import { KeyPoint } from '../model/key-point.model';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { EditTouristsTourFormComponent } from '../edit-tourists-tour-form/edit-tourists-tour-form.component';
import { AddTouristsTourFormComponent } from '../add-tourists-tour-form/add-tourists-tour-form.component';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-tourists-tour',
  templateUrl: './tourists-tour.component.html',
  styleUrls: ['./tourists-tour.component.css']
})
export class TouristsTourComponent implements OnInit {

  tour: Tour[] = [];
  selectedTour: Tour;
  shouldRenderTourForm: boolean = false;
  shouldEdit: boolean = false;
  keyPoints: KeyPoint[] = [];

  constructor(private router: Router,private tourAuthoringService: TourAuthoringService,private service: TourExecutionService, public dialogRef: MatDialog,) {}

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
      case TourStatus.Ready:
        return 'Ready';
      default:
        return '';
    }
  }

  onReadyClicked(tour: Tour): void{
    if(tour.id){
      this.tourAuthoringService.getKeyPoints(tour.id).subscribe({
        next: (result: KeyPoint[]) =>{
          this.keyPoints = result;

          if(this.keyPoints.length > 1 && tour.durations && tour.durations.length > 0){
            this.tourAuthoringService.markTourAsReady(tour).subscribe({
              next: () => {
                  this.getTours();
              },
            })
          }
          else{
            alert("Tour can't be ready because it does not have needed requiements!");
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

  onEditClicked(tour: Tour): void {
    this.dialogRef.open(EditTouristsTourFormComponent, {
      data: tour,
    });
  }

  onAddClicked(): void {
    this.dialogRef.open(AddTouristsTourFormComponent, {
      data: this.tour,
    });
  }

  deleteTour(id: number): void {
    this.tourAuthoringService.deleteTour(id).subscribe({
      next: () => {
        this.getTours();
      },
    })
  }

  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;

  StartTour(id: number){
    this.service.startTour(id).subscribe(() => {
      this.router.navigate(['/tour-executing/' + id]);
    });
  }


}
