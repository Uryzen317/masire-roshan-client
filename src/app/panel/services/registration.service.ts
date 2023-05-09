import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  environment = environment;
  regState = new Subject();
  regCache : any;

  constructor(public http: HttpClient, public router: Router) {
    let accessToken : string | null = localStorage.getItem("accessToken");
    if(accessToken){
      this.whoAmI({accessToken : accessToken}).subscribe();
    }else{
      this.regState.next(null);
    }
  }

  login(data: {
    username: string;
    password: string;
    rememberme: boolean;
  }): Observable<any> {
    return this.http
      .post(`${this.environment.apiServer}users/login`, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        responseType: 'json'
      })
      .pipe(
        tap({
          next: (value: any) => {
            localStorage.setItem('accessToken', value.accessToken);
            this.whoAmI(value).subscribe();
          },
          error: error => {
            localStorage.removeItem('accessToken');
            // this.regState.next(null);
          }
        })
      );
  }

  signup(data: {
    username: string;
    password: string;
    email: string;
    rememberme: boolean;
  }): Observable<any> {
    return this.http
      .post(`${this.environment.apiServer}users/signup`, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        responseType: 'json'
      })
      .pipe(
        tap({
          next: (value: any) => {
            localStorage.setItem('accessToken', value.accessToken);
            this.whoAmI(value).subscribe();
          },
          error: error => {
            // this.regState.next(null);
            localStorage.removeItem('accessToken');
          }
        })
      );
  }

  googleAuth(accessToken : string){
    localStorage.setItem('accessToken', accessToken);
    this.whoAmI({ accessToken }).subscribe();
  }

  whoAmI(accessToken: { accessToken: string | null }): Observable<any> {
    if(!accessToken) {
      this.regState.next(null);
      this.regCache = null;
      return new Observable();
    }

    return this.http
      .post(`${this.environment.apiServer}users/whoAmI`, accessToken, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        responseType: 'json'
      })
      .pipe(
        tap({
          next: (value: any) => {
            this.regCache = value;
            this.regState.next(value);
          },
          error: error => {
            this.regState.next(null);
            this.regCache = null;
            localStorage.removeItem('accessToken');
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.regState.next(null);
    this.regCache = null;
    this.router.navigate(['panel', 'registeration']);
  }

  checkRecaptcha(token : any){
    return this.http.post(`${environment.apiServer}users/checkRecaptcha` , {token} , {responseType : 'json'});
  }

  forgotPassword(email : string){
    return this.http.post(`${environment.apiServer}users/forgotPassword`, {
      email
    }, { responseType : 'json' });
  }

  setPassword(password: string, token: string){
    return this.http.post(`${environment.apiServer}users/setForgottonPassword`, {
      password,
      token
    }, { responseType : 'json' });
  }
}
