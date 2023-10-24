import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { RouterModule } from "@angular/router";
import { TourCardsComponent } from "./tour-cards/tour-cards.component";
import { BlogCardsComponent } from "./blog-cards/blog-cards.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeTabsComponent } from "./home-tabs/home-tabs.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ClubCardsComponent } from "./club-cards/club-cards.component";
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        HomeComponent,
        NavbarComponent,
        TourCardsComponent,
        BlogCardsComponent,
        FooterComponent,
        HomeTabsComponent,
        ClubCardsComponent,
    ],
    imports: [CommonModule, MaterialModule, RouterModule, FontAwesomeModule, MatDialogModule],
    exports: [NavbarComponent, HomeComponent],
})
export class LayoutModule {}
