import {Image} from '../../interfaces/Image'
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FirebaseObjectObservable, AngularFire, FirebaseApp} from 'angularfire2';

@Component({
    selector: 'firebase-image',
    templateUrl: 'image.component.html',
    styleUrls:['image.component.css']
})
export class ImageComponent implements OnInit {
    @Input() imageKey:string;
    firebaseApp:any;
    imagePath:string = '/shitImages/images/';
    imageObj: FirebaseObjectObservable<Image>;
    imageURL:string;

    constructor(private af: AngularFire, @Inject(FirebaseApp) firebaseApp:any) { 
        this.firebaseApp = firebaseApp;
    }
    ngOnInit() {    
        if (this.imageKey) {
            let that = this;
            let storage = this.firebaseApp.storage();
            this.imageObj = this.af.database.object(this.imagePath + this.imageKey);
            let temp = this.imageObj;
            this.imageObj.subscribe(snapshot=> {
                console.log("snapshot path " + snapshot.path);
                let pathReference = storage.ref(snapshot.path);
                pathReference.getDownloadURL().then(url=> {
                    console.log("url fetched " + temp);
                    this.imageURL = url;
                });
            });
        }
    }
    ngOnChanges() {
                
    }

}