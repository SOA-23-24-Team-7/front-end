import {Component, OnInit} from '@angular/core';
import {Person} from '../model/person.model';
import {StakeholderService} from '../stakeholder.service';
import {AuthService} from 'src/app/infrastructure/auth/auth.service';
import {User} from 'src/app/infrastructure/auth/model/user.model';
import {Router} from "@angular/router";
import { PersonUpdate } from '../model/person-update.model';

@Component({
  selector: 'xp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  editing = false;
  person: PersonUpdate;

  constructor(
    private authService: AuthService,
    private service: StakeholderService,
    private router: Router,
  ) {
  }

  toggleEditing() {
      this.router.navigate(['/edit-profile']);
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.service.getByUserId(user.id).subscribe((result) => {
        this.person = result;
      });
    });
  }
}
