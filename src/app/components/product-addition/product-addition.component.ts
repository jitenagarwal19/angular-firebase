import { Component, OnInit } from '@angular/core';
import {FirebaseProductService} from '../../services/firebase-product.service';
@Component({
    moduleId: module.id,
    selector: 'product-addition',
    templateUrl: './product-addition.component.html'
})
export class ProductAdditionComponent implements OnInit {

    image:any;
    productName:string;

    constructor(private firebaseProductService:FirebaseProductService) { }

    ngOnInit() { 


    }
    addProduct() {
        if (this.image && this.productName) {
            const promise = this.firebaseProductService.addProductInList({image:this.image.key, productName:this.productName});
            if (promise) {
                promise.then(function() {
                    alert('Product Added Succsessfully');
                })
                .catch((error)=> {
                    alert(error);
                });
            }
        } else {
            alert('Please Enter appropriate Fields');
        }
    }
    imageUploaded(image) {
        this.image = image;
    }

}