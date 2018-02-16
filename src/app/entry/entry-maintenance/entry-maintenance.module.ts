import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryMaintenanceComponent } from './entry-maintenance.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, 
  MatCardModule, 
  MatFormFieldModule, 
  MatIconModule,
  MatTableModule,
  MatTooltipModule,
  MatDialogModule, 
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './../../core/class/token.interceptor';
import { Routes, RouterModule } from '@angular/router';
import { StoreMaintenanceComponent } from '../../store/store-maintenance/store-maintenance.component';
import { StoreMaintenanceModule } from '../../store/store-maintenance/store-maintenance.module';
import { SupplierMaintenanceComponent } from '../../supplier/supplier-maintenance/supplier-maintenance.component';
import { SupplierMaintenanceModule } from '../../supplier/supplier-maintenance/supplier-maintenance.module';

const routes: Routes = [
  { path: 'entryMaintenance', component: EntryMaintenanceComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule, 
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreMaintenanceModule,
    SupplierMaintenanceModule
  ],
  declarations: [EntryMaintenanceComponent],
  entryComponents: [EntryMaintenanceComponent, StoreMaintenanceComponent, SupplierMaintenanceComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class EntryMaintenanceModule { }
