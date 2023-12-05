import { Component } from '@angular/core';
import { ShoppingNotification } from '../model/shopping-notification.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { StakeholderService } from '../stakeholder.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-shopping-notifications',
  templateUrl: './shopping-notifications.component.html',
  styleUrls: ['./shopping-notifications.component.css']
})
export class ShoppingNotificationsComponent {
  shoppingNotifications: ShoppingNotification[] = [];
  user: User;
  constructor(
        private service: StakeholderService,
        public dialogRef: MatDialog,
        private authService: AuthService,
  ) {}
  ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        this.getNotificationsByLoggedInUser();
  }
  getNotificationsByLoggedInUser() {
    this.service.getShoppingNotificationsByLoggedInUser().subscribe({
        next: (result: PagedResults<ShoppingNotification>) => {
            this.shoppingNotifications = result.results;
            console.log(this.shoppingNotifications);
        },
        error: (err: any) => {
            console.log(err);
        },
    });
    }
    setSeenStatus(
        notification: ShoppingNotification,
        id: number,
    ) {
        this.service.setSeenStatusForShoppingNotification(notification.id).subscribe({
            next:() =>{
                notification.hasSeen = true;
            }
        })
    }
  
}
