import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapComponent } from "./map/map.component";
import { TranslateComponent } from "./translate/translate.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [MapComponent, TranslateComponent],
    imports: [CommonModule, FormsModule],
    exports: [MapComponent],
})
export class SharedModule {}
