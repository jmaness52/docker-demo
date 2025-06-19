import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../types';


@Component({
  selector: 'app-my-listings-page',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './my-listings-page.html',
  styleUrl: './my-listings-page.css'
})
export class MyListingsPage implements OnInit {

  listings: Listing[] = [];
  
  constructor (
    private listingService: ListingService,
  ) {}

  ngOnInit(): void {
    this.listingService.getListingsForUser().subscribe(userListings => {
      this.listings = userListings;
    })
  }

  onDeleteClicked(listingId: string): void {
    this.listingService.deleteListing(listingId).subscribe(() => {
       this.listings = this.listings.filter(filterListings => {
        filterListings.id !== listingId;
      });
    });
  }
}
