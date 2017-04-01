import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {FirebaseItemService} from '../../services/firebase-item.service'
import {FirebaseObjectObservable} from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'item-details',
    templateUrl: './item-detail.component.html'
})
export class ItemDetailsComponent implements OnInit {
    private item:any;

    constructor(
        private firebaseItemService:FirebaseItemService,
        private route:ActivatedRoute,
        private location:Location
    ) { }

    ngOnInit() { 
        var that = this;
        let successCallback = function(itemObject) {
            that.item = itemObject;
        }
        let failureCallback = function(error) {
            console.log(error);
        }
        if (this.route.snapshot.params['itemId']) {
            this.firebaseItemService.getItemAsObject(this.route.snapshot.params['itemId'], successCallback, failureCallback);
        }
        
    }

}