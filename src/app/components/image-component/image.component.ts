import {Image} from '../../interfaces/Image'
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FirebaseObjectObservable, AngularFire, FirebaseApp} from 'angularfire2';
import {ImageManagementService} from '../../services/image-management.service'
@Component({
    selector: 'firebase-image',
    templateUrl: 'image.component.html',
    styleUrls:['image.component.css']
})
export class ImageComponent implements OnInit {
    @Input() imageKey:string;
    @Input() folderName:string;
    firebaseApp:any;
    imageURL:string;

    constructor(private af: AngularFire, @Inject(FirebaseApp) firebaseApp:any, public imageManagementService:ImageManagementService) { 
        this.firebaseApp = firebaseApp;
    }
    ngOnInit() {    
        let that = this;
        if (this.imageKey) {
            var callback = function(url) {
                that.imageURL = url;
            }
            this.imageManagementService.getImagePath(this.imageKey, callback, this.folderName);
        } else {
            this.loadPlaceHolderImage();
        }
    }
    loadPlaceHolderImage() {
        this.imageURL = 'http://i.imgur.com/3Wykn1q.gif';
    }
    deleteImage() {
        function callback(data) {
            console.log('Image Got Deleted');
        }
        this.imageManagementService.deleteImage(this.imageKey, callback)
    }
    ngOnChanges() {
                
    }

}