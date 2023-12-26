import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TourAuthoringService } from "../tour-authoring.service";
import { Facilities } from "../model/facilities.model";
import {
    PublicFacilityRequest,
    PublicStatus,
} from "../model/public-facility-request.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { Person } from "../../stakeholder/model/person.model";

@Component({
    selector: "xp-facilities-form",
    templateUrl: "./facilities-form.component.html",
    styleUrls: ["./facilities-form.component.css"],
})
export class FacilitiesFormComponent implements OnChanges {
    @Output() facilitiesUpdated = new EventEmitter<null>();
    @Input() facility: Facilities;
    @Input() shouldEdit: boolean = false;
    tourImage: string | null = null;
    tourImageFile: File | null = null;
    constructor(
        private service: TourAuthoringService,
        private authService: AuthService,
    ) {}

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
    newLongitude: number = 0;
    newLatitude: number = 0;
    isAddButtonDisabled: boolean = false; //bilo je true
    isPublicChecked = false;
    person: Person;
    imagePath:string;
    ngOnInit(): void {
        this.getPerson();
    }
    ngOnChanges(): void {
        this.facilitiesForm.reset();
        if (this.shouldEdit) {
            const facilityToPatch = {
                name: this.facility.name || null,
                description: this.facility.description || null,
                imagePath: this.facility.imagePath || null,
                category: this.facility.category.toString() || null,
                longitude: this.facility.longitude.toString() || null,
                latitude: this.facility.latitude.toString() || null,
            };
            this.facilitiesForm.patchValue(facilityToPatch);
        }
    }

    facilitiesForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        imagePath: new FormControl("", [Validators.required]),
        category: new FormControl("", [Validators.required]),
        longitude: new FormControl("", [Validators.required]),
        latitude: new FormControl("", [Validators.required]),
        isPublicChecked: new FormControl<boolean>(false),
    });

    addFacility(): void {
        const facility: Facilities = {
            name: this.facilitiesForm.value.name || "",
            description: this.facilitiesForm.value.description || "",
            imagePath: this.facilitiesForm.value.imagePath || "",
            category: this.selectedOption
                ? parseInt(this.selectedOption, 10)
                : 0,
            longitude:
                parseFloat(this.facilitiesForm.value.longitude || "0") || 0,
            latitude:
                parseFloat(this.facilitiesForm.value.latitude || "0") || 0,
        };

        if (this.newLatitude != 0 && this.newLongitude != 0) {
            facility.longitude = this.newLongitude;
            facility.latitude = this.newLatitude;

            /*this.service.addFacility(facility).subscribe({
                next: result => {
                    this.facilitiesUpdated.emit();
                    location.reload();
                    if (this.facilitiesForm.value.isPublicChecked) {
                        const request: PublicFacilityRequest = {
                            facilityId: result.id as number,
                            status: PublicStatus.Pending,
                            // Dodajte komentar ako je potrebno
                            authorName:
                                this.person.name + " " + this.person.surname,
                        };
                        this.service
                            .addPublicFacilityRequest(request)
                            .subscribe({});
                    }
                },
            });*/
            this.service.uploadImage(this.tourImageFile!).subscribe({
                next: (imagePath: string) => {
                    facility.imagePath=imagePath;
                    this.service.addFacility(facility).subscribe({
                        next: result => {
                            this.facilitiesUpdated.emit();
                            //location.reload();
                            if (this.facilitiesForm.value.isPublicChecked) {
                                const request: PublicFacilityRequest = {
                                    facilityId: result.id as number,
                                    status: PublicStatus.Pending,
                                    // Dodajte komentar ako je potrebno
                                    authorName:
                                        this.person.name + " " + this.person.surname,
                                };
                                this.service
                                    .addPublicFacilityRequest(request)
                                    .subscribe({
                                        next: result=>{
                                            location.reload();
                                        }
                                    });
                            }else{
                                location.reload();
                            }
                        },
                    });
                }})
        } else {
            alert("You have to choose the location on the map");
        }
    }

    updateFacility(): void {
        const facility: Facilities = {
            name: this.facilitiesForm.value.name || "",
            description: this.facilitiesForm.value.description || "",
            imagePath: this.facilitiesForm.value.imagePath || "",
            category: this.selectedOption
                ? parseInt(this.selectedOption, 10)
                : 0,
            longitude:
                parseFloat(this.facilitiesForm.value.longitude || "0") || 0,
            latitude:
                parseFloat(this.facilitiesForm.value.latitude || "0") || 0,
        };

        if (this.selectedOption == null) {
            facility.category = this.facility.category;
        }

        facility.id = this.facility.id;

        if (this.newLatitude != 0 && this.newLongitude != 0) {
            facility.longitude = this.newLongitude;
            facility.latitude = this.newLatitude;
        }
        this.service.uploadImage(this.tourImageFile!).subscribe({
            next: (imagePath: string) => {
                facility.imagePath = imagePath;
                this.service.updateFacility(facility).subscribe({
                    next: _ => {
                        this.facilitiesUpdated.emit();
                        location.reload();
                    },
                });
            },
        });
        
    }

    getPerson(): void {
        this.authService.user$.subscribe(user => {
            this.service.getPerson(user.id).subscribe(result => {
                this.person = result;
            });
        });
    }
    onSelectImage(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        if (element.files && element.files[0]) {
            this.tourImageFile = element.files[0];

            const reader = new FileReader();

            reader.readAsDataURL(this.tourImageFile);
            reader.onload = (e: ProgressEvent<FileReader>) => {
                this.tourImage = reader.result as string;
                this.facilitiesForm.value.imagePath = "";
            };
        }
    }
}
