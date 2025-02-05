import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdmin = false;

  constructor(private router: Router) {}

  toggleView() {
    this.isAdmin = !this.isAdmin;
    if (!this.isAdmin) {
      this.router.navigate(['/main']);
    }
  }

  logout() {
    this.isAdmin = false;
    this.router.navigate(['/main']);
  }

  refreshData() {
    // Implement refresh logic here
    window.location.reload();
  }
}
