import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.http.get(`${this.environment.apiServer}bio/get/${id}`, { responseType: 'json' })
      .subscribe({ next: (value: any)=>{
        this.data = value;
      }, error: (error: any)=>{
      
      }})
  }

  environment = environment;
  id: string = '';
  data: any;
}
