import { Component, OnInit } from '@angular/core';
import { Club } from '../model/club.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit{
  clubs: Club[] = [];
  shouldShowImage: boolean = false
  imgSrc: string = ""
  constructor(private service: MarketplaceService){}
  ngOnInit(): void {
    this.getClubs()
  }
  getClubs(): void {
    this.service.getClubs().subscribe({
      next: (result: PagedResults<Club>) => {
        this.clubs = result.results;
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }
  toggleShowImage(image: string){
    this.shouldShowImage = !this.shouldShowImage
    this.imgSrc = image
  }
}
