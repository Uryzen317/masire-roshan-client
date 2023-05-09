import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-games-list',
  templateUrl: './posts-list.component.html'
})
export class PostsListComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    // this.page = parseInt(this.route.snapshot.params['page']) || 0;
    this.route.params.subscribe(value => {
      this.page = parseInt(value['page']) || 0;

      this.http
        .get(`${environment.apiServer}posts/search/${this.name}/${this.page}`, {
          responseType: 'json'
        })
        .pipe(
          map((value: any) => {
            value.map((post: any) => {
              post.files.map((file: any) => {
                if (file.for === 'موبایل') {
                  post.isMobile = true;
                }
                if (file.for === 'دستاپ') {
                  post.isDesktop = true;
                }
              });

              if (post.copyright == 'public') {
                post.copyrightText = 'عمومی';
              } else {
                post.copyrightText = 'خصوصی';
              }
            });
            return value;
          })
        )
        .subscribe({
          next: value => {
            this.posts = value;
          }
        });

      this.http
        .get(`${environment.apiServer}posts/getCount?name=${this.name}`, {
          responseType: 'json'
        })
        .subscribe({
          next: (value: any) => {
            this.count = value.count;
          }
        });
    });
  }

  name!: string;
  posts!: any;
  page: number = 0;
  limit = 60;
  count!: number;
  environment = environment;
}
