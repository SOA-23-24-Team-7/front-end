import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MarketplaceService } from '../marketplace.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTourFormComponent } from '../../tour-authoring/edit-tour-form/edit-tour-form.component';
import { Tour } from '../../tour-authoring/model/tour.model';
import { Coupon } from '../model/coupon.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'xp-edit-coupon-form',
  templateUrl: './edit-coupon-form.component.html',
  styleUrls: ['./edit-coupon-form.component.css']
})
export class EditCouponFormComponent {
  currentDate: Date = new Date();
  constructor(
    private service: MarketplaceService,
    public dialog: MatDialogRef<EditCouponFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  @Output() toursUpdated = new EventEmitter<null>();
  public coupon: Coupon = {
    discount:parseInt("0"),
    expirationDate: new Date(),
    allFromAuthor:false
  };
  editCouponForm = new FormGroup({
    discount: new FormControl('',[Validators.required]),
    expirationDate: new FormControl(new Date(), [Validators.required]),
    allFromAuthor: new FormControl<boolean>(false),
  });
  ngOnInit() {
    console.log(this.data);
    console.log(this.data.expirationDate);
    console.log(formatDate(this.data.expirationDate,'MM/dd/yyyy', 'en-US'));
    this.editCouponForm.reset();
    const couponPatch = {
      discount: this.data.discount || null,
      expirationDate: this.data.expirationDate || null,
      allFromAuthor: this.data.allFromAuthor || null
    };
    console.log(couponPatch.expirationDate);
    this.editCouponForm.patchValue(this.data);
    var formattedDate=formatDate(couponPatch.expirationDate!.toString().split('T')[0],'MM/dd/yyyy', 'en-US');
    console.log(formattedDate);
    this.editCouponForm.value.expirationDate=new Date(formattedDate);
    
  }
  submit():void{
    const updatedData = this.editCouponForm.value;
    const coupon: Coupon = {
      discount: parseFloat(this.editCouponForm.value.discount || "0"),
      expirationDate: this.editCouponForm.value.expirationDate || new Date(),
      allFromAuthor: this.editCouponForm.value.allFromAuthor || false,
    };
    this.data.discount=coupon.discount;
    this.data.expirationDate=coupon.expirationDate;
    this.data.allFromAuthor=coupon.allFromAuthor;
    console.log(this.data.id);
    this.service.updateCoupon(this.data).subscribe({
      next: () => { 
        this.toursUpdated.emit();
        this.onClose();
      }
    });
  }
  onClose() : void {
    this.dialog.close();
  }
  faXmark = faXmark;
}
