import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBar, SnackBarType } from './snack-bar';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private snackbar = inject(MatSnackBar);

  openSnackBar(type: SnackBarType, message: string, component?: ComponentType<unknown>) {
    const config = {
      data: {
        type,
        message,
      },
    };
    this.snackbar.openFromComponent(component || SnackBar, config);
  }
}
