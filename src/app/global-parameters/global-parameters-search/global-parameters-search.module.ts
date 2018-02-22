import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalParametersSearchComponent } from './global-parameters-search.component';
import { GlobalParametersMaintananceComponent } from '../global-parameters-maintanance/global-parameters-maintanance.component';
import { GlobalParametersMaintananceModule } from '../global-parameters-maintanance/global-parameters-maintanance.module';
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
          MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule, Routes } from '@angular/router';
import { TokenInterceptor } from '../../core/class/token.interceptor';

const routes: Routes = [
  { path: '', component: GlobalParametersSearchComponent }
];

@NgModule({
  imports: [
    CommonModule,
    GlobalParametersMaintananceModule,
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
    RouterModule.forChild(routes),
  ],
  declarations: [GlobalParametersSearchComponent],
  entryComponents: [GlobalParametersMaintananceComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class GlobalParametersSearchModule { }