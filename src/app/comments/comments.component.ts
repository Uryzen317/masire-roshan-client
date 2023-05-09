import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.canComment = localStorage.getItem('accessToken');
    this.http
      .get(
        `${environment.apiServer}comments/list/${this.id}/${
          localStorage.getItem('accessToken') || null
        }`,
        {
          responseType: 'json',
        }
      )
      .subscribe({
        next: (value: any) => {
          this.data = value;
        },
      });
  }

  @Input('id') id!: string;
  environment = environment;
  data: any;
  canComment: any;

  comment(postId : string | null , data: string) {
    if(!postId){
      postId = this.id;
    }
    this.http
      .put(
        `${environment.apiServer}comments/comment`,
        {
          accessToken: localStorage.getItem('accessToken'),
          comment: data,
          postId
        },
        { responseType: 'json' }
      )
      .subscribe({
        next: (value: any) => {
          //refreshing comments
          this.http
            .get(
              `${environment.apiServer}comments/list/${this.id}/${
                localStorage.getItem('accessToken') || null
              }`,
              {
                responseType: 'json',
              }
            )
            .subscribe({
              next: (value: any) => {
                this.data = value;
              },
            });
        },
      });
  }

  // like(id: string) {
  //   this.http
  //     .post(`${environment.apiServer}posts/like`, {
  //       accessToken: localStorage.getItem('accessToken'),
  //       commentId: id,
  //     })
  //     .subscribe({
  //       next: (value: any) => {
  //         this.comments.map((c: any) => {
  //           if (c._id == id) {
  //             c.hasLiked = true;
  //             c.likes++;

  //             // remove dislikes (if theres any)
  //             if (c.hasDisliked) {
  //               c.hasDisliked = false;
  //               c.dislikes--;
  //             }
  //           }
  //           return c;
  //         });
  //       },
  //     });
  // }

  // dislike(id: string) {
  //   this.http
  //     .post(`${environment.apiServer}posts/dislike`, {
  //       accessToken: localStorage.getItem('accessToken'),
  //       commentId: id,
  //     })
  //     .subscribe({
  //       next: (value: any) => {
  //         this.comments.map((c: any) => {
  //           if (c._id == id) {
  //             c.hasDisliked = true;
  //             c.dislikes++;

  //             // remove likes (if theres any)
  //             if (c.hasLiked) {
  //               c.hasLiked = false;
  //               c.likes--;
  //             }
  //           }
  //           return c;
  //         });
  //       },
  //     });
  // }

  // replie(commentId: string, data: string) {
  //   this.http
  //     .put(
  //       `${environment.apiServer}posts/replie`,
  //       {
  //         accessToken: localStorage.getItem('accessToken'),
  //         commentId: commentId,
  //         replie: data,
  //       },
  //       { responseType: 'json' }
  //     )
  //     .subscribe({
  //       next: (value) => {
  //         this.showReplies(commentId);
  //       },
  //     });
  // }

  // showReplies(commentId: string) {
  //   this.http
  //     .get(
  //       `${environment.apiServer}posts/repliesList/${commentId}/${
  //         localStorage.getItem('accessToken') || null
  //       }`,
  //       {
  //         responseType: 'json',
  //       }
  //     )
  //     .subscribe({
  //       next: (value: any) => {
  //         this.comments.map((c: any) => {
  //           if (c._id == commentId) {
  //             c.isRepling = false;
  //             c.repliesList = value;
  //             return c;
  //           } else return c;
  //         });
  //       },
  //     });
  // }

  // showReplies(commentId: string) {
  //   this.http
  //     .get(
  //       `${environment.apiServer}posts/repliesList/${commentId}/${
  //         localStorage.getItem('accessToken') || null
  //       }`,
  //       {
  //         responseType: 'json',
  //       }
  //     )
  //     .subscribe({
  //       next: (value: any) => {
  //         this.comments.map((c: any) => {
  //           if (c._id == commentId) {
  //             c.showReplies = true;
  //             c.isRepling = false;
  //             c.repliesList = value;
  //             return c;
  //           } else return c;
  //         });
  //       },
  //     });
  // }

  // likeReplie(commentId: string, replieId: string) {
  //   this.http
  //     .post(`${environment.apiServer}posts/likeReplie`, {
  //       accessToken: localStorage.getItem('accessToken'),
  //       commentId: replieId,
  //     })
  //     .subscribe({
  //       next: (value: any) => {
  //         this.comments.map((c: any) => {
  //           if (c._id == commentId) {
  //             c.repliesList.map((r: any) => {
  //               if (r._id == replieId) {
  //                 r.hasLiked = true;
  //                 r.likes++;

  //                 // remove dislikes (if theres any)
  //                 if (r.hasDisliked) {
  //                   r.hasDisliked = false;
  //                   r.dislikes--;
  //                 }
  //               }
  //             });
  //           }
  //           return c;
  //         });
  //       },
  //     });
  // }

  // dislikeReplie(commentId: string, replieId: string) {
  //   this.http
  //     .post(`${environment.apiServer}posts/dislikeReplie`, {
  //       accessToken: localStorage.getItem('accessToken'),
  //       commentId: replieId,
  //     })
  //     .subscribe({
  //       next: (value: any) => {
  //         this.comments.map((c: any) => {
  //           if (c._id == commentId) {
  //             c.repliesList.map((r: any) => {
  //               if (r._id == replieId) {
  //                 r.hasDisliked = true;
  //                 r.dislikes++;

  //                 // remove dislikes (if theres any)
  //                 if (r.hasLiked) {
  //                   r.hasLiked = false;
  //                   r.likes--;
  //                 }
  //               }
  //             });
  //           }
  //           return c;
  //         });
  //       },
  //     });
  // }
}
