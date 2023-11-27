import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EncounterService } from '../encounter.service';
import { Encounter } from '../model/encounter.model';
import { MapService } from 'src/app/shared/map/map.service';
import { MapComponent } from 'src/app/shared/map/map.component';

@Component({
  selector: 'xp-active-encounter-view',
  templateUrl: './active-encounter-view.component.html',
  styleUrls: ['./active-encounter-view.component.css']
})
export class ActiveEncounterViewComponent {

  points: any
  encounters:Encounter[];
  @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;

  constructor(private service: EncounterService, private mapService:MapService) {}

  ngOnInit(): void {
    this.loadActiveEncounters();
    
  }

  loadActiveEncounters() {
    this.service.getActiveEncounters().subscribe(result => {
        this.encounters = result.results;
        this.encounters.forEach(enc => {this.search(enc.location)});
    });
  }

  search(location:string): void {
    this.mapService.search(location).subscribe({next: (result)=>{this.mapComponent.setEncounterMarker(result[0].lat,result[0].lon)}})
  }
}
