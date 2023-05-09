import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { PostSectionComponent } from './post-section/post-section.component';
import { FooterComponent } from './footer/footer.component';
import { PanelModule } from './panel/panel.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostPageComponent } from './post-page/post-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { ReplieComponent } from './replie/replie.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { environment } from "src/environments/environment";
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    PostSectionComponent,
    FooterComponent,
    PostPageComponent,
    PostsListComponent,
    CommentsComponent,
    ReplieComponent,
  ],
  imports: [
    BrowserModule, 
    PanelModule,
    UsersModule, 
    AppRoutingModule, 
    ReactiveFormsModule, 
    RecaptchaV3Module, 
    LoadingBarRouterModule
  ],
  providers: [
    { provide : LocationStrategy , useClass : HashLocationStrategy},
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
