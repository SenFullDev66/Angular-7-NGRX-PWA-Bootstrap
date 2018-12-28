import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { StoreModule } from '@ngrx/store';
import * as fromLayout from './layout.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from './layout.effects';

export const layoutModuleDeclarations = [LayoutComponent];

export const layoutModuleImports = [
  StoreModule.forFeature('layout', fromLayout.layoutReducer),
  EffectsModule.forFeature([LayoutEffects])
];

@NgModule({
  declarations: layoutModuleDeclarations,
  imports: [CommonModule, ...layoutModuleImports],
  exports: [LayoutComponent]
})
export class LayoutModule {}
