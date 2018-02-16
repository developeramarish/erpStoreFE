import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierSearchComponent } from './supplier-search.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { 
  MatCardModule, 
  MatInputModule, 
  MatButtonModule, 
  MatFormFieldModule, 
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatTooltipModule,
  MatSortModule,
  MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from '../../core/shared/shared.module';
import { SupplierMaintenanceComponent } from '../supplier-maintenance/supplier-maintenance.component';
import { SupplierMaintenanceModule } from '../supplier-maintenance/supplier-maintenance.module';
import {CdkTableModule} from '@angular/cdk/table';

const routes: Routes = [
  { path: '', component: SupplierSearchComponent}
];

@NgModule({
  exports:[
    
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule,
    SupplierMaintenanceModule,
    MatSortModule, 
    MatTableModule, 
    CdkTableModule,
    MatPaginatorModule
  ],
  declarations: [SupplierSearchComponent],
  entryComponents: [SupplierMaintenanceComponent]
})
export class SupplierSearchModule { }