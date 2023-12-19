import { Component, Input, OnInit } from "@angular/core";
import { KeyPoint } from "../model/key-point.model";
import { environment } from "src/env/environment";
import { PublicKeyPoint } from "../model/public-key-point.model";
import {
    faXmark,
    faPlus,
    faLandmark,
    faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-key-point-card",
    templateUrl: "./key-point-card.component.html",
    styleUrls: ["./key-point-card.component.css"],
})
export class KeyPointCardComponent implements OnInit {
    @Input() keyPoint: KeyPoint | PublicKeyPoint;
    @Input() isAddNew: boolean = false;
    @Input() isAddNewPublic: boolean = false;
    keyPointImage: string;
    faCross = faXmark;
    faPlus = faPlus;
    faPublic = faLandmark;
    faNew = faMapLocationDot;

    ngOnInit(): void {
        if (!this.isAddNew && !this.isAddNewPublic) {
            this.keyPointImage = this.keyPoint.imagePath.startsWith("http")
                ? this.keyPoint.imagePath
                : environment.imageHost + this.keyPoint.imagePath;
        }
    }
}
