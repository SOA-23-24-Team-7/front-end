import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStar,
  faCoins,
  faCartShopping,
  faShareNodes,
  faMapLocation,
  faPersonHiking,
  faTrash,
  faBoxArchive,
  faPen,
  faMoneyBills,
  faBoxOpen
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { TourAuthoringService } from '../tour-authoring.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'xp-bundle-card',
  templateUrl: './bundle-card.component.html',
  styleUrls: ['./bundle-card.component.css']
})
export class BundleCardComponent {
  faStar = faStar
  faCoins = faCoins
  faCartShopping = faCartShopping
  faShareNodes = faShareNodes
  faMapLocation = faMapLocation
  faPersonHiking = faPersonHiking
  faTrash = faTrash
  faBoxArchive = faBoxArchive
  faPen = faPen
  faMoneyBills = faMoneyBills
  faBoxOpen =faBoxOpen
  @Input() hideIcons: boolean = false;
  @Input() bundle: any;
  user: User;

  constructor(
    private authService: AuthService, 
    private marketplaceService: MarketplaceService,
    private tourAuthoringService: TourAuthoringService,
    public dialogRef: MatDialog) {}
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user.role.toLocaleLowerCase() === 'tourist') {
        //this.getShoppingCart();
      }
    });
  }
}
