import { Component, Input } from "@angular/core";
import { MarketplaceService } from "../../marketplace/marketplace.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { MyClubJoinRequest } from "../../marketplace/model/my-club-join-request.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import {
    faDoorOpen,
    faCheck,
    faEnvelope
  } from "@fortawesome/free-solid-svg-icons";
import { ClubMember } from "../../marketplace/model/club-member.model";

@Component({
    selector: "xp-club-card",
    templateUrl: "./club-card.component.html",
    styleUrls: ["./club-card.component.css"],
})
export class ClubCardComponent {
    user: User;
    @Input() club: any;
    myClubJoinRequests: MyClubJoinRequest[] = [];
    members: ClubMember[] = [];
    faDoorOpen = faDoorOpen;
    faCheck = faCheck;
    faEnvelope = faEnvelope;

    constructor(
        private service: MarketplaceService, 
        private authService: AuthService
      ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        this.getClubJoinRequests()
        this.getMembers();
    }

    onImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        if (target) {
          target.src = "https://imgs.search.brave.com/udmDGOGRJTYO6lmJ0ADA03YoW4CdO6jPKGzXWvx1XRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzY4LzU1LzYw/LzM2MF9GXzI2ODU1/NjAxMl9jMVdCYUtG/TjVyalJ4UjJleVYz/M3puSzRxblllS1pq/bS5qcGc";
        }
    }

    getClubJoinRequests(): void {
        this.service.getMyClubJoinRequests().subscribe({
          next: (result: PagedResults<MyClubJoinRequest>) => {
            this.myClubJoinRequests = result.results;
          },
          error: (errData) => {
            console.log(errData)
          }
        })
    }

    getMembers(): void {
        this.service.getClubMembers(this.club.id).subscribe({
          next: (result: PagedResults<ClubMember>) => {
            this.members = result.results;
          },
          error: (errData) => {
            console.log(errData)
          }
        })
    }

    canSendJoinRequest(): boolean {
        return !this.myClubJoinRequests.some(joinRequest => joinRequest.status === 'Pending' && joinRequest.clubId == this.club.id);
    }

    isMember(): boolean {
        return this.members.some(member => member.userId === this.user.id) || (this.club.ownerId == this.user.id);
    }

    sendJoinRequest(): void {
        this.service.sendClubJoinRequest(this.user.id, this.club.id).subscribe({
            next: () => {
                this.getClubJoinRequests();
            },
          error: (errData) => {
            console.log(errData)
          }
        })
      }
}
