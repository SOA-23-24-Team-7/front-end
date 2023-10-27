import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import {
  MatButton,
  MatButtonModule,
  MatIconButton,
} from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  exports: [
    MatToolbar,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatTable,
    MatIconButton,
    MatIcon,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule
  ],
})
export class MaterialModule {}
