import { Component } from '@angular/core';
import { Coupon } from '../model/coupon.model';
import { MatDialog } from '@angular/material/dialog';
import { faCircleExclamation, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ProblemAnswerComponent } from '../../stakeholder/problem-answer/problem-answer.component';
import { ProblemDeadlineComponent } from '../../stakeholder/problem-deadline/problem-deadline.component';
import { StakeholderService } from '../../stakeholder/stakeholder.service';
import { ProblemUser } from '../model/problem-with-user.model';
import { MarketplaceService } from '../marketplace.service';
import { EditCouponFormComponent } from '../edit-coupon-form/edit-coupon-form.component';

@Component({
  selector: 'xp-coupons-view',
  templateUrl: './coupons-view.component.html',
  styleUrls: ['./coupons-view.component.css']
})
export class CouponsViewComponent {
  faPen = faPen;
  faTrash = faTrash;
  coupons: Coupon[] = [];
    user: User;
    constructor(
        private service: MarketplaceService,
        private authService: AuthService,
        public dialogRef: MatDialog,
    ) {}

    ngOnInit(): void {
        this.getCoupons();
    }

    getCoupons(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
            this.service.getCouponsById(this.user.id).subscribe({
              next: (result: PagedResults<Coupon>) => {
                this.coupons = result.results;
                console.log(this.coupons)
              }
            })
        });   
    }
    faCircleExclamation = faCircleExclamation;
    onEdit(coupon: Coupon) {
      this.dialogRef.open(EditCouponFormComponent, {
        data: coupon,
      })
    }
    Delete(coupon: Coupon) {
      this.service.deleteCoupon(coupon.id as number).subscribe({
        next:() => {
          this.service.getCouponsById(this.user.id).subscribe({
            next: (result: PagedResults<Coupon>) => {
              this.coupons = result.results;
            }
          })
        }
      })
    }
}
