import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTourFormComponent } from '../../tour-authoring/add-tour-form/add-tour-form.component';
import { Tour } from '../../tour-authoring/model/tour.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { Coupon } from '../model/coupon.model';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MarketplaceModule } from '../marketplace.module';
import { MarketplaceService } from '../marketplace.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'xp-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent {
  currentDate: Date = new Date();
  constructor(
    private service: MarketplaceService,
    public dialog: MatDialogRef<CouponsComponent>,
    private notifier: NotifierService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  @Output() toursUpdated = new EventEmitter<null>();
  public coupon: Coupon = {
    code:"",
    discount: parseInt("0"),
    expirationDate:  new Date(),
    allFromAuthor: false,
  };
  couponForm = new FormGroup({
    discount: new FormControl('',[Validators.required]),
    expirationDate: new FormControl(new Date(), [Validators.required]),
    allFromAuthor: new FormControl<boolean>(false),
  });
  ngOnInit() {
    
  }
  submit():void{
    console.log(this.couponForm.value);
    const coupon: Coupon = {
      discount: parseFloat(this.couponForm.value.discount || "0"),
      expirationDate: this.couponForm.value.expirationDate || new Date(),
      allFromAuthor: this.couponForm.value.allFromAuthor || false,
    };
    coupon.tourId=this.data.id;
    console.log(this.couponForm.value.expirationDate)
    if (!this.isValidDiscount()) {
      this.notifier.notify("error", "Discount must be less than 100.");
      return;
    } 
    
      this.service.addCoupon(coupon).subscribe({
        next: () => { 
          this.onClose();
        }
      });
  }
  onClose() : void {
    this.dialog.close();
  }
  isValidDiscount(): boolean {
    return parseFloat(this.couponForm.value.discount!)<=100;
  }
  faXmark = faXmark;
}


