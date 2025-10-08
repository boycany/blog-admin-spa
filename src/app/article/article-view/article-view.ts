import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Article } from '../articles';
import { MatChip } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-article-view',
  imports: [MatDialogModule, MatChip, MatButtonModule],
  templateUrl: './article-view.html',
  styleUrl: './article-view.scss',
})
export class ArticleView {
  data: Article = inject(MAT_DIALOG_DATA);
}
