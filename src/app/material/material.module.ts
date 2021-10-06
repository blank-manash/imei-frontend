import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const mat = [
  MatToolbarModule,
  MatCardModule,
  MatRippleModule,
  MatListModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressBarModule
];

@NgModule({
  imports: [mat],
  exports: [mat],
})
export class MaterialModule { }
