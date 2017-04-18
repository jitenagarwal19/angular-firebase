import { Image } from '../../interfaces/Image';
import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFire, FirebaseApp } from 'angularfire2';
import { UtilityService } from '../../services/utilities.service';
import { ImageManagementService } from '../../services/image-management.service';
import { FormComponentModel } from '../../interfaces/form-component-model.interface';


@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.html',
    styleUrls: ['./image-upload.component.css']
})
export class ImageUpload {
    @Input() folder: string;
    @Output() imageUploaded = new EventEmitter();
    id: string;
    isUploading: boolean = false;
    firebaseApp: any;
    fileUploadStatus: string = "Please choose a file";
    addedImages: any[] = [];
    uploadedImages: any[] =[];

    constructor(public af: AngularFire, @Inject(FirebaseApp) firebaseApp: any, private utilityService: UtilityService, private imageManagementService: ImageManagementService) {
        this.firebaseApp = firebaseApp;
        this.id = 'image-upload-input-' + utilityService.generateRandomString();
    }

    ngOnInit() {

    }
    ngOnChanges() {
        this.onComponentUpdate();

    }
    onComponentUpdate() {
        let formComponent: FormComponentModel = {
            isValid: this.isComponentValid(),
            invalidMessage: 'Please Upload Image',
            formModel: this.uploadedImages,
            item: 'image-upload'
        };
        this.imageUploaded.emit(formComponent);
    }
    isComponentValid(): boolean {
        return !this.isUploading && (this.uploadedImages.length === this.addedImages.length) ? true : false;
    }
    removeImage(index: number) {
        this.addedImages.splice(index, 1);
    }

    private onFileInputChange() {
        let fileList = this.getFileListFromInput()
        if (fileList && fileList.length) {
            for (let i = 0; i < fileList.length; i++) {
                if (this.utilityService.isFileNameImage(fileList[i].name)) {
                    this.addedImages.push(fileList[i]);
                    (function (file) {
                        file.status = 'Standby';
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            file.src = reader.result;
                        }
                        reader.readAsDataURL(file);
                    })(this.addedImages[this.addedImages.length - 1]);
                }

            }
        }
    }
    private getFileListFromInput() {
        return [(<HTMLInputElement>document.getElementById(this.id)).files][0];
    }

    uploadImage() {
        var that = this;
        this.addedImages.forEach((imageFile) => {
            imageFile.status = 'uploading'
            this.imageManagementService.uploadImage(imageFile, this.folder, function(imageObj) {
                that.af.database.object(`/images/${that.imageManagementService.getFolderName(that.folder)}/${imageObj.key}`).set(imageObj);
                imageFile.status = 'upload complete';
                that.imageUploadComplete(imageObj);
            });
        });
    }
    private imageUploadComplete(imageObject: any) {
        if (imageObject) {
            this.uploadedImages.push(imageObject);
            if (this.uploadedImages.length === this.addedImages.length) {
                alert('All  images uploaded');
                this.onComponentUpdate();
            }
        }
        

    }
    ngOnDestroy() {
    }


}
