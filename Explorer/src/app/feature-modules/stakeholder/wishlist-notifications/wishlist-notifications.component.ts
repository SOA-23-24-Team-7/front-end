import { Component } from '@angular/core';
import { KeyPointNotification } from '../../marketplace/model/keypoint-notification';
import { WishlistNotification } from '../model/wishlist-notification.model';
import { StakeholderService } from '../stakeholder.service';

@Component({
  selector: 'xp-wishlist-notifications',
  templateUrl: './wishlist-notifications.component.html',
  styleUrls: ['./wishlist-notifications.component.css']
})
export class WishlistNotificationsComponent {
  notification: WishlistNotification[] = []

  constructor(private service: StakeholderService,){}

  ngOnInit(): void{
      this.service.getWishlistNotifications().subscribe(result =>{
        this.notification= result;
      })
  }
}
