import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashOpenCloseComponent } from './cash-open-close.component';
import { SharedModule } from '../../core/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  MatButtonModule, 
          MatCardModule, 
          MatFormFieldModule, 
          MatIconModule,
          MatInputModule,
          MatPaginatorModule,
          MatSortModule,
          MatTableModule,
          MatTooltipModule,
          MatDialogModule,
          MatDatepickerModule,
          MatSelectModule,
          MatNativeDateModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { TokenInterceptor } from '../../core/class/token.interceptor';

const routes: Routes = [
  { path: '', component: CashOpenCloseComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,    
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,    
    MatSortModule, 
    MatTableModule,
    MatTooltipModule,
    MatSelectModule,
    MatNativeDateModule,    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule,
    CdkTableModule
  ],
  declarations: [CashOpenCloseComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CashOpenCloseModule { }
