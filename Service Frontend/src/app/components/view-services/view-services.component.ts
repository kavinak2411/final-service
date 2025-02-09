import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../models/service.model';
import { CarServiceService } from '../../services/car-service.service';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';
import { BookingService } from '../../services/booking.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-services',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './view-services.component.html',
  styleUrls: ['./view-services.component.css']
})
export class ViewServicesComponent implements OnInit {
  services: CarService[] = [];
  isLoading = false;
  errorMessage = '';
  isAdmin = false;

  constructor(
    private carService: CarServiceService,
    private bookingService: BookingService,
    private appComponent: AppComponent,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.isAdmin = this.appComponent.isAdmin;
  }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.isLoading = true;
    this.errorMessage = '';

    this.carService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading services', error);
        this.errorMessage = 'Failed to load services. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  deleteService(id: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.carService.deleteService(id).subscribe({
        next: () => {
          this.services = this.services.filter(service => service.id !== id);
        },
        error: (error) => {
          console.error('Error deleting service', error);
          alert('Failed to delete service. Please try again.');
        }
      });
    }
  }

  editService(serviceId: number) {
    // Navigate to edit page or open edit modal
    console.log('Editing service:', serviceId);
  }

  viewService(serviceId: number) {
    // Navigate to service details view
    console.log('Viewing service:', serviceId);
  }

  bookService(service: CarService) {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '400px',
      data: { service }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const bookingData = {
          ...result,
          serviceId: service.id,
          serviceName: service.name,
          totalAmount: service.price
        };

        this.bookingService.bookService(bookingData).subscribe({
          next: (response) => {
            this.snackBar.open(
              `✓ Booking confirmed for ${result.clientName}!`, 
              'Close',
              {
                duration: 5000,
                panelClass: ['success-snackbar'],
                horizontalPosition: 'end',
                verticalPosition: 'top'
              }
            );
          },
          error: (error) => {
            console.error('Error booking service', error);
            this.snackBar.open(
              'Failed to book service. Please try again.',
              'Close',
              {
                duration: 5000,
                panelClass: ['error-snackbar'],
                horizontalPosition: 'end',
                verticalPosition: 'top'
              }
            );
          }
        });
      }
    });
  }
} 