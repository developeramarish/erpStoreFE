import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, 
  MatCardModule, 
  MatFormFieldModule, 
  MatIconModule,
  MatTableModule,
  MatTooltipModule,
  MatDialogModule, 
  MatSelectModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './../../core/class/token.interceptor';
import { SupplierMaintenanceComponent } from './supplier-maintenance.component';

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
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [SupplierMaintenanceComponent],
  exports: [SupplierMaintenanceComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SupplierMaintenanceModule { }
