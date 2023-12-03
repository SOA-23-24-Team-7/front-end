import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourAuthoringService } from '../tour-authoring.service';
import { Tour } from '../model/tour.model';


@Component({
  selector: 'xp-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent implements OnChanges{

  @Output() toursUpdated = new EventEmitter<null>();
  @Input() tour: Tour;
  @Input() shouldEdit: boolean = false;

  constructor(private service: TourAuthoringService) { }

  ngOnChanges(): void {
    this.tourForm.reset();
    if(this.shouldEdit) {
      const tourPatch = {
        name: this.tour.name || null,
        description: this.tour.description || null,
        difficulty: this.tour.difficulty?.toString() || null,
        tags: this.tour.tags || null
      };
      this.tourForm.patchValue(tourPatch);
    }
  }

  tourForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    difficulty: new FormControl('',[Validators.required]),
    tags: new FormControl([] as string[], [Validators.required])
  });


  addTour(): void {
    console.log(this.tourForm.value);
    const tour: Tour = {
      name: this.tourForm.value.name || "",
      description: this.tourForm.value.description || "",
      difficulty: parseInt(this.tourForm.value.difficulty || "0"),
      tags: this.tourForm.value.tags ? this.tourForm.value.tags : []
    };
    this.service.addTour(tour).subscribe({
      next: () => { this.toursUpdated.emit() }
    });
  }

  addTag(tag: string): void {
    const tagArray = this.tourForm.get('tags');
    if (tagArray && tagArray.value) {
      const tags = tagArray.value;
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
        tagArray.setValue(tags);
      }
    }
    else if(this.shouldEdit == false){
      const tagArray: string[] = []; 
      if (tag) {
        tagArray.push(tag);
        this.tourForm.setControl('tags', new FormControl(tagArray));
      }
    }
  }

  removeTag(index: number): void {
    const tagArray = this.tourForm.get('tags');
    if (tagArray && tagArray.value) {
      const tags = tagArray.value;
      tags.splice(index, 1);
      tagArray.setValue(tags);
    }
  }
  
  updateTour(): void {
    const tour: Tour = {
      name: this.tourForm.value.name || "",
      description: this.tourForm.value.description || "",
      difficulty: parseInt(this.tourForm.value.difficulty || "0"),
      tags: this.tourForm.value.tags ? this.tourForm.value.tags : []
    };

    this.tour.name = tour.name;
    this.tour.description = tour.description;
    this.tour.difficulty = tour.difficulty;
    this.tour.tags = tour.tags;

    this.service.updateTour(this.tour).subscribe({
      next: () => { this.toursUpdated.emit();}
    });
  }

}
