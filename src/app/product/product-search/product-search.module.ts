import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './product-search.component';
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
import { ProductMaintenanceComponent } from '../product-maintenance/product-maintenance.component';
import { ProductMaintenanceModule } from '../product-maintenance/product-maintenance.module';
import {CdkTableModule} from '@angular/cdk/table';

const routes: Routes = [
  { path: '', component: ProductSearchComponent}
];

@NgModule({
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
    MatPaginatorModule,
    MatSortModule, 
    MatTableModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CdkTableModule,
    ProductMaintenanceModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductSearchComponent],
  entryComponents: [ProductMaintenanceComponent]
})
export class ProductSearchModule { }
