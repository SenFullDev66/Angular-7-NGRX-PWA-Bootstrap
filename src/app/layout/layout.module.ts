import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { StoreModule } from '@ngrx/store';
import * as fromLayout from './layout.reducer';

export const layoutModuleDeclarations = [
  LayoutComponent
];

export const layoutModuleImports = [
  StoreModule.forFeature('layout', fromLayout.layoutReducer)
];

@NgModule({
  declarations: layoutModuleDeclarations,
  imports: [
    CommonModule,
    ...layoutModuleImports,
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
