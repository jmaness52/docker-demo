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
    this.listingService.getListingsForUser().then(userListings => {
      this.listings = userListings;
    })
  }

  async onDeleteClicked(listingId: string): Promise<any> {
    await this.listingService.deleteListing(listingId);
    this.listings = await this.listingService.getListingsForUser();
  }
}
