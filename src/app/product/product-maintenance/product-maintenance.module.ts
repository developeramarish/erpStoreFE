import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMaintenanceComponent } from './product-maintenance.component';
import { SharedModule } from '../../core/shared/shared.module';
import {  MatButtonModule, 
          MatCardModule,
          MatDialogModule, 
          MatFormFieldModule, 
          MatIconModule,
          MatInputModule,
          MatSelectModule,
          MatOptionModule, 
          MatTableModule,
          MatTooltipModule, 
          MatSortModule,
          MatCheckboxModule,
          MatRadioModule,
          MatStepperModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './../../core/class/token.interceptor';
import { CategoryMaintenanceComponent } from '../../category/category-maintenance/category-maintenance.component';
import { CategoryMaintenanceModule } from '../../category/category-maintenance/category-maintenance.module';
import { BrandMaintenanceComponent } from '../../brand/brand-maintenance/brand-maintenance.component';
import { BrandMaintenanceModule } from '../../brand/brand-maintenance/brand-maintenance.module';
import { UnitMaintenanceComponent } from '../../unit/unit-maintenance/unit-maintenance.component';
import { UnitMaintenanceModule } from '../../unit/unit-maintenance/unit-maintenance.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule, 
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatRadioModule,
    MatSortModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CategoryMaintenanceModule,
    BrandMaintenanceModule,
    UnitMaintenanceModule
  ],
  declarations: [ProductMaintenanceComponent],
  exports: [ProductMaintenanceComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [CategoryMaintenanceComponent, BrandMaintenanceComponent, UnitMaintenanceComponent]
})
export class ProductMaintenanceModule { }
