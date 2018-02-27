import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMaintenanceComponent } from './user-maintenance.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, 
  MatCardModule, 
  MatFormFieldModule, 
  MatIconModule,
  MatTableModule,
  MatTooltipModule,
  MatDialogModule, 
  MatOptionModule,
  MatSelectModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './../../core/class/token.interceptor';
import { StoreMaintenanceComponent } from '../../store/store-maintenance/store-maintenance.component';
import { StoreMaintenanceModule } from '../../store/store-maintenance/store-maintenance.module';

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
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreMaintenanceModule
  ],
  declarations: [UserMaintenanceComponent],
  exports: [UserMaintenanceComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [StoreMaintenanceComponent]
})
export class UserMaintenanceModule { }