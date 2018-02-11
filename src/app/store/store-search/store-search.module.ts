import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreSearchComponent } from './store-search.component';
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
import { StoreMaintenanceComponent } from '../store-maintenance/store-maintenance.component';
import { StoreMaintenanceModule } from '../store-maintenance/store-maintenance.module';
import {CdkTableModule} from '@angular/cdk/table';

const routes: Routes = [
  { path: '', component: StoreSearchComponent}
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
    StoreMaintenanceModule,
    MatSortModule, 
    MatTableModule, 
    CdkTableModule,
    MatPaginatorModule
  ],
  declarations: [StoreSearchComponent],
  entryComponents: [StoreMaintenanceComponent]
})
export class StoreSearchModule { }