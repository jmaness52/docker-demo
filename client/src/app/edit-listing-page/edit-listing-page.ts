import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListingDataForm } from "../listing-data-form/listing-data-form";
import { Listing } from "../types";
import { CommonModule } from '@angular/common';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-edit-listing-page',
  imports: [
    ListingDataForm,
    CommonModule,
  ],
  templateUrl: './edit-listing-page.html',
  styleUrl: './edit-listing-page.css'
})
export class EditListingPage implements OnInit {

  listing: Listing | undefined;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.listingService.getListingById(id).subscribe(foundListing => {
      this.listing = foundListing;
      this.isLoading = false;
    });
  }

  onSubmit(editedListing: Listing): void {
    if (!this.listing) return;
    editedListing.id = this.listing.id;
    this.listingService.updateListing(editedListing).subscribe(() => {
      this.router.navigateByUrl('/my-listings');
    });
  }
}
