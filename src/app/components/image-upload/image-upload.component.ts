import {Image} from '../../interfaces/Image';
import {Component, Input, Inject, Output, EventEmitter} from '@angular/core';
import {FirebaseListObservable,FirebaseObjectObservable, AngularFire, FirebaseApp} from 'angularfire2';
import {UtilityService} from '../../services/utilities.service';
import {Observable} from 'rxjs';

@Component({
    selector:'image-upload',
    templateUrl:'./image-upload.html'
})
export class ImageUpload {
    @Input() folder: string;
    @Output() imageUploaded = new EventEmitter();
    isUploading:boolean = false;
    firebaseApp:any;
    fileUploadStatus:string = "Please choose a file";

    constructor(public af:AngularFire, @Inject(FirebaseApp) firebaseApp: any, private utilityService: UtilityService) {
        this.firebaseApp = firebaseApp;
    }

    ngOnInit() {

    }
    ngOnChanges() {
        
    }
    uploadImage() {
        let storage = this.firebaseApp.storage().ref();
        let generatedKey:string = this.utilityService.generateRandomString();
        let that = this;
        this.isUploading = true;
        for (let selectedFile of [(<HTMLInputElement>document.getElementById('file-upload')).files[0]]) {
            if (!this.utilityService.isFileNameImage(selectedFile.name)) {
                this.fileUploadStatus = "Select appropriate Format of Image File";
                this.isUploading =  false;
                return;
            }
            console.log("Name of selectedFile " + selectedFile.name);
            let path = `/images/${that.folder}/${selectedFile.name}`;
            let iRef = storage.child(path);
            iRef.put(selectedFile).then((snapshot)=> {
                console.log('file uploading successful');
                let imageObject:any = {path:path, fileName:selectedFile.name};
                that.af.database.object(`/images/${generatedKey}`).set(imageObject);
                this.imageUploadComplete(imageObject);
            })
        }
    }
    private imageUploadComplete(imageObject:any) {
        this.isUploading = false;
        this.imageUploaded.emit(imageObject);
    }


}
