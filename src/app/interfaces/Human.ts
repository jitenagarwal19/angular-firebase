import {Image} from './Image';

export interface Human {
    name:string;
    address:string;
    profilePhoto:Image;
    otherPhotos?:[Image];
}