import { FormsModule } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../types';
import { fakeListings } from '../fake-data';
import { ListingService } from '../listing.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-page',
  imports: [
    FormsModule,
  ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css'
})
export class ContactPage implements OnInit, OnDestroy {

  email: string = '';
  message: string = '';
  name: string = '';
  sub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
     const id = this.route.snapshot.paramMap.get('id');
     this.sub = this.route.queryParams.subscribe(params =>{
      this.name = params['name'];
      this.message = `Hi, I'm interested in your ${this.name.toLowerCase()}!`
     });
  }

  ngOnDestroy(): void {
    if(!this.sub) return;
    this.sub.unsubscribe();
  }

  sendMessage(): void {
    alert('Your message hase been sent!');
    this.router.navigateByUrl('/listings');
  }
}
