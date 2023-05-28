import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('.topbar-column-1 p')
    );
    expect(titleElement.nativeElement.textContent).toBe('My blog');
  });

  it('should display the links', () => {
    const linkElements = fixture.debugElement.queryAll(
      By.css('.topbar-link p')
    );
    expect(linkElements.length).toBe(5);
    expect(linkElements[0].nativeElement.textContent).toBe('Link 1');
    expect(linkElements[1].nativeElement.textContent).toBe('Link 2');
    expect(linkElements[2].nativeElement.textContent).toBe('Link 3');
    expect(linkElements[3].nativeElement.textContent).toBe('My profile');
    expect(linkElements[4].nativeElement.textContent).toBe('Logout');
  });
});
