import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = false;
  errorMessage = '';
  displayedColumns: string[] = [
    'id',
    'name',
    'vehicleNumber',
    'phoneNumber',
    'serviceName',
    'appointmentDate',
    'totalAmount',
    'actions'
  ];

  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Loading bookings...');

    this.bookingService.getBookings().subscribe({
      next: (bookings) => {
        console.log('Received bookings:', bookings);
        this.bookings = bookings;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.errorMessage = 'Failed to load bookings. Please try again.';
        this.isLoading = false;
        this.snackBar.open(
          'Error loading bookings. Please try again.',
          'Close',
          {
            duration: 5000,
            panelClass: ['error-snackbar']
          }
        );
      }
    });
  }

  formatDate(date: string | Date): string {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  }

  deleteBooking(id: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(booking => booking.id !== id);
          this.snackBar.open('Booking deleted successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          console.error('Error deleting booking:', error);
          this.snackBar.open('Failed to delete booking', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
} 