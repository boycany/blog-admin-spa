import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatIconModule,
  ],
  templateUrl: './snack-bar.html',
  styleUrl: './snack-bar.scss',
})
export class SnackBar {
  private snackBarRef = inject(MatSnackBarRef);
  protected readonly data: SnackBarData = inject(MAT_SNACK_BAR_DATA);

  onDismiss() {
    this.snackBarRef.dismissWithAction();
  }
}

export interface SnackBarData {
  message: string;
  type: SnackBarType;
}

export type SnackBarType = 'success' | 'error' | 'info' | 'warning';
