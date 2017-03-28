import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  item : FirebaseObjectObservable<any[]>;
  folderName:string = 'testFolder';
  
  constructor(af:AngularFire) {
    this.item = af.database.object('/items');  
  }

  imageUploaded(image:any) {    
    console.log("in the caller ", JSON.stringify(image));
  }
  
}

