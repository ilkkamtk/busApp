import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AgmCoreModule} from 'angular2-google-maps/core';

import {AppComponent} from './app.component';
import {SettingsComponent} from './settings/settings.component';
import {MainComponent} from './main/main.component';
import {MapService} from "./map.service";

const routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXQjpyD9IZKRZoogfOPjkdYMN-pH0exnU'
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
