import { Component } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { MarketplaceService } from '../marketplace.service';

@Component({
  selector: 'xp-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  tours: Tour[] = [];

  constructor(private service: MarketplaceService) {}

  toursFromWishlist: Tour[] = [];

  ngOnInit(): void {
    this.getTours();
  }


  ngOnChanges(): void{
    this.getTours();
  }

  getTours() {
    this.service.getToursFromWishlist().subscribe({
        next: (result: Tour[]) => {
            this.toursFromWishlist = result;
        },
        error: (err: any) => {
            console.log(err);
        },
    });
 }
}
