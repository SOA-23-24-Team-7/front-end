import { Component } from '@angular/core';
import { EncounterService } from '../encounter.service';
import { Encounter } from '../model/encounter.model';

@Component({
  selector: 'xp-active-encounter-view',
  templateUrl: './active-encounter-view.component.html',
  styleUrls: ['./active-encounter-view.component.css']
})
export class ActiveEncounterViewComponent {

  encounters:Encounter[];

  constructor(private service: EncounterService) {}

  ngOnInit(): void {
    this.loadActiveEncounters();
  }

  loadActiveEncounters() {
    this.service.getActiveEncounters().subscribe(result => {
        this.encounters = result.results;
        console.log(this.encounters)
    });
  }

}
