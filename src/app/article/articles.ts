import {
  AfterViewInit,
  Component,
  effect,
  inject,
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

@Component({
  selector: 'app-articles',
  imports: [Table, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
  providers: [ArticlesService],
})
export class Articles implements AfterViewInit, OnInit {
  private articlesService = inject(ArticlesService);
  isLoading = this.articlesService.isLoading;
  articles$ = toObservable(this.articlesService.articles);

  // table config
  columns: TableColumn<Article>[] = [];
  dataSource = new MatTableDataSource<Article>();
  filterValue = signal('');
  filterValueEff = effect(() => console.log('this.filterValue() :>> ', this.filterValue()));

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

  // TODO: Maybe we don't need actions column, just click the row to view article detail.
  // Also make two action buttons in dialog: Edit and Delete
  onEdit(article: Article) {
    console.log('Edit article', article);
  }

  onDelete(article: Article) {
    console.log('Delete article', article);
  }
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
