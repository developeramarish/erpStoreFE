import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMaintenanceComponent } from './profile-maintenance.component';
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
  MatPaginatorModule,
  MatCheckboxModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared/shared.module';
import { CdkTableModule } from '@angular/cdk/table';
import { Routes, RouterModule } from '@angular/router';
import { TokenInterceptor } from '../../core/class/token.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'profileMaintenance', component: ProfileMaintenanceComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSortModule, 
    MatTableModule, 
    CdkTableModule,
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileMaintenanceComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class ProfileMaintenanceModule { }
