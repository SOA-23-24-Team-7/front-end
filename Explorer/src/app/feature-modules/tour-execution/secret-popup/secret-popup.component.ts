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
    }
    onClose(): void {
        this.dialog.close();
    }

    reveal(): void {
        this.hidden = false;
    }
}
