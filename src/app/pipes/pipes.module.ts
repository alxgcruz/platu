import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreIdPipe } from './nombre-id.pipe';

@NgModule({
  declarations: [
    NombreIdPipe
  ],
  exports: [
    NombreIdPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
