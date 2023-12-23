import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { KeyPoint } from "../model/key-point.model";
import { TourAuthoringService } from "../tour-authoring.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { KeyPointEncounterFormComponent } from "../../encounter/key-point-encounter-form/key-point-encounter-form.component";
import { Tour } from "../model/tour.model";
import {
    PublicKeyPointRequest,
    PublicStatus,
} from "../model/public-key-point-request.model";
import { Person } from "../../stakeholder/model/person.model";
import { MapService } from "src/app/shared/map/map.service";
import { NotifierService } from "angular-notifier";
import { faImage, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { environment } from "src/env/environment";
import { MapModalComponent } from "src/app/shared/map-modal/map-modal.component";
import { LocationCoords } from "src/app/shared/model/location-coords.model";
import { xpError } from "src/app/shared/model/error.model";
import { Facilities } from "../model/facilities.model";
import { PublicFacilityRequest } from "../model/public-facility-request.model";

export interface AddFacilityModalData {
    facility?: Facilities;
    isUpdateForm: Boolean;
}

@Component({
    selector: "xp-facility-modal",
    templateUrl: "./facility-modal.component.html",
    styleUrls: ["./facility-modal.component.css"],
})
export class FacilityModalComponent implements OnInit {
    @Output() facilityCreated = new EventEmitter<Facilities>();
    @Output() facilityUpdated = new EventEmitter<Facilities>();
    facility?: Facilities;
    isUpdateForm: Boolean = false;
    facilityImage: string | null = null;
    facilityImageFile: File | null = null;
    person: Person;

    faImage = faImage;
    faLocation = faMapLocationDot;

    constructor(
        private service: TourAuthoringService,
        private authService: AuthService,
        private mapService: MapService,
        private notifier: NotifierService,
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<FacilityModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddFacilityModalData,
    ) {
        this.isUpdateForm = data.isUpdateForm;
        this.facility = data.facility;
        if (this.isUpdateForm) {
            this.facilityImage = this.facility!.imagePath!.startsWith("http")
                ? this.facility!.imagePath!
                : environment.imageHost + this.facility!.imagePath;
            const facilityToPatch = {
                name: this.facility!.name || null,
                description: this.facility!.description || null,
                imagePath: this.facility!.imagePath || null,
                category: this.facility!.category.toString() || null,
                longitude: this.facility!.longitude.toString() || null,
                latitude: this.facility!.latitude.toString() || null,
            };
            this.facilityForm.patchValue(facilityToPatch);
        }
    }
    options = [
        { value: "0", label: "Restaurant" },
        { value: "1", label: "Parking Lot" },
        { value: "2", label: "Toilet" },
        { value: "3", label: "Hospital" },
        { value: "4", label: "Cafe" },
        { value: "5", label: "Pharmacy" },
        { value: "6", label: "Exchange Office" },
        { value: "7", label: "Bus Stop" },
        { value: "8", label: "Shop" },
        { value: "9", label: "Other" },
    ];

    selectedOption: string | null;

    ngOnInit(): void {
        this.getPerson();
    }

    facilityForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        imagePath: new FormControl("", [Validators.required]),
        category: new FormControl("", [Validators.required]),
        longitude: new FormControl("", [Validators.required]),
        latitude: new FormControl("", [Validators.required]),
        isPublicChecked: new FormControl<boolean>(false),
    });

    onSelectImage(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        if (element.files && element.files[0]) {
            this.facilityImageFile = element.files[0];

            const reader = new FileReader();

            reader.readAsDataURL(this.facilityImageFile);
            reader.onload = (e: ProgressEvent<FileReader>) => {
                this.facilityImage = reader.result as string;
                this.facilityForm.value.imagePath = "";
            };
        }
    }

    addFacility(): void {
        if (this.isValidForm()) {
            this.notifier.notify("error", "Invalid facility data supplied.");
            return;
        }
        this.service.uploadImage(this.facilityImageFile!).subscribe({
            next: (imagePath: string) => {
                const facility: Facilities = {
                    name: this.facilityForm.value.name || "",
                    description: this.facilityForm.value.description || "",
                    imagePath: imagePath,
                    category: this.selectedOption
                        ? parseInt(this.selectedOption, 10)
                        : 0,
                    longitude:
                        parseFloat(this.facilityForm.value.longitude || "0") ||
                        0,
                    latitude:
                        parseFloat(this.facilityForm.value.latitude || "0") ||
                        0,
                };

                this.service.addFacility(facility).subscribe({
                    next: result => {
                        this.facilityCreated.emit(result);
                        if (this.facilityForm.value.isPublicChecked) {
                            const request: PublicFacilityRequest = {
                                facilityId: result.id as number,
                                status: PublicStatus.Pending,
                                authorName:
                                    this.person.name +
                                    " " +
                                    this.person.surname,
                            };
                            this.service
                                .addPublicFacilityRequest(request)
                                .subscribe({});
                        }
                        this.dialogRef.close();
                        this.notifier.notify(
                            "success",
                            "Added a new facility!",
                        );
                    },
                    error: err => {
                        this.notifier.notify(
                            "err",
                            xpError.getErrorMessage(err),
                        );
                    },
                });
                // });
            },
            error: err => {
                this.notifier.notify("error", "Invalid facility image.");
            },
        });
    }

    updateFacility(): void {
        if (this.isValidForm()) {
            this.notifier.notify("error", "Invalid facility data supplied.");

            return;
        }
        let facility: Facilities = {
            id: this.facility!.id!,
            name: this.facilityForm.value.name || "",
            description: this.facilityForm.value.description || "",
            category: this.selectedOption
                ? parseInt(this.selectedOption, 10)
                : 0,
            longitude:
                parseFloat(this.facilityForm.value.longitude || "0") || 0,
            latitude: parseFloat(this.facilityForm.value.latitude || "0") || 0,

            imagePath: this.facilityForm.value.imagePath || "",
        };

        if (!facility.imagePath) {
            this.service.uploadImage(this.facilityImageFile!).subscribe({
                next: (imagePath: string) => {
                    facility.imagePath = imagePath;
                    this.service.updateFacility(facility).subscribe({
                        next: () => {
                            this.facilityUpdated.emit();
                        },
                    });
                },
                error: err => {
                    this.notifier.notify("error", "Invalid facility image.");
                },
            });
        } else {
            this.service.updateFacility(facility).subscribe({
                next: response => {
                    this.facilityUpdated.emit(response);
                    this.dialogRef.close();
                    this.notifier.notify("success", "Updated facility!");
                },
                error: err => {
                    this.notifier.notify("err", xpError.getErrorMessage(err));
                },
            });
        }
    }

    isValidForm(): boolean {
        if (
            this.facilityForm.errors ||
            !this.facilityForm.value.latitude ||
            !this.facilityForm.value.longitude
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

    selectLocation() {
        const dialogRef = this.dialog.open(MapModalComponent, {
            data: {
                closeOnClick: true,
            },
        });
        dialogRef.componentInstance.positionChanged.subscribe(
            (result: LocationCoords) => {
                this.facilityForm.controls["longitude"].setValue(
                    result.longitude.toString(),
                );
                this.facilityForm.controls["latitude"].setValue(
                    result.latitude.toString(),
                );
                this.notifier.notify(
                    "info",
                    "Successfuly set facility location.",
                );
            },
        );
    }
}
