import { Component, OnInit } from "@angular/core";
import { Club } from "../model/club.model";
import { MarketplaceService } from "../marketplace.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { MatDialog } from "@angular/material/dialog";
import { ClubFormComponent } from "../club-form/club-form.component";

@Component({
    selector: "xp-owner-clubs",
    templateUrl: "./owner-clubs.component.html",
    styleUrls: ["./owner-clubs.component.css"],
})
export class OwnerClubsComponent implements OnInit {
    clubs: Club[] = [];
    selectedClub: Club;
    shouldEdit: boolean = false;
    shouldRenderClubForm: boolean = false;
    shouldShowImage: boolean = false;
    user: User | undefined;
    imgSrc: string = "";
    constructor(
        private service: MarketplaceService,
        private authService: AuthService,
        private dialog: MatDialog,
    ) {}
    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        this.getClubs();
    }
    getClubs(): void {
        this.service.getOwnerClubs().subscribe({
            next: (result: PagedResults<Club>) => {
                this.clubs = result.results;
                console.log(this.clubs);
            },
            error: errData => {
                console.log(errData);
            },
        });
        this.shouldRenderClubForm = false;
    }
    onAddClicked(): void {
        this.shouldEdit = false;
        this.shouldRenderClubForm = true;
        const dialogRef = this.dialog.open(ClubFormComponent, {
            data: { club: this.selectedClub, shouldEdit: this.shouldEdit },
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getClubs();
        });
    }

    onEditClicked(club: Club): void {
        this.selectedClub = club;
        if (this.user?.id != club.ownerId) {
            alert("Unauthorized");
            return;
        }
        this.shouldRenderClubForm = true;
        this.shouldEdit = true;
        console.log("True:", this.shouldEdit);
        const dialogRef = this.dialog.open(ClubFormComponent, {
            data: { club: this.selectedClub, shouldEdit: this.shouldEdit },
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getClubs();
        });
    }

    onDeleteClicked(id: any): void {
        this.service.deleteClub(id).subscribe({
            next: () => {
                this.getClubs();
            },
        });
    }

    toggleShowImage(image: string) {
        this.shouldShowImage = !this.shouldShowImage;
        this.imgSrc = image;
    }
}
