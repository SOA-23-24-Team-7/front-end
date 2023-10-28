import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MaterialModule} from 'src/app/infrastructure/material/material.module';
import {FormsModule} from '@angular/forms';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import { ProblemCommentComponent } from './problem-comment/problem-comment.component';
import { ProblemCommentListComponent } from './problem-comment-list/problem-comment-list.component';
import { ProblemCommentCreateComponent } from './problem-comment-create/problem-comment-create.component';

@NgModule({
  declarations: [UserProfileComponent, EditProfileComponent, ProblemCommentComponent, ProblemCommentListComponent, ProblemCommentCreateComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [UserProfileComponent, EditProfileComponent],
})
export class StakeholderModule {
}
