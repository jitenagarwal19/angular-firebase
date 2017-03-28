import { Image } from '../../interfaces/Image';
import { Component, Input, Inject } from '@angular/core';
import { FirebaseListObservable, AngularFire, FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs';


@Component({
    selector: 'image-upload',
    templateUrl: 'image-upload.component.html'
})
export class ImageUpload {
    @Input() folder: string;
    fileList: FirebaseListObservable<Image[]>;
    imageList: any;
    firebaseApp: any;

    constructor(public af: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
        this.firebaseApp = firebaseApp;

        this.folder = "shitImages";

        console.log("i am in constructor folder  " + this.folder);
    }
    ngOnInit() {
        console.log("i am in ngOnInit");
    }
    ngOnChanges() {
        console.log("i am in ngOnChanges");
        let storage = this.firebaseApp.storage();
        this.fileList = this.af.database.list(`/shitImages/images/`);
        this.fileList.subscribe(imageRefs => {

            var that = this;
            this.imageList = [];
            if (imageRefs) {
                imageRefs.forEach(imageItem => {
                    var pathReference = storage.ref(imageItem.path);
                    (function (imageItem, pathReference) {
                        pathReference.getDownloadURL().then(url => {
                            that.imageList.push({
                                $key: imageItem.$key,
                                downloadURL: url,
                                path: imageItem.path,
                                fileName: imageItem.fileName,
                            });
                        })
                        .catch(error => {
                            console.error('something is problem ${imageItem.fileName}');
                        });
                    })(imageItem, pathReference);
                });

            }
            console.log("length of imageList " + this.imageList.length);
        })

    }
    upload() {
        let storageRef = this.firebaseApp.storage().ref();
        let success = false;
        for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
            console.log(selectedFile);

            var that = this;
            // let path = `/$(this.folder)/$(selectedFile.name)`;
            let path = '/' + 'shitImages' + '/' + (selectedFile.name);
            var iRef = storageRef.child(path);
            iRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a blog or file');
                that.af.database.list('shitImages' + '/images/').push({ path: path, fileName: selectedFile.name });
                // that.af.database.list(`$(folder)/images/`)
            });
        }
    }

    delete(image: Image) {
        let storagePath = image.path;
        let referencePath = `${this.folder}/images/` + image.$key;

        //delete from storage
        this.firebaseApp.storage().ref(storagePath).delete()
            .then(
            () => { },
            (error) => console.error('Error deleting stored file ', storagePath)
            );

        //delete reference
        this.af.database.object(referencePath).remove()


    }
    downloadImages() {
        if (this.imageList) {
            this.imageList.forEach(imageItem => {
                imageItem.downloadURL.then(data => {
                    console.log(`${data} for the ${imageItem.fileName}`);
                })

            });
        }
    }

}
