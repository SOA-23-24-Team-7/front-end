import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Club } from '../model/club.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { MyClubJoinRequest } from '../model/my-club-join-request.model';
import { ClubJoinRequest } from '../model/club-join-request.model copy';

@Component({
  selector: 'xp-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit{
  clubs: Club[] = [];
  displayClubs: Club[] = [];
  searchString: string = "";
  user: User;
  shouldShowImage: boolean = false;
  imgSrc: string = "";
  faSearch = faSearch;

  constructor(
    private service: MarketplaceService, 
    private authService: AuthService
  ) {}

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
        this.displayClubs = result.results;
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

  search(): void {
    const lowerSearch = this.searchString.toLowerCase();
    this.displayClubs = lowerSearch == "" ? this.clubs : this.clubs.filter(club => club.name.toLowerCase().includes(lowerSearch));
  }
}
