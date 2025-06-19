import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { RouterModule } from '@angular/router';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-listings-page',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './listings-page.html',
  styleUrl: './listings-page.css'
})
export class ListingsPage implements OnInit {

  listings: Listing[] = [];

  constructor(
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    this.listingService.getListings()
      .subscribe(listings => this.listings = listings);
  }
}
