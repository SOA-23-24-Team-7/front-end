import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Club } from '../model/club.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit{
  clubs: Club[] = [];
  user: User;
  shouldShowImage: boolean = false
  imgSrc: string = ""
  constructor(private service: MarketplaceService, private authService: AuthService){}
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
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
  sendJoinRequest(clubId: number): void {
    this.service.sendClubJoinRequest(this.user.id, clubId).subscribe({
      error: (errData) => {
        console.log(errData)
      }
    })
  }
}
