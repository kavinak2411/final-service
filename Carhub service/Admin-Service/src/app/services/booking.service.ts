import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  bookService(bookingData: any): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/appointments`, bookingData);
  }

  getBookings(): Observable<Booking[]> {
    console.log('Fetching bookings from:', `${this.baseUrl}/appointments`);
    return this.http.get<Booking[]>(`${this.baseUrl}/appointments`);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/appointments/${id}`);
  }
} 