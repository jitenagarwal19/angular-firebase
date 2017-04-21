import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseItemService } from '../../services/firebase-item.service';



@Component({
    selector: 'trader-detail',
    templateUrl: 'trader-detail-page.component.html',
    styleUrls: ['trader-details-page.css']
})
export class TraderDetailComponent implements OnInit {
    shortUrl: string;
    currentStatus: string = 'Loading';
    detail: any = {};
    config: Object = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    };  
    constructor(
        private firebaseItemService: FirebaseItemService,
        private route: ActivatedRoute,
        private location: Location,
    ) {
        console.log('Hey there in params ' + this.route);
        console.log("hey there whats going on");


    }

    ngOnInit() {
        this.shortUrl = this.route.snapshot.params['short_url'];
        this.fetchTraderDetail()
    }
    detailFetchedSuccessful(response) {
        console.log('detail fetched successfully ' + response);
    }
    detailUnableToFetch(error) {
        console.log('Unable to fetch the details ' + error);

    }
    fetchTraderDetail() {
        console.log('reached here in trader details ' + this.shortUrl);
        this.firebaseItemService.getItemAsObject(this.shortUrl, this.detailFetchedSuccessful, this.detailUnableToFetch);
    }

}