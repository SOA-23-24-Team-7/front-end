import { Component } from '@angular/core';
import { FacilityNotification } from '../model/facility-notification';
import { KeyPointNotification } from '../model/keypoint-notification';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  facilityNotifications : FacilityNotification[]=[]
  keyPointNotifications : KeyPointNotification[]=[]
  constructor(private service: MarketplaceService){}
  ngOnInit(): void {
    this.getByAuthorId()
  }
  getByAuthorId(): void {
    this.service.getFacilityNotificationsByAuthorId().subscribe({
      next: (result: PagedResults<FacilityNotification>) => {
        this.facilityNotifications=result.results
        this.service.getKeyPointNotificationsByAuthorId().subscribe({
          next: (result: PagedResults<KeyPointNotification>) => {
            this.keyPointNotifications=result.results
          }
          })
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
}
