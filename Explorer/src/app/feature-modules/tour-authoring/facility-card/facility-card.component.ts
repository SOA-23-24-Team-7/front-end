import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { KeyPoint } from "../model/key-point.model";
import { environment } from "src/env/environment";
import { PublicKeyPoint } from "../model/public-key-point.model";
import {
    faXmark,
    faPlus,
    faLandmark,
    faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Facilities } from "../model/facilities.model";

@Component({
    selector: "xp-facility-card",
    templateUrl: "./facility-card.component.html",
    styleUrls: ["./facility-card.component.css"],
})
export class FacilityCardComponent implements OnInit {
    @Input() facility: Facilities;
    @Input() isAddNew: boolean = false;
    @Input() isPublic: boolean = false;
    @Output() deleteClicked = new EventEmitter<number>();
    facilityImage: string;
    faCross = faXmark;
    faPlus = faPlus;
    faPublic = faLandmark;
    faNew = faMapLocationDot;

    ngOnInit(): void {
        if (!this.isAddNew) {
            this.facilityImage = this.facility.imagePath!.startsWith("http")
                ? this.facility.imagePath!
                : environment.imageHost + this.facility.imagePath;
        }
    }

    delete() {
        this.deleteClicked.emit(this.facility.id!);
    }
}
