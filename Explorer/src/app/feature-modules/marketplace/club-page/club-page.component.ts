import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MarketplaceService } from '../marketplace.service';
import { Club } from '../model/club.model';
import { ClubMember } from '../model/club-member.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.css']
})
export class ClubPageComponent {
  user: User;
  clubId: number = -1;
  club: Club;
  members: ClubMember[] = [];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private marketplaceService: MarketplaceService,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.route.params.subscribe(params => {
        this.clubId = params["clubId"];
    });
    this.getClub();
    this.getMembers();
  }

  getClub(): void {
    this.marketplaceService.getClubById(this.clubId).subscribe({
      next: (result: Club) => {
          this.club = result;
      },
    });
  }

  getMembers(): void {
    this.marketplaceService.getClubMembers(this.clubId).subscribe({
      next: (result: PagedResults<ClubMember>) => {
        this.members = result.results;
        for (let member of this.members) {
          member.kicked = false;
        }
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  } 

  getOwner(): any {
    const owner = this.members.find(member => member.userId === this.club.ownerId);
    return owner;
  }

  getMemberCount(): number {
    const members = this.members.filter(member => !member.kicked);
    return members.length;
  }

  getRegularMembers(): any {
    const members = this.members.filter(member => member.userId !== this.club.ownerId);
    return members;
  }

  isOwner(): boolean {
    console.log('UserID:' + this.user.id)
    console.log('OwnerID:' + this.getOwner().userId)
    return this.user.id == this.getOwner().userId;
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = "https://imgs.search.brave.com/udmDGOGRJTYO6lmJ0ADA03YoW4CdO6jPKGzXWvx1XRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzY4LzU1LzYw/LzM2MF9GXzI2ODU1/NjAxMl9jMVdCYUtG/TjVyalJ4UjJleVYz/M3puSzRxblllS1pq/bS5qcGc";
    }
  }
}
