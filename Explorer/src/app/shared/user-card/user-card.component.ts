import { Component, Input } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { faShield, faBan } from '@fortawesome/free-solid-svg-icons';
import { MarketplaceService } from 'src/app/feature-modules/marketplace/marketplace.service';

@Component({
  selector: 'xp-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: any;

  @Input() shield: boolean = false;
  faShield = faShield;

  @Input() ban: boolean = false;
  faBan = faBan;

  @Input() clubMemberId: number | undefined;
  hidden: boolean = false;

  constructor(private service: MarketplaceService) {}
  
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = "https://imgs.search.brave.com/udmDGOGRJTYO6lmJ0ADA03YoW4CdO6jPKGzXWvx1XRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzY4LzU1LzYw/LzM2MF9GXzI2ODU1/NjAxMl9jMVdCYUtG/TjVyalJ4UjJleVYz/M3puSzRxblllS1pq/bS5qcGc";
    }
  }

  kickClubMember(): void {
    if(!this.clubMemberId) return;
    this.service.kickMember(this.clubMemberId).subscribe({
      next: () => {
        this.user.kicked = true
      }
    })
  }
}
