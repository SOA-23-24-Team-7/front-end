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
import { KeyPointSecret } from "../model/key-point-secret.model";
import {
    PublicKeyPointRequest,
    PublicStatus,
} from "../model/public-key-point-request.model";

import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { Person } from "../../stakeholder/model/person.model";
import { MapService } from "src/app/shared/map/map.service";

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
        private mapService: MapService,
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
        address: new FormControl<string>("", [Validators.required]),
        imagePath: new FormControl<string>("", [Validators.required]),
        isPublicChecked: new FormControl<boolean>(false),
        haveSecret: new FormControl<boolean>(false),
        secretDescription: new FormControl<string>(""),
        secretImages: new FormControl<string>(""),
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
                            locationAddress:
                                this.keyPointForm.value.address || "",
                            imagePath: imagePath,
                            order: 0,
                            haveSecret: this.keyPointForm.value.haveSecret || false,
                            secret: { images: [""],
                                    description: this.keyPointForm.value.secretDescription || ""} || null
                        };
                        // Get Key Points location address
                        this.mapService
                            .reverseSearch(
                                keyPoint.latitude,
                                keyPoint.longitude,
                            )
                            .subscribe(res => {
                                const addressInfo = {
                                    number: "",
                                    street: "",
                                    city: "",
                                    postalCode: "",
                                    country: "",
                                };

                                let addressParts = res.display_name.split(",");

                                this.setAddressInfo(addressInfo, addressParts);
                                let concatenatedAddress =
                                    addressInfo.number +
                                    " " +
                                    addressInfo.street +
                                    " " +
                                    addressInfo.city +
                                    " " +
                                    addressInfo.postalCode +
                                    " " +
                                    addressInfo.country;

                                keyPoint.locationAddress = concatenatedAddress;

                                this.service.addKeyPoint(keyPoint).subscribe({
                                    next: result => {
                                        this.keyPointUpdated.emit();
                                        if (
                                            this.keyPointForm.value
                                                .isPublicChecked
                                        ) {
                                            const request: PublicKeyPointRequest =
                                                {
                                                    keyPointId:
                                                        result.id as number,
                                                    status: PublicStatus.Pending,
                                                    authorName:
                                                        this.person.name +
                                                        " " +
                                                        this.person.surname,
                                                };
                                            this.service
                                                .addPublicKeyPointRequest(
                                                    request,
                                                )
                                                .subscribe({});
                                        }
                                    },
                                });
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
                    locationAddress: this.keyPointForm.value.address || "",
                    imagePath: this.keyPointForm.value.imagePath || "",
                    order: 0,
                    haveSecret: this.keyPointForm.value.haveSecret || false,
                    secret: { images: [""],
                            description: this.keyPointForm.value.secretDescription || ""} || null
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
                    // Get Key Points location address
                    this.mapService
                        .reverseSearch(keyPoint.latitude, keyPoint.longitude)
                        .subscribe(res => {
                            const addressInfo = {
                                number: "",
                                street: "",
                                city: "",
                                postalCode: "",
                                country: "",
                            };

                            let addressParts = res.display_name.split(",");

                            this.setAddressInfo(addressInfo, addressParts);
                            let concatenatedAddress =
                                addressInfo.number +
                                " " +
                                addressInfo.street +
                                " " +
                                addressInfo.city +
                                " " +
                                addressInfo.postalCode +
                                " " +
                                addressInfo.country;

                            keyPoint.locationAddress = concatenatedAddress;

                            this.service.updateKeyPoint(keyPoint).subscribe({
                                next: () => {
                                    this.keyPointUpdated.emit();
                                },
                            });
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

    setAddressInfo(addressInfo: any, addressParts: any): void {
        if (addressParts.length == 10) {
            addressInfo.number = addressParts[0];
            addressInfo.street = addressParts[1];
            addressInfo.city = addressParts[4];
            addressInfo.postalCode = addressParts[8];
            addressInfo.country = addressParts[9];
        } else if (addressParts.length == 9) {
            addressInfo.number = addressParts[0];
            addressInfo.street = addressParts[1];
            addressInfo.city = addressParts[3];
            addressInfo.postalCode = addressParts[7];
            addressInfo.country = addressParts[8];
        } else if (addressParts.length == 8) {
            addressInfo.number = "";
            addressInfo.street = addressParts[1];
            addressInfo.city = addressParts[2];
            addressInfo.postalCode = addressParts[6];
            addressInfo.country = addressParts[7];
        } else if (addressParts.length == 7) {
            addressInfo.number = "";
            addressInfo.street = addressParts[0];
            addressInfo.city = addressParts[1];
            addressInfo.postalCode = addressParts[5];
            addressInfo.country = addressParts[6];
        }
    }

    getPerson(): void {
        this.authService.user$.subscribe(user => {
            this.service.getPerson(user.id).subscribe(result => {
                this.person = result;
            });
        });
    }
}
