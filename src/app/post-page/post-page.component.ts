import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wallpaper-details-by-id',
  templateUrl: './post-page.component.html'
})
export class PostPageComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router,
  ) {}
  
  ngOnInit(): void {  
    this.id = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.params['name'] || "";
    // localStorage.removeItem(`${this.name}/${this.index}`);

    this.hasRated = localStorage.getItem(`${this.id}`) ? true : false;
    if (this.hasRated)
      this.tempRate = parseInt(localStorage.getItem(`${this.id}`) || '0');

    this.http
      .get(`${this.environment.apiServer}posts/getById/${this.id}`)
      .subscribe({
        next: (value: any) => {
          this.post = value;
        }
      });
  }

  environment = environment;
  extrasState: number = 2;
  name: any;
  id: any;
  displayedIndex!: number;
  files: any;
  post: any = {
    avatar: ''
  };
  tempRate = 5;
  hasRated = false;

  setExtrasState(state: number) {
    this.extrasState = state;
  }

  download(path: string) {
    this.http
      .post(
        `${this.environment.apiServer}posts/downloadById`,
        {
          id: this.id
        },
        {
          responseType: 'json'
        }
      )
      .subscribe({
        next: value => {
          window.location.href = this.environment.cdnServer + path;
        }
      });
  }

  rate(rate: number) {
    this.tempRate = this.hasRated ? this.tempRate : rate;
  }

  submitRate() {
    this.http
      .post(
        `${this.environment.apiServer}posts/rateById`,
        { rate: this.tempRate, id: this.id },
        {
          responseType: 'json'
        }
      )
      .subscribe({
        next: value => {
          this.hasRated = true;
          localStorage.setItem(`${this.id}`, this.tempRate.toString());
        }
      });
  }
}
