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
  selector: 'xp-edit-bundle-form',
  templateUrl: './edit-bundle-form.component.html',
  styleUrls: ['./edit-bundle-form.component.css']
})
export class EditBundleFormComponent implements OnInit {

  faXmark = faXmark;

  tours: Tour[] = [];
  dataCopy: BundleCreation;
  @Output() callParentMethodEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private service: TourAuthoringService,
    public dialog: MatDialogRef<EditBundleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bundle) {
      this.dataCopy = {
        name: data.name,
        price: data.price,
        tourIds: []
      }
      data.bundleItems.forEach(bi => {
        this.dataCopy.tourIds = [...this.dataCopy.tourIds, bi.tourId];
      });

      this.addBundleForm = new FormGroup({
        name: new FormControl(this.dataCopy.name,[Validators.required]),
        price: new FormControl(this.dataCopy.price,[Validators.required]),
      });
    }

  public bundle: BundleCreation = {
    name: "",
    price: 0,
    tourIds: []
  }

  addBundleForm: FormGroup

  ngOnInit(): void {
    this.getToursForAuthor();
    console.log(this.dataCopy);
    console.log(this.data.bundleItems);
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

  submit(): void{
    if (this.addBundleForm.value.name && this.addBundleForm.value.name !== "") {
      this.dataCopy.name = this.addBundleForm.value.name;
    }
    else {
      alert("Fill the form correctly.");
    }

    if (this.addBundleForm.value.price) {
      let price: number = parseInt(this.addBundleForm.value.price);
      if (price >= 0) {
        this.dataCopy.price = price;
      }
      else {
        alert("Price must be greater than 0.")
      }
    }
    else {
      alert("Fill the form correctly.");
    }

    this.service.editBundle(this.data.id!, this.dataCopy).subscribe({
      next: (result: Bundle) => {
        console.log("Uspeh edit");
        this.data = result;
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
    if (this.dataCopy.tourIds.includes(tourId)) {
      this.dataCopy.tourIds = this.dataCopy.tourIds.filter(t => t != tourId);
    }
    else {
      this.dataCopy.tourIds = [...this.dataCopy.tourIds, tourId];
    }
  }

  calculateTotalPrice(): number {
    let price = 0;
    this.tours.forEach(t => {
      if (this.dataCopy.tourIds.includes(t.id!)) {
        price += t.price!;
      }
    });
    return price;
  }

  callParentMethod() {
    this.callParentMethodEvent.emit();
  }

}
