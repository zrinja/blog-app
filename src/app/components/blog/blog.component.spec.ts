import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogComponent } from './blog.component';
import { BlogService } from 'src/app/services/blog.service';
import { of } from 'rxjs';
import { BlogPosts } from 'src/app/shared/models/blog.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let blogService: BlogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService],
    });
    blogService = TestBed.inject(BlogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService);
  });

  it('should fetch initial data and set blogPosts', () => {
    const dummyPosts: BlogPosts = {
      success: true,
      errorMessage: null,
      resultData: [
        {
          id: 1,
          title: 'Post 1',
          text: 'Text 1',
          categoryId: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Post 2',
          text: 'Text 2',
          categoryId: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };

    spyOn(blogService, 'getAllPosts').and.returnValue(of(dummyPosts));

    component.ngOnInit();

    expect(blogService.getAllPosts).toHaveBeenCalled();
    expect(component.blogPosts).toEqual(dummyPosts.resultData);
    expect(blogService.posts).toEqual(dummyPosts.resultData);
  });

  it('should fetch initial data and reset blogPosts on notify$', () => {
    const dummyPosts: BlogPosts = {
      success: true,
      errorMessage: null,
      resultData: [
        {
          id: 1,
          title: 'Post 1',
          text: 'Text 1',
          categoryId: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };

    spyOn(blogService, 'getAllPosts').and.returnValue(of(dummyPosts));

    component.ngOnInit();
    component.blogPosts = [];

    blogService.notify$.next(true);

    expect(blogService.getAllPosts).toHaveBeenCalledTimes(2);
    expect(component.blogPosts).toEqual(dummyPosts.resultData);
    expect(blogService.posts).toEqual(dummyPosts.resultData);
  });
});
