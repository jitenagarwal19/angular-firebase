import { Component, OnInit, EventEmitter } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseItemService} from '../../services/firebase-item.service';

@Component({
    selector: 'firebase-form',
    templateUrl: './firebase-form.component.html'  
})
export class FirebaseFormComponent implements OnInit {
    items:FirebaseListObservable<any>;
    address:String;
    name:String;

    constructor(af:AngularFire, private firebaseItemService:FirebaseItemService) {
        this.items = af.database.list('/items');
     }
     addFields() {
         if (this.name && this.address) {
             const promise = this.firebaseItemService.pushItemInList({name:this.name, address:this.address});
             if (promise) {
                 promise
                 .catch(function(error) {
                     console.log('Something got fucked ' + error.message);
                 })
             }
             this.name = "";
             this.address = "";
         } else {
             alert('Hey Valid Values Please');
         }
     }
    ngOnInit() { 
            
    }

}