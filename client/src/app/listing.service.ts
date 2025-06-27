import { inject, Injectable } from '@angular/core';
import { Listing } from './types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';
import { getIdToken } from 'firebase/auth';

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

const emptyListing: Listing = {
  id: '',
  name: '',
  description: '',
  price: NaN,
  views: 0,
}

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

  async getListingsForUser(): Promise<Listing[]> {
    const [token, uid] = await this.getUserToken();
    let listings: Listing[] = [];
    if (token) {
       listings = await firstValueFrom(this.http.get<Listing[]>(`/api/users/${uid}/listings`, httpOptionsWithAuthToken(token)));
    }
    return listings;
  }

  async getUserToken(): Promise<[string, string]> {
    const currentUser = await firstValueFrom(user(this.auth));
    if (!currentUser) return ['', ''];

    const idTokenResult = await currentUser.getIdTokenResult(true);
    return [idTokenResult.token, currentUser.uid];
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`)
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(`/api/listings/${id}/add-view`, {}, httpOptions)
  }

  async updateListing(listing: Listing): Promise<Listing> {
    const body = {
      name: listing.name,
      description: listing.description,
      price: listing.price
    }
    const [token, uid] = await this.getUserToken();
    if (!token || !uid ) return Promise.reject();

    return await firstValueFrom(this.http.post<Listing>(`/api/listings/${listing.id}`, body, httpOptionsWithAuthToken(token)));
  }

  async createListing(name: string, description: string, price: number): Promise<Listing> {
   const [token, uid] = await this.getUserToken();
   let listing: Listing;
   listing = await firstValueFrom(this.http.post<Listing>('/api/listings', { name, description, price }, httpOptionsWithAuthToken(token)));
   return listing;
  }

  async deleteListing(id: string): Promise<string> {
    const [token, uid] = await this.getUserToken();
    return await firstValueFrom(this.http.delete<string>(`/api/listings/${id}`, httpOptionsWithAuthToken(token)));
  }
}
