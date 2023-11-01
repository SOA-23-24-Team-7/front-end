import { Component, OnInit, ViewChild } from '@angular/core';
import { Facilities } from '../model/facilities.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { FacilitiesFormComponent } from '../facilities-form/facilities-form.component';

@Component({
  selector: 'xp-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
  @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;
  @ViewChild(FacilitiesFormComponent, { static: false }) facilitiesFormComponent: FacilitiesFormComponent;

  facilities: Facilities[] = [];
  selectedFacility: Facilities;

  shouldEdit: boolean = false;
  shouldRenderFacilitiesForm: boolean = false;

  constructor(private service: TourAuthoringService) {}

  ngOnInit(): void {
    this.getFacilities();
  }

  getFacilities(): void {
    this.service.getAuthorsFacilities().subscribe({
      next: (result: PagedResults<Facilities>) => {
        this.facilities = result.results;

        for(let f of this.facilities){
          this.mapComponent.setMarkersForAllFacilities(f.latitude, f.longitude);
        }
      },
      error: () => {
      }
    })
  }

  onEditClicked(facility: Facilities): void {
    this.shouldEdit = true;
    this.selectedFacility = facility;
    this.shouldRenderFacilitiesForm = true;

    if(this.mapComponent){
      this.mapComponent.setMarker(this.selectedFacility.latitude, this.selectedFacility.longitude);
      this.mapComponent.facilitiesUsed = true;
    }
  }
  
  onAddClicked(): void{
    this.shouldRenderFacilitiesForm = true;
    this.shouldEdit = false;

    if(this.mapComponent){
      this.mapComponent.facilitiesUsed = true;
    }
  }

  onDeleteClicked(facility: Facilities): void{
    this.service.deleteFacility(facility).subscribe({
      next: () => {
        this.getFacilities();
        location.reload();
      }
    })
  }

  onMapClicked(): void{
    this.mapComponent.getClickCoordinates((lat, lng) => {
       this.facilitiesFormComponent.newLatitude = lat;
       this.facilitiesFormComponent.newLongitude = lng;

       console.log(this.facilitiesFormComponent.newLatitude);
       console.log(this.facilitiesFormComponent.newLongitude);
    });

    if(this.shouldRenderFacilitiesForm){
      this.facilitiesFormComponent.isAddButtonDisabled = false;
    }
  }

  onTableRowClicked(facility: Facilities): void {
    this.selectedFacility = facility;
    if(this.mapComponent){
      this.mapComponent.setMarker(facility.latitude, facility.longitude);
      this.mapComponent.facilitiesUsed = true;
    }
  }

  onCloseClicked(): void{
    this.shouldRenderFacilitiesForm = false;
    this.shouldEdit = false;
  }
}
