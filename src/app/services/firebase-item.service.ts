import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class FirebaseItemService {
    private items:FirebaseListObservable<any>;
    private rootItemURL:string = '/items1'


    constructor(private af:AngularFire) { 
        
    }
    private initList() {
        if (!this.items) {
            this.items = this.af.database.list(this.rootItemURL);
        }
    }
    getList() {
        this.initList();
        return this.items;

    }
    pushItemInList(item) {
        // this.initList();
        // if (!item)
        //     return;
        // return this.items.push(item);

        let path:string = `${this.rootItemURL}/${item.info.unique_url}`;
        this.af.database.object(path).update(item);
    }
    getItemAsObservable(itemId) {
        return this.af.database.object(`${this.rootItemURL}/${itemId}`); 
    }
    getItemAsObject(itemId:string,successCallback:(n:any)=>void, failureCallback:(errorMessage:string)=>void) {
        let that = this;
        this.af.database.object(`${that.rootItemURL}/${itemId}`).subscribe(snapshot=>{
            if (snapshot.$exists()) {
                successCallback(snapshot);
            } else {
                failureCallback("Object does not exist");
            }
        });
    }

}