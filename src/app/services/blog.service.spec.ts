import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BlogService, routes } from './blog.service';
import { BlogPosts, Post } from '../shared/models/blog.model';

describe('BlogService', () => {
  let service: BlogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService],
    });
    service = TestBed.inject(BlogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all blog posts', () => {
    const dummyPosts: BlogPosts = {
      success: true,
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
      errorMessage: null,
    };

    service.getAllPosts().subscribe((posts) => {
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpTestingController.expectOne(routes.getBlogPosts());
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should add a new blog post', () => {
    const dummyPost: Post = {
      id: 2,
      title: 'New Post',
      text: 'New Text',
      categoryId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    service.addPost(dummyPost.title, dummyPost.text);

    const req = httpTestingController.expectOne(routes.addBlogPost());
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should edit an existing blog post', () => {
    const dummyPost = {
      id: 3,
      title: 'Updated Post',
      text: 'Updated Text',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    service.editPost(dummyPost);

    const req = httpTestingController.expectOne(
      routes.editBlogPost(dummyPost.id)
    );
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a blog post', () => {
    const postId = 4;

    service.deletePost(postId);

    const req = httpTestingController.expectOne(routes.deleteBlogPost(postId));
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
