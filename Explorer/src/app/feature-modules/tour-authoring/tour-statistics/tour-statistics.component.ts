import { Component, OnInit } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'xp-tour-statistics',
  templateUrl: './tour-statistics.component.html',
  styleUrls: ['./tour-statistics.component.css']
})
export class TourStatisticsComponent implements OnInit{

  soldToursNumber: string;
  startedToursNumber: string;
  completedToursNumber: string;

  chart: any = []

  constructor(private service: TourAuthoringService){ }

  ngOnInit(): void {
    this.service.getSoldToursNumber().subscribe({
      next: (result: number) =>{
        this.soldToursNumber = result.toString();

        this.service.getStartedToursNumber().subscribe({
          next: (result: number) =>{
            this.startedToursNumber = result.toString();

            this.service.getCompletedToursNumber().subscribe({
              next: (result: number) =>{
                this.completedToursNumber = result.toString();

              }
            });
          }
        });
      }
    });

    //treba da dobavim data ovde i da stavim u  listu
    // Ovako radi znaci dobra je logika
    let ddd: number[] = [10, 10, 10, 10]

    this.service.getCompletionPercentages().subscribe({
      next: (result: number[]) =>{
        let completionData = result;

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: ['0-25%', '25-50%', '50-75%', '75-100%'],
            datasets: [
              {
                label: 'Number of Tours by Completion Percentage',
                data: completionData,
                backgroundColor: [
                  'rgba(75, 192, 192, 0.7)',
                  'rgba(255, 206, 86, 0.7)',
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 99, 132, 0.7)',
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: 'Tour Completion Percentage Distribution',
                padding: {
                  top: 10,
                  bottom: 15,
                },
              },
            },
          },
        });
        
      
      }
    });

    // Assuming you have the Chart.js library loaded
/*
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['0-25%', '25-50%', '50-75%', '75-100%'],
        datasets: [
          {
            label: 'Number of Tours by Completion Percentage',
            data: [12, 10, 7, 14],
            backgroundColor: [
              'rgba(75, 192, 192, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 99, 132, 0.7)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tour Completion Percentage Distribution',
            padding: {
              top: 10,
              bottom: 15,
            },
          },
        },
      },
    });
   */   
  }
  
}
