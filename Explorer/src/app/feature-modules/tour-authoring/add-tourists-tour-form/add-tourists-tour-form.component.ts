import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AddTourFormComponent } from '../add-tour-form/add-tour-form.component';
import { Tour } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';

@Component({
  selector: 'xp-add-tourists-tour-form',
  templateUrl: './add-tourists-tour-form.component.html',
  styleUrls: ['./add-tourists-tour-form.component.css']
})
export class AddTouristsTourFormComponent {
  
  constructor(
    private service: TourAuthoringService, 
    public dialog: MatDialogRef<AddTourFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  @Output() toursUpdated = new EventEmitter<null>();

  public tour: Tour = {
    name:"",
    description: "",
  };

  addTourForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  });

  ngOnInit() {
    
  }

  submit():void{
    console.log(this.addTourForm.value);
    const tour: Tour = {
      name: this.addTourForm.value.name || "",
      description: this.addTourForm.value.description || "",
      difficulty: 1,
      tags: []
    };

    this.service.addTour(tour).subscribe({
      next: () => { 
        this.toursUpdated.emit();
        location.reload();
        this.onClose();
      }
    });
  }

  onClose() : void {
    this.dialog.close();
  }

  faXmark = faXmark;
}
