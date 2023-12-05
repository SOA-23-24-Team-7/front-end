import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { Tour } from '../../tour-authoring/model/tour.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { TourSale } from '../model/tour-sale.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'xp-tour-sale-form',
  templateUrl: './tour-sale-form.component.html',
  styleUrls: ['./tour-sale-form.component.css']
})
export class TourSaleFormComponent implements OnInit {

  todayDate: Date = new Date();
  availableTours: Tour[] = [];
  chosenTours: Tour[] = [];
  authorId: number = 0;
  tourId: number = 0;

  constructor(private authService: AuthService, private service: MarketplaceService, private cdRef: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  saleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDate: new FormControl("", [Validators.required]),
    endDate: new FormControl("", [Validators.required]),
    discountPercentage: new FormControl(<number>null!, [Validators.required, Validators.pattern('^\\d+$')]),
    tourIds: new FormControl(<number[]>[], [Validators.minLength(1)])
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.tourId = +paramMap.get('id')!;

      this.authService.user$.subscribe(user => {
        this.authorId = user.id;

        if (this.tourId !== 0) {
          this.service.getTourSaleById(this.tourId).subscribe(sale => {
            sale.discountPercentage *= 100;
            this.saleForm.patchValue(sale);

            this.service.getPublishedToursByAuthor(this.authorId).subscribe(tours => {
              for (var tour of tours.results) {
                if (sale.tourIds.find(t => t === tour.id!)) {
                  this.chosenTours.push(tour);
                } else {
                  this.availableTours.push(tour);
                }
              }
            });
          });
        } else {
          this.service.getPublishedToursByAuthor(this.authorId).subscribe(tours => {
            this.availableTours = tours.results;
          });
        }
      });
    });
  }

  addSale(): void {
    this.saleForm.value.tourIds = this.chosenTours.map(t => t.id!);
    if (!this.saleForm.valid) return;
    const sale: TourSale = {
      name: this.saleForm.value.name || "",
      authorId: this.authorId,
      startDate: this.getUTCDate(this.saleForm.value.startDate) || "",
      endDate: this.getUTCDate(this.saleForm.value.endDate) || "",
      discountPercentage: (this.saleForm.value.discountPercentage || 0) / 100,
      tourIds: this.saleForm.value.tourIds || []
    };
    this.service.addTourSale(sale).subscribe({
      next: () => {
        this.router.navigate(['/tour-sales'])
      },
      error: (err) => {
        alert("Invalid data!")
      }
    });
  }

  getUTCDate(dateStr: string | null | undefined): string | null {
    if (!dateStr) return null;
    let date = new Date(dateStr);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + String(date.getDate()).padStart(2, '0');
  }

  updateSale(): void {
    this.saleForm.value.tourIds = this.chosenTours.map(t => t.id!);
    if (!this.saleForm.valid) return;
    const sale: TourSale = {
      id: this.tourId,
      name: this.saleForm.value.name || "",
      authorId: this.authorId,
      startDate: this.getUTCDate(this.saleForm.value.startDate) || "",
      endDate: this.getUTCDate(this.saleForm.value.endDate) || "",
      discountPercentage: (this.saleForm.value.discountPercentage || 0) / 100,
      tourIds: this.saleForm.value.tourIds || []
    };
    this.service.updateTourSale(sale).subscribe({
      next: () => {
        this.router.navigate(['/tour-sales'])
      },
      error: (err) => {
        alert("Invalid data!")
      }
    });
  }

  drop(event: CdkDragDrop<Tour[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
