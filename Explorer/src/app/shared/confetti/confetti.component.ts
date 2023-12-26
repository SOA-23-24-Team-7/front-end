import { Component, Input } from "@angular/core";

@Component({
    selector: "xp-confetti",
    templateUrl: "./confetti.component.html",
    styleUrls: ["./confetti.component.css"],
})
export class ConfettiComponent {
    confettiArray: any[] = [];
    screenHeight: number = window.innerHeight;
    animationRunning: boolean = true;

    ngOnInit(): void {
        setTimeout(() => {
            this.animationRunning = false;
        }, 4999);
        this.startAnimation();
        this.generateConfetti();
    }

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
