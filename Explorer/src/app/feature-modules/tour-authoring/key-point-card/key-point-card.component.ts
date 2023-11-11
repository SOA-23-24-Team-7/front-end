import { Component, Input, OnInit } from "@angular/core";
import { KeyPoint } from "../model/key-point.model";
import { environment } from "src/env/environment";
import { PublicKeyPoint } from "../model/public-key-point.model";

@Component({
    selector: "xp-key-point-card",
    templateUrl: "./key-point-card.component.html",
    styleUrls: ["./key-point-card.component.css"],
})
export class KeyPointCardComponent implements OnInit {
    @Input() keyPoint: KeyPoint | PublicKeyPoint;
    keyPointImage: string;

    ngOnInit(): void {
        this.keyPointImage = environment.imageHost + this.keyPoint.imagePath;
    }
}
