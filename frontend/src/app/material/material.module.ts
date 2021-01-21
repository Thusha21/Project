import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';

import {MatSelectModule} from '@angular/material/select';
//import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon'
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
const material=[
  MatButtonModule,
  MatToolbarModule,
  MatNativeDateModule,
  MatInputModule,
  MatDatepickerModule,
  MatCardModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatIconModule,
  MatSelectInfiniteScrollModule,
  NgxMatSelectSearchModule,
  MatSlideToggleModule,
  MatListModule,
  MatTableModule

  
]
@NgModule({

  imports: [material],
  exports:[material]
})
export class MaterialModule { }
