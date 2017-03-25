import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AngularFireModule} from 'angularfire2';


import { AppComponent } from './components/app-components/app.component';

export const firebaseConfig =  {
    apiKey: "AIzaSyD2spTcblilPgr5ybQBtg6NvCSeBHc6DME",
    authDomain: "angular-2-ae74c.firebaseapp.com",
    databaseURL: "https://angular-2-ae74c.firebaseio.com",
    storageBucket: "angular-2-ae74c.appspot.com",
    messagingSenderId: "991992043678"
  };



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
