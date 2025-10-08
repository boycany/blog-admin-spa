import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
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
  isLoading = computed(() => this.articlesResource.isLoading());

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

  createArticle(article: Article) {
    return this.http.post<Article>('api/articles', article).pipe(
      catchError((err) => {
        console.log('err', err);
        throw this.httpErrorService.formatError(err);
      }),
    );
  }

  deleteArticle(id: string) {
    return this.http.delete(`api/articles/${id}`).pipe(
      catchError((err) => {
        console.log('err', err);
        throw this.httpErrorService.formatError(err);
      }),
    );
  }

  updateArticle(article: Article) {
    return this.http.put(`api/articles/${article.id}`, article).pipe(
      catchError((err) => {
        console.log('err', err);
        throw this.httpErrorService.formatError(err);
      }),
    );
  }
}
