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
        this.information.descriptionParagraphs = ['Some Shit about Firm'];
        this.information.owners = ['Hon. Chuni Seth'];
        this.information.address = {};
        this.information.address.line1 = 'Uppar Mala';
        this.information.address.line2 = 'Patli Gali';
        this.information.address.state = 'Gujarat';
        this.information.address.pincode = '384170';
        this.information.address.city = 'Unjha';
        this.information.firmName = 'Chuni Lal';
        this.information.unique_url = 'chuni_lal';
        this.information.phone1 = '2342224';
        this.information.phone2 = '2223443334';

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
        this.onComponentUpdate();
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
            item:'info'
        }
        this.formInformationUpdated.emit(formComponent);

    }
    updateFields() {
        this.onComponentUpdate();
        
    }


}