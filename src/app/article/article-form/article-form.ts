import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-article-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './article-form.html',
  styleUrl: './article-form.scss',
})
export class ArticleForm {
  formType = signal<'New' | 'Edit'>('New');
  data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    status: new FormControl('draft', [Validators.required]),
  });

  onCancel() {
    console.log('Cancel');
  }

  onSubmit() {
    console.log('this.form.value', this.form.value);
  }
}
