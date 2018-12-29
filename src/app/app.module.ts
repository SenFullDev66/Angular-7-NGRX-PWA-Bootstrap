import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

export const appModuleImports = [
  StoreModule.forRoot(reducers, { metaReducers }),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  EffectsModule.forRoot([AppEffects]),
  LayoutModule,
  NgbModule
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ...appModuleImports],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
