import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

    constructor() { }
    generateRandomString() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    isFileNameImage(fileName:string):boolean {
        let validFileFormats:[string] = ['jpg', 'png', 'jpeg'];
        let isImageFile = false;
        validFileFormats.some((element, index) => {
            let location = fileName.toLowerCase().indexOf(('.' + element));
            return isImageFile = location!==-1;
        })

        return isImageFile;

    }

}