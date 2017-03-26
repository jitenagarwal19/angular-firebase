import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'test-comp',
    template: `<span style = "background-color:red">Hey There</span>`
})
export class TestComponent implements OnInit {
    @Input() testName:string;
    constructor() { }

    ngOnInit() { 
        console.log('in the testComponent ' + this.testName);
    }

}