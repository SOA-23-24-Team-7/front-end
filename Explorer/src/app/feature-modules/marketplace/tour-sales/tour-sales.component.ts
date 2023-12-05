import { Component, OnInit } from '@angular/core';
import { 
  faPlus,
  faTrash,
  faPen
} from "@fortawesome/free-solid-svg-icons";
import { MarketplaceService } from '../marketplace.service';
import { TourSale } from '../model/tour-sale.model';

@Component({
  selector: 'xp-tour-sales',
  templateUrl: './tour-sales.component.html',
  styleUrls: ['./tour-sales.component.css']
})
export class TourSalesComponent implements OnInit {

  tourSales: TourSale[] = [];
  
  constructor(private service: MarketplaceService) { }
  
  ngOnInit(): void {
    this.service.getTourSales().subscribe(result => {
      this.tourSales = result;
    });
  }

  deleteTourSale(id: number): void {
    this.service.deleteTourSale(id).subscribe(() => {
      this.tourSales = this.tourSales.filter(sale => sale.id != id)
    });
  }

  isStartDateAfterToday(sale: TourSale): boolean {
    const today = new Date();
    return new Date(sale.startDate) > today;
  }
  
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
}
