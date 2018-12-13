import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HotObservableComponent } from './hot-observable/hot-observable.component';
import { ColdObservableComponent } from './cold-observable/cold-observable.component';
import { SubjectsComponent } from './subjects/subjects.component';

const appRoutes: Routes = [
  {path: 'hot-observable', component: HotObservableComponent},
  {path: 'cold-observable', component: ColdObservableComponent},
  {path: 'subjects', component: SubjectsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HotObservableComponent,
    ColdObservableComponent,
    SubjectsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
