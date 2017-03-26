import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  item : FirebaseObjectObservable<any[]>;
  folderName:'testFolder';
  constructor(af:AngularFire) {
    this.item = af.database.object('/items');  
  }
  title = 'app Wow!';
}
