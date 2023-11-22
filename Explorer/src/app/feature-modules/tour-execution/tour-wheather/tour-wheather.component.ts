import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TourExecutionService } from '../tour-execution.service';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'xp-tour-wheather',
  templateUrl: './tour-wheather.component.html',
  styleUrls: ['./tour-wheather.component.css']
})
export class TourWheatherComponent implements OnInit {
  weather: any = {
    wind_speed: 0,
    temp: 0,
    min_temp: 0,
    max_temp: 0,
    sunset: 0,
    sunrise: 0,
    cloud_pct: 0,
    state: 'Clear'
  }
  faXmark = faXmark;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<TourWheatherComponent>,
    public dialogRef: MatDialog,
    private service: TourExecutionService
    ) { }
 ngOnInit(): void {
    console.log(this.data)
    this.service.getWheather(this.data.latitude, this.data.longitude).subscribe({
      next: (result: any) => {
        console.log(result)
        this.weather = result
        this.weather.sunrise = new Date(this.weather.sunrise * 1000).toString().split(" ")[4];
        this.weather.sunset = new Date(this.weather.sunset * 1000).toString().split(" ")[4];
        if(this.weather.cloud_pct > 50){
            this.weather.state = 'Cloudy'
        }
        else if(this.weather.cloud_pct > 30){
          this.weather.state = 'Mostly cloudy'
        }
        else{
          this.weather.state = 'Clear'
        }
      }
    });
  }
  onClose(): void {
    this.dialog.close();
}

}