import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CurrencyFormatPipe
} from './';

@NgModule({
  declarations: [
    CurrencyFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyFormatPipe
  ]
})
export class SharedModule { }
