import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

import { ArticleForm, ArticleFormInput } from './article-form';
import { Article } from '../articles';
import { SubmitButton } from '../../shared/components/submit-button/submit-button';

// Type for accessing protected members in tests
type ArticleFormTestType = ArticleForm & {
  form: FormGroup;
  addTag: (event: MatChipInputEvent) => void;
  removeTag: (tag: string) => void;
};

describe('ArticleForm', () => {
  let component: ArticleForm;
  let fixture: ComponentFixture<ArticleForm>;
  let mockDialogData: ArticleFormInput;

  // Helper function for zoneless testing
  const waitForChanges = () => new Promise((resolve) => setTimeout(resolve, 0));

  const mockArticle: Article = {
    id: '1',
    title: 'Test Article',
    content: 'Test content',
    author: 'Test Author',
    tags: ['test', 'angular'],
    status: 'published',
    createdDate: '2023-01-01',
    modifiedDate: '2023-01-02',
  };

  beforeEach(async () => {
    mockDialogData = {
      formType: 'New',
    };

    await TestBed.configureTestingModule({
      imports: [
        ArticleForm,
        SubmitButton,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleForm);
    component = fixture.componentInstance;

    // Enable auto change detection for zoneless testing
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize form with empty values for new article', () => {
      expect(component['form'].get('title')?.value).toBe('');
      expect(component['form'].get('content')?.value).toBe('');
      expect(component['form'].get('author')?.value).toBe('');
      expect(component['form'].get('tags')?.value).toEqual([]);
      expect(component['form'].get('status')?.value).toBe('draft');
    });

    it('should initialize form with article values for edit mode', async () => {
      const editDialogData: ArticleFormInput = {
        formType: 'Edit',
        article: mockArticle,
      };

      // Reset TestBed with new dialog data
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [
          ArticleForm,
          SubmitButton,
          ReactiveFormsModule,
          MatDialogModule,
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          MatRadioModule,
          MatChipsModule,
          MatIconModule,
          MatProgressSpinnerModule,
        ],
        providers: [
          provideZonelessChangeDetection(),
          { provide: MAT_DIALOG_DATA, useValue: editDialogData },
        ],
      }).compileComponents();

      const editFixture = TestBed.createComponent(ArticleForm);
      const editComponent = editFixture.componentInstance;
      editFixture.autoDetectChanges();

      expect(editComponent['form'].get('title')?.value).toBe(mockArticle.title);
      expect(editComponent['form'].get('content')?.value).toBe(mockArticle.content);
      expect(editComponent['form'].get('author')?.value).toBe(mockArticle.author);
      expect(editComponent['form'].get('tags')?.value).toEqual(mockArticle.tags);
      expect(editComponent['form'].get('status')?.value).toBe(mockArticle.status);
    });

    it('should display correct dialog title based on form type', () => {
      const titleElement = fixture.debugElement.query(By.css('h2[mat-dialog-title]'));
      expect(titleElement.nativeElement.textContent.trim()).toBe('New Post');
    });
  });

  describe('Form Validation', () => {
    it('should mark title as required', () => {
      const titleControl = component['form'].get('title');
      expect(titleControl?.hasError('required')).toBeTruthy();

      titleControl?.setValue('Test Title');
      expect(titleControl?.hasError('required')).toBeFalsy();
    });

    it('should mark content as required', () => {
      const contentControl = component['form'].get('content');
      expect(contentControl?.hasError('required')).toBeTruthy();

      contentControl?.setValue('Test Content');
      expect(contentControl?.hasError('required')).toBeFalsy();
    });

    it('should mark author as required', () => {
      const authorControl = component['form'].get('author');
      expect(authorControl?.hasError('required')).toBeTruthy();

      authorControl?.setValue('Test Author');
      expect(authorControl?.hasError('required')).toBeFalsy();
    });

    it('should disable submit button when form is invalid', () => {
      const submitButton = fixture.debugElement.query(By.css('button[mat-flat-button]'));
      expect(submitButton.nativeElement.disabled).toBeTruthy();
    });

    it('should enable submit button when form is valid', async () => {
      component['form'].patchValue({
        title: 'Test Title',
        content: 'Test Content',
        author: 'Test Author',
      });
      await waitForChanges();

      const submitButton = fixture.debugElement.query(By.css('button[mat-flat-button]'));
      expect(submitButton.nativeElement.disabled).toBeFalsy();
    });
  });

  describe('Tag Management', () => {
    it('should add new tag', () => {
      const mockEvent = {
        value: 'new-tag',
        chipInput: { clear: jasmine.createSpy('clear') },
      } as unknown as MatChipInputEvent;

      component['addTag'](mockEvent);

      expect(component['form'].get('tags')?.value).toContain('new-tag');
      expect(mockEvent.chipInput.clear).toHaveBeenCalled();
    });

    it('should not add duplicate tags', () => {
      component['form'].patchValue({ tags: ['existing-tag'] });

      const mockEvent = {
        value: 'existing-tag',
        chipInput: { clear: jasmine.createSpy('clear') },
      } as unknown as MatChipInputEvent;

      component['addTag'](mockEvent);

      expect(component['form'].get('tags')?.value).toEqual(['existing-tag']);
      expect(mockEvent.chipInput.clear).toHaveBeenCalled();
    });

    it('should not add empty tag', () => {
      const mockEvent = {
        value: '  ',
        chipInput: { clear: jasmine.createSpy('clear') },
      } as unknown as MatChipInputEvent;

      component['addTag'](mockEvent);

      expect(component['form'].get('tags')?.value).toEqual([]);
      expect(mockEvent.chipInput.clear).toHaveBeenCalled();
    });

    it('should remove tag', () => {
      component['form'].patchValue({ tags: ['tag1', 'tag2', 'tag3'] });

      component['removeTag']('tag2');

      expect(component['form'].get('tags')?.value).toEqual(['tag1', 'tag3']);
    });
  });

  describe('Form Submission', () => {
    it('should emit form data on submit', () => {
      spyOn(component.formSubmit, 'emit');

      const formData = {
        title: 'Test Title',
        content: 'Test Content',
        author: 'Test Author',
        tags: ['test'],
        status: 'draft' as const,
      };

      component['form'].patchValue(formData);
      component['onSubmit']();

      expect(component.formSubmit.emit).toHaveBeenCalledWith(formData);
    });

    it('should set loading state on submit', () => {
      expect(component.isLoading()).toBeFalsy();

      component['onSubmit']();

      expect(component.isLoading()).toBeTruthy();
    });

    it('should disable submit button when loading', async () => {
      component['form'].patchValue({
        title: 'Test Title',
        content: 'Test Content',
        author: 'Test Author',
      });
      component.isLoading.set(true);
      await waitForChanges();

      const submitButton = fixture.debugElement.query(By.css('button[mat-flat-button]'));
      expect(submitButton.nativeElement.disabled).toBeTruthy();
    });
  });

  describe('UI Elements', () => {
    it('should display all form fields', () => {
      const titleField = fixture.debugElement.query(By.css('input[formControlName="title"]'));
      const authorField = fixture.debugElement.query(By.css('input[formControlName="author"]'));
      const contentField = fixture.debugElement.query(
        By.css('textarea[formControlName="content"]'),
      );
      const statusRadio = fixture.debugElement.query(
        By.css('mat-radio-group[formControlName="status"]'),
      );

      expect(titleField).toBeTruthy();
      expect(authorField).toBeTruthy();
      expect(contentField).toBeTruthy();
      expect(statusRadio).toBeTruthy();
    });

    it('should display error messages for required fields', async () => {
      // Trigger validation by marking fields as touched
      component['form'].markAllAsTouched();
      await waitForChanges();

      const errorElements = fixture.debugElement.queryAll(By.css('mat-error'));
      expect(errorElements.length).toBeGreaterThan(0);
    });

    it('should display submit button component', () => {
      const submitButtonComponent = fixture.debugElement.query(By.directive(SubmitButton));
      expect(submitButtonComponent).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle form initialization with undefined/null data', async () => {
      // Test the edge case where data might be undefined or formType is not 'New'
      const testComponent = component as ArticleFormTestType;
      expect(testComponent.form.get('title')?.value).toBe('');
      expect(testComponent.form.get('content')?.value).toBe('');
      expect(testComponent.form.get('author')?.value).toBe('');
    });

    it('should handle edit mode without article data', async () => {
      // Test the case where formType is 'Edit' but article is undefined
      const editData = { formType: 'Edit' as const, article: undefined };

      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [
          ArticleForm,
          SubmitButton,
          ReactiveFormsModule,
          MatDialogModule,
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          MatRadioModule,
          MatChipsModule,
          MatIconModule,
          MatProgressSpinnerModule,
        ],
        providers: [
          provideZonelessChangeDetection(),
          { provide: MAT_DIALOG_DATA, useValue: editData },
        ],
      }).compileComponents();

      const testFixture = TestBed.createComponent(ArticleForm);
      testFixture.autoDetectChanges();
      await waitForChanges();

      // Should not crash and should have empty form values
      const testInstance = testFixture.componentInstance as ArticleFormTestType;
      expect(testInstance.form.get('title')?.value).toBe('');
    });

    it('should handle addTag with undefined event.value', () => {
      const mockEvent = {
        value: undefined,
        chipInput: { clear: jasmine.createSpy('clear') },
      } as unknown as MatChipInputEvent;

      const testComponent = component as ArticleFormTestType;
      testComponent.addTag(mockEvent);

      // Should not add any tag and should clear the input
      expect(testComponent.form.get('tags')?.value).toEqual([]);
      expect(mockEvent.chipInput.clear).toHaveBeenCalled();
    });

    it('should handle addTag with null event.value', () => {
      const mockEvent = {
        value: null,
        chipInput: { clear: jasmine.createSpy('clear') },
      } as unknown as MatChipInputEvent;

      const testComponent = component as ArticleFormTestType;
      testComponent.addTag(mockEvent);

      // Should not add any tag and should clear the input
      expect(testComponent.form.get('tags')?.value).toEqual([]);
      expect(mockEvent.chipInput.clear).toHaveBeenCalled();
    });

    it('should handle removeTag when tags array is undefined', () => {
      const testComponent = component as ArticleFormTestType;
      // Set tags to undefined to test the || [] fallback
      testComponent.form.patchValue({ tags: undefined as unknown as string[] });

      testComponent.removeTag('nonexistent');

      // Should handle undefined gracefully and result in empty array
      expect(testComponent.form.get('tags')?.value).toEqual([]);
    });

    it('should handle addTag when prevTags is undefined', () => {
      const testComponent = component as ArticleFormTestType;
      // Set tags to undefined to test the || [] fallback in addTag
      testComponent.form.patchValue({ tags: undefined as unknown as string[] });

      const mockEvent = {
        value: 'new-tag',
        chipInput: { clear: jasmine.createSpy('clear') },
      } as unknown as MatChipInputEvent;

      testComponent.addTag(mockEvent);

      // Should handle undefined prevTags and add the tag
      expect(testComponent.form.get('tags')?.value).toEqual(['new-tag']);
      expect(mockEvent.chipInput.clear).toHaveBeenCalled();
    });

    it('should handle addTag with whitespace-only value', () => {
      const mockEvent = {
        value: '   ',
        chipInput: { clear: jasmine.createSpy('clear') },
      } as unknown as MatChipInputEvent;

      const testComponent = component as ArticleFormTestType;
      testComponent.addTag(mockEvent);

      // Should not add whitespace-only tag
      expect(testComponent.form.get('tags')?.value).toEqual([]);
      expect(mockEvent.chipInput.clear).toHaveBeenCalled();
    });
  });
});

/**
=============================== Coverage summary ===============================
Statements   : 100% ( 21/21 )
Branches     : 100% ( 12/12 )
Functions    : 100% ( 5/5 )
Lines        : 100% ( 21/21 )
================================================================================
 */
