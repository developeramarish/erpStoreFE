import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitSearchComponent } from './unit-search.component';
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
import { UnitMaintenanceComponent } from '../unit-maintenance/unit-maintenance.component';
import { UnitMaintenanceModule } from '../unit-maintenance/unit-maintenance.module';
import {CdkTableModule} from '@angular/cdk/table';

const routes: Routes = [
  { path: '', component: UnitSearchComponent}
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
    UnitMaintenanceModule,
    MatSortModule, 
    MatTableModule, 
    CdkTableModule,
    MatPaginatorModule
  ],
  declarations: [UnitSearchComponent],
  entryComponents: [UnitMaintenanceComponent]
})
export class UnitSearchModule { }