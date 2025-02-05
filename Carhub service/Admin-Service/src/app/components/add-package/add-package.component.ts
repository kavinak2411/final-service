import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CarPackageService } from '../../services/car-package.service';
import { CarServiceService } from '../../services/car-service.service';
import { ServicePackage, CarService } from '../../models/service.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {
  packageForm: FormGroup;
  availableServices: CarService[] = [];  // List of available services
  selectedServices: CarService[] = [];  // Array to store selected services
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private packageService: CarPackageService,
    private carService: CarServiceService,
    private router: Router
  ) {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loadAvailableServices();
  }

  // Load available services from the backend
  loadAvailableServices() {
    this.carService.getServices().subscribe({
      next: (services: CarService[]) => {
        this.availableServices = services;
      },
      error: (error: any) => {
        console.error('Error loading services:', error);
        this.errorMessage = 'Error loading services. Please try again.';
      }
    });
  }

  // Handle service selection (checkbox toggle)
  onServiceSelect(event: any, service: CarService) {
    if (event.target.checked) {
      this.selectedServices.push(service);
    } else {
      this.selectedServices = this.selectedServices.filter(s => s.id !== service.id);
    }
  }

  // Calculate the total price for the selected services
  calculateTotalPrice(): number {
    return this.selectedServices.reduce((total, service) => total + service.price, 0);
  }

  // Submit the form to the backend
  onSubmit() {
    if (this.packageForm.valid && this.selectedServices.length > 0) {
      const packageData: ServicePackage = {
        ...this.packageForm.value,
        carServices: this.selectedServices,  // Array of CarService objects
        totalPrice: this.calculateTotalPrice()
      };

      // Send the data to the backend to create the package
      this.packageService.addPackage(packageData).subscribe({
        next: (response: ServicePackage) => {
          this.successMessage = 'Package created successfully!';
          this.packageForm.reset();
          this.selectedServices = [];
          this.router.navigate(['/view-packages']);
        },
        error: (error: any) => {
          console.error('Error creating package:', error);
          this.errorMessage = 'Failed to create package. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields and select at least one service.';
    }
  }
}
