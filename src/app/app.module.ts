import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { ItemComponent } from './components/item/item.component';
import { FirebaseFormComponent } from './components/firebase-form/firebase-form.component';
import { FirebaseItemService } from './services/firebase-item.service';
import { ItemList } from './components/item-list/item-list.component';
import { TestComponent } from './components/test-component/test-component.component';
import { ImageUpload } from './components/image-upload/image-upload.component';
import { ImageComponent } from './components/image-component/image.component';
import { ImageManagementService } from './services/image-management.service';
import { UtilityService } from './services/utilities.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.compoment'
import { RouterModule, Routes } from "@angular/router";
import {ItemDetailsComponent} from './components/item-detail/item-detail.component';
import {MaterialModule} from '@angular/material';
import { AppComponent } from './components/app-components/app.component';

const appRoutes: Routes = [
  {
    'path': 'test-url/:name',
    component: TestComponent
  },
  {
    path:'list',
    component:ItemList
  },
  {
    path:'',
    redirectTo:'/list',
    pathMatch:'full'
    
  },
   {
    path:'details/:itemId',
    component:ItemDetailsComponent

  },
  {
    path:'form',
    component:FirebaseFormComponent
  },
  
  {
    path: '**', component:PageNotFoundComponent,
  }
  
]


export const firebaseConfig = {
  apiKey: "AIzaSyD2spTcblilPgr5ybQBtg6NvCSeBHc6DME",
  authDomain: "angular-2-ae74c.firebaseapp.com",
  databaseURL: "https://angular-2-ae74c.firebaseio.com",
  storageBucket: "angular-2-ae74c.appspot.com",
  messagingSenderId: "991992043678"
};

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    FirebaseFormComponent,
    ItemList,
    ImageUpload,
    ImageComponent,
    TestComponent,
    PageNotFoundComponent,
    ItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseItemService, ImageManagementService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
