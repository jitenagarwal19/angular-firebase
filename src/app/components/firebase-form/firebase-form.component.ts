import { Component, OnInit} from '@angular/core';
import {FirebaseItemService} from '../../services/firebase-item.service';
import {FormComponentModel} from './../../interfaces/form-component-model.interface';
@Component({
    selector: 'firebase-form',
    templateUrl: './firebase-form.component.html' ,
    styleUrls:['./firebase-form.component.css']

})
export class FirebaseFormComponent implements OnInit {
    private componentModels:any = {};
    invalidMessages:string[] = [];

    constructor(private firebaseItemService:FirebaseItemService) {
        
     }
    
     addFields() {
         if (this.isValid()) {
             console.log('yes everything is correct');
             this.firebaseItemService.pushItemInList(this.componentModels);
         }
     }
    ngOnInit() { 
            
    }
   
    private isValid():boolean {
        let result:boolean = true;
        this.invalidMessages = [];
        for (let key in this.componentModels) {
            if (!this.componentModels[key].isValid) {
                result = false;
                console.log('pushing in invalid messages ' + this.componentModels[key].invalidMessage)
                this.invalidMessages.push(this.componentModels[key].invalidMessage);
            }
        }
        return result;
    }
    private componentFieldUpdate(componentModel:FormComponentModel) {
        
        if (componentModel) {
            this.componentModels[componentModel.item] = componentModel; 
        }
        this.isValid();
    }
  
}