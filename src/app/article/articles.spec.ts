import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Articles } from './articles';

describe('Article', () => {
  let component: Articles;
  let fixture: ComponentFixture<Articles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Articles],
    }).compileComponents();

    fixture = TestBed.createComponent(Articles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
