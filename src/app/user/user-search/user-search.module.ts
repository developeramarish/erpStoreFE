import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchComponent } from './user-search.component';
import { UserMaintenanceComponent } from '../user-maintenance/user-maintenance.component';
import { UserMaintenanceModule } from '../user-maintenance/user-maintenance.module';
import { SharedModule } from '../../core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../core/class/token.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  MatButtonModule, 
          MatCardModule, 
          MatDialogModule,
          MatFormFieldModule,
          MatIconModule,
          MatInputModule,
          MatTooltipModule,
          MatTableModule,
          MatPaginatorModule,
          MatSortModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserSearchComponent }
];


@NgModule({
  imports: [
    CommonModule,
    UserMaintenanceModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,    
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatTableModule, 
    CdkTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserSearchComponent],
  entryComponents: [UserMaintenanceComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class UserSearchModule { }