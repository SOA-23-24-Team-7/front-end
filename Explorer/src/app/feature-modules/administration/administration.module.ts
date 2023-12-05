import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentFormComponent } from "./equipment-form/equipment-form.component";
import { EquipmentComponent } from "./equipment/equipment.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersOverviewComponent } from "./users-overview/users-overview.component";
import { RatingComponent } from "./rating/rating.component";
import { RequestViewComponent } from "./request-view/request-view.component";
import { CommentRequestFormComponent } from "./comment-request-form/comment-request-form.component";
import { CommentKeyPointRequestFormComponent } from "./comment-keypoint-request-form/comment-keypoint-request-form.component";
import { LayoutModule } from "../layout/layout.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { WalletUpdateDialogComponent } from './wallet-update-dialog/wallet-update-dialog.component';

@NgModule({
    declarations: [
        EquipmentFormComponent,
        EquipmentComponent,
        RatingComponent,
        UsersOverviewComponent,
        RequestViewComponent,
        CommentRequestFormComponent,
        CommentKeyPointRequestFormComponent,
        WalletUpdateDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        LayoutModule,
        FontAwesomeModule,
    ],
    exports: [
        EquipmentComponent,
        EquipmentFormComponent,
        UsersOverviewComponent,
        RatingComponent,
    ],
})
export class AdministrationModule {}
