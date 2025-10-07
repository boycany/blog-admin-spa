import {
  AfterViewInit,
  Component,
  effect,
  inject,
  linkedSignal,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { ArticlesService } from './articles-service';
import { Table, TableColumn } from '../shared/components/table/table';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { convertTimeToLocal } from '../shared/helpers/time-transform';
import { MatDialog } from '@angular/material/dialog';
import { ArticleForm } from './article-form/article-form';
import { ArticleView } from './article-view/article-view';
import { catchError, EMPTY, filter, switchMap, tap } from 'rxjs';
import { SnackBarService } from '../shared/components/snack-bar/snack-bar-service';
import { ConfirmDialog } from '../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-articles',
  imports: [Table, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
  providers: [ArticlesService],
})
export class Articles implements AfterViewInit, OnInit {
  private dialog = inject(MatDialog);
  private articlesService = inject(ArticlesService);
  private snackbarService = inject(SnackBarService);

  //state
  isLoading = linkedSignal(() => this.articlesService.isLoading());

  //data
  articles$ = toObservable(this.articlesService.articles);

  // table config
  columns: TableColumn<Article>[] = [];
  dataSource = new MatTableDataSource<Article>();
  filterValue = signal('');

  // view child
  tableComponent = viewChild.required(Table);
  actionsTemplate = viewChild.required<TemplateRef<Article>>('actionsTemplate');

  constructor() {
    this.articles$.pipe(takeUntilDestroyed()).subscribe((articles) => {
      this.dataSource.data = articles;
    });
  }

  ngOnInit(): void {
    this.columns = this.setColumns();

    /** Set filter only for title */
    this.dataSource.filterPredicate = (data: Article, filter: string) => {
      const title = data.title.toLowerCase();
      filter = filter.trim().toLowerCase();
      return title.includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.tableComponent().sort();
  }

  setColumns(): TableColumn<Article>[] {
    return [
      { columnDef: 'title', header: 'Title', cell: (element: Article) => element.title },
      { columnDef: 'author', header: 'Author', cell: (element: Article) => element.author },
      { columnDef: 'status', header: 'Status', cell: (element: Article) => element.status },
      {
        columnDef: 'createdDate',
        header: 'Created Date',
        cell: (element: Article) => convertTimeToLocal(element.createdDate, 'FF'),
      },
      {
        columnDef: 'actions',
        header: 'Actions',
        cell: (element: Article) => element,
        cellTemplate: this.actionsTemplate(),
      },
    ];
  }

  onCreate() {
    console.log('Create new article');
    this.dialog.open(ArticleForm, {
      width: '600px',
      data: {
        formType: 'New',
      },
    });
  }

  onEdit(article: Article) {
    console.log('Edit article', article);
  }

  onDelete(article: Article) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete Article',
        content: `Are you sure you want to delete the article?`,
        details: [`Title: ${article.title}`, `Author: ${article.author}`],
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap(() => {
          this.isLoading.set(true);
          return this.articlesService.deleteArticle(article.id).pipe(
            tap(() => {
              this.snackbarService.openSnackBar('success', 'Article deleted successfully');
              this.articlesService.reloadArticles();
            }),
            catchError((error) => {
              this.snackbarService.openSnackBar('error', error);
              this.isLoading.set(false);
              return EMPTY;
            }),
          );
        }),
      )
      .subscribe();
  }

  onView(article: Article) {
    console.log('View article', article);
    this.dialog.open(ArticleView, {
      width: '600px',
      data: { ...article, createdDate: convertTimeToLocal(article.createdDate, 'FF') },
    });
  }
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  status: 'draft' | 'published';
  createdDate: string;
  modifiedDate: string;
}
