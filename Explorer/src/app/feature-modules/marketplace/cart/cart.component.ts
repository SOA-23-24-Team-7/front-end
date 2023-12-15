import { Component, OnInit } from "@angular/core";
import { ShoppingCart } from "../model/shopping-cart";

@Component({
    selector: "xp-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
    cart: ShoppingCart[];

    ngOnInit(): void {
        const navHeight = document.querySelector(".navbar")!.clientHeight + 1;
        const newHeight = window.innerHeight - navHeight;

        document.getElementById("sidebar")!.style.height = `${newHeight}px`;
    }
}
