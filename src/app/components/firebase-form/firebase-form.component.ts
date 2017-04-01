import { Component, OnInit} from '@angular/core';
import {FirebaseItemService} from '../../services/firebase-item.service';

@Component({
    selector: 'firebase-form',
    templateUrl: './firebase-form.component.html'  
})
export class FirebaseFormComponent implements OnInit {
    address:string;
    name:string;
    folderName:'form-item';
    image:any;

    constructor(private firebaseItemService:FirebaseItemService) {
        
     }
    
     addFields() {
         if (!this.image) {
             alert("Please upload Image");
         }
         if (this.name && this.address && this.image) {
             const promise = this.firebaseItemService.pushItemInList({name:this.name, address:this.address, image:this.image.key});
             if (promise) {
                 promise
                 .catch(function(error) {
                     console.log('Something got fucked ' + error.message);
                 })
             }
             this.name = "";
             this.address = "";
         } else {
             alert('Hey Valid Values Please');
         }
     }
    ngOnInit() { 
            
    }
    imageUploaded(image:any) {
        console.log("Image uploaded successfully");
        this.image = image;
    }
    productImageUploaded(image:any) {

    }
    addProduct() {
        
    }

}