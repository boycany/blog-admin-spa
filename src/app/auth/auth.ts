import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../core/services/auth-service';
import { SnackBarService } from '../shared/components/snack-bar/snack-bar-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auth',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  // form
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  errorStateMatcher = new ErrorStateMatcher();

  //service
  private authService = inject(AuthService);
  private snackbarService = inject(SnackBarService);

  //state
  isLoading = signal(false);

  onSubmit() {
    const { email, password } = this.form.value;

    if (!email || !password) {
      this.snackbarService.openSnackBar('error', 'Please enter email and password');
      return;
    }

    this.isLoading.set(true);

    this.authService.login(email, password).subscribe((isAuthenticated) => {
      this.isLoading.set(false);

      if (isAuthenticated) {
        this.snackbarService.openSnackBar('success', 'Login successful');
      } else {
        this.snackbarService.openSnackBar('error', 'Login failed');
      }
    });
  }
}
