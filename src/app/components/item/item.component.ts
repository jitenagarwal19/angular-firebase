import { Component, Input } from '@angular/core';
import {FirebaseObjectObservable} from 'angularfire2';
@Component({
    selector:'firebase-item',
    templateUrl: './item.component.html',
    styleUrls:['./item.component.css']
})
export class ItemComponent {
    @Input() item:any;
    ngOnInit() {
        
    }
    ngOnChanges(SimpleChanges) {
    }

}
