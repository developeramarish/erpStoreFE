import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './core/class/token.interceptor'

import { MainComponent } from './core/main/main.component';
import { CoreModule } from './core/core.module';
import { MainModule } from './core/main/main.module';
import { SharedModule } from './core/shared/shared.module';



@NgModule({
  declarations: [
    
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
    CoreModule,
    MainModule,
    SharedModule
    
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
