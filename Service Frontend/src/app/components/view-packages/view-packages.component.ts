import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarPackageService } from '../../services/car-package.service';
import { ServicePackage } from '../../models/service.model';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-view-packages',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent implements OnInit {
  packages: ServicePackage[] = [];
  isLoading = false;
  errorMessage = '';
  isAdmin = false;

  constructor(
    private packageService: CarPackageService,
    private bookingService: BookingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private appComponent: AppComponent
  ) {
    this.isAdmin = this.appComponent.isAdmin;
  }

  ngOnInit() {
    this.loadPackages();
  }

  loadPackages() {
    this.isLoading = true;
    this.errorMessage = '';

    this.packageService.getPackages().subscribe({
      next: (packages: ServicePackage[]) => {
        this.packages = packages;
        this.isLoading = false;
      },
      error: (error: Error) => {
        console.error('Error loading packages', error);
        this.errorMessage = 'Failed to load packages. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  bookPackage(servicePackage: ServicePackage) {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '400px',
      data: { service: servicePackage }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const bookingData = {
          ...result,
          packageId: servicePackage.id,
          serviceName: servicePackage.name,
          totalAmount: servicePackage.totalPrice
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
            console.error('Error booking package', error);
            this.snackBar.open(
              'Failed to book package. Please try again.',
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

  deletePackage(id: number) {
    if (confirm('Are you sure you want to delete this package?')) {
      // Implement delete functionality here
      console.log('Deleting package:', id);
    }
  }

  editPackage(packageId: number) {
    // Navigate to edit page or open edit modal
    console.log('Editing package:', packageId);
  }

  viewPackage(packageId: number) {
    // Navigate to package details view
    console.log('Viewing package:', packageId);
  }
}