import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable} from 'angularfire2';
import {FirebaseItemService} from '../../services/firebase-item.service';
var temp1:any = module;
@Component({
    selector: 'item-list',
    templateUrl: './item-list.component.html',
    styleUrls : ['./item-list.component.css']
})
export class ItemList implements OnInit {
    items:[any];
    temp:any = temp1;
    searchField : string = 'test';
    constructor(private firebaseItemService: FirebaseItemService) {
        
     }
     searchFieldChange() {
         console.log(`hello there ${this.searchField}`);
     }

    ngOnInit() { 
        this.firebaseItemService.getList().subscribe(items=>{
            console.log("in the subscription " + items.length);
            this.items = items; 
        });

    }

}