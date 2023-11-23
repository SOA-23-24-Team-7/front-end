import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapComponent } from "./map/map.component";
import { TagComponent } from "./tag/tag.component";

@NgModule({
    declarations: [MapComponent, TagComponent],
    imports: [CommonModule],
    exports: [MapComponent, TagComponent],
})
export class SharedModule {}
