import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material';
import { ProcessingComponent } from '../processing/processing.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  declarations: [ProcessingComponent],
  exports: [ProcessingComponent] 
})
export class SharedModule { }
