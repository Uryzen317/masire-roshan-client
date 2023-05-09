import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-replie',
  templateUrl: './replie.component.html',
  styleUrls: ['./replie.component.css']
})
export class ReplieComponent implements OnInit {

  constructor(public http : HttpClient) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  @Input() data : any;
  environment = environment;
  innerData : any;

  comment(postId : string | null , data: string) {
    this.http
      .put(
        `${environment.apiServer}comments/comment`,
        {
          accessToken: localStorage.getItem('accessToken'),
          comment: data,
          postId
        },
        { responseType: 'json' }
      ).subscribe({
        next : (value : any) =>{
          this.data.replies ++;
          this.showReplies();
        }
      })
  }

  showReplies(){
    this.data.areRepliesVisible = true ;
    this.data.isRepling = false ;
    this.http
    .get(
      `${environment.apiServer}comments/list/${this.data._id}/${
        localStorage.getItem('accessToken') || null
      }`,
      {
        responseType: 'json',
      }
    )
    .subscribe({
      next: (value: any) => {
        this.data.repliesList = value;
      },
    });
  }

  like(id: string) {
  this.http
    .post(`${environment.apiServer}comments/like`, {
      accessToken: localStorage.getItem('accessToken'),
      commentId: id,
    })
    .subscribe({
      next: (value: any) => {
        this.data.hasLiked = true;
        this.data.likes++;
        if(this.data.hasDisliked){
          this.data.dislikes--;
          this.data.hasDisliked = false;
        }
        // this.data.map((c: any) => {
        //   if (c._id == id) {
        //     c.hasLiked = true;
        //     c.likes++;

        //     // remove dislikes (if theres any)
        //     if (c.hasDisliked) {
        //       c.hasDisliked = false;
        //       c.dislikes--;
        //     }
        //   }
        //   return c;
        // });
      },
    });
}

dislike(id: string) {
  this.http
    .post(`${environment.apiServer}comments/dislike`, {
      accessToken: localStorage.getItem('accessToken'),
      commentId: id,
    })
    .subscribe({
      next: (value: any) => {
        this.data.hasDisliked = true;
        this.data.dislikes++;
        if(this.data.hasLiked){
          this.data.likes--;
          this.data.hasLiked = false;
        }
        // this.data.map((c: any) => {
        //   if (c._id == id) {
        //     c.hasDisliked = true;
        //     c.dislikes++;

        //     // remove likes (if theres any)
        //     if (c.hasLiked) {
        //       c.hasLiked = false;
        //       c.likes--;
        //     }
        //   }
        //   return c;
        // });
      },
    });
  }
}
