import { Routes } from '@angular/router';
import { ServiceCatalogComponent } from './components/service-catalog/service-catalog.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { AddPackageComponent } from './components/add-package/add-package.component';
import { ViewServicesComponent } from './components/view-services/view-services.component';
import { ViewPackagesComponent } from './components/view-packages/view-packages.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainpageComponent },
  // User routes
  { path: 'services', component: ServiceCatalogComponent },
  { path: 'packages', component: ViewPackagesComponent },
  // Admin routes
  { path: 'admin/add-service', component: AddServiceComponent },
  { path: 'admin/add-package', component: AddPackageComponent },
  { path: 'admin/view-services', component: ViewServicesComponent },
  { path: 'admin/view-packages', component: ViewPackagesComponent },
  { path: 'admin/bookings', component: BookingListComponent }
];
