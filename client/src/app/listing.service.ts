import { inject, Injectable } from '@angular/core';
import { Listing } from './types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'AuthToken': token,
  }),
});

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  
  private auth = inject(Auth);
  constructor(
    private http: HttpClient
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings')
  }

  getListingsForUser(): Observable<Listing[]> {
    return new Observable<Listing[]>(observer => {
      user(this.auth).subscribe(user => {
        user && user.getIdToken().then(token =>{
          if (user && token) {
            this.http.get<Listing[]>(`/api/users/${user.uid}/listings`, httpOptionsWithAuthToken(token))
            .subscribe(listings => {
              observer.next(listings);
            });
          } else {
            observer.next([]);
          }
        })
      }
      )
    }); 
    return this.http.get<Listing[]>('/api/users/12345/listings');
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`)
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(`/api/listings/${id}/add-view`, {}, httpOptions)
  }

  updateListing(listing: Listing): Observable<Listing> {
    const body = {
      name: listing.name,
      description: listing.description,
      price: listing.price
    }
    return this.http.post<Listing>(`/api/listings/${listing.id}`, body, httpOptions)
  }

  createListing(name: string, description: string, price: number): Observable<Listing> {
    return this.http.post<Listing>('/api/listings',
      {name, description, price},
      httpOptions
    );
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete<any>(`/api/listings/${id}`);
  }
}
