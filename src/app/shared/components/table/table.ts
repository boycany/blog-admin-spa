/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, computed, input, model, output, TemplateRef, viewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { debounce } from '../../helpers/debounce';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-table',
  imports: [
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    NgTemplateOutlet,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  // inputs
  columns = input.required<TableColumn<any>[]>();
  displayedColumns = computed(() => this.columns().map((c) => c.columnDef));
  dataSource = input.required<MatTableDataSource<any>>();
  filterValue = model('');
  searchbarClass = input<string[]>([]);
  tableContainerClass = input<string[]>([]);

  //state
  isLoading = input<boolean>(false);

  // view child
  sort = viewChild(MatSort);

  onFilterKeyup = debounce((event: Event) => {
    const keyword = (event.target as HTMLInputElement).value;
    this.filterValue.set(keyword);
    this.dataSource().filter = keyword.trim().toLowerCase();
  }, 150);

  onSearchClear(inputEl: HTMLInputElement) {
    inputEl.value = '';
    this.filterValue.set('');
    this.dataSource().filter = '';
  }
}

export interface TableColumn<T> {
  columnDef: string;
  header: string;
  cell: (element: T) => T | string;
  cellTemplate?: TemplateRef<T>;
}
