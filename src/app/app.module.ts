import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './core/class/token.interceptor'

import { MainComponent } from './core/main/main.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './core/home/home.component';
import { ProcessingComponent } from './core/processing/processing.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'home',
    component: HomeComponent
  }
]
@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    HomeComponent,
    ProcessingComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: 
  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
