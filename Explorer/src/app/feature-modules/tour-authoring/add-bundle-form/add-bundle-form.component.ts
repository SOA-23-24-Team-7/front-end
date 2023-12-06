import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bundle } from '../model/bundle.model';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../model/tour.model';
import { BundleCreation } from '../model/bundle-creation.model';

@Component({
  selector: 'xp-add-bundle-form',
  templateUrl: './add-bundle-form.component.html',
  styleUrls: ['./add-bundle-form.component.css']
})
export class AddBundleFormComponent implements OnInit {

  faXmark = faXmark;

  tours: Tour[] = [];
  @Output() callParentMethodEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private service: TourAuthoringService,
    public dialog: MatDialogRef<AddBundleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  public bundle: BundleCreation = {
    name: "",
    price: 0,
    tourIds: []
  }

  addBundleForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
  });

  ngOnInit(): void {
    this.getToursForAuthor();
  }

  getToursForAuthor(): void {
    this.service.getTours().subscribe({
      next: (result: PagedResults<Tour>) => {
        this.tours = result.results;
        this.tours.forEach(t => {
          
        });
      }
    })
  }

  submit():void{
    if (this.addBundleForm.value.name && this.addBundleForm.value.name !== "") {
      this.bundle.name = this.addBundleForm.value.name;
    }
    else {
      alert("Fill the form correctly.");
    }

    if (this.addBundleForm.value.price) {
      let price: number = parseInt(this.addBundleForm.value.price);
      if (price >= 0) {
        this.bundle.price = price;
      }
      else {
        alert("Price must be greater than 0.")
      }
    }
    else {
      alert("Fill the form correctly.");
    }

    this.service.createBundle(this.bundle).subscribe({
      next: (result: Bundle) => {
        this.callParentMethod();
        location.reload();
        this.onClose();
      }
    })
  }

  onClose() : void {
    this.dialog.close();
  }

  onSelect(tourId: number): void {
    if (this.bundle.tourIds.includes(tourId)) {
      this.bundle.tourIds = this.bundle.tourIds.filter(t => t != tourId);
    }
    else {
      this.bundle.tourIds = [...this.bundle.tourIds, tourId];
    }
  }

  calculateTotalPrice(): number {
    let price = 0;
    this.tours.forEach(t => {
      if (this.bundle.tourIds.includes(t.id!)) {
        price += t.price!;
      }
    });
    return price;
  }

  callParentMethod() {
    this.callParentMethodEvent.emit();
  }
}
