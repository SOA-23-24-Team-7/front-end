import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xp-single-tour-statistics',
  templateUrl: './single-tour-statistics.component.html',
  styleUrls: ['./single-tour-statistics.component.css']
})
export class SingleTourStatisticsComponent implements OnInit{
  
  salesNumber: string;
  startNumber: string;
  completionNumber: string;

  ngOnInit(): void {
    
  }
  
}
