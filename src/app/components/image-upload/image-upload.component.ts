import { Image } from '../../interfaces/Image';
import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFire, FirebaseApp } from 'angularfire2';
import { UtilityService } from '../../services/utilities.service';
import { ImageManagementService } from '../../services/image-management.service';
import { FormComponentModel } from '../../interfaces/form-component-model.interface';


@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.html'
})
export class ImageUpload {
    @Input() folder: string;
    @Output() imageUploaded = new EventEmitter();


    static componentCounter: number = 0;
    private componentId: number;
    isUploading: boolean = false;
    firebaseApp: any;
    fileUploadStatus: string = "Please choose a file";
    private image: any;

    constructor(public af: AngularFire, @Inject(FirebaseApp) firebaseApp: any, private utilityService: UtilityService, private imageManagementService: ImageManagementService) {
        this.firebaseApp = firebaseApp;
    }

    ngOnInit() {
        ImageUpload.componentCounter++;
        this.componentId = ImageUpload.componentCounter - 1;
    }
    ngOnChanges() {
        this.onComponentUpdate();
    }
    onComponentUpdate() {
        let formComponent: FormComponentModel = {
            isValid: this.isComponentValid(),
            invalidMessage: 'Please Upload Image',
            formModel: this.image,
            item: 'image-upload'
        };
        this.imageUploaded.emit(formComponent);
    }
    isComponentValid(): boolean {
        return !this.isUploading && this.image ? true : false;
    }

    uploadImage() {
        var that = this;
        for (let selectedFile of [(<HTMLInputElement>document.getElementsByClassName('file-upload')[this.componentId]).files[0]]) {
            if (selectedFile) {
                if (!this.utilityService.isFileNameImage(selectedFile.name)) {
                    this.fileUploadStatus = "Select appropriate Format of Image File";
                    this.isUploading = false;
                    return;
                }
                this.imageManagementService.uploadImage(selectedFile, this.folder, function (imageObj) {
                    that.af.database.object(`/images/${that.imageManagementService.getFolderName(that.folder)}/${imageObj.key}`).set(imageObj);
                    that.imageUploadComplete(imageObj);
                });
            }
        }
    }
    private imageUploadComplete(imageObject: any) {
        this.isUploading = false;
        this.image = imageObject;
        this.fileUploadStatus = "Image Upload successful";
        this.onComponentUpdate();

    }
    ngOnDestroy() {
        ImageUpload.componentCounter--;
        ImageUpload.componentCounter = ImageUpload.componentCounter < 0 ? 0 : ImageUpload.componentCounter;
    }


}
