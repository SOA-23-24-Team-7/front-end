import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketplaceService } from '../marketplace.service';
import { TourPreference } from '../model/tour-preference.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InputTags } from '../model/input-tags.model';

@Component({
  selector: 'xp-tour-preference-form',
  templateUrl: './tour-preference-form.component.html',
  styleUrls: ['./tour-preference-form.component.css']
})
export class TourPreferenceFormComponent {

  constructor(private service: MarketplaceService, private snackBar: MatSnackBar, private router: Router) { }

  Tags: Array<InputTags> = [];
  @Input() preference: TourPreference;
  @Input() shouldEdit: boolean = false;
  @Output() shouldEditChange = new EventEmitter<boolean>();
  @Output() preferenceUpdated = new EventEmitter<null>();

  tourPreferenceForm = new FormGroup({
    difficultyLevel: new FormControl(null,[Validators.required]),
    walkingRating: new FormControl(null,[Validators.required]),
    cyclingRating: new FormControl(null,[Validators.required]),
    carRating: new FormControl(null,[Validators.required]),
    boatRating: new FormControl(null,[Validators.required])
  })

  addPreference(): void {
    
    let tagsList = []
    for(let t of this.Tags){
      tagsList.push(t.name);
    }

    const tourPreference: TourPreference = {
      difficultyLevel: this.tourPreferenceForm.value.difficultyLevel || 1,
      walkingRating: this.tourPreferenceForm.value.walkingRating || 0,
      cyclingRating: this.tourPreferenceForm.value.cyclingRating || 0,
      carRating: this.tourPreferenceForm.value.carRating || 0,
      boatRating: this.tourPreferenceForm.value.boatRating || 0,
      selectedTags: tagsList
    }

    if (this.IsDataValid(tourPreference)) {
      this.snackBar.open('Data not valid!', 'Close', {
        duration: 5000
      });
    }
    else{
      this.service.addPreference(tourPreference).subscribe({
        next: (_) => {
          this.preferenceUpdated.emit()
          this.snackBar.open('Successfully created!', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/tour-preference']);
        },
        error: (_) => {
          this.snackBar.open('Failed to create!', 'Close', {
            duration: 2000,
          });
        }
      });
    }
  }

  updatePreference(): void {
    let tagsList = []
    for(let t of this.Tags){
      tagsList.push(t.name);
    }

    const tourPreference: TourPreference = {
      id: this.preference.id,
      userId: this.preference.userId,
      difficultyLevel: this.tourPreferenceForm.value.difficultyLevel || 1,
      walkingRating: this.tourPreferenceForm.value.walkingRating || 0,
      cyclingRating: this.tourPreferenceForm.value.cyclingRating || 0,
      carRating: this.tourPreferenceForm.value.carRating || 0,
      boatRating: this.tourPreferenceForm.value.boatRating || 0,
      selectedTags: tagsList
    }
    console.log()
    if (this.IsDataValid(tourPreference)) {
      this.snackBar.open('Data not valid!', 'Close', {
        duration: 5000
      });
    }
    else{
      this.service.updatePreference(tourPreference).subscribe({
        next: (result: TourPreference) => {
          this.preference = result
          this.preferenceUpdated.emit() 
          this.snackBar.open('Successfully updated!', 'Close', {
            duration: 2000,
          });
          this.shouldEdit = false;
          this.shouldEditChange.emit(false);
          this.router.navigate(['/tour-preference']);
        },
        error: (_) => {
          this.snackBar.open('Failed to update!', 'Close', {
            duration: 2000,
          });
        }
      });
    }
  }

  IsDataValid(tourPreference: TourPreference) : boolean {
    return (tourPreference.difficultyLevel < 1 || tourPreference.difficultyLevel > 5 || tourPreference.difficultyLevel === null) ||
      (tourPreference.walkingRating < 0 || tourPreference.walkingRating > 3 || tourPreference.walkingRating === null) ||
      (tourPreference.cyclingRating < 0 || tourPreference.cyclingRating > 3 || tourPreference.cyclingRating === null) ||
      (tourPreference.carRating < 0 || tourPreference.carRating > 3 || tourPreference.carRating === null) ||
      (tourPreference.boatRating < 0 || tourPreference.boatRating > 3 || tourPreference.boatRating === null) ||
      tourPreference.selectedTags.length == 0;
  }
}
