import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FirebaseProductService } from '../../services/firebase-product.service';
import { FormComponentModel } from '../../interfaces/form-component-model.interface'
@Component({
    moduleId: module.id,
    selector: 'product-selection',
    templateUrl: './product-selection.component.html'
})
export class ProductSelectionComponent implements OnInit, OnChanges {
    @Output() productSelectionUpdated = new EventEmitter();
    private products: any[];
    private selectedProducts: any[];
    private componentModel: FormComponentModel;

    constructor(private firebaseProductService: FirebaseProductService) { }

    ngOnInit() {
        let that = this;
        this.firebaseProductService.getProductList((snapshot) => {
            that.products = snapshot;
        });
        this.onComponentUpdate();

    }
    private onComponentUpdate() {
        this.componentModel = { isValid: this.isComponentValid(), invalidMessage: 'Please select Products', formModel: this.selectedProducts, item:'product-selection' };
        this.productSelectionUpdated.emit(this.componentModel);
    }
    ngOnChanges() {
        this.onComponentUpdate();
    }
    isComponentValid(): boolean {
        return this.selectedProducts && this.selectedProducts.length ? true : false;
    }

    onProductSelect(product) {
        if (product) {
            this.selectedProducts = this.selectedProducts || [];
            if (!(this.getIndex(product) > -1)) {
                this.selectedProducts.push(product);
                this.onComponentUpdate();
            }
        }

    }
    private getIndex(product) {
        if (this.selectedProducts && this.selectedProducts.length) {
            return this.selectedProducts.findIndex(function (item) {
                return product.key === item.key;
            });
        }
    }
    deleteProduct(product) {
        let index: number = this.getIndex(product);
        if (this.selectedProducts && this.selectedProducts.length && index > -1) {
            this.selectedProducts.splice(index, 1);
            this.onComponentUpdate();
        }

    }


}