import { Component, OnInit } from '@angular/core';
import { TourPreference } from '../model/tour-preference.model'
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-tour-preferences',
  templateUrl: './tour-preferences.component.html',
  styleUrls: ['./tour-preferences.component.css']
})
export class TourPreferencesComponent implements OnInit {

  isEditing: Boolean = false

  preference: TourPreference = {
        id: -1,
        userId: -1,
        difficultyLevel: -1,
        walkingRating: 0,
        cyclingRating: 0,
        carRating: 0,
        boatRating: 0,
        selectedTags: []}

  constructor(private service: MarketplaceService, private authService: AuthService) { }

  ngOnInit(): void {
      this.service.getTourPreference().subscribe({
        next: (result: TourPreference) => {
          this.preference = result;
        },
        error: (err: any) => {
        }
      })
  }

  deleteEquipment(id: number): void {
    this.service.deletePreference(id).subscribe({
      next: () => {
        this.getPreference();
      },
    })
  }

  getPreference(): void {
    this.service.getTourPreference().subscribe({
      next: (result: TourPreference) => {
        this.preference = result;
      },
      error: (error) => {
          this.preference.id = -1;
      }
    })
  }

  onEditClicked(preference: TourPreference): void {
    this.preference = preference;
  }

  onEditChange(shouldEdit: boolean): void {
    this.isEditing = shouldEdit;
  }
  
}
