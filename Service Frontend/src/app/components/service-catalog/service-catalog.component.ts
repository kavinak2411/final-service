import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarServiceService } from '../../services/car-service.service';
import { BookingService } from '../../services/booking.service';
import { CarService } from '../../models/service.model';

@Component({
  selector: 'app-service-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.css']
})
export class ServiceCatalogComponent implements OnInit {
  services: CarService[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private carService: CarServiceService,
    private bookingService: BookingService
  ) {}

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

  bookService(service: CarService) {
    const bookingData = {
      serviceId: service.id,
      bookingDate: new Date(),
      totalPrice: service.price,
      status: 'PENDING'
    };

    this.bookingService.bookService(bookingData).subscribe({
      next: (response) => {
        alert('Service booked successfully!');
      },
      error: (error) => {
        console.error('Error booking service', error);
        alert('Failed to book service. Please try again.');
      }
    });
  }
} 