import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AdministrationService } from '../../administration/administration.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tour } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'xp-edit-tour-form',
  templateUrl: './edit-tour-form.component.html',
  styleUrls: ['./edit-tour-form.component.css']
})
export class EditTourFormComponent implements OnInit{
  constructor(
    private service: TourAuthoringService,
    public dialog: MatDialogRef<EditTourFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  @Output() toursUpdated = new EventEmitter<null>();
  public tour: Tour = {
    name:"",
    description: "",
    difficulty: parseInt("0"),
    tags: []
  };
  editTourForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    difficulty: new FormControl('',[Validators.required]),
    tags: new FormControl([] as string[], [Validators.required])
  });
  ngOnInit() {
    console.log(this.data);
    this.editTourForm.reset();
    const tourPatch = {
      name: this.data.name || null,
      description: this.data.description || null,
      difficulty: this.data.difficulty.toString() || null,
      tags: this.data.tags || null
    };
    this.editTourForm.patchValue(tourPatch);
  }
 

  addTag(tag: string): void {
    const tagArray = this.editTourForm.get('tags');
    if (tagArray && tagArray.value) {
      const tags = tagArray.value;
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
        tagArray.setValue(tags);
      }
    }
  }

  removeTag(index: number): void {
    const tagArray = this.editTourForm.get('tags');
    if (tagArray && tagArray.value) {
      const tags = tagArray.value;
      tags.splice(index, 1);
      tagArray.setValue(tags);
    }
  }
  submit():void{
    const updatedData = this.editTourForm.value;
    console.log(updatedData);
    const tour: Tour = {
      name: this.editTourForm.value.name || "",
      description: this.editTourForm.value.description || "",
      difficulty: parseInt(this.editTourForm.value.difficulty || "0"),
      tags: this.editTourForm.value.tags ? this.editTourForm.value.tags : []
    };
    
    this.data.name=tour.name;
    this.data.description=tour.description;
    this.data.difficulty=tour.difficulty;
    this.data.tags=tour.tags;
    console.log(this.data.id);
    this.service.updateTour(this.data).subscribe({
      next: () => { 
        this.toursUpdated.emit();
        this.onClose();
      }
    });
  }
  onClose() : void {
    this.dialog.close();
  }
  faXmark = faXmark;
 
}

