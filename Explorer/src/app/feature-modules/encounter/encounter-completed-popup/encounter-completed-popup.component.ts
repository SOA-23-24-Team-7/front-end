import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    Renderer2,
    ViewChild,
} from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-encounter-completed-popup",
    templateUrl: "./encounter-completed-popup.component.html",
    styleUrls: ["./encounter-completed-popup.component.css"],
})
export class EncounterCompletedPopupComponent {
    faXmark = faXmark;
    faCheck = faCheck;
    percentage: number = 0;
    isPercentage100: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialogRef<EncounterCompletedPopupComponent>,
        public dialogRef: MatDialog,
    ) {}

    ngOnInit(): void {
        this.animateNumber();
    }

    animateNumber() {
        const interval = setInterval(() => {
            if (this.percentage < 75) {
                this.percentage++;
            } else if (this.percentage >= 75 && this.percentage < 90) {
                this.percentage++;
                clearInterval(interval);
                setTimeout(() => {
                    this.animateNumber();
                }, 30);
            } else if (this.percentage >= 90 && this.percentage < 95) {
                this.percentage++;
                clearInterval(interval);
                setTimeout(() => {
                    this.animateNumber();
                }, 50);
            } else if (this.percentage >= 95 && this.percentage < 98) {
                this.percentage++;
                clearInterval(interval);
                setTimeout(() => {
                    this.animateNumber();
                }, 100);
            } else if (this.percentage >= 98 && this.percentage < 100) {
                this.percentage++;
                clearInterval(interval);
                setTimeout(() => {
                    this.animateNumber();
                }, 300);
            } else if (this.percentage == 100 && !this.isPercentage100) {
                this.isPercentage100 = true;
                setTimeout(() => {
                    this.animateNumber();
                }, 300);
            } else {
                clearInterval(interval);
            }
        }, 15);
    }

    onClose(): void {
        this.dialog.close();
    }
}
