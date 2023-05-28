import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the welcome message', () => {
    const welcomeMessage = fixture.nativeElement.querySelector(
      '.welcome-message h2'
    );
    expect(welcomeMessage.textContent).toContain('Welcome to my blog');
  });

  it('should call openModal() when the "Add post" button is clicked', () => {
    spyOn(component, 'openModal');

    const addButton = fixture.nativeElement.querySelector('.add-btn');
    addButton.click();

    expect(component.openModal).toHaveBeenCalled();
  });
});
