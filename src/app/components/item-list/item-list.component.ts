import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable} from 'angularfire2';
import {FirebaseItemService} from '../../services/firebase-item.service';

@Component({
    selector: 'item-list',
    templateUrl: './item-list.component.html'
})
export class ItemList implements OnInit {
    items:[any];
    constructor(private firebaseItemService: FirebaseItemService) {
        
     }

    ngOnInit() { 
        this.firebaseItemService.getList().subscribe(items=>{
            console.log("in the subscription " + items.length);
            this.items = items; 
        });

    }

}