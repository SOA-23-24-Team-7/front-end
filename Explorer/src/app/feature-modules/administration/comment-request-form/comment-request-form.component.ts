import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { AdministrationService } from "../administration.service";
import { PublicFacilityRequest } from "../../tour-authoring/model/public-facility-request.model";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-comment-request-form",
    templateUrl: "./comment-request-form.component.html",
    styleUrls: ["./comment-request-form.component.css"],
})
export class CommentRequestFormComponent {
    constructor(
        private service: AdministrationService,
        public dialog: MatDialogRef<CommentRequestFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    faXmark = faXmark;
    commentRequestForm = new FormGroup({
        comment: new FormControl("", [Validators.required]),
    });
    submit(): void {
        const updatedData = this.commentRequestForm.value;
        if (this.data.id != undefined && updatedData.comment != null) {
            this.service
                .rejectPublicFacilityRequest(this.data.id, updatedData.comment)
                .subscribe({
                    next: () => {
                        this.dialog.close(this.data);
                    },
                });

            //location.reload();
        }
    }
    onClose(): void {
        this.dialog.close();
    }
}
