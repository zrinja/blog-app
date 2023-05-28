import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { HeaderComponent } from './components/header/header.component';
import { BlogCategoriesComponent } from './components/blog-categories/blog-categories.component';
import { PostComponent } from './components/post/post.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HeaderComponent,
    BlogCategoriesComponent,
    PostComponent,
    TopBarComponent,
    ModalContentComponent,
  ],
  imports: [BrowserModule, HttpClientModule, NgbModalModule, ReactiveFormsModule],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
