import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryMaintenanceComponent } from './category-maintenance.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, 
  MatCardModule, 
  MatFormFieldModule, 
  MatIconModule,
  MatTableModule,
  MatTooltipModule,
  MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './../../core/class/token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [CategoryMaintenanceComponent],
  exports: [CategoryMaintenanceComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CategoryMaintenanceModule { }
