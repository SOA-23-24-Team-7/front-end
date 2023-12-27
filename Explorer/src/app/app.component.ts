import { Component, OnInit } from "@angular/core";
import { AuthService } from "./infrastructure/auth/auth.service";
import "leaflet-routing-machine";
import { MarketplaceService } from "./feature-modules/marketplace/marketplace.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    title = "Explorer";
    sideBar: boolean = false;

    constructor(
        private authService: AuthService,
        private marketPlaceService: MarketplaceService,
    ) {}

    ngOnInit(): void {
        this.marketPlaceService.cart$.subscribe(cart => {
            if (cart.id && !this.sideBar && cart.orderItems?.length !== 0) {
                this.showCart();
            }
        });

        this.checkCloseCart();
        this.checkIfUserExists();
    }

    private checkCloseCart() {
        document.addEventListener("click", e => {
            let sidebar = document.getElementById("sidebar");
            let cart = document.getElementById("cart");
            let button = document.getElementById("btn");
            if (sidebar === null || cart === null || button === null) {
                return;
            }

            if (
                !sidebar.contains(e.target as Node) &&
                !cart.contains(e.target as Node) &&
                sidebar !== e.target &&
                cart !== e.target &&
                button !== e.target &&
                this.sideBar
            ) {
                this.sideBar = false;
                document.getElementById("sidebar")!.classList.remove("active");
            }
        });
    }

    showCart() {
        if (
            !document
                .querySelector(".navbar")!
                .classList.contains("navbar-not-home")
        ) {
            const navHeight =
                document.querySelector(".navbar")!.clientHeight + 1;
            document.getElementById(
                "sidebar",
            )!.style.marginTop = `${navHeight}px`;
            console.log(navHeight);
        } else {
            document.getElementById("sidebar")!.style.marginTop = `0`;
        }

        document.getElementById("sidebar")!.classList.add("active");
        this.sideBar = true;
    }

    private checkIfUserExists(): void {
        this.authService.checkIfUserExists();
    }
}
