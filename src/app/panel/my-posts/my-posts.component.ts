import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationService } from '../services/registration.service';


@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html'
})
export class MyPostsComponent implements OnInit {

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public registrationService : RegistrationService
  ) {}

  ngOnInit(): void {
    this.registrationService.whoAmI({accessToken : localStorage.getItem('accessToken')}).subscribe({next : (value)=>{
      this.username = value.username;
      this.http
         .post(`${environment.apiServer}posts/searchForAdmin/`, {accessToken : localStorage.getItem("accessToken") , username : this.username} , {
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
    }})
  }

  posts: any;
  environment = environment;
  username: any ;

  remove(id : string){
    this.http.patch(`${environment.apiServer}posts/remove` , {accessToken : localStorage.getItem("accessToken") , id}).subscribe({next : (Value)=>{
      // refrech list of games
      this.http
      .post(`${environment.apiServer}posts/searchForAdmin/`, {accessToken : localStorage.getItem("accessToken") , username : this.username} , {
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
    }})
  }
}
