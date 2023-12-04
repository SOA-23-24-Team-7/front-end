import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MarketplaceService } from "../marketplace.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CouponApplication } from "../model/coupon-applicaton.model";

@Component({
    selector: "xp-coupons-modal",
    templateUrl: "./coupons-modal.component.html",
    styleUrls: ["./coupons-modal.component.css"],
})
export class CouponsModalComponent {
    constructor(
        private service: MarketplaceService,
        public dialogRef: MatDialogRef<CouponsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    couponForm = new FormGroup({
        code: new FormControl("", [Validators.required]),
    });

    applyDiscount(): void {
        const couponApplication: CouponApplication = {
            couponCode: this.couponForm.value.code || "",
            shoppingCartId: this.data.shoppingCartId,
        };
        this.service.applyDiscount(couponApplication).subscribe({
            next: result => {
                this.dialogRef.close();
            },
        });
    }
}
