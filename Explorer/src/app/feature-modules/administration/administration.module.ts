import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentFormComponent } from "./equipment-form/equipment-form.component";
import { EquipmentComponent } from "./equipment/equipment.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersOverviewComponent } from "./users-overview/users-overview.component";
import { RatingComponent } from "./rating/rating.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        EquipmentFormComponent,
        EquipmentComponent,
        RatingComponent,
        UsersOverviewComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
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
