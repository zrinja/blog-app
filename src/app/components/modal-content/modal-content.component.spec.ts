import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from 'src/app/shared/models/blog.model';
import { ModalContentComponent } from './modal-content.component';

describe('ModalContentComponent', () => {
  let component: ModalContentComponent;
  let fixture: ComponentFixture<ModalContentComponent>;
  let formBuilder: FormBuilder;
  let blogService: BlogService;
  let modalService: NgbModal;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgbModalModule, HttpClientTestingModule],
      declarations: [ModalContentComponent],
      providers: [FormBuilder, BlogService, NgbModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContentComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    blogService = TestBed.inject(BlogService);
    modalService = TestBed.inject(NgbModal);
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly in add mode', () => {
    component.isEditMode = false;
    component.ngOnInit();

    expect(component.blogPostForm.get('title')).toBeTruthy();
    expect(component.blogPostForm.get('text')).toBeTruthy();
    expect(component.modalTitle).toEqual('Add');
  });

  it('should initialize form correctly in edit mode', () => {
    component.isEditMode = true;
    component.postData = {
      id: 1,
      title: 'Post Title',
      text: 'Post Text',
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: 1,
    };
    component.ngOnInit();

    expect(component.blogPostForm.get('title').value).toEqual('Post Title');
    expect(component.blogPostForm.get('text').value).toEqual('Post Text');
    expect(component.modalTitle).toEqual('Edit');
  });

  it('should dismiss the modal', () => {
    spyOn(modalService, 'dismissAll');

    component.dismisModal('Reason');

    expect(modalService.dismissAll).toHaveBeenCalledWith('Reason');
  });

  it('should submit the form and edit an existing post', () => {
    spyOn(blogService, 'editPost');
    spyOn(modalService, 'dismissAll');

    component.isEditMode = true;
    component.postData = {
      id: 1,
      title: 'Old Title',
      text: 'Old Text',
      createdAt: new Date('Mon May 29 2023 01:07:30'),
      updatedAt: new Date('Mon May 29 2023 01:07:30'),
      categoryId: 1,
    };
    component.blogPostForm.setValue({ title: 'New Title', text: 'New Text' });

    component.submitForm();

    expect(blogService.editPost).toHaveBeenCalledWith({
      id: 1,
      title: 'New Title',
      text: 'New Text',
      createdAt: new Date('Mon May 29 2023 01:07:30'),
      updatedAt: new Date('Mon May 29 2023 01:07:30'),
      categoryId: 1,
    });
    expect(modalService.dismissAll).toHaveBeenCalledWith('Form submitted');
  });
});
