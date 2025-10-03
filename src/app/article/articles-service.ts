import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable } from '@angular/core';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { Article } from './articles';
import { catchError } from 'rxjs';

@Injectable()
export class ArticlesService {
  private http = inject(HttpClient);
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

  getArticles() {
    return this.http.get<Article[]>('api/articles').pipe(
      catchError((err) => {
        console.log('err', err);
        throw err;
      }),
    );
  }
}
