import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'info-fields',
    templateUrl: './info-field-form.component.html',
    styleUrls:['./info-field-form.component.css']
})
export class InfoFieldComponent implements OnInit {

    information:any;
    showEditParagraphFields:any;
    showEditOwnerFields:any;
    invalidMessage:string = '';
    @Output() formInformationUpdated = new EventEmitter();

    constructor() { 
        this.information = {};
        this.showEditParagraphFields = {};
        this.showEditOwnerFields = {};
        this.information.descriptionParagraphs = [];
        this.information.owners = [];
        this.information.address = {};
        this.information.address.line1 = '';
        this.information.address.state = 'Gujarat';
        this.information.address.pincode = '384170';
        this.information.address.city = 'Unjha';
        this.information.firmName = '';
        this.information.unique_url = '';
        this.information.phone1 = '';
        this.information.phone2 = '';

    }
    addParagraph() {
        this.information.descriptionParagraphs.push('');
        this.showEditParagraphFields[this.information.descriptionParagraphs.length-1] = true;
    }
    editParagraph(index) {
        this.showEditParagraphFields[index] = true;
    }
    deleteParagraph(index) {
        this.information.descriptionParagraphs.splice(index, 1);

    }
    saveParagraph(index, updatedParagraph) {
        this.showEditParagraphFields[index] = false;
        console.log('updatedParagraph ', updatedParagraph);
        this.information.descriptionParagraphs[index] = updatedParagraph;
    }

    addOwner() {
        this.information.owners.push('');
        this.showEditOwnerFields[this.information.owners.length-1] = true;
    }
    editOwner(index) {
        this.showEditOwnerFields[index] = true;
    }
    deleteOwner(index) {
        this.information.owners.splice(index, 1);
    }
    saveOwner(index, ownerName) {
        this.showEditOwnerFields[index] = false;
        this.information.owners[index] = ownerName.trim();
    }

    ngOnInit() { 
    }
    
    isComponentValid():boolean {
        if (this.information) {
            for (let key in this.information) {
                console.log('in the loop ' + key);
                switch (key) {
                    case 'address':
                        for (let addressKey in this.information[key]) {
                            if (!this.information[key][addressKey])  {
                                this.invalidMessage = 'Please fill all the address details';
                                return false;
                            }
                        }
                    break;
                    case 'descriptionParagraphs':
                    case 'owners':
                        if (!(this.information[key] && this.information[key].length)) {
                            this.invalidMessage =  `Please add atleast one entry to ${key}`;
                            return false;
                        }
                        break;
                    default: 
                        if (!this.information[key]) {
                            this.invalidMessage = `Please input proper value in ${key} field`;
                            return false;
                        }
                        break;
                }
            }
        } else {
            return false;
        }

        return true;
    }
    onComponentUpdate() {
        let formComponent = {
            isValid : this.isComponentValid(),
            invalidMessage:this.invalidMessage,
            formModel:this.information,
            item:'info-fields'
        }
        this.formInformationUpdated.emit(formComponent);

    }
    updateFields() {
        this.onComponentUpdate();
        
    }


}