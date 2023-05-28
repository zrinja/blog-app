import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from 'src/app/shared/models/blog.model';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  postData: Post;
  blogPostForm: FormGroup;
  isEditMode: boolean = false;
  modalTitle: string = 'Add';

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.blogPostForm = this.formBuilder.group({
      title: [this.postData ? this.postData.title : '', Validators.required],
      text: [this.postData ? this.postData.text : '', Validators.required],
    });

    if (this.isEditMode) {
      this.modalTitle = 'Edit';
    }
  }

  get title() {
    return this.blogPostForm.get('title');
  }

  get text() {
    return this.blogPostForm.get('text');
  }

  dismisModal(reason: string) {
    this.modalService.dismissAll(reason);
  }

  submitForm() {
    if (this.blogPostForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      const changedPost = this.postData;
      changedPost.title = this.blogPostForm.value.title;
      changedPost.text = this.blogPostForm.value.text;
      this.blogService.editPost(changedPost);
    } else {
      this.blogService.addPost(
        this.blogPostForm.value.title,
        this.blogPostForm.value.text
      );
    }
    this.blogPostForm.reset();
    this.dismisModal('Form submitted');
  }
}
