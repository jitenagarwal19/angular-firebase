import { Injectable } from '@angular/core';
import {UtilityService} from './utilities.service'
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularFire2';
@Injectable()
export class ProductService {
    
    constructor(private af:AngularFire, private utilities:UtilityService) { }

    addProductInList(product:any) {
        let key = this.utilities.generateRandomString();
        product.key = key;
        this.af.database.object(`/products/${key}`).set(product);
    }
    getProductList(successCallback:(productList:any[])=>void) {
        this.af.database.list('/products/').subscribe((snapshot)=> {
            successCallback(snapshot);
        })
        
    }
    getProductObjects(productKeys:string[], successCallback:(productList:any[])=>void) {

        this.af.database.object('products').subscribe((snapshot)=> {
            let result:any[] = [];
            if (snapshot.$exists()) {
                if (Array.isArray(snapshot) && snapshot.length) {
                     result = snapshot.filter(function(product){
                        productKeys.some((key)=>{
                            return (key === product.key);
                        })
                    });
                }
            }
            successCallback(result);    
        });
    }
    getProductObject(productKey:string[], successCallback:(product:any)=>void, errorCallback?:(errorMessage:string)=>void) {
        this.af.database.object(`/products/${productKey}`).first().subscribe((snapshot)=>{
            if (snapshot.$exists()) {                
                successCallback(snapshot);
            } else {
                errorCallback('Product does not exist');
            }
        }, errorCallback);
    }

}