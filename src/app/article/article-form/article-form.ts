import { Component, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Article } from '../articles';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubmitButton } from '../../shared/components/submit-button/submit-button';

@Component({
  selector: 'app-article-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SubmitButton,
  ],
  templateUrl: './article-form.html',
  styleUrl: './article-form.scss',
})
export class ArticleForm {
  protected readonly data: ArticleFormInput = inject(MAT_DIALOG_DATA);

  protected readonly form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    tags: new FormControl<string[]>([]),
    status: new FormControl('draft', [Validators.required]),
  });

  isLoading = signal(false);
  formSubmit = output<ArticleFormOutput>();

  constructor() {
    if (this.data?.formType === 'Edit' && this.data?.article) {
      const { title, content, author, tags, status } = this.data.article;
      this.form.setValue({
        title,
        content,
        author,
        tags,
        status,
      });
    }
  }

  protected onSubmit() {
    console.log('this.form.value', this.form.value);
    this.formSubmit.emit(this.form.value as ArticleFormOutput);
    this.isLoading.set(true);
  }

  protected addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const prevTags = this.form.value.tags || [];

    // Add tag only if it is not already in the list
    if (value && !prevTags.includes(value)) {
      this.form.patchValue({
        tags: [...prevTags, value],
      });
    }

    // Clear the input value
    event.chipInput.clear();
  }

  protected removeTag(tag: string): void {
    this.form.patchValue({
      tags: (this.form.value.tags || []).filter((t) => t !== tag),
    });
  }
}

export interface ArticleFormInput {
  formType: 'New' | 'Edit';
  article?: Article;
}

export interface ArticleFormOutput {
  title: string;
  content: string;
  author: string;
  tags: string[];
  status: 'draft' | 'published';
}
