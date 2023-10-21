import { Component, OnInit } from '@angular/core';
import { Facilities } from '../model/facilities.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {

  facilities: Facilities[] = [];
  selectedFacility: Facilities;
  shouldEdit: boolean = false;
  shouldRenderFacilitiesForm: boolean = false;

  constructor(private service: TourAuthoringService) { }

  ngOnInit(): void {
    this.getFacilities();
  }

  getFacilities(): void {
    this.service.getAuthorsFacilities().subscribe({
      next: (result: PagedResults<Facilities>) => {
        this.facilities = result.results;
      },
      error: () => {
      }
    })
  }

  onEditClicked(facility: Facilities): void {
    this.shouldEdit = true;
    this.selectedFacility = facility;
    this.shouldRenderFacilitiesForm = true;
  }
  

  onAddClicked(): void{
    this.shouldRenderFacilitiesForm = true;
    this.shouldEdit = false;
  }

  onDeleteClicked(facility: Facilities): void{
    this.service.deleteFacility(facility).subscribe({
      next: () => {
        this.getFacilities();
      }
    })
  }
}
