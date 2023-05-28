import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from 'src/app/shared/models/blog.model';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {}

  editPost() {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.postData = this.post;
    modalRef.componentInstance.isEditMode = true;
  }

  deletePost() {
    this.blogService.deletePost(this.post.id);
  }
}
