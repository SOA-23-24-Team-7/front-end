import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xp-tour-preference-form',
  templateUrl: './tour-preference-form.component.html',
  styleUrls: ['./tour-preference-form.component.css']
})
export class TourPreferenceFormComponent {
  
  tourPreferenceForm = new FormGroup({
    difficultyLevel: new FormControl(0,[Validators.required]),
    walkingRating: new FormControl(0,[Validators.required]),
    cyclingRating: new FormControl(0,[Validators.required]),
    carRating: new FormControl(0,[Validators.required]),
    boatRating: new FormControl(0,[Validators.required]),
    selectedTags: new FormControl(['',''],[Validators.required])
  })

  createPreference(): void{
    console.log(this.tourPreferenceForm.value)
  }

}
