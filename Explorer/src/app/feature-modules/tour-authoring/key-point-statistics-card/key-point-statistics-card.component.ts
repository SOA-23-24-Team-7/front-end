import { Component, Input } from '@angular/core';
import { environment } from 'src/env/environment';
import { KeyPoint } from '../model/key-point.model';
import { PublicKeyPoint } from '../model/public-key-point.model';

@Component({
  selector: 'xp-key-point-statistics-card',
  templateUrl: './key-point-statistics-card.component.html',
  styleUrls: ['./key-point-statistics-card.component.css']
})
export class KeyPointStatisticsCardComponent {
  @Input() keyPoint: KeyPoint | PublicKeyPoint;
  @Input() statistic: number;  
  @Input() encounterStatistic: number;
  keyPointImage: string;

  ngOnInit(): void {
    this.keyPointImage = environment.imageHost + this.keyPoint.imagePath;
  }

}
