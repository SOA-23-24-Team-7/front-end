import { Component, OnInit } from '@angular/core';
import { ClubMember } from '../model/club-member.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-club-members-management',
  templateUrl: './club-members-management.component.html',
  styleUrls: ['./club-members-management.component.css']
})
export class ClubMembersManagementComponent implements OnInit {
  members: ClubMember[] = [];
  selectedMember: ClubMember;
  user: User | undefined;
  clubId: number;
  constructor(private route: ActivatedRoute, private service: MarketplaceService, private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.getMembers();
    });
  }
  getMembers(): void {
    this.route.params.subscribe(params => {
      const idString = params['clubId'];
      this.clubId = parseInt(idString, 10); 
    });
    this.service.getClubMembers(this.clubId).subscribe({
      next: (result: PagedResults<ClubMember>) => {
        this.members = result.results;
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }
}
