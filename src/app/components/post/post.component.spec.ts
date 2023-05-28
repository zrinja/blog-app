import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/services/blog.service';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgbModalModule, HttpClientTestingModule],
      declarations: [PostComponent],
      providers: [FormBuilder, BlogService, NgbModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = {
      id: 1,
      title: 'Post Title',
      text: 'Post Text',
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: 1,
    };
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render post title correctly', () => {
    const postTitle = fixture.nativeElement.querySelector('.post-title');
    expect(postTitle.textContent).toContain(component.post.title);
  });

  it('should call editPost method when Edit button is clicked', () => {
    spyOn(component, 'editPost');
    const editButton = fixture.nativeElement.querySelector('.edit-button');
    editButton.click();
    expect(component.editPost).toHaveBeenCalled();
  });

  it('should call deletePost method when Delete button is clicked', () => {
    spyOn(component, 'deletePost');
    const deleteButton = fixture.nativeElement.querySelector('.delete-button');
    deleteButton.click();
    expect(component.deletePost).toHaveBeenCalled();
  });
});
