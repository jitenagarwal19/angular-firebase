import { Image } from '../../interfaces/Image';
import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFire, FirebaseApp } from 'angularfire2';
import { UtilityService } from '../../services/utilities.service';
import { ImageManagementService } from '../../services/image-management.service';


@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.html'
})
export class ImageUpload {
    @Input() folder: string;
    @Output() imageUploaded = new EventEmitter();
    isUploading: boolean = false;
    firebaseApp: any;
    fileUploadStatus: string = "Please choose a file";

    constructor(public af: AngularFire, @Inject(FirebaseApp) firebaseApp: any, private utilityService: UtilityService, private imageManagementService: ImageManagementService) {
        this.firebaseApp = firebaseApp;
    }

    ngOnInit() {

    }
    ngOnChanges() {

    }
    // uploadImage() {
    //     let storage = this.firebaseApp.storage().ref();
    //     let generatedKey: string = this.utilityService.generateRandomString();
    //     let that = this;
    //     this.isUploading = true;
    //     for (let selectedFile of [(<HTMLInputElement>document.getElementById('file-upload')).files[0]]) {
    //         if (!this.utilityService.isFileNameImage(selectedFile.name)) {
    //             this.fileUploadStatus = "Select appropriate Format of Image File";
    //             this.isUploading = false;
    //             return;
    //         }
    //         console.log("Name of selectedFile " + selectedFile.name);
    //         let path = `/images/${that.folder}/${selectedFile.name}`;
    //         let iRef = storage.child(path);
    //         iRef.put(selectedFile).then((snapshot) => {
    //             console.log('file uploading successful');
    //             let imageObject: any = { path: path, fileName: selectedFile.name, key: generatedKey };
    //             that.af.database.object(`/images/${generatedKey}`).set(imageObject);
    //             this.imageUploadComplete(imageObject);
    //         })
    //     }
    // }
    uploadImage() {
        var that = this;
        for (let selectedFile of [(<HTMLInputElement>document.getElementById('file-upload')).files[0]]) {
            if (!this.utilityService.isFileNameImage(selectedFile.name)) {
                this.fileUploadStatus = "Select appropriate Format of Image File";
                this.isUploading = false;
                return;
            }
            this.imageManagementService.uploadImage(selectedFile, this.folder, function (imageObj) {
                that.af.database.object(`/images/${imageObj.key}`).set(imageObj);
                that.imageUploadComplete(imageObj);
            });


        }
    }
    private imageUploadComplete(imageObject: any) {
        this.isUploading = false;
        this.fileUploadStatus = "Image Upload successful";
        this.imageUploaded.emit(imageObject);
    }


}
