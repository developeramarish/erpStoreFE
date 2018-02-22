import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalParametersMaintananceComponent } from './global-parameters-maintanance.component';
import { SharedModule } from '../../core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../core/class/token.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  MatButtonModule, 
          MatDialogModule, 
          MatFormFieldModule,
          MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,    
    MatFormFieldModule, 
    MatInputModule
  ],
  declarations: [ GlobalParametersMaintananceComponent ],
  exports: [ GlobalParametersMaintananceComponent ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class GlobalParametersMaintananceModule { }