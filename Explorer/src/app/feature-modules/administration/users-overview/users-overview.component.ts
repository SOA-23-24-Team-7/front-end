import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AdministrationService } from '../administration.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ACCESS_TOKEN } from 'src/app/shared/constants';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';

@Component({
  selector: 'xp-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.css'],
})
export class UsersOverviewComponent implements OnInit {
  users: User[] = [];
  selectedUser: User;

  constructor(private service: AdministrationService) {}

  ngOnInit(): void {
    this.getUsersByAdmin();
  }

  getUsersByAdmin() {
    this.service.getUsersByAdmin().subscribe({
      next: (result: PagedResults<User>) => {
        this.users = result.results;
      },
      error: () => {},
    });
  }

  disableAccount(user: User) {
    this.service.disableAccount(user.id).subscribe({
      next: (result: User) => {
        user = result;
      },
    });
  }
}
