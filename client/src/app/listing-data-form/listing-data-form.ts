import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listing } from '../types';
import { NumbersOnlyDirective } from '../numberOnly';

@Component({
  selector: 'app-listing-data-form',
  imports: [
    FormsModule,
    NumbersOnlyDirective,
  ],
  templateUrl: './listing-data-form.html',
  styleUrl: './listing-data-form.css'
})
export class ListingDataForm implements OnInit {
  @Input() submitButtonText: string = '';
  @Input() initialName: string = '';
  @Input() initialDescription: string = '';
  @Input() initialPrice: string = '';
  @Input() intialViews: string = '';
  
  name: string = '';
  description: string = '';
  price: string = '';
  views: string = '';

  @Output() onSubmit = new EventEmitter<Listing>();

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = this.initialName;
    this.description = this.initialDescription;
    this.price = this.initialPrice;
    this.views = this.intialViews;
  }

  onButtonClicked(): void {
    const roundedPrice = Number(Number(this.price).toFixed(2));
    this.onSubmit.emit(
      {
      id: '',
      name: this.name,
      description: this.description,
      price: roundedPrice,
      views: Number(this.views)
    })
  }
}
