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


  ngOnInit(): void {
    //OVDE TREBA POZIV SERVISA DA UCITA TURE U WISHLISTU OD ULOGOVANOG TURISTE
 }

 
}
