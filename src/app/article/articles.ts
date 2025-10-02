import { Component, inject } from '@angular/core';
import { ArticlesService } from './articles-service';

@Component({
  selector: 'app-articles',
  imports: [],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
  providers: [ArticlesService],
})
export class Articles {
  private articlesService = inject(ArticlesService);
}

export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
  status: 'draft' | 'published';
  createdDate: string;
  modifiedDate: string;
}
