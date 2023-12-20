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
import { faMask, faXmark } from "@fortawesome/free-solid-svg-icons";
@Component({
    selector: "xp-secret-popup",
    templateUrl: "./secret-popup.component.html",
    styleUrls: ["./secret-popup.component.css"],
})
export class SecretPopupComponent implements OnInit {
    secret: string = "";
    faMask = faMask;
    faXmark = faXmark;
    hidden: boolean = true;

    @ViewChild("container", { static: true }) container!: ElementRef;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialogRef<SecretPopupComponent>,
        public dialogRef: MatDialog,
        private renderer: Renderer2,
    ) {}
    ngOnInit(): void {
        this.secret = this.data.dataKey;

        setTimeout(() => {
            this.animationRunning = false;
        }, 5000);
        this.startAnimation();
        this.generateConfetti();
    }
    onClose(): void {
        this.dialog.close();
    }

    reveal(): void {
        this.hidden = false;
    }

    confettiArray: any[] = [];
    screenHeight: number = window.innerHeight;
    animationRunning: boolean = true;
    generateConfetti(): void {
        for (let i = 0; i < 300; i++) {
            const confetti = {
                left: this.getRandomPosition() + "px",
                top: this.getRandomPosition() + "px",
                rotation: this.getRandomRotation(),
                color: this.getRandomColor(),
                speed: Math.random() * 5 + 2,
            };
            this.confettiArray.push(confetti);
        }
    }

    getRandomPosition(): number {
        return Math.random() * window.innerWidth;
    }

    getRandomRotation(): string {
        return "rotate(" + Math.random() * 360 + "deg)";
    }

    getRandomColor(): string {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    startAnimation(): void {
        requestAnimationFrame(() => this.moveConfetti());
    }

    moveConfetti(): void {
        if (!this.animationRunning) return;

        let remainingConfetti = false;

        this.confettiArray.forEach((confetti, index) => {
            const confettiElement = document.getElementsByClassName("confetti")[
                index
            ] as HTMLElement;
            const top = parseFloat(confettiElement.style.top);
            const newTop = top + confetti.speed;

            if (newTop > this.screenHeight) {
                confettiElement.remove();
                this.confettiArray.splice(index, 1);
            } else {
                remainingConfetti = true;
                confettiElement.style.top = newTop + "px";
            }
        });

        if (remainingConfetti) {
            requestAnimationFrame(() => this.moveConfetti());
        } else {
            this.animationRunning = false;
        }
    }
}
