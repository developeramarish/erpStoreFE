import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes,RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatMenuModule, MatToolbarModule, MatTooltipModule, MatIconModule } from '@angular/material'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule, 
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent, MenuComponent],
  exports:[HomeComponent, MenuComponent]
  
})
export class CoreModule { }
