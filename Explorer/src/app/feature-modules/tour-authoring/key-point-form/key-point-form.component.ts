import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from "@angular/core";
import { TourAuthoringService } from "../tour-authoring.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { environment } from "src/env/environment";
import { KeyPoint } from "../model/key-point.model";
import {
    PublicKeyPointRequest,
    PublicStatus,
} from "../model/public-key-point-request.model";

import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { Person } from "../../stakeholder/model/person.model";

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
    //isPublicChecked = false;
    person: Person;

    constructor(
        private route: ActivatedRoute,
        private service: TourAuthoringService,
        private authService: AuthService,
    ) {}
    ngOnInit(): void {
        this.getPerson();
    }
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
        isPublicChecked: new FormControl<boolean>(false),
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
                        const keyPoint: KeyPoint = {
                            tourId: +params.get("id")!,
                            name: this.keyPointForm.value.name || "",
                            description:
                                this.keyPointForm.value.description || "",
                            longitude: this.keyPointForm.value.longitude || 0,
                            latitude: this.keyPointForm.value.latitude || 0,
                            imagePath: imagePath,
                            order: 0,
                        };
                        this.service.addKeyPoint(keyPoint).subscribe({
                            next: result => {
                                this.keyPointUpdated.emit();
                                if (this.keyPointForm.value.isPublicChecked) {
                                    const request: PublicKeyPointRequest = {
                                        keyPointId: result.id as number,
                                        status: PublicStatus.Pending,
                                        authorName:
                                            this.person.name +
                                            " " +
                                            this.person.surname,
                                    };
                                    this.service
                                        .addPublicKeyPointRequest(request)
                                        .subscribe({});
                                }
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

    getPerson(): void {
        this.authService.user$.subscribe(user => {
            this.service.getPerson(user.id).subscribe(result => {
                this.person = result;
            });
        });
    }
}
