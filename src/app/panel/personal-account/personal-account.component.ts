import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegistrationService } from '../services/registration.service';
import Chart from "chart.js/auto";

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html'
})
export class PersonalAccountComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.http
      .post(
        `${this.environment.apiServer}users/account-details`,
        {
          accessToken: localStorage.getItem('accessToken')
        },
        {
          responseType: 'json'
        }
      )
      .subscribe({
        next: (value: any) => {
          // base data to show in front
          this.username = value.username;
          this.email = value.email;
          this.emailConfirmed = value.emailConfirmed;
          this.firstname = value.firstname;
          this.lastname = value.lastname;
          this.number = value.number;
          this.avatar = value.avatar;
          this.isGoogleAvatar = value.isGoogleAvatar;
          this.id = value._id;

          // activity chart data
          let logs : {username : string; email : string; operation : string; createdAt : string ;}[] = value.logs;
          for(let counter in this.activitySuccessOperationsList){
            // list of successfully done operations
            this.successActivityData[counter] = logs.filter((log)=>
              {return log.operation == this.activitySuccessOperationsList[counter]
            }).length;
            // list of operations ended up being failure
            this.failureActivityData[counter] = logs.filter((log)=>
              {return log.operation == this.activityFailureOperationsList[counter]
            }).length;
          }
          this.drawActivityChart();

          // last week activity chart
          for(let counter in this.weeklyActivityData){
            this.weeklyActivityData[counter] = logs.filter((log)=>{
              return (new Date(log.createdAt).getDate() - new Date().getDate()) == parseInt(counter) ;
            }).length;
          }
          this.drawWeekChart();
        }
      });
  }

  @Output() showModal = new EventEmitter();
  id: string | null = null;
  isGoogleAvatar! : string;
  environment = environment;
  username!: string;
  email!: string;
  emailConfirmed!: boolean;
  firstname!: string;
  lastname!: string;
  number!: number;
  avatar!: string;
  successActivityData : number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  failureActivityData : number [] = [0, 0, 0, 0, 0, 0, 0, 0];
  activitySuccessOperationsList : string[] = ['add-post', 'remove-post', 'add-game', 'edit-game', 'delete-game', 'add-tag', 'edit-tag'
                                             , 'delete-tag', 'edit-mainPage'];
  activityFailureOperationsList : string[] = ['add-post failed', 'remove-post failed', 'add-game failed', 'edit-game failed', 'delete-game failed',
                                             'add-post failed', 'remove-post failed', 'edit-mainPage failed'];
  weeklyActivityData : number[] = [0, 0, 0, 0, 0, 0, 0];

  logout() {
    this.registrationService.logout();
  }

  drawActivityChart(){
    let activityCanvas : any = document.getElementById('activityCanvas');
    activityCanvas = activityCanvas?.getContext("2d");
    let activityChart = new Chart(activityCanvas , {
      type: 'bar',
      data: {
        labels : ["پست جدید", "حذف پست", "عنوان جدید", "ویرایش عنوان", "حذف عنوان", "افزودن تگ", "ویرایش تگ", "حذف تگ", "ویرایش صفحه اصلی"] ,
        datasets : [{
          label : "موفقیت",
          data : [ ...this.successActivityData],
          borderColor : "#0ea5e9" ,
          backgroundColor : "#7dd3fc" ,
          borderWidth : 2,
        } ,
        {
          label : "خطا" ,
          data : [ ...this.failureActivityData] ,
          borderColor : "#dc2626" ,
          backgroundColor : "#fca5a5" ,
          borderWidth : 2
        }]
      },
      options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
      }
    })
  }

  drawWeekChart(){
    let weeklyCanvas : any = document.getElementById('weekCanvas');
    weeklyCanvas = weeklyCanvas?.getContext("2d");
    let weeklyChart = new Chart(weeklyCanvas , {
      type: 'line',
      data: {
        labels : ["1 روز قبل", "2 روز قبل", "3 روز قبل", "4 روز قبل", "5 روز قبل", "6 روز قبل", "7 روز قبل"] ,
        datasets : [{
          label : "موفقیت",
          data : [ ...this.weeklyActivityData],
          borderColor : "#0ea5e9" ,
          backgroundColor : "#7dd3fc" ,
          borderWidth : 2,
          fill : true,
          tension : 0.3,
        }]
      }
    })
  }
}
