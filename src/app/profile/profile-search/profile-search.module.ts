import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSearchComponent } from './profile-search.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  MatButtonModule, 
          MatCardModule, 
          MatDialogModule, 
          MatFormFieldModule, 
          MatIconModule,
          MatInputModule,
          MatTooltipModule,
          MatTableModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { TokenInterceptor } from '../../core/class/token.interceptor';

const routes: Routes = [
  { path: '', component: ProfileSearchComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,    
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule, 
    CdkTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileSearchComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class ProfileSearchModule { }
