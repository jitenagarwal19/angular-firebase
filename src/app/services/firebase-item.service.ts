import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
@Injectable()

export class FirebaseItemService {
    private items:FirebaseListObservable<any>;

    constructor(private af:AngularFire) { }
    private initList() {
        if (!this.items) {
            this.items = this.af.database.list('/items');
        }
    }
    getList() {
        this.initList();
        return this.items;

    }
    pushItemInList(item) {
        this.initList();
        if (!item)
            return;
        return this.items.push(item);
    }

}