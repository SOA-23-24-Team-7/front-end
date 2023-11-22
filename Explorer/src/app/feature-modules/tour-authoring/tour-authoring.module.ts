import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TourComponent } from "./tour/tour.component";
import { TourFormComponent } from "./tour-form/tour-form.component";
import { KeyPointsComponent } from "./key-points/key-points.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { KeyPointFormComponent } from "./key-point-form/key-point-form.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { FacilitiesComponent } from "./facilities/facilities.component";
import { FacilitiesFormComponent } from "./facilities-form/facilities-form.component";
import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "src/app/shared/shared.module";
import { TourEquipmentFormComponent } from "./tour-equipment-form/tour-equipment-form.component";
import { RouterModule } from "@angular/router";
import { KeyPointCardComponent } from "./key-point-card/key-point-card.component";
import { PublicKeyPointsComponent } from "./public-key-points/public-key-points.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatDialogModule } from "@angular/material/dialog";
import { FacilityCardComponent } from "./facility-card/facility-card.component";
import { AddTourFormComponent } from './add-tour-form/add-tour-form.component';
import { EditTourFormComponent } from './edit-tour-form/edit-tour-form.component';

@NgModule({
    declarations: [
        TourComponent,
        TourFormComponent,
        KeyPointsComponent,
        KeyPointFormComponent,
        FacilitiesFormComponent,
        FacilitiesComponent,
        TourEquipmentFormComponent,
        KeyPointCardComponent,
        PublicKeyPointsComponent,
        FacilityCardComponent,
        AddTourFormComponent,
        EditTourFormComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        MatSelectModule,
        SharedModule,
        RouterModule,
        FontAwesomeModule,
        MatDialogModule,
    ],
    exports: [
        TourComponent,
        TourFormComponent,
        MatCardModule,
        MatButtonModule,
        KeyPointsComponent,
        KeyPointFormComponent,
        FacilitiesComponent,
        FacilitiesFormComponent,
        TourEquipmentFormComponent,
        KeyPointCardComponent,
    ],
})
export class TourAuthoringModule {}
