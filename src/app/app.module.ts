import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HotObservableComponent } from './hot-observable/hot-observable.component';
import { ColdObservableComponent } from './cold-observable/cold-observable.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { OperatorsComponent } from './operators/operators.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const appRoutes: Routes = [
  {path: 'hot-observable', component: HotObservableComponent},
  {path: 'cold-observable', component: ColdObservableComponent},
  {path: 'subjects', component: SubjectsComponent},
  {path: 'operators', component: OperatorsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HotObservableComponent,
    ColdObservableComponent,
    SubjectsComponent,
    OperatorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
