import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserChangePasswordComponent } from './user-change-password.component';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../../core/class/token.interceptor';
import { SharedModule } from '../../core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  MatButtonModule, 
          MatCardModule, 
          MatFormFieldModule, 
          MatIconModule, 
          MatInputModule,
          MatTooltipModule} from '@angular/material';

const routes: Routes = [
  { path: '', component: UserChangePasswordComponent }
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
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserChangePasswordComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class UserChangePasswordModule { }
