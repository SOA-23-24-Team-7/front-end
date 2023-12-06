import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateComponent } from "./translate/translate.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { TagComponent } from "./tag/tag.component";
import { TourCardViewComponent } from "./tour-card-view/tour-card-view.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PositionSimulatorComponent } from "./position-simulator/position-simulator.component";
import { MapModalComponent } from "./map-modal/map-modal.component";

@NgModule({
    declarations: [
        MapComponent,
        TourCardViewComponent,
        TranslateComponent,
        TagComponent,
        PositionSimulatorComponent,
        MapModalComponent,
    ],
    imports: [CommonModule, FontAwesomeModule, RouterModule, FormsModule],
    exports: [MapComponent, TourCardViewComponent, TagComponent],
})
export class SharedModule {}
