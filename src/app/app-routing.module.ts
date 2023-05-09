import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { IndexComponent } from './index/index.component';
import { PostPageComponent } from './post-page/post-page.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'thread/:name', redirectTo: 'thread/:name/0', pathMatch: 'full' },
  { path: 'thread/:name/:page', component: PostsListComponent },
  { path: 'post/:id', component: PostPageComponent },
  { path: 'post/:name/:id', component: PostPageComponent },
  { path: '*', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
