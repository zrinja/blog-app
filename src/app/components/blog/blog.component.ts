import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Post, BlogPosts } from 'src/app/shared/models/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogPosts: Post[];

  constructor(private _blogService: BlogService) {}

  ngOnInit(): void {
    this.getInitialData();
    this._blogService.notify$.subscribe((data) => {
      if (data) {
        this.getInitialData();
      }
    });
  }

  getInitialData() {
    this._blogService.getAllPosts().subscribe((data: BlogPosts) => {
      this.blogPosts = data.resultData;
      this._blogService.posts = data.resultData;
    });
  }
}
