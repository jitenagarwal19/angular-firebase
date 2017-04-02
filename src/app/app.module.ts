
//3rd party
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import {MaterialModule} from '@angular/material';
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//services
import { UtilityService } from './services/utilities.service';
import { FirebaseItemService } from './services/firebase-item.service';
import { ImageManagementService } from './services/image-management.service';
import {FirebaseProductService} from './services/firebase-product.service';

//components
import { AppComponent } from './components/app-components/app.component';
import { FirebaseFormComponent } from './components/firebase-form/firebase-form.component';
import { ItemComponent } from './components/item/item.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.compoment'
import { ItemList } from './components/item-list/item-list.component';
import { ImageUpload } from './components/image-upload/image-upload.component';
import { ImageComponent } from './components/image-component/image.component';
import {ItemDetailsComponent} from './components/item-detail/item-detail.component';
import {ProductAdditionComponent} from './components/product-addition/product-addition.component';
import {ProductSelectionComponent} from './components/product-selection/product-selection.component';





const appRoutes: Routes = [
  {
    path:'form',
    component:FirebaseFormComponent
  },
  {
    path:'list',
    component:ItemList
  },
  {
    path:'',
    redirectTo:'/form',
    pathMatch:'full'
    
  },
   {
    path:'details/:itemId',
    component:ItemDetailsComponent
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
    PageNotFoundComponent,
    ItemDetailsComponent,
    ProductAdditionComponent,
    ProductSelectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [FirebaseItemService, ImageManagementService, UtilityService, FirebaseProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
