import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Person } from '../model/person.model';
import { StakeholderService } from '../stakeholder.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'xp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  editing = false;
  @Output() saveClicked = new EventEmitter<Person>();
  user: User;
  person: Person;

  constructor(
    private authService: AuthService,
    private service: StakeholderService
  ) {}

  toggleEditing() {
    this.editing = !this.editing;
  }

  saveProfile() {
    if (this.editing) {
      this.service.updatePerson(this.person).subscribe((updatedPerson) => {
        // The updatedPerson variable contains the updated data from the backend.
        // You can emit an event to notify other components or update the local data.
        this.saveClicked.emit(updatedPerson);
      });
      this.editing = false;
    }
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.service.getByUserId(this.user.id).subscribe({
      next: (result: Person) => {
        this.person = result;
      },
    });
  }
}
