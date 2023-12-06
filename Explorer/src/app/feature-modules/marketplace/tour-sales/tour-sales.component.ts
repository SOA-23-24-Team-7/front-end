import { Component, OnInit } from '@angular/core';
import { 
  faPlus,
  faTrash,
  faPen
} from "@fortawesome/free-solid-svg-icons";
import { MarketplaceService } from '../marketplace.service';
import { TourSale } from '../model/tour-sale.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-tour-sales',
  templateUrl: './tour-sales.component.html',
  styleUrls: ['./tour-sales.component.css']
})
export class TourSalesComponent implements OnInit {

  tourSales: TourSale[] = [];
  availableTours: Tour[] = [];
  chosenToursForSale: Tour[] = [];
  chosenToursDiscount: number = 0;
  chosenSaleId: number = 0;
  
  constructor(private service: MarketplaceService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.service.getTourSales().subscribe(result => {
      this.tourSales = result;
    });

    this.authService.user$.subscribe(user => {
      this.service.getPublishedToursByAuthor(user.id).subscribe(tours => {
          this.availableTours = tours.results;
      });
    });
  }

  deleteTourSale(id: number): void {
    this.service.deleteTourSale(id).subscribe(() => {
      this.tourSales = this.tourSales.filter(sale => sale.id != id)
    });
  }

  updateChosenTours(sale: TourSale): void {
    this.chosenToursForSale = this.availableTours.filter(t => sale.tourIds.find(id => id == t.id!));
    this.chosenToursDiscount = sale.discountPercentage;
    this.chosenSaleId = sale.id!;
  }

  isStartDateAfterToday(sale: TourSale): boolean {
    const today = new Date();
    return new Date(sale.startDate) > today;
  }
  
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
}
