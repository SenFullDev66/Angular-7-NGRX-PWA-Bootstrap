import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { StoreModule } from '@ngrx/store';
import * as fromLayout from './layout.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from './layout.effects';
import { PageComponent } from './page/page.component';
import { MessageComponent } from './message/message.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

export const layoutModuleDeclarations = [
  LayoutComponent,
  PageComponent,
  MessageComponent
];

export const layoutModuleImports = [
  StoreModule.forFeature('layout', fromLayout.layoutReducer),
  EffectsModule.forFeature([LayoutEffects]),
  NgbAlertModule
];

@NgModule({
  declarations: [...layoutModuleDeclarations],
  imports: [CommonModule, ...layoutModuleImports],
  exports: [LayoutComponent, PageComponent]
})
export class LayoutModule {}
