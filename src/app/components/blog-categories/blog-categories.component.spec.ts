import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoriesComponent } from './blog-categories.component';

describe('BlogCategoriesComponent', () => {
  let component: BlogCategoriesComponent;
  let fixture: ComponentFixture<BlogCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogCategoriesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct heading', () => {
    const heading = fixture.nativeElement.querySelector(
      '.category-column-1 h2'
    );
    expect(heading.textContent).toContain('Blog categories');
  });

  it('should have the correct number of categories', () => {
    const categories = fixture.nativeElement.querySelectorAll(
      '.category-column-2 .category'
    );
    expect(categories.length).toBe(3);
  });
});
