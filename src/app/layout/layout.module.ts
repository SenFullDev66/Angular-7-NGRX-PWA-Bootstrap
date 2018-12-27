import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';

export const layoutModuleDeclarations = [
  LayoutComponent
];

@NgModule({
  declarations: layoutModuleDeclarations,
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
