import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MarketplaceService } from "../marketplace.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EditTourFormComponent } from "../../tour-authoring/edit-tour-form/edit-tour-form.component";
import { Tour } from "../../tour-authoring/model/tour.model";
import { Coupon } from "../model/coupon.model";
import { formatDate } from "@angular/common";
import { NotifierService } from "angular-notifier";

@Component({
    selector: "xp-edit-coupon-form",
    templateUrl: "./edit-coupon-form.component.html",
    styleUrls: ["./edit-coupon-form.component.css"],
})
export class EditCouponFormComponent {
    currentDate: Date = new Date();
    constructor(
        private service: MarketplaceService,
        public dialog: MatDialogRef<EditCouponFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private notifier: NotifierService
    ) {}
    @Output() toursUpdated = new EventEmitter<null>();
    public coupon: Coupon = {
        discount: parseInt("0"),
        expirationDate: new Date(),
        allFromAuthor: false,
    };
    editCouponForm = new FormGroup({
        discount: new FormControl("", [Validators.required]),
        expirationDate: new FormControl(new Date(), [Validators.required]),
        allFromAuthor: new FormControl<boolean>(false),
    });
    ngOnInit() {
        console.log(this.data);
        console.log(this.data.expirationDate);
        console.log(
            formatDate(this.data.expirationDate, "yyyy-MM-dd", "en-US"),
        );
        this.data.expirationDate = formatDate(
            this.data.expirationDate,
            "yyyy-MM-dd",
            "en-US",
        );
        //this.editCouponForm.reset();
        const couponPatch = {
            discount: this.data.discount || null,
            expirationDate: this.data.expirationDate || null,
            allFromAuthor: this.data.allFromAuthor || null,
        };
        console.log(couponPatch.expirationDate);

        this.editCouponForm.patchValue(this.data);
        console.log(this.editCouponForm.value.expirationDate);
    }
    submit(): void {
        const updatedData = this.editCouponForm.value;
        const coupon: Coupon = {
            discount: parseFloat(this.editCouponForm.value.discount || "0"),
            expirationDate:
                this.editCouponForm.value.expirationDate || new Date(),
            allFromAuthor: this.editCouponForm.value.allFromAuthor || false,
        };
        this.data.discount = coupon.discount;
        this.data.expirationDate = coupon.expirationDate;
        this.data.allFromAuthor = coupon.allFromAuthor;
        console.log(this.data.id);
        if (!this.isValidDiscount()) {
            this.notifier.notify("error", "Discount must be less than 100.");
            return;
        } 
        this.service.updateCoupon(this.data).subscribe({
            next: () => {
                this.toursUpdated.emit();
                this.onClose();
            },
        });
    }
    onClose(): void {
        this.dialog.close();
    }
    isValidDiscount(): boolean {
        return parseFloat(this.editCouponForm.value.discount!)<=100 && this.editCouponForm.value.discount!="";
    }
    faXmark = faXmark;
}
