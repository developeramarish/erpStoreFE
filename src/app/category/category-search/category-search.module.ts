import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySearchComponent } from './category-search.component';
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
import { CategoryMaintenanceComponent } from '../category-maintenance/category-maintenance.component';
import { CategoryMaintenanceModule } from '../category-maintenance/category-maintenance.module';
import {CdkTableModule} from '@angular/cdk/table';

const routes: Routes = [
  { path: '', component: CategorySearchComponent}
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
    CategoryMaintenanceModule,
    MatSortModule, 
    MatTableModule, 
    CdkTableModule,
    MatPaginatorModule
  ],
  declarations: [CategorySearchComponent],
  entryComponents: [CategoryMaintenanceComponent]
})
export class CategorySearchModule { }