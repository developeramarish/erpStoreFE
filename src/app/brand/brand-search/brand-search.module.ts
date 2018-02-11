import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandSearchComponent } from './brand-search.component';
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
import { BrandMaintenanceComponent } from '../brand-maintenance/brand-maintenance.component';
import { BrandMaintenanceModule } from '../brand-maintenance/brand-maintenance.module';
import {CdkTableModule} from '@angular/cdk/table';

const routes: Routes = [
  { path: '', component: BrandSearchComponent}
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
    BrandMaintenanceModule,
    MatSortModule, 
    MatTableModule, 
    CdkTableModule,
    MatPaginatorModule
  ],
  declarations: [BrandSearchComponent],
  entryComponents: [BrandMaintenanceComponent]
})
export class BrandSearchModule { }