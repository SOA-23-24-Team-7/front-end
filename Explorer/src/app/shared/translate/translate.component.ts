import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/env/environment";
import { TranslateResult } from "../model/translateResult.model";

@Component({
    selector: "xp-translate",
    templateUrl: "./translate.component.html",
    styleUrls: ["./translate.component.css"],
})
export class TranslateComponent {
    translatedText: string = "";
    textToTranslate: string = "";
    selectedFrom: string = "de";
    selectedTo: string = "en";

    constructor(private http: HttpClient) {}

    translate(): void {
        this.http
            .post<TranslateResult>(environment.translateHost + "translate", {
                q: this.textToTranslate,
                source: this.selectedFrom,
                target: this.selectedTo,
                format: "text",
                api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            })
            .subscribe({
                next: (result: TranslateResult) => {
                    this.translatedText = result.translatedText;
                },
                error: () => {},
            });
    }
}
