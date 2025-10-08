import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-submit-button',
  imports: [MatProgressSpinnerModule],
  templateUrl: './submit-button.html',
  styleUrl: './submit-button.scss',
})
export class SubmitButton {
  isLoading = input.required<boolean>();
  loadingText = input<string>('Submitting...');
  defaultText = input<string>('Submit');
}
