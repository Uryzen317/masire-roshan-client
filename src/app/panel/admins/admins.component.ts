import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, switchMap, debounceTime} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html'
})
export class AdminsComponent implements OnInit {

  constructor(public http : HttpClient) { }
  
  ngOnInit(): void {
    this.http.post(`${environment.apiServer}users/listAdmins` , {accessToken : localStorage.getItem("accessToken")} ,{responseType : 'json'}).subscribe({
      next : (value)=>{
        this.admins = value;
      }
    })

    this.adminSearch.valueChanges.pipe(distinctUntilChanged() , debounceTime(250) , switchMap((value)=>{
      return ajax.post(`${environment.apiServer}users/adminsSearch` , { accessToken : localStorage.getItem('accessToken') , name : value})
    })).subscribe({next : (value)=>{
      this.searchResult = value.response;
      console.log(this.searchResult)
    }})
  }

  admins : any;
  environment = environment
  adminSearch = new FormControl()
  searchResult : any;

  admin(id : string){
    this.http.patch(`${environment.apiServer}users/admin` , { accessToken : localStorage.getItem("accessToken") , id}).subscribe({
      next : (value)=>{

        // refresh admins list after success
        this.http.post(`${environment.apiServer}users/listAdmins` , {accessToken : localStorage.getItem("accessToken")} ,{responseType : 'json'}).subscribe({
          next : (value)=>{
            this.admins = value;
          }
        })
      }
    })
  }

  deAdmin(id : string){
    this.http.patch(`${environment.apiServer}users/deAdmin` , { accessToken : localStorage.getItem("accessToken") , id}).subscribe({
      next : (value)=>{

        // refresh admins list after success
        this.http.post(`${environment.apiServer}users/listAdmins` , {accessToken : localStorage.getItem("accessToken")} ,{responseType : 'json'}).subscribe({
          next : (value)=>{
            this.admins = value;
          }
        })
      }
    })
  }

  ban(id : string){
    this.http.patch(`${environment.apiServer}users/ban` , { accessToken : localStorage.getItem("accessToken") , id}).subscribe({
      next : (value)=>{

        // refresh admins list after success
        this.http.post(`${environment.apiServer}users/listAdmins` , {accessToken : localStorage.getItem("accessToken")} ,{responseType : 'json'}).subscribe({
          next : (value)=>{
            this.admins = value;
          }
        })
      }
    })
  }
}
