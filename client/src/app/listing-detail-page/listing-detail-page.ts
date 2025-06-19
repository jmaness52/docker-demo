import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Listing } from '../types';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-listing-detail-page',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './listing-detail-page.html',
  styleUrl: './listing-detail-page.css'
})
export class ListingDetailPage implements OnInit {

  listing: Listing | undefined;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.listingService.getListingById(id).subscribe(foundListing => {
      this.listing = foundListing
      this.isLoading = false;
    });
    this.listingService.addViewToListing(id).subscribe(() => console.log('views updated'));
  }
}
