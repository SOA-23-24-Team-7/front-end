import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from "@angular/core";
import { KeyPoint, PublicStatus } from "../model/key-point.model";
import { TourAuthoringService } from "../tour-authoring.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { environment } from "src/env/environment";

@Component({
    selector: "xp-key-point-form",
    templateUrl: "./key-point-form.component.html",
    styleUrls: ["./key-point-form.component.css"],
})
export class KeyPointFormComponent implements OnChanges {
    @Output() keyPointUpdated = new EventEmitter<null>();
    @Input() keyPoint: KeyPoint | null;
    @Input() longLat: [number, number];
    @Input() shouldEdit: boolean = false;
    tourImage: string | null = null;
    tourImageFile: File | null = null;
    isPublicChecked = false;

    constructor(
        private route: ActivatedRoute,
        private service: TourAuthoringService,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["longLat"] && !changes["longLat"].isFirstChange()) {
            this.keyPointForm.patchValue({
                longitude: this.longLat[0],
                latitude: this.longLat[1],
            });
            return;
        }
        this.tourImage = null;
        this.tourImageFile = null;
        this.keyPointForm.reset();
        if (this.shouldEdit) {
            this.tourImage = environment.imageHost + this.keyPoint!.imagePath;
            this.keyPointForm.patchValue(this.keyPoint!);
        }
    }

    keyPointForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        longitude: new FormControl<number>(null!, [Validators.required]),
        latitude: new FormControl<number>(null!, [Validators.required]),
        imagePath: new FormControl<string>("", [Validators.required]),
        status: new FormControl<PublicStatus>(PublicStatus.NoNeeded),
    });

    onSelectImage(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        if (element.files && element.files[0]) {
            this.tourImageFile = element.files[0];

            const reader = new FileReader();

            reader.readAsDataURL(this.tourImageFile);
            reader.onload = (e: ProgressEvent<FileReader>) => {
                this.tourImage = reader.result as string;
                this.keyPointForm.value.imagePath = "";
            };
        }
    }

    addKeyPoint(): void {
        if (this.isValidForm()) return;

        this.route.paramMap.subscribe({
            next: (params: ParamMap) => {
                this.service.uploadImage(this.tourImageFile!).subscribe({
                    next: (imagePath: string) => {
                        const status = this.isPublicChecked
                            ? PublicStatus.Pending
                            : PublicStatus.NoNeeded;

                        const keyPoint: KeyPoint = {
                            tourId: +params.get("id")!,
                            name: this.keyPointForm.value.name || "",
                            description:
                                this.keyPointForm.value.description || "",
                            longitude: this.keyPointForm.value.longitude || 0,
                            latitude: this.keyPointForm.value.latitude || 0,
                            imagePath: imagePath,
                            order: 0,
                            status: status,
                        };
                        this.service.addKeyPoint(keyPoint).subscribe({
                            next: () => {
                                this.keyPointUpdated.emit();
                            },
                        });
                    },
                });
            },
        });
    }

    updateKeyPoint(): void {
        if (this.isValidForm()) return;

        this.route.paramMap.subscribe({
            next: (params: ParamMap) => {
                let keyPoint: KeyPoint = {
                    id: this.keyPoint!.id,
                    tourId: +params.get("id")!,
                    name: this.keyPointForm.value.name || "",
                    description: this.keyPointForm.value.description || "",
                    longitude: this.keyPointForm.value.longitude || 0,
                    latitude: this.keyPointForm.value.latitude || 0,
                    imagePath: this.keyPointForm.value.imagePath || "",
                    order: 0,
                    status: this.keyPoint!.status,
                };

                if (!keyPoint.imagePath) {
                    this.service.uploadImage(this.tourImageFile!).subscribe({
                        next: (imagePath: string) => {
                            keyPoint.imagePath = imagePath;
                            this.service.updateKeyPoint(keyPoint).subscribe({
                                next: () => {
                                    this.keyPointUpdated.emit();
                                },
                            });
                        },
                    });
                } else {
                    this.service.updateKeyPoint(keyPoint).subscribe({
                        next: () => {
                            this.keyPointUpdated.emit();
                        },
                    });
                }
            },
        });
    }

    isValidForm(): boolean {
        if (
            this.keyPointForm.errors ||
            !this.keyPointForm.value.latitude ||
            !this.keyPointForm.value.longitude
        ) {
            return true;
        }

        return false;
    }
}
