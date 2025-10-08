import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable } from '@angular/core';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { Article } from './articles';
import { catchError } from 'rxjs';
import { HttpErrorService } from '../core/services/http-error-service';

@Injectable()
export class ArticlesService {
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  private articlesResource = rxResource({
    stream: () => this.getArticles(),
  });
  articles = computed(() => this.articlesResource.value() ?? []);
  articlesEff = effect(() => console.log('this.articles() :>> ', this.articles()));
  isLoading = computed(() => this.articlesResource.isLoading());
  isLoadingEff = effect(() => console.log('this.isLoading() :>> ', this.isLoading()));

  constructor() {
    console.log('ArticlesService initialized');
  }

  reloadArticles() {
    this.articlesResource.reload();
  }

  getArticles() {
    return this.http.get<Article[]>('api/articles').pipe(
      catchError((err) => {
        console.log('err', err);
        throw this.httpErrorService.formatError(err);
      }),
    );
  }

  deleteArticle(id: string) {
    console.log('Delete article with id:', id);
    return this.http.delete(`api/articles/${id}`).pipe(
      catchError((err) => {
        console.log('err', err);
        throw this.httpErrorService.formatError(err);
      }),
    );
  }

  updateArticle(article: Article) {
    console.log('Update article with id:', article.id);
    return this.http.put(`api/articles/${article.id}`, article).pipe(
      catchError((err) => {
        console.log('err', err);
        throw this.httpErrorService.formatError(err);
      }),
    );
  }
}
