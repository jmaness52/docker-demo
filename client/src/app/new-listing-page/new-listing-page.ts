import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListingDataForm } from "../listing-data-form/listing-data-form";
import { ListingService } from '../listing.service';
import { Listing } from '../types';

@Component({
  selector: 'app-new-listing-page',
  imports: [
    ListingDataForm
],
  templateUrl: './new-listing-page.html',
  styleUrl: './new-listing-page.css'
})

export class NewListingPage implements OnInit {

  constructor (
    private router: Router,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    
  }

  onSubmit(newListing: Listing): void {
    this.listingService.createListing(newListing.name, newListing.description, newListing.price)
    .subscribe(() => {
      this.router.navigateByUrl('/my-listings');
    });
  }
}
