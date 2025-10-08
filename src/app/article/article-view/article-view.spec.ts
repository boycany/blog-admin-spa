import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatChip } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

import { ArticleView } from './article-view';
import { Article } from '../articles';

describe('ArticleView', () => {
  let component: ArticleView;
  let fixture: ComponentFixture<ArticleView>;
  let mockArticle: Article;

  // Helper function for zoneless testing
  // const waitForChanges = () => new Promise((resolve) => setTimeout(resolve, 0));

  beforeEach(async () => {
    mockArticle = {
      id: '123',
      title: 'Test Article Title',
      content: 'This is a test article content with some details about the topic.',
      author: 'John Doe',
      tags: ['javascript', 'angular', 'testing'],
      status: 'published',
      createdDate: '2023-12-01T10:00:00Z',
      modifiedDate: '2023-12-02T15:30:00Z',
    };

    await TestBed.configureTestingModule({
      imports: [ArticleView, MatDialogModule, MatChip, MatButtonModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MAT_DIALOG_DATA, useValue: mockArticle },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleView);
    component = fixture.componentInstance;

    // Enable auto change detection for zoneless testing
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should inject article data correctly', () => {
      expect(component.data).toBeDefined();
      expect(component.data).toEqual(mockArticle);
    });

    it('should display article title in dialog title', () => {
      const titleElement = fixture.debugElement.query(By.css('h2[mat-dialog-title]'));
      expect(titleElement).toBeTruthy();
      expect(titleElement.nativeElement.textContent.trim()).toBe(mockArticle.title);
    });

    it('should display author in subtitle', () => {
      const subtitleElement = fixture.debugElement.query(
        By.css('.dialog-subtitle span:first-child'),
      );
      expect(subtitleElement).toBeTruthy();
      expect(subtitleElement.nativeElement.textContent.trim()).toBe(mockArticle.author);
    });

    it('should display created date in subtitle', () => {
      const dateElements = fixture.debugElement.queryAll(By.css('.dialog-subtitle span'));
      expect(dateElements.length).toBeGreaterThanOrEqual(2);
      expect(dateElements[1].nativeElement.textContent.trim()).toContain(mockArticle.createdDate);
    });
  });

  describe('Content Display', () => {
    it('should display article content', () => {
      const contentElement = fixture.debugElement.query(By.css('mat-dialog-content p'));
      expect(contentElement).toBeTruthy();
      expect(contentElement.nativeElement.textContent.trim()).toBe(mockArticle.content);
    });

    it('should display all tags as chips', () => {
      const chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
      expect(chipElements.length).toBe(mockArticle.tags.length);

      chipElements.forEach((chip, index) => {
        expect(chip.nativeElement.textContent.trim()).toBe(`#${mockArticle.tags[index]}`);
      });
    });
  });
});

/**
=============================== Coverage summary ===============================
Statements   : 100% ( 3/3 )
Branches     : 100% ( 0/0 )
Functions    : 100% ( 0/0 )
Lines        : 100% ( 2/2 )
================================================================================
 */
