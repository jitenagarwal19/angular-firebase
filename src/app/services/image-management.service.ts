import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { UtilityService } from './utilities.service';
@Injectable()
export class ImageManagementService {
    firebaseApp: any;
    getFolderName(folderName) {
        return folderName || 'testFolder';

    }
    constructor(private af: AngularFire, @Inject(FirebaseApp) firebaseApp: any, private utilityService: UtilityService) {
        this.firebaseApp = firebaseApp;
    }
    getImagePath(imageKey: string, callback: Function, folderName?: string) {
        let imageRef: string = `/images/${this.getFolderName(folderName)}/${imageKey}`;
        let that = this;
        let storage = this.firebaseApp.storage();
        this.af.database.object(imageRef).subscribe(snapshot => {
            if (snapshot.path) {
                storage.ref(snapshot.path).getDownloadURL().
                    then(callback)
                    .catch(error => {
                        console.log(error);
                    });
            }
        })

    }
    deleteImage(imageKey: string, successCallback: Function, folderName?: string) {
        let imageRef = `/images/${this.getFolderName(folderName)}/${imageKey}`;
        let that = this;
        let storage = this.firebaseApp.storage();
        this.af.database.object(imageRef).subscribe(snapshot => {
            storage.ref(snapshot.path).delete().then(successCallback)
                .catch(error => { console.log("error deleting file") });
        })
        this.af.database.object(imageRef + imageKey).remove();
    }

    uploadImage(selectedFile, folderName, successCallback) {
        let generatedKey = this.utilityService.generateRandomString();
        let storage = this.firebaseApp.storage().ref();
        let path = `/images/${this.getFolderName(folderName)}/${selectedFile.name}`;
        let iRef = storage.child(path);
        iRef.put(selectedFile).then((snapshot) => {
            console.log('fileUploadSuccessful');
            let imageObject: any = { path: path, fileName: selectedFile.name, key: generatedKey, uploadTimeStamp: (new Date()).getTime() };
            successCallback(imageObject);
        })
    }

}