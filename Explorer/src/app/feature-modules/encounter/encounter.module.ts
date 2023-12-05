import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActiveEncounterViewComponent } from "./active-encounter-view/active-encounter-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { EncounterFormComponent } from "./encounter-form/encounter-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [ActiveEncounterViewComponent, EncounterFormComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FontAwesomeModule,
    ],
    exports: [EncounterFormComponent],
})
export class EncounterModule {}
