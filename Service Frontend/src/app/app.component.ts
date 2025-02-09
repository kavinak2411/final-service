import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdmin = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  toggleView() {
    if (!this.isAdmin) {
      const dialogRef = this.dialog.open(AdminLoginComponent, {
        width: '400px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isAdmin = true;
          this.router.navigate(['/admin']);
        }
      });
    } else {
      this.isAdmin = false;
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
