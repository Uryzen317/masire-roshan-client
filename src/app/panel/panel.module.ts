import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import { PanelComponent } from './panel.component';
import { PersonalAccountComponent } from './personal-account/personal-account.component';
import { GamesComponent } from './games/games.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { EditModalDirective } from './edit-modal/edit-modal.directive';
import { TagsComponent } from './tags/tags.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminsComponent } from './admins/admins.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { LogsComponent } from './logs/logs.component';
import { environment } from "src/environments/environment";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [
    RegistrationComponent,
    PostsComponent,
    PanelComponent,
    PersonalAccountComponent,
    GamesComponent,
    EditModalComponent,
    EditModalDirective,
    TagsComponent,
    MainPageComponent,
    AdminsComponent,
    MyPostsComponent,
    LogsComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    UsersModule,
  ],
})
export class PanelModule {}
