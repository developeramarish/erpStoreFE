import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleSearchComponent } from './sale-search.component';
import { SaleMaintenanceComponent } from '../sale-maintenance/sale-maintenance.component';
import { SaleMaintenanceModule } from '../sale-maintenance/sale-maintenance.module';
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
          MatDialogModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { TokenInterceptor } from '../../core/class/token.interceptor';

const routes: Routes = [
  { path: '', component: SaleSearchComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,    
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,    
    MatSortModule, 
    MatTableModule,
    MatTooltipModule,    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule,
    SaleMaintenanceModule,
    CdkTableModule
  ],
  declarations: [SaleSearchComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [SaleMaintenanceComponent]
})
export class SaleSearchModule { }
