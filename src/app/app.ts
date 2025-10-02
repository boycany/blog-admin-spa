import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './core/services/auth-service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from './shared/components/confirm-dialog/confirm-dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('blog-admin-spa');
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  currentUser = this.authService.currentUser;
  userName = computed(() => this.currentUser()?.name || 'Guest');

  logout() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Logout',
        content: 'Are you sure you want to logout?',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => !!result))
      .subscribe(() => {
        this.authService.logout();
        this.router.navigate(['/auth']);
      });
  }
}
